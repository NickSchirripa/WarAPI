let deckId = "";
let cardRender = document.getElementById("cards");
let cardBorder = document.getElementById("cardBorder");
let cardBorderTwo = document.getElementById("cardBorderTwo");
let newDeck = document.getElementById("new-deck");
let newCards = document.getElementById("draw");
let playerOneScore = 0;
let playerTwoScore = 0;
let winningText = document.getElementById("winnerText");
let cardsRemaining = document.getElementById("cardsRemaining");
let card1 = {
  value: "",
};
let card2 = {
  value: "",
};

function winningCard(cardOne, cardTwo) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const cardOneValue = valueOptions.indexOf(cardOne.value);
  const cardTwoValue = valueOptions.indexOf(cardTwo.value);

  if (cardOneValue > cardTwoValue) {
    winningText.innerHTML = `<p>Player One Gets A Point!</p>`;
    playerOneScore += 1;
    document.getElementById("player1Score").textContent =
      "Score:" + " " + playerOneScore;
  } else if (cardTwoValue > cardOneValue) {
    winningText.innerHTML = `<p>Player Two Gets A Point!</p>`;
    playerTwoScore += 1;
    document.getElementById("player2Score").textContent =
      "Score:" + " " + playerTwoScore;
  } else {
    winningText.innerHTML = `<p>WAR</p>`;
  }

  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=0`)
    .then((res) => res.json())
    .then((data) => {
      if (data.remaining === 0) {
        newCards.style.display = "none";
        cardsRemaining.innerHTML = "You Need a New Deck, IDIOT! :)";
      }
      if (data.remaining === 0 && playerOneScore > playerTwoScore) {
        winningText.innerHTML = "<p>PLAYER ONE WINNNNNSSS</p>";
      } else if (data.remaining === 0 && playerTwoScore > playerOneScore) {
        winningText.innerHTML = "<p>PLAYER TWO WIIINNNSS</p>";
      }
    });
}

function getDeck() {
  newCards.style.display = "block";
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
      cardBorder.style.display = "block";
      cardBorderTwo.style.display = "block";
      cardRender.innerHTML = "";
      winningText.innerHTML = "";
      cardsRemaining.innerHTML = `
      <p>Reamaining Cards: ${data.remaining}</p>
      `;
    });
  document.getElementById("player1Score").textContent = "Score:" + " " + 0;
  document.getElementById("player2Score").textContent = "Score:" + " " + 0;
  playerOneScore = 0;
  playerTwoScore = 0;
}

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cardBorder.style.display = "none";
      cardBorderTwo.style.display = "none";
      cardRender.innerHTML = `
            <img src=${data.cards[0].image} />
            <img src=${data.cards[1].image} />
        `;
      cardsRemaining.innerHTML = `
      <p>Reamaining Cards: ${data.remaining}</p>
      `;
      card1.value = data.cards[0].value;
      card2.value = data.cards[1].value;

      winningCard(card1, card2);
    });
}

newDeck.addEventListener("click", getDeck);
newCards.addEventListener("click", drawCards);
