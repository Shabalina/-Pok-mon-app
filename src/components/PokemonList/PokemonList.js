import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import { connect } from 'react-redux';

import styles from './PokemonList.module.css';

class PokemonList extends Component {

    state={
        pokemonList:[]
    }
   

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
        return(
            <div 
            className={styles.searchPanel}
            >
                {pokemons ? 
                    this.renderPokemons()                        
                    :
                    null
                }

                { isLoading ?
                 <p>Pokemons are loading...</p>  
                 :
                 null
                }
                { error ?
                <p>Error is happend</p>
                : null
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
