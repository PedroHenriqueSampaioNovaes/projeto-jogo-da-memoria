export default class Game {
  constructor() {
    this.techs = [
      'bootstrap',
      'css',
      'electron',
      'firebase',
      'html',
      'javascript',
      'jquery',
      'mongo',
      'node',
      'react',
    ];
    this.cards = null;
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  }

  createCardsFromTechs() {
    this.cards = [];

    this.techs.forEach((tech) =>
      this.cards.push(this.createPairFromTech(tech)),
    );
    this.cards = this.cards.flatMap((pair) => pair);

    this.shuffleCards();
  }

  createPairFromTech(tech) {
    return [
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
    ];
  }

  createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 1000);
  }

  shuffleCards() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  }

  setCard(id) {
    const card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) return false;

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
    }

    return true;
  }

  checkMatch() {
    return this.firstCard.icon === this.secondCard.icon;
  }

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  }

  clearCards() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = null;
  }

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length === 0;
  }
}
