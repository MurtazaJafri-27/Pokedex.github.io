let pokeArray = [];
const pokeContainer = document.getElementById('pokeContainer');
const searchBar = document.getElementById('searchBar');

const fetchPromises = [];

for(let id = 1; id <= 700; id++){
  const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      return {
        id: id,
        name: data.name,
        sprite: data.sprites.front_default
      };
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
  
  fetchPromises.push(promise);
}

Promise.all(fetchPromises).then(allPokemon => {
  allPokemon = allPokemon.filter(p => p !== null);
  allPokemon.sort((a, b) => a.id - b.id);
  pokeArray = allPokemon;

  pokeArray.forEach(pokemon => {
    displayPokemon(pokemon);
  });
});

function displayPokemon(pokemon){
  const pokeBox = document.createElement('div');
  pokeBox.className = 'pokeBox';
  pokeBox.style.margin = '3%';
  pokeBox.dataset.name = pokemon.name;

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  pokeBox.innerHTML = `<img class="sprites" src="${pokemon.sprite}" alt="${pokemon.name}">
  <h3>${capitalizedName}</h3>`;

  pokeBox.addEventListener('click', () => {
    const pokemonContainer = document.getElementById('pokeContainer');
    
    if(pokemonContainer.style.display === 'none') {
      // Show container and search bar
      pokemonContainer.style.display = 'flex';
      searchBar.style.display = 'block';
      
      // Remove popup if it exists
      const existingPopup = document.querySelector('.popupWindow');
      if(existingPopup) {
        existingPopup.remove();
      }
    } else {
      // Hide container and search bar
      pokemonContainer.style.display = 'none';
      searchBar.style.display = 'none';
      
      // Create popup window
      const popupWindow = document.createElement('div');
      popupWindow.className = 'popupWindow';
      
      // Add Pokemon info to popup
      popupWindow.innerHTML = `
        <img src="${pokemon.sprite}" alt="${pokemon.name}">
        <h1>${capitalizedName}</h1>
        <button id="closePopup">Close</button>
      `;
      
      document.body.appendChild(popupWindow);

      requestAnimationFrame(() => {
  popupWindow.classList.add('show');
});
      
      // Close button functionality
      document.getElementById('closePopup').addEventListener('click', () => {
        popupWindow.remove();
        pokemonContainer.style.display = 'flex';
        searchBar.style.display = 'block';
      });
    }
  });

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