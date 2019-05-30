
export const loadURL = (url) => 
    fetch(url,{
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(res => res);

export const filter = typeName =>
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`,{
          method: 'GET',
          mode: 'cors'
    })
    .then(response => response.json())
    .then(res => res.pokemon)  


export const loadPokemon = url =>    
    fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(pokemon => pokemon)

