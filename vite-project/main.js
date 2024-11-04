let deckId = "";
let cardRender = document.getElementById("cards");
let cardBorder = document.getElementById("cardBorder");

function getDeck() {
  document.getElementById("draw").style.display = "block";
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
      cardBorder.style.display = "block";
      cardRender.innerHTML = "";
    });
}

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardBorder.style.display = "none";
      cardRender.innerHTML = `
            <img src=${data.cards[0].image} />
            <img src=${data.cards[1].image} />
        `;
    });
}
document.getElementById("new-deck").addEventListener("click", getDeck);

document.getElementById("draw").addEventListener("click", drawCards);
