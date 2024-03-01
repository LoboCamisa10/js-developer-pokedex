const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                
            </div>
            <!-- Informção base dos pokemons -->
            <div class = "telabranca">
                <p class="upperCase" id="HP">${pokemon.status[0]} - ${pokemon.statusValores[0]}</p>
                <p class="upperCase" id ="attack">${pokemon.status[1]} - ${pokemon.statusValores[1]}</p>
                <p class="upperCase" id="defense">${pokemon.status[2]} - ${pokemon.statusValores[2]} </p>
                <p class="upperCase" id="special-attack">${pokemon.status[3]} - ${pokemon.statusValores[3]} </p>
                <p class="upperCase" id="special-defense">${pokemon.status[4]} - ${pokemon.statusValores[4]} </p>
                <p class="upperCase" id="speed">${pokemon.status[5]} - ${pokemon.statusValores[5]}</p>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Buttão de carregar mais ↓
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})