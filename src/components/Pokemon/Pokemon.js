import React, { Component } from 'react';
import styles from './Pokemon.module.css';
import {takeData} from './api.js';
import EvolutionCard from '../EvolutionCard';
import BaseStats from '../BaseStats';


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
        console.log(chainObj)
        console.log(pokemon.species.name)
        if (chainObj.species.name === pokemon.species.name){  
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

    addPad(n, length) {
        var len = length - (''+n).length;
        return (len > 0 ? new Array(++len).join('0') : '') + n
    }
    

    render(){
        const {pokemon} = this.props 
        const { showPopup, to, from } = this.state          
        return(
        <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.avatar}>
                        <img
                            className={styles.avatar_img}
                            src={ pokemon.sprites.front_default 
                                ? pokemon.sprites.front_default 
                                : null}
                            alt={pokemon.name}
                            onClick={this.handlePokemonClick}
                        >
                        </img>
                    </div>
                    <div className={styles.mainData}>
                        <h4 className={styles.title}>Pokédex data</h4> 
                        <table> 
                        <tbody>                                                 
                            <tr>
                                <td>National №</td>
                                <td style={{fontWeight: 'bold'}}>{this.addPad(pokemon.id, 3)}</td>                            
                            </tr>   
                            <tr>
                                <td>Species</td>
                                <td>{pokemon.species.name}</td>                            
                            </tr>  
                            <tr>
                                <td>Height</td>
                                <td>( {(parseInt(pokemon.height) /10)} m)</td>                            
                            </tr> 
                            <tr>
                                <td>Weight</td>
                                <td>
                                    {Math.round((parseInt(pokemon.weight)/4.5359237) *10) /10}
                                    lbs ({
                                    Math.round((parseInt(pokemon.weight) /10) *10 ) / 10 
                                    } kg)
                                </td>                            
                            </tr>  
                            <tr>
                                <td>Abilities</td>                            
                                <td>
                                    {pokemon.abilities.map((ability, ind)=>{
                                    let add =
                                    ability.is_hidden
                                    ? '(hidden)'
                                    : ''
                                    return (
                                        <p 
                                            key={ind}
                                            style={{color: 'blue'}}
                                        >
                                            {ability.ability.name} {add}
                                        </p>
                                        )}
                                    )}
                                </td>                            
                            </tr>    
                            </tbody>              
                        </table>
                    </div>         
                </div>
                <div className={styles.stat}>
                    <h4 className={styles.title_stats}>Base stats</h4>
                    <BaseStats
                        stats={pokemon.stats}
                    />
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
    