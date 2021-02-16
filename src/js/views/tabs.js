/**
 * Tabs handler.
 * @param {Event} evt event
 * @param {String} formType id
 */
const tabcontent = document.getElementsByClassName('tabcontent-js');
const rightSide = document.querySelector('.login-greeting-screen');
const leftSide = document.querySelector('.login-form-wrap');
const formCard = document.querySelector('.form-card');

export default function tabs(target, formType) {
  // Get all elements with class="tabcontent" and hide them
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  if (target.dataset.form === 'reg') {
    formCard.style.maxWidth = '1000px';
    leftSide.classList.add('left-side-active');
    rightSide.classList.add('hidden-right');
  } else if (target.dataset.form === 'log-in') {
    formCard.style.maxWidth = '500px';
    leftSide.classList.remove('left-side-active');
    rightSide.classList.remove('hidden-right');
  }
  // Get all elements with class="tablinks" and remove the class "active"
  const tablinks = [...document.getElementsByClassName('tablink-js')];
  tablinks.forEach((el) => el.classList.remove('active'));

  // Show the current tab, and add an "active" class to the button that opened the tab
  target.classList.add('active');
  document.getElementById(formType).style.display = 'block';
}
