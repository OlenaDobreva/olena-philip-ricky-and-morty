import { createCharacterCard, clearAllCards } from "./card.js";
import { debounce } from "./debounce.js";
import { fetchCharactersByName, fetchCharactersByPage } from "./api.js";

const searchBar = document.querySelector('[data-js="search-bar"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const debouncedSearch = debounce(loadCharactersBySearch,800)

// States
let maxPage = 1; // 42
let currentPage = 1; // current page (default
let searchQuery = "";



searchBar.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  debouncedSearch()
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

function changePage() {
  loadCharactersByPage();
  updatePageNumber();
}

function loadCharactersBySearch() {
  fetchCharactersByName(searchQuery).then(({ info, results }) => {
    maxPage = info.pages;

    updatePageNumber();
    // clear all cards before adding new ones
    clearAllCards();
    // for each character, call the createCharacterCard function with the card-object
    results.forEach((element) => {
      createCharacterCard(element);
    })
  }).catch((error) => {
    console.log(error)
    clearAllCards();
  });
}


function loadCharactersByPage() {
  fetchCharactersByPage(currentPage).then(({ info, results }) => {
    maxPage = info.pages;

    updatePageNumber();
    // clear all cards before adding new ones
    clearAllCards();
    // for each character, call the createCharacterCard function with the card-object
    results.forEach((element) => {
      createCharacterCard(element);
    });
  });
}

function updatePageNumber() {
  pagination.innerHTML = `${currentPage} / ${maxPage}`;
}


// initial load of characters on page
loadCharactersByPage();