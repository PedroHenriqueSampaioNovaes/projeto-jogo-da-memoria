import Game from './game.js';
const game = new Game();

const cardClass = 'card';
const front = 'card_front';
const back = 'card_back';
const flipClass = 'flip';

startGame();
function startGame() {
  game.createCardsFromTechs();
  initializeCards();
}

function initializeCards() {
  const gameBoard = document.querySelector('#gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(cardClass);
    cardElement.dataset.icon = card.icon;

    createCardContent(cardElement, card);
    cardElement.addEventListener('click', flipCard);

    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(cardElement, card) {
  createCardFace(front, cardElement, card);
  createCardFace(back, cardElement, card);
}

function createCardFace(face, element, card) {
  const cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if (face === front) {
    const iconElement = document.createElement('img');
    iconElement.src = `./assets/images/${card.icon}.png`;
    iconElement.alt = card.icon;
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }

  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add(flipClass);

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();

        if (game.checkGameOver()) {
          const gameOver = document.querySelector('#gameOver');
          gameOver.style.display = 'flex';

          const btnRestart = document.querySelector('#restart');
          btnRestart.addEventListener('click', restart);
        }
      } else {
        setTimeout(() => {
          const firstCardView = document.getElementById(game.firstCard.id);
          const secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove(flipClass);
          secondCardView.classList.remove(flipClass);
          game.unflipCards(flipClass);
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();

  const gameOver = document.querySelector('#gameOver');
  gameOver.style.display = 'none';
}