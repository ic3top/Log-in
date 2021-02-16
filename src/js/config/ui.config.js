const UI = {
  forms: {
    log: document.forms.loginForm,
    reg: document.forms.regForm
  },
  logInputEmail: document.getElementById('email'),
  logInputPassword: document.getElementById('password'),
  registrationInputs: {
    regInputEmail: document.getElementById('regEmail'),
    regInputPassword: document.getElementById('regPassword'),
    inputnickname: document.getElementById('nickname'),
    inputfirstName: document.getElementById('first_name'),
    inputlastName: document.getElementById('last_name'),
    inputPhone: document.getElementById('phone'),
    inputCountry: document.getElementById('country'),
    inputCity: document.getElementById('city'),
    inputGender: document.getElementById('gender'),
    inputData: document.getElementById('date')
  }
};

export default UI;
