export function fetchCharactersByName(searchQuery) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${searchQuery.toString().toLowerCase()}`)
    .then((response) => response.json())
    .catch(error => console.log("error:", error))
}

export function fetchCharactersByPage(currentPage) {
  return fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
    .then((response) => response.json())
    .catch(error => console.log("error:", error));
}