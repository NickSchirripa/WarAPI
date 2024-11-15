let deckId = "";
let cardRender = document.getElementById("cards");
let cardBorder = document.getElementById("cardBorder");
let cardBorderTwo = document.getElementById("cardBorderTwo");
let newDeck = document.getElementById("new-deck");
let newCards = document.getElementById("draw");
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
    console.log("card one wins");
  } else if (cardTwoValue > cardOneValue) {
    console.log("card two is the winner");
  } else {
    console.log("it is a tie");
  }
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
    });
}

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardBorder.style.display = "none";
      cardBorderTwo.style.display = "none";
      cardRender.innerHTML = `
            <img src=${data.cards[0].image} />
            <img src=${data.cards[1].image} />
        `;
      card1.value = data.cards[0].value;
      card2.value = data.cards[1].value;
      winningCard(card1, card2);
    });
}

newDeck.addEventListener("click", getDeck);
newCards.addEventListener("click", drawCards);
