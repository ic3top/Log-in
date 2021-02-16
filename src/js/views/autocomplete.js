import { getCountries, getCities } from '../services/getLocations.service';

const countryInput = document.querySelector('#country');
const matchListCountries = document.querySelector('#match-list-countries');
const cityInput = document.querySelector('#city');
const matchListCities = document.querySelector('#match-list-cities');

let country;
let cities;

export let countries;
getCountries().then((data) => {
  countries = data;
  countryInput.removeAttribute('disabled');
});

function disableCityInput() {
  cityInput.setAttribute('disabled', true);
}

function activateCityInput() {
  cityInput.removeAttribute('disabled');
}

function setDefault(matchList) {
  matchList.classList.remove('active');
  matchList.innerHTML = '';
}

function insertHTML(matches, matchList) {
  matchList.innerHTML = '';
  const html = matches.splice(0, 5).map((match) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = match;

    return li;
  });
  matchList.classList.add('active');
  html.forEach((el) => {
    matchList.insertAdjacentElement('beforeend', el);
  });
}

function searchCountry(searchText) {
  if (searchText.length > 0) {
    let matches = countries.filter((country) => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return country.match(regex);
    });
    insertHTML(matches, matchListCountries);
    if (!countries.includes(searchText)) {
      disableCityInput();
    } else {
      activateCityInput();
    }

    return;
  }

  disableCityInput();
  matchListCities.classList.remove('active');
}

function searchCity(searchText) {
  if (searchText.length > 0) {
    let matches = cities.filter((city) => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return city.match(regex);
    });
    insertHTML(matches, matchListCities);
    setCityList();
  } else {
    matchListCountries.classList.remove('active');
  }
}

async function setCityList() {
  country = countryInput.value;
  if (!countries.includes(country)) return;
  try {
    cities = await getCities(countries.indexOf(country) + 1);
  } catch (err) {
    console.dir(err);
  }
}

matchListCountries.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    countryInput.value = event.target.textContent;
    setCityList();
    activateCityInput();
  }
  setDefault(matchListCountries);
});

matchListCities.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    cityInput.value = event.target.textContent;
  }
  setDefault(matchListCities);
});

countryInput.addEventListener('input', () => searchCountry(countryInput.value));
countryInput.addEventListener('focus', () => searchCountry(countryInput.value));
countryInput.addEventListener('focusout', async () => {
  setTimeout(() => setDefault(matchListCountries), 100);
});

cityInput.addEventListener('input', () => searchCity(cityInput.value));
cityInput.addEventListener('focus', () => searchCity(cityInput.value));
cityInput.addEventListener('focusout', async () => {
  setTimeout(() => setDefault(matchListCities), 100);
});
