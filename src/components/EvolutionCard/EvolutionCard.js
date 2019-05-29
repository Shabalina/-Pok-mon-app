import React, { Component } from 'react';
import MiniPokyCard from '../MiniPokyCard'
import styles from './EvolutionCard.module.css';

//evolution card with mini cards of clicked pokemon, his parent and children
//recive 3 props clicked pokemon object, 
//parent object and childrens list of objects


class EvolutionCard extends Component {
    

    renderMiniCards = (pokemon, id) => {
        
            return(
                <MiniPokyCard
                        id={id}
                        pokemon={pokemon}
                />)}

    render(){
        const {clickedPoky, to,from, closePopup } = this.props
        console.log('Evolut card')
        return(
            <div className={styles.popup}>
            <button onClick={closePopup}>close evolution card</button>
                <div className={styles.popup_inner}>                
                    <div className={styles.column}>
                        <p>Evolve from</p>
                        {from !== 'none' ? 
                        
                        from.pokemons.map(pokemon => {
                            return(
                                <MiniPokyCard
                                    id = {from.id}
                                    pokemon = {pokemon}                    
                                />
                            )
                        })
                        :
                        <p>Has no ancestor</p>
                        }
                    </div>
                    <div className={styles.column}>
                        <p>Species</p>
                        <MiniPokyCard
                        id = {clickedPoky.id}
                        pokemon = {clickedPoky.pokemon}                    
                        />
                    </div>
                    <div className={styles.column}>
                        <p>Evolve to</p>
                        {                            
                        to !== 'none' ?                         
                        to.pokemons.map(pokemon => {
                            return(
                                <MiniPokyCard
                                    id = {to.id}
                                    pokemon = {pokemon}                    
                                />
                            )
                        })
                        :
                        <p>Has no descendants</p>
                        }
                    </div>                    
                </div>
            </div>
        )
    }
}

export default EvolutionCard;