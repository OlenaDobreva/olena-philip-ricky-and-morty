export function createCharacterCard(data) {
  const cardsContainer = document.querySelector("[data-js='card-container']");
  const characterCard = document.createElement("li");
  characterCard.classList.add("card");
  characterCard.innerHTML = `
  <div class="card__image-container">
    <img
        class="card__image"
        src=${data.image}
        alt="Rick Sanchez"
    />
    <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
        <h2 class="card__title">${data.name}</h2>
        <dl class="card__info">
            <dt class="card__info-title">${data.status}</dt>
            <dd class="card__info-description">Alive</dd>
            <dt class="card__info-title">Type</dt>
            <dd class="card__info-description"></dd>
            <dt class="card__info-title">Occurances</dt>
            <dd class="card__info-description">${data.episode.length}</dd>
        </dl>
    </div>
  `;

  cardsContainer.appendChild(characterCard);
}

export function clearAllCards() {
  const cardsContainer = document.querySelector("[data-js='card-container']");
  // while there are still cards in the container, remove the first card
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}
