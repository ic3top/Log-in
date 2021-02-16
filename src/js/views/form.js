/**
 *
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
      <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 *
 * @param {HTMLInputElement} el
 */
export function showInputError(el) {
  if (!el.classList.contains('is-invalid')) {
    const parent = el.parentElement;
    const msg = el.dataset.invalidMessage || 'Invalid input';
    const template = inputErrorTemplate(msg);
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template);
  }
}
/**
 *
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}

export function showPassword() {
  const inputPassword = document.getElementById('regPassword');
  if (inputPassword.type === 'password') {
    inputPassword.type = 'text';
  } else {
    inputPassword.type = 'password';
  }
}
