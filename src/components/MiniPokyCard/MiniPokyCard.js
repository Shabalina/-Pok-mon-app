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
        return(
            <div className={styles.container}>
                <div className={styles.card}>                                        
                    <img
                        src={ pokemon.sprites.front_default? pokemon.sprites.front_default : null}
                        alt={pokemon.name}
                    >
                    </img>
                    <p style={{color:'#777879'}}>#{id}</p>
                    <p style={{color:'blue', fontWeight: 'bold'}}>{pokemon.name}</p>
                    {    
                        pokemon.types.length ? 
                        <p style={{color:'#cea502', fontWeight: 'bold'}}>{this.findTypes()}</p>
                        :
                        <p>Has no types</p>
                    }            
                </div>
            </div>
        )
    }
}

export default SpeciesCard;
    