/*
  File Name: Favourites.js
  Purpose: Stores user's favourite Pokemon
  Date: 2020-05-13
  Last modified: 2020-05-13
  Author: Josen Pottackal
  Copy right no copyright
  Version: 1.0
*/

const pokedex = document.getElementById('pokedex');
var favouritesList; //let?

const displayFavourites = () => {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if (localStorage !== null) {
            var retrievedData = localStorage.getItem("favouritePokemon")|| "[]";
            favouritesList = JSON.parse(retrievedData);
            
            for (i = 0; i < favouritesList.length; i++) {
                favourite.innerHTML = favouritesList[i] + favourite.innerHTML;
            }
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

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
            (pokeman) => 
       `<li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="cardImage" src="${pokeman.image}"/>
            <h2 class="cardTitle">${pokeman.name}</h2>
        </li>`
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
    const htmlString = 
    `<div class="favouriteCard">
        <button class="button button2" onclick="closePopup();">Remove</button>
        <div class="card">
            <h2 class="favouriteTitle">Favourite:</h2>
            <img class="cardImage" src="${image}"/>
            <h2 class="cardTitle">${pokeman.name}</h2>
        </div>
    </div>`;
    favouritesList.push(htmlString);
    localStorage.setItem("favouritePokemon", JSON.stringify(favouritesList));
    favourite.innerHTML = htmlString + favourite.innerHTML;
};

/* Closes Popup */
const closePopup = () => {
    const favouriteCard = document.querySelector('.favouriteCard');    
    favouriteCard.parentElement.removeChild(favouriteCard);
};

displayFavourites();
fetchPokemon();
