import React, { Component } from 'react';
import styles from './Pokemon.module.css';
import {takeSpecies} from './api.js'

class Pokemon extends Component {

    state={
        from: null,
        to: []
    }

    handlePokemonClick =() =>{
        const {pokemon} = this.props
        takeSpecies(pokemon.species.url)        
        .then(result => {
            if (result.evolves_from_species){                
                takeSpecies(result.evolves_from_species.url)  
                .then(ancest => {                    
                    this.setState({                        
                        from: ancest
                    })
                })  
            }
            
            if (result.evolution_chain){                
                takeSpecies(result.evolution_chain.url)  
                .then(chain => {
                    var descUrl = this.findDesc(chain.chain.evolves_to)
                    return Promise.all(
                        descUrl.map(
                            url =>takeSpecies(url)))
                    })
                    .then(descen => this.setState({
                        to: descen
                        })
                    )                                  
                }     
        })
    }         
    
    findDesc(descArr){

        var res = [];
        req(descArr)
        function req (parentArr){
            parentArr.forEach(function(elem){
             if (elem.evolves_to.length > 0){
                 req(elem.evolves_to)
             }
             else {
                 res.push(elem.species.url)
                }  
            })
        }
        //console.log(res)
        return res
    }
    

    render(){
        const {pokemon} = this.props 
        const { from, to } = this.state  
        if (to.length) {
            to.forEach(function(desc){
                console.log(desc)
            })
        }
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
                    { from ?
                    <p>
                        ancestor: {from.name} | 
                        varieties: {from.varieties.length}
                    </p>
                    : null
                    }
                    {to.length ?
                    to.map(descend => {
                        return( 
                            <p key={descend.name}>
                                descendant: {descend.name} | 
                                varieties: {descend.varieties.length}
                            </p>                            
                            )
                        })
                    : <p>no desc</p>
                    }                  
                </div>
            </div>
        )
    }
}

export default Pokemon;
    