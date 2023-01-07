import { checkUserState } from '../../firebase/auth.js';
import { getDocUser } from '../../firebase/firestore.js';

checkUserState(getName);
async function getName() {
  const nameElement = document.querySelector('#name');

  const { nickname } = await getDocUser();
  nameElement.innerText = nickname;
}
