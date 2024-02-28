import { createCharacterCard, clearAllCards } from "./card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1; // 42
let currentPage = 1; // current page (default
let searchQuery = "";

searchBar.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  searchForCharacter();
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    changePage();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < 42) {
    currentPage++;
    changePage();
  }
});

async function fetchCharactersByPage() {
  let response;

  try {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPage}`
    );
    response = data.json();
  } catch (error) {
    console.log("error:", error);
  }

  return response;
}

async function fetchCharactersByName() {
  let response;

  try {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character?name=${searchQuery}`
    );
    response = data.json();
  } catch (error) {
    console.log("error:", error);
  }

  return response;
}

function updatePageNumber() {
  pagination.innerHTML = `${currentPage} / ${maxPage}`;
}

async function searchForCharacter() {
  console.log("searching....");

  const { info, results } = await fetchCharactersByName();
  maxPage = info.pages;

  updatePageNumber();

  clearAllCards();
  // for each character, call the createCharacterCard function with the card-object
  results.forEach((element) => {
    createCharacterCard(element);
  });
}

function changePage() {
  // changing page...
  fetchCharactersByPage();
  loadCharactersOnPage();
  updatePageNumber();
}
async function loadCharactersOnPage() {
  const { info, results } = await fetchCharactersByPage();
  maxPage = info.pages;

  updatePageNumber();

  clearAllCards();
  // for each character, call the createCharacterCard function with the card-object
  results.forEach((element) => {
    createCharacterCard(element);
  });
}

function main() {
  // get characters and assign it to a new variable
  loadCharactersOnPage();
}
main();

// async function fetchCharacters() {
//   let response;

//   try {
//     const data = await fetch(
//       `https://rickandmortyapi.com/api/character?page=${currentPage}`
//     );
//     response = data.json();
//   } catch (error) {
//     console.log("error:", error);
//   }

//   return response;
// }
