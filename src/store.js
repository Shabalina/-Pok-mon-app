import { createStore, compose, applyMiddleware } from 'redux';
import { pokemonLoadMiddleware } from './middlewares/loadMiddlewares';
import { pokemonFilterMiddleware } from './middlewares/filterMiddlewares';
import rootReducer from './reducers';

const getStore = () => {
    const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(pokemonLoadMiddleware, pokemonFilterMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : noop => noop,
      ),
    );
  
    return store;
  };
  
  export default getStore;