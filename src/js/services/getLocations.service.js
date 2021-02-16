import axios from '../plugins/axios/index';
export async function getCountries() {
  try {
    const response = await axios.get('/location/get-countries');

    return Object.values(response);
  } catch (err) {
    console.dir(err);
    return Promise.reject(err);
  }
}

export async function getCities(COUNTRY_INDEX) {
  try {
    const response = await axios.get(`/location/get-cities/${COUNTRY_INDEX}`);

    return Object.values(response);
  } catch (err) {
    console.dir(err);
    return Promise.reject(err);
  }
}
