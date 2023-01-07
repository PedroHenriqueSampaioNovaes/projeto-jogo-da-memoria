import { createAccount } from '../../firebase/auth.js';
import { setDocValues } from '../../firebase/firestore.js';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const nickname = document.querySelector('#nickname');
const form = document.querySelector('#form_register');

form.addEventListener('submit', createUser);
async function createUser(event) {
  event.preventDefault();

  if (!nickname.value || !email.value || !password.value) return;

  if (password.value.length < 6) {
    addError('A senha precisa ter no mínimo 6 caracteres');
    return;
  }

  const accountCreated = await createAccount(email.value, password.value);
  if (accountCreated) {
    await setDocValues({
      email: email.value,
      nickname: nickname.value,
      password: password.value,
      counter: 0,
    });

    const register = document.querySelector('#register');
    register.remove();
  } else {
    addError('Este e-mail já está em uso');
  }
}

function addError(message) {
  const spanError = document.querySelector('#form_register .error');
  spanError.innerText = message;
  spanError.classList.add('active');
}
