export const takeData = (url) => {
    return fetch(url,{
            method: 'GET',
            mode: 'cors'
            })
            .then(response => {
                return response.json()
            })
            .then(res => res)
        }