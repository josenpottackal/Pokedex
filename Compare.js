/*
  File Name: Compare.js
  Purpose: Fetches and displays Pokemon data
  Date: 2020-05-14
  Last modified: 2020-05-14
  Author: Josen Pottackal
  Copy right no copyright
  Version: 1.0
*/

const pokedex = document.getElementById('pokedex');

/**
 * Fetches Pokemon data
 */
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) =>
    ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
    displayPokemon(pokemon);
};

/**
 * Displays Pokemon card
 * @param pokemon Pokemon information
 */
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="cardImage" src="${pokeman.image}"/>
            <h2 class="cardTitle">${pokeman.name}</h2>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

/**
 * Selects Pokemon 
 * @param id Pokemon API id
 */
const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopup(pokeman);
};

/**
 * Displays Popup card
 * @param pokeman Pokemon information
 */
const displayPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlString =
   `<div class="compareCard">
        <button class="button button2" onclick="closePopup();">Remove</button>
        <div class="card">
            <h2 class="compareTitle">Compare:</h2>
            <img class="cardImage" src="${image}"/>
            <h2 class="cardTitle">${pokeman.name}</h2>
            <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}
        </div>
    </div>`;
    compare.innerHTML = htmlString + compare.innerHTML;
};

/**
 * Closes Popup card
 */
const closePopup = () => {
    const compareCard = document.querySelector('.compareCard');
    compareCard.parentElement.removeChild(compareCard);
};

fetchPokemon();
