import React, { Component } from 'react';
import styles from './Pokemon.module.css';
import {takeData} from './api.js';
import EvolutionCard from '../EvolutionCard';


class Pokemon extends Component {

    state={
        showPopup: false,
        specId: null,
        from: null,
        to: null
    }
    

    handlePokemonClick = () =>{
        const { specId } = this.state
        if (specId) {
            this.setState({
                to: null,
                from: null,
                specId: null,    
            })
        }

        this.retrieveEvolutData()
        this.togglePopup()
    }



    retrieveEvolutData = () => {    
        const {pokemon} = this.props

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
           
    
    togglePopup = () => {
        const {showPopup} = this.state
        console.log(showPopup)
        this.setState({
          showPopup: !showPopup
        });
    }

    retrivePokemons = (varieties) => {
        return Promise.all(varieties.map(
                    variant => takeData(variant.pokemon.url)))
                    .then(pokemons => pokemons)            
    }
    
    findDesc(chainObj){
        const {pokemon} = this.props         
        if (chainObj.species.name === pokemon.species.name){           
            if (chainObj.evolves_to.length > 0) {
                return chainObj.evolves_to[0].species.url
            } else {
                return null
            }
        } else {
            return this.findDesc (chainObj.evolves_to[0])
        }
    }
        
    renderEvolutionCard = () => {        
        const { specId, to, from} = this.state
        const {pokemon} = this.props 
        let clickedPoky= {
            id: specId,
            pokemon: pokemon
        }        
        console.log('res list',to, from, specId)
        return (
            <EvolutionCard 
                clickedPoky={clickedPoky}
                closePopup={this.togglePopup}                
                to={to}
                from={from}
            />
        )}
    

    render(){
        const {pokemon} = this.props 
        const { showPopup, to, from } = this.state          
        return(
            <div className={`${styles.container} t-preview`}>
                <div>
                    <p>{pokemon.name}</p>                    
                    <img
                        src={ pokemon.sprites.front_default? pokemon.sprites.front_default : null}
                        alt={pokemon.name}
                        onClick={this.handlePokemonClick}
                    >
                    </img>                   
                                   
                </div>
                {showPopup && to && from ? 
                this.renderEvolutionCard()
                : null
                }
            </div>
        )
    }
}

export default Pokemon;
    