import React, { Component } from 'react';
import styles from './Pokemon.module.css';

class Pokemon extends Component {

    render(){
        const {pokemon} = this.props   
        return(
            <div className={`${styles.container} t-preview`}>
                <div>
                    <p>{pokemon.name}</p>                    
                    <img
                        src={ pokemon.sprites.front_default? pokemon.sprites.front_default : null}
                        alt={pokemon.name}
                    >
                    </img>
                </div>
                
            </div>
        )
    }
}

export default Pokemon;
    