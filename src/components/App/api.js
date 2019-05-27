export const loadTypes = () => 
    fetch('https://pokeapi.co/api/v2/type/?limit=100',{
        method: 'GET',
        mode: 'cors'
        })
        .then(response => {
            return response.json()
        })
        .then(res => res.results)