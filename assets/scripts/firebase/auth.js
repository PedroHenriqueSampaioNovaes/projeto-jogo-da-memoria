import app from './app.js';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

export const auth = getAuth(app);

export async function setUserPersistence() {
  setPersistence(auth, inMemoryPersistence);
}

export async function createAccount(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setUserPersistence();

    return true;
  } catch (err) {
    // console.log(err.message);

    return false;
  }
}

export async function loginAccount(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setUserPersistence();
  } catch (err) {
    console.log(err);
  }
}

export function checkUserState(callback, ...args) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(...args);
    }
  });
}
