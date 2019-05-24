
export const loadURL = () => 
    //console.log('here')  
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=200',{
        method: 'GET',
        mode: 'cors'
        })
        .then(response => {
            return response.json()
        })
        .then(res => res.results)
    

export const pokemon = url =>
    fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(pokemon => pokemon)

export const filter = typeID =>
    fetch(`https://pokeapi.co/api/v2/type/${typeID}`,{
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(pokemon => pokemon.map(item => 
          fetch(item.pokemon.url, {
          method: 'GET',
          mode: 'cors'
        })
          .then(response2 => response2.json())
      ));

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