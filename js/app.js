/* ============= DOMContentLoaded event listener ==================
I used this based on some research I did after the "defer" lesson, and 
from this stack overflow post I found while troubleshooting:
https://stackoverflow.com/questions/71013476/memory-card-game-stops-working-after-first-two-cards-flipped
*/

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

  /*======================= DOM elements ===========================
  getElementById was suggested by several articles when I was looking for a way to create the game board/retrieve references to specific elements based on unique IDs. I used these articles for the syntax:
  https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
  https://www.w3schools.com/jsref/met_document_getelementbyid.asp
  */

  const board = document.getElementById("board"); // Board container
  const flipsCount = document.getElementById("flips-count"); // Flips count element
  const resetButton = document.getElementById("reset-button"); // Reset button element
  const messageBox = document.getElementById("message-box"); // Message box element

  // Array to store flipped cards
  let flippedCards = [];
  // Number of remaining flips
  let remainingFlips = 30;

  /*
  I used the following sources as references to troubleshoot my card array:
  https://aadaobi.medium.com/building-a-memory-matching-game-in-javascript-48e792c7b563
  
  https://www.w3schools.com/jsref/met_node_appendchild.asp
  
  https://www.w3schools.com/jsref/prop_element_classlist.asp
  
  https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
  
  ChatGPT  
  */

  // ============= Function to create a card DOM element =============
  function createCard(cardData) {
    const card = document.createElement("div"); // Create card container
    card.classList.add("card"); // Add "card" class
    card.dataset.id = cardData.id; // Set card ID

    const inner = document.createElement("div"); // Create inner container
    inner.classList.add("inner"); // "Inner" class is a container for front & back sides of the card,  to make it easier to manage the flipping animation. Source: https://www.w3schools.com/howto/howto_css_flip_card.asp

    const front = document.createElement("div"); // Create front side of card (side that faces the player)
    front.classList.add("front"); // Add "front" class

    const back = document.createElement("div"); // Create back side of card (side that has the images to be matched)
    back.classList.add("back"); // Add "back" class

    // ================ Setting background image for the cards using the image links from the array =================
    back.style.backgroundImage = `url("${cardData.imageUrl}")`;

    inner.appendChild(front); // Append front side of card to inner container [source: see sources for card array]
    inner.appendChild(back); // Append back side of card to inner container

    card.appendChild(inner); // Append inner container to card

    card.addEventListener("click", () => flipCard(card)); // Add click event listener to flip the card the player clicks on

    return card; // Return the card created by the function
  }

  // ============ Function to handle card flipping ===============
  function flipCard(card) {
    // return early if remaining flips is less or eq to 0
    if (remainingFlips <= 0) return;
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      card.classList.add("flipped"); // Add "flipped" class to show the face of the card
      flippedCards.push(card); // Add card to flippedCards array

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000); // Check for match after 1 second delay to make sure it doesn't run until the rest of code has finished running
        // Source: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
      }
    }
    remainingFlips--; // Subtract one (decrement) the count of Remaining Flips. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement
    flipsCount.textContent = remainingFlips; // Update count of flips displayed on the page; text syntax sources: https://www.w3schools.com/jsref/prop_node_textcontent.asp   ;  https://developer.mozilla.org/docs/Web/API/Node/textContent
    console.log(remainingFlips <= 0, "Remaining Flips")
  }

  // ============= Function to check for card match ===========
  function checkMatch() {
    const [card1, card2] = flippedCards; // Getting flipped cards from flipped cards array

    if (card1.dataset.id === card2.dataset.id) {
      showMessage("Match!"); // Display match message
      flippedCards = []; // Clear flipped cards array
    } else {
      showMessage("Try again"); // Display failure message
      card1.classList.remove("flipped"); // Flip the first card back
      card2.classList.remove("flipped"); // Flip the second card back
      flippedCards = []; // Clear flipped cards array
    }

    if (remainingFlips === 0) {
      showMessage("Game over!"); // Display game over message
    }

    // ========= Check if all cards are matched ==============
    const allMatched = document.querySelectorAll(".card")
    const matchedArray = [...allMatched].every(card => card.classList.contains("flipped"))
    console.log(matchedArray); // I worked through this with the TA

    if (matchedArray) {
      showMessage("You win!"); // Display win message
    }
  }

  // ========== Function to show messages in message box =========
  function showMessage(message) {
    messageBox.textContent = message; // Set the message text
    messageBox.style.display = "block"; // Display message box, when it's empty don't show it; source: https://www.w3schools.com/howto/howto_js_alert.asp
  }

  // ============== Function to reset the game ===============
  function resetGame() {
    remainingFlips = 30; // Reset remaining flips count to 30
    flipsCount.textContent = remainingFlips; // Update flips count displayed on the page

    flippedCards.forEach(card => card.classList.remove("flipped")); // Flip back all flipped cards
    flippedCards = []; // Clear flipped cards array

    clearMessageBox(); // Clear the message box of all text

    setTimeout(() => {
      board.innerHTML = ""; // Clear board
      shuffleCards(); // Shuffle cards by calling shuffle function (below)
      renderBoard(); // Render board with the shuffled cards by calling render function (below)
    }, 1000); // Wait for 1 second to allow animations during reset
  }

  // ========= Function to clear the message box ==============
  function clearMessageBox() { // Clear the message box of all text
    messageBox.textContent = "";
    messageBox.style.display = "none" // Do not show message box when empty
  }

  // ========= Function to shuffle the cards ==============
  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap cards to shuffle
    }
  }

  // ========= Function to render the board with cards ==============
  function renderBoard() {
    cards.forEach(cardData => {
      const card = createCard(cardData); // Create card element
      board.appendChild(card); // Append card to board
    });
  }

  // ========= Event listener for reset button click ==============
  resetButton.addEventListener("click", resetGame);

  // ========= Loading page shuffle, render board, reset game =======
  shuffleCards();
  renderBoard();
  resetGame()
});
