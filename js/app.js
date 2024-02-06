const cards = [
  { id: 1, src: "https://placehold.co/400" },
  { id: 2, src: "https://placehold.co/400" },
  { id: 3, src: "https://placehold.co/400" },
  { id: 4, src: "https://placehold.co/400" },
  { id: 5, src: "https://placehold.co/400" },
  { id: 6, src: "https://placehold.co/400" },
  { id: 7, src: "https://placehold.co/400" },
  { id: 8, src: "https://placehold.co/400" }
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

  const front = document.createElement("img");
  front.src = cardData.src;

  const back = document.createElement("div");
  back.style.backgroundColor = "blue";

  card.appendChild(front);
  card.appendChild(back);

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