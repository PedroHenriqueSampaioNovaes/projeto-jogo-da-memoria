import { loginAccount } from '../../firebase/auth.js';
import { validateUser } from '../../firebase/firestore.js';

const login = document.querySelector('#nickname_login');
const password = document.querySelector('#password_login');
const form = document.querySelector('#form_login');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const loginValue = login.value;
  const passwordValue = password.value;

  if (!loginValue || !passwordValue) return;

  const data = await validateUser(loginValue, passwordValue);
  const email = data ? data.email : null;

  if (email) {
    await loginAccount(email, passwordValue);

    const loginScreen = document.querySelector('#login');
    loginScreen.remove();
  } else {
    addError();
  }
}

function addError() {
  const spanError = document.querySelector('#form_login .error');
  spanError.innerText = 'Usuário ou senha incorretos';
  spanError.classList.add('active');
}
