import app from './app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { auth } from './auth.js';

const db = getFirestore(app);
const col = collection(db, 'rank');

export function getDocRef() {
  const documentId = auth.currentUser.uid;
  return doc(db, 'rank', documentId);
}

export async function getDocUser() {
  const docSnap = await getDoc(getDocRef());
  return docSnap.data();
}

export async function getRank() {
  const q = query(col, orderBy('counter'), limit(10));
  const docSnap = await getDocs(q);

  return docSnap;
}

export async function updateCounterRank(value) {
  const docSnap = await getDoc(getDocRef());
  const counter = docSnap.data().counter;

  if (value >= counter) return false;
  return true;
}

export async function setDocValues(properties) {
  try {
    await setDoc(getDocRef(), properties);
  } catch (err) {
    console.log('Não foi possível add um novo documento', err.message);
  }
}

export async function updateDocValues(properties) {
  await updateDoc(getDocRef(), properties);
}

export async function canUpdateData(timer) {
  if (await updateCounterRank(timer)) {
    await updateDocValues({ counter: timer });
  }
}

export async function validateUser(username, password) {
  const q = query(
    col,
    where('nickname', '==', username),
    where('password', '==', password),
  );
  const querySnapshot = await getDocs(q);

  const fieldSnapshot = await querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return fieldSnapshot[0];
}
