Pokemon App

## Building

```
npm i
# to run on localhost:
npm start 
# to build project:
npm react-scripts build
```
Then, in `index.html`, one has to correct the links to .css and .js files: add `.` in the begining (3 links overall).

## Architecture

App has the following component tree:
```
App  -- TypeList
    |
    |-- PokemonList  -- Pokemon -- BaseStats
                    |
                    |-- EvolutionCard -- MiniPokyCard
```

`App.js`:
 - `componentDidMount()` loads a list of Pokemon types and passes them as props to `TypeList`
 - `componentDidMount()` sends an action to middleware with request to load the first 20 pokemons
 - subscribes to app store and receives 'next' prop, the next URL to send in the load request in case the scroll reaches the bottom
 - renders the container with scroll event listener and `PokemonList`
 - `handleScroll()` checks if the scroll reaches the bottom and sends request to load the next 20 pokemons

`TypeList.js`:
 - receives the list of Pokemon types from `App.js` 
 - renders Dropdown Menu from Material UI components with an item for each type
 - `handleChange()` function handles click on any of the menu items and sends a request to middleware to load all pokemons with the corresponding type. In case of selecting 'none', sends request to load the first 20 unfiltered pokemons (the same as in `App.js`)

 `PokemonList.js`:
 - subscribes to app store and receives 3 values: 
   - `pokemons` - list of pokemon objects,
   - `error` - error happend while loading the pokemons, 
   - `isLoading` - whether the pokemons are still loading. 
 - in case `pokemons` list is not empty, loops through the list, renders `Pokemon` component for every object and passes the object as props to component
 - when `isLoading` is true, renders 'is Loading'
 - when `erron` is not null, renders 'Error happened'
 - on clicking on any Pokemon component, opens a popup window and calls function `retrieveEvolutData()`
 - `retrieveEvolutData()` receives the pokemon object from a clicked component, and via the chain of asynchronic requests, receives the data about evolution chain of that pokemon and stores it in the store's fields 'to' and 'from'. 
 - when the popup window is toggled and fields 'to' and 'from' are not null, renders `EvolutionCard` component and passes to it props with the object of the clicked pokemon, the list of objects with the varieties of its ancestor pokemon and the list of varieties of its descendant pokemon; in case there is no descendant or ancestor, this property has value 'none'

 `Pokemon.js`:
 - receives a pokemon object as props
 - renders a pokemon card and fills it with the data retreived from the pokemon object
 - when clicked on pokemon image, passes an event and the pokemon object to the parent component

 `BaseStat.js`:
 - retrieves stats data from the pokemon object and renders them as a table

 `EvolutionCard.js`:
 - receives props with a pokemon object and a list of pokemon objects from its evolution chain
 - renders 3 separate columns: for the clicked pokemon (middle), for the pokemon varieties he evolved from (left) and for the pokemon varieties he evolved to (right)
 - renders `MiniPokyCard` components for all received pokemon objects 

 `MiniPokyCard.js`:
- renders a small card for the pokemons with a picture and a few data fields


The requests for loading filtered and unfiltered pokemon lists are handled by redux-saga middleware. The retrieved pokemon object data are then stored in redux app store.




