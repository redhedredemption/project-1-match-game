// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {


  const cards = [// Array of cards with IDs
    { id: 1, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20amigos.PNG?raw=true" },
    { id: 2, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20cactus.PNG?raw=true" },
    { id: 3, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20boots.PNG?raw=true" },
    { id: 4, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20hat.PNG?raw=true" },
    { id: 5, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20lasso.PNG?raw=true" },
    { id: 6, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20herradura.PNG?raw=true" },
    { id: 7, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20vaquero.PNG?raw=true" },
    { id: 8, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20longhorn.PNG?raw=true" },
    { id: 1, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20amigos.PNG?raw=true" },
    { id: 2, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20cactus.PNG?raw=true" },
    { id: 3, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20boots.PNG?raw=true" },
    { id: 4, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20hat.PNG?raw=true" },
    { id: 5, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20lasso.PNG?raw=true" },
    { id: 6, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20herradura.PNG?raw=true" },
    { id: 7, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20vaquero.PNG?raw=true" },
    { id: 8, imageUrl: "https://github.com/redhedredemption/project-1-match-game/blob/main/images/card%20longhorn.PNG?raw=true" }
  ];


  // DOM elements
  const board = document.getElementById("board"); // Board container
  const flipsCount = document.getElementById("flips-count"); // Flips count element
  const resetButton = document.getElementById("reset-button"); // Reset button element
  const messageBox = document.getElementById("message-box"); // Message box element

  // Array to store flipped cards
  let flippedCards = [];
  // Number of remaining flips
  let remainingFlips = 20;

/*
I used the following sources to structure my card array:
https://aadaobi.medium.com/building-a-memory-matching-game-in-javascript-48e792c7b563

https://www.w3schools.com/jsref/met_node_appendchild.asp

https://www.w3schools.com/jsref/prop_element_classlist.asp

https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/

ChatGPT






*/



  // Function to create a card DOM element
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

 // Setting background image for the cards using the image links from the array
    back.style.backgroundImage = `url("${cardData.imageUrl}")`;

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

    const allMatched = document.querySelectorAll(".card").every(card => card.classList.contains("flipped"));
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

    clearMessageBox();

    setTimeout(() => {
      board.innerHTML = "";
      shuffleCards();
      renderBoard();
    }, 1000);
  }

  function clearMessageBox() {
    messageBox.textContent = "";
    messageBox.style.display = "none"
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