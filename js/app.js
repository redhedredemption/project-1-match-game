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
  const messageBox = document.getElementById("message-box");

  let flippedCards = [];
  let remainingFlips = 20;

  /*
  Used this article for ideas on how to create the shuffled array of cards:
  https://www.geeksforgeeks.org/javascript-program-to-shuffle-deck-of-cards/
  */

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
    back.innerText = cardData.id;

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
    remainingFlips--;
    flipsCount.textContent = remainingFlips;
  }



  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
      showMessage("Match!");
      flippedCards = [];
    } else {
      showMessage("Try again");
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }

    if (remainingFlips === 0) {
      showMessage("Game over!");
      resetGame();
    }

    const allMatched = document.querySelectorAll('.card').every(card => card.classList.contains('flipped'));
    if (allMatched) {
      showMessage("You win!");
    }

    }


    function showMessage(message) {
      messageBox.textContent = message;
      messageBox.style.display = "block";
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