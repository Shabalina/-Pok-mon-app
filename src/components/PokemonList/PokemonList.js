import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import { connect } from 'react-redux';
import styles from './PokemonList.module.css';

class PokemonList extends Component {

    renderPokemons() {
        const {pokemons} = this.props    
        return pokemons.map(pokemon => (
            <Pokemon 
                key={pokemon.id} 
                pokemon={pokemon}>
            </Pokemon>
        ))           
    }
    
    render(){
        const {pokemons, isLoading, error} = this.props
        //console.log(pokemons)
        if (isLoading) return <p>Pokemons are loading...</p>;
        if (error) return <p>Error is happend</p>;
        return(
            <div className={styles.searchPanel}>
                {pokemons ? 
                    this.renderPokemons()                        
                    :
                    null
                }                    
            </div>
        )}
    }

const mapStateToProps = state => ({
    pokemons: state.all.pokemons,
    isLoading: state.all.isLoading,
    error: state.all.error,
  })
  
export default connect(mapStateToProps, null)(PokemonList);
