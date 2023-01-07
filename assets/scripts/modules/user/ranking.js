import { getRank } from '../../firebase/firestore.js';

export async function attRank() {
  const rankView = document.querySelector('#tbody');
  const ranking = await getRank();

  let placing = 0;
  ranking.forEach((doc) => {
    const nickName = doc.data().nickname;
    const counter = doc.data().counter;
    const childExists = rankView.children[placing];
    placing++;

    if (counter === 0) {
      placing--;
      return;
    }

    if (childExists) {
      childExists.innerHTML = `<tr><td>${placing}</td> <td>${nickName}</td> <td>${counter}</td></tr>`;
    } else {
      rankView.innerHTML += `<tr><td>${placing}</td> <td>${nickName}</td> <td>${counter}</td></tr>`;
    }
  });
}
attRank();
