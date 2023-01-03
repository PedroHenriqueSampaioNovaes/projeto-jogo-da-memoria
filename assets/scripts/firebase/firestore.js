import app from './app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { auth } from './auth.js';

const db = getFirestore(app);

export function getDocRef() {
  const documentId = auth.currentUser.uid;
  return doc(db, 'rank', documentId);
}

export async function getDocUser() {
  const docSnap = await getDoc(getDocRef());
  return docSnap.data();
}

export async function setDocValues(properties) {
  try {
    await setDoc(getDocRef(), properties);
  } catch (err) {
    console.log('Não foi possível add um novo documento', err.message);
  }
}

export async function validateUser(username, password) {
  const q = query(
    collection(db, 'rank'),
    where('nickname', '==', username),
    where('password', '==', password),
  );
  const querySnapshot = await getDocs(q);

  const fieldSnapshot = await querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return fieldSnapshot[0];
}
