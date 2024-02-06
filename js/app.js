document.addEventListener("DOMContentLoaded", function () {
  const cards = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 }
  ];

  const board = document.getElementById("board");
  const flipsCount = document.getElementById("flips-count");
  const resetButton = document.getElementById("reset-button");

  let flippedCards = [];
  let remainingFlips = 20;

  function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = cardData.id;

    const inner = document.createElement("div");
    inner.classList.add("inner");

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    card.addEventListener("click", () => flipCard(card));

    return card;
  }

  function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
      alert("Match!");
      flippedCards = [];
    } else {
      alert("Try again");
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }

    remainingFlips--;
    flipsCount.textContent = remainingFlips;

    if (remainingFlips === 0) {
      alert("Game over!");
      resetGame();
    }
  }

  function resetGame() {
    remainingFlips = 20;
    flipsCount.textContent = remainingFlips;

    flippedCards.forEach(card => card.classList.remove("flipped"));
    flippedCards = [];

    setTimeout(() => {
      board.innerHTML = "";
      shuffleCards();
      renderBoard();
    }, 1000);
  }

  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  function renderBoard() {
    cards.forEach(cardData => {
      const card = createCard(cardData);
      board.appendChild(card);
    });
  }

  resetButton.addEventListener("click", resetGame);

  shuffleCards();
  renderBoard();
});