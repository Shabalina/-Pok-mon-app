import React, { Component } from 'react';
import styles from './MiniPokyCard.module.css';

//mini pokemon card with restricted data as child in evolutionCard
//recives two props id of pokemon species and pokemon object with main pokemon data

class SpeciesCard extends Component {

    findTypes = () => {
        const {pokemon} = this.props
        let typeString = '';
        pokemon.types.forEach(function(type) {
            typeString += '' + type.type.name
        })
        return typeString
    }
    
    render(){
        const {id, pokemon} = this.props 
        console.log('in mini card', pokemon.name)
        return(
            <div className={`${styles.container} t-preview`}>
                <div>                                        
                    <img
                        src={ pokemon.sprites.front_default? pokemon.sprites.front_default : null}
                        alt={pokemon.name}
                    >
                    </img>
                    <p>#{id}</p>
                    <p>{pokemon.name}</p>
                    {    
                        pokemon.types.length ? 
                        <p>{this.findTypes()}</p>
                        :
                        <p>Has no types</p>
                    }
                    <p></p>
                    
                                 
                </div>
            </div>
        )
    }
}

export default SpeciesCard;
    