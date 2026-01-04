let pokeArray = [];
const pokeContainer = document.getElementById('pokeContainer');
const searchBar = document.getElementById('searchBar');

for(let id = 1; id <= 700; id++){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      let pokemon = {
        name: data.name,
        sprite: data.sprites.front_default
      };
      pokeArray.push(pokemon);
      
      displayPokemon(pokemon); // Call the function!
    })
    .catch(error => console.error('Error:', error));
}

// Define function OUTSIDE the fetch loop
function displayPokemon(pokemon){
  const pokeBox = document.createElement('div');
  pokeBox.className = 'pokeBox';
  pokeBox.style.margin = '3%';
  pokeBox.dataset.name = pokemon.name; // Add this - it was missing!

  // CAPITALIZING NAME
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  pokeBox.innerHTML = `<a href="https://pokemon.com/us/pokedex/${pokemon.name}"><img class="sprites" src="${pokemon.sprite}" alt="${pokemon.name}"></a>
  <h3>${capitalizedName}</h3>`;

  // HEADING GREEN
  pokeBox.addEventListener('mouseenter', () => {
    const h3 = pokeBox.querySelector('h3');
    if(h3) h3.style.color = 'greenyellow';
  });

  pokeBox.addEventListener('mouseleave', () => {
    const h3 = pokeBox.querySelector('h3');
    if(h3) h3.style.color = 'white';
  });
  
  pokeContainer.appendChild(pokeBox);
}

// Search listener OUTSIDE the loop
searchBar.addEventListener('input', (inputText) => {
  const searchTerm = inputText.target.value.toLowerCase();
  const allBoxes = document.querySelectorAll('.pokeBox');

  allBoxes.forEach(box => {
    const pokemonName = box.dataset.name.toLowerCase();
    if(pokemonName.includes(searchTerm)){
      box.style.display = 'flex';
    }
    else{
      box.style.display = 'none';
    }
  });
});