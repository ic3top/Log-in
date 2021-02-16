/* eslint-disable linebreak-style */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'js-datepicker/dist/datepicker.min.css';

import datepicker from 'js-datepicker';
import './views/autocomplete';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import tabs from './views/tabs';
import { showInputError, removeInputError, showPassword } from './views/form';
import { login, register } from './services/auth.service';
import { notify } from './views/notifications';

const {
  forms, logInputEmail, logInputPassword, registrationInputs
} = UI;
const logInputs = [logInputEmail, logInputPassword];
const regInputs = [...Object.values(registrationInputs)];
const tabBtns = [...document.getElementsByClassName('tablink-js')];
const regContent = document.getElementById('reg');

// date picker
const picker = datepicker('#date', {
  position: 'tl',
  formatter: (input, date) => {
    // This will display the date as `1/1/2019`.
    const value = date.toLocaleDateString();
    input.value = value;
  }
});
picker.setMin(new Date(1900, 0, 1));
picker.setMax(new Date(2021, 12, 1));

// Handlers
async function onSubmit() {
  const isValidForm = logInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) { showInputError(el); }
    return isValidInput;
  });
  if (!isValidForm) return;

  try {
    await login(logInputEmail.value, logInputPassword.value);
    forms.log.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Login failed', className: 'alert-danger' });
  }
}

async function onRegSubmit() {
  const isValidForm = regInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) { showInputError(el); }
    return isValidInput;
  });
  if (!isValidForm) return;
  try {
    const regInputsValues = {};
    regInputs.forEach((input) => {
      regInputsValues[input.dataset.required] = input.value;
    });
    await register(regInputsValues);
    forms.reg.reset();
    tabs(tabBtns[1], 'log-in');
    notify({ msg: 'Registration success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Request failed', className: 'alert-danger' });
  }
}
// Events
// Log-in
forms.log.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});
logInputs.forEach((el) => {
  el.addEventListener('focus', () => {
    removeInputError(el);
  });
});

// Registration
forms.reg.addEventListener('submit', (e) => {
  e.preventDefault();
  onRegSubmit();
});
regInputs.forEach((el) => {
  el.addEventListener('focus', () => {
    removeInputError(el);
  });
});

// TABS
regContent.style.display = 'none';
tabBtns.forEach((el) => el.addEventListener('click', (event) => {
  tabs(event.currentTarget, el.dataset.form);
}));
// show/hide password
regContent.querySelector('#show').addEventListener('click', showPassword);
