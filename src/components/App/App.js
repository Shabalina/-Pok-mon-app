import React, { Component } from 'react';
import Pokemon from '../Pokemon'
import styles from './App.module.css';
import { connect } from 'react-redux';

import { loadRequest } from '../../actions/loadActions';


class App extends Component {
    state={
        filterValue: ''
    }

componentDidMount() {    
    const { loadRequest } = this.props;
    loadRequest();
    }


handleInput= event => {
    this.setState({
        filterValue: event.target.value
    })
}

applyFilter(pokemon){
    const {filterValue} = this.state
    pokemon.types.forEach(function(type) {
        if (type.type.name === filterValue) {
          return true
        }
    });

    return false
}

renderFilteredPokemonList = () => {
    const {pokemons} = this.props
    var filteredPokemons = pokemons.filter(this.applyFilter)
    this.renderPokemonList (filteredPokemons)    
}

renderPokemonList(pokemonList) {
    console.log(pokemonList)
    return pokemonList.map(pokemon => (
        <Pokemon 
            key={pokemon.id} 
            pokemon={pokemon}>
        </Pokemon>
        ))  
}

renderPokemons() {
    const {filterValue} = this.state
    const {pokemons} = this.props    
    return filterValue !== '' ? 
            this.renderFilteredPokemonList()
            :
            this.renderPokemonList(pokemons)         
        
}

render(){
    const {pokemons, isLoading, error} = this.props
    console.log(pokemons)
    const { searchValue } =  this.state
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Errore is happend</p>;
    return(
        <div>
            <div className={styles.previewList}>
                <input 
                    className={`${styles.input} t-input`}
                    value={searchValue}
                    placeholder='fill pokemon type'
                    onChange={this.handleInput}
                    >
                </input>
                <div className={styles.buttonWrapper}>
                    <button 
                        className={`${styles.button} t-search-button`}
                        //onClick={this.makeFilter}
                        >
                        Filter
                    </button>
                </div>                
            </div>
            <div className={`${styles.searchPanel} t-search-result`}>
                {pokemons ? 
                    this.renderPokemons()                        
                    :
                    null
                }
                
            </div>
        </div>
    )}
}

const mapStateToProps = state => ({
    pokemons: state.all.pokemons,
    isLoading: state.all.isLoading,
    error: state.all.error,
  })
  
  
  const mapDispatchToProps = {
    loadRequest
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);

