/*
  File Name: Pokemon.js
  Purpose: Fetches and displays Pokemon data
  Date: 2020-05-13
  Last modified: 2020-05-13
  Author: Josen Pottackal
  Copy right no copyright
  Version: 1.0
*/

const pokedex = document.getElementById('pokedex');

/* Fetches Pokemon data */
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

/* Displays Pokemon data */
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

/* Displays selcted Pokemon */
const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopup(pokeman);
};

/* Displays Popup */
const displayPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlString = `
        <div class="popup">
            <button class="button button2" onclick="closePopup();">Close</button>
            <div class="card">
                <img class="cardImage" src="${image}"/>
                <h2 class="cardTitle">${pokeman.name}</h2>
                <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}
        </div>
    </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};

/* Closes Popup */
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();