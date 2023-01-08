import { getRank } from '../../firebase/firestore.js';

export async function updateRank() {
  const rankView = document.querySelector('#tbody');
  const ranking = await getRank();

  let placing = 0;
  ranking.forEach((doc) => {
    const nickName = doc.data().nickname;
    const counter = doc.data().counter;
    const childExists = rankView.children[placing];

    if (counter === 0) return;

    placing++;

    // Se já existir um elemento com o valor do placing atual, apenas atualiza o valor desse filho para não duplica-lo no rank
    if (childExists) {
      childExists.innerHTML = `<tr><td>${placing}</td> <td>${nickName}</td> <td>${counter}</td></tr>`;
    } else {
      rankView.innerHTML += `<tr><td>${placing}</td> <td>${nickName}</td> <td>${counter}</td></tr>`;
    }
  });
}
updateRank();
