import axios from '../plugins/axios';
/**
 * makes login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      '/auth/login',
      JSON.stringify({ email, password })
    );

    return response.data;
  } catch (err) {
    console.dir(err);
    return Promise.reject(err);
  }
}
export async function register({
  email, password, nickname, first_name, last_name, phone, city, country, gender_orientation, date
}) {
  const dateArr = date.split('.');
  const date_of_birth_day = dateArr[0];
  const date_of_birth_month = dateArr[1];
  const date_of_birth_year = dateArr[2];
  try {
    const response = await axios.post(
      '/auth/signup',
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation, // api requires
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year
      })
    );

    return response;
  } catch (err) {
    console.dir(err);
    return Promise.reject(err);
  }
}
