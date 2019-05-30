import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import {takeData} from './api.js';
import EvolutionCard from '../EvolutionCard';
import { connect } from 'react-redux';

import styles from './PokemonList.module.css';

class PokemonList extends Component {

    state={
        pokemonList:[],
        target: null,
        showPopup: false,
        specId: null,
        from: null,
        to: null
    }

    handlePokemonClick = (pokemon, event) =>{
        const { specId } = this.state
        this.setState({
            target: pokemon 
        })
        if (specId) {
            this.setState({
                target: pokemon,
                to: null,
                from: null,
                specId: null,    
            })
        }
        this.retrieveEvolutData(pokemon)
        this.showPopup()
    }

    retrieveEvolutData = (pokemon) => { 
        return takeData(pokemon.species.url)        
        .then(result => {            
            this.setState({                        
               specId: result.id
            })
            if (result.evolves_from_species){   
                let ancestObj = {}
                takeData(result.evolves_from_species.url)  
                .then(ancestor => {
                    ancestObj.id = ancestor.id
                    return (this.retrivePokemons(ancestor.varieties))
                })
                .then((pokemons) => {
                    ancestObj.pokemons = pokemons         
                    this.setState({                        
                        from: ancestObj
                    })
                })  
            } else{this.setState({from: 'none'})}
            
            if (result.evolution_chain){
                let descendObj = {}
                takeData(result.evolution_chain.url)  
                .then(chain => {
                    var descUrl = this.findDesc(chain.chain)
                    if (descUrl){
                        takeData(descUrl)
                        .then(descendant => {
                            descendObj.id = descendant.id
                            return (this.retrivePokemons(descendant.varieties))
                        })
                        .then((pokemons) => {
                            descendObj.pokemons = pokemons      
                            this.setState({    
                                to: descendObj
                            })
                        }) 
                    } else{this.setState({to: 'none' })}
                })
            }                     
        })
    }  

     
    showPopup = () => {
        const {showPopup} = this.state
        if (!showPopup){
            this.setState({
                showPopup: true
              });
        }        
    }

    closePopup = ()=>{
        this.setState({
            showPopup: false
          }); 
    }

    retrivePokemons = (varieties) => {
        return Promise.all(varieties.map(
            variant => takeData(variant.pokemon.url)))
            .then(pokemons => pokemons)            
    }
    
    findDesc(chainObj){
        const {target} = this.state        
        console.log(chainObj)
        if (chainObj.species.name === target.species.name){  
            return(
                chainObj.evolves_to[0] 
                ? chainObj.evolves_to[0].species.url
                : null   
            )                     
        } else {
            return (
                chainObj.evolves_to[0] 
                ? this.findDesc (chainObj.evolves_to[0])
                : null
            )
        }
    }
        
    renderEvolutionCard = () => {        
        const { specId, to, from} = this.state
        const {target} = this.state 
        let clickedPoky= {
            id: specId,
            pokemon: target
        }        
        console.log('res list',to, from, specId)
        return (
            <EvolutionCard 
                clickedPoky={clickedPoky}
                closePopup={this.closePopup}                
                to={to}
                from={from}
            />
        )
    }
   

    renderPokemons() {
        const {pokemons} = this.props   
        return pokemons.map(pokemon => (
            <Pokemon 
                key={pokemon.id} 
                pokemon={pokemon}
                onClick={this.handlePokemonClick.bind(null,pokemon)}
                >                
            </Pokemon>
        ))           
    }   
    
    
    render(){
        const {pokemons, isLoading, error} = this.props
        const {showPopup, to, from} = this.state
        return(
            <div 
            className={styles.container}
            >
                {pokemons ? 
                    this.renderPokemons()                        
                    :
                    null
                }

                { isLoading ?
                 <p className={styles.message}>
                     Pokémons are loading...
                </p>  
                 :
                 null
                }
                { error ?
                <p 
                    style={{color: 'red'}}
                    className={styles.message}
                    >
                    Error is happend {error.text}</p>
                : null
                } 
                {showPopup && to && from ? 
                this.renderEvolutionCard()
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
