
export const loadURL = () => 
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20',{
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(res => res.results);

export const filter = typeName =>
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`,{
          method: 'GET',
          mode: 'cors'
    })
    .then(response => response.json())
    .then(res => res.pokemon)
    
export const loadTypes = () => 
    fetch('https://pokeapi.co/api/v2/type/?limit=100',{
        method: 'GET',
        mode: 'cors'
        })
        .then(response => {
            return response.json()
        })
        .then(res => res.results)

export const loadPokemon = url =>    
    fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(pokemon => pokemon)

export const search = query =>
  fetch(`http://api.tvmaze.com/search/shows?q=${query}`, {
    method: 'GET',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(shows => shows.map(show => show.show));

export const show = showId =>
  fetch(`http://api.tvmaze.com/shows/${showId}?embed=cast`, {
    method: 'GET',
    mode: 'cors'
  }).then(response => response.json());