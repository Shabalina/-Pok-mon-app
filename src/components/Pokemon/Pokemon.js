import React, { PureComponent } from 'react';
import styles from './Pokemon.module.css';
import BaseStats from '../BaseStats';

//const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080']

class Pokemon extends PureComponent {

    addPad(n, length) {
        var len = length - (''+n).length;
        return (len > 0 ? new Array(++len).join('0') : '') + n
    }
    /*
    getRandomColor() {
      return colors[Math.floor(Math.random()*colors.length)]  
    }*/

    toFeet (n) {
        var realFeet = (n*3.28);
        var wholeFeet = Math.floor(realFeet);
        var inches = (realFeet-wholeFeet) *12
        var wholeInches = this.addPad(Math.round(inches), 2)
        return wholeFeet + "'" + wholeInches + "'' ";
      }
    

    render(){
        const {pokemon, onClick} = this.props          
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
                            onClick={onClick}
                        >
                        </img>
                    </div>
                    <div className={styles.mainData}>
                        <h4 className={styles.title}>Pokédex data</h4> 
                        <table> 
                        <tbody>                                                 
                            <tr>
                                <td>National №</td>
                                <td style={{fontWeight: 'bold'}}>
                                 {this.addPad(pokemon.id, 3)}
                                </td>                            
                            </tr>   
                            <tr>
                                <td>Type</td>
                                <td style={{display: 'inline-flex'}}>
                                    {
                                        pokemon.types.map((type, ind)=>{
                                        return (
                                            <div 
                                                key={ind}
                                                className={styles.typeBox}                                                
                                            >
                                                {type.type.name}
                                            </div>
                                            )
                                        })
                                    }
                                </td>                            
                            </tr> 
                            <tr>
                                <td>Species</td>
                                <td>{pokemon.species.name}</td>                            
                            </tr>  
                            <tr>
                                <td>Height</td>
                                <td>{this.toFeet(parseInt(pokemon.height) /10)}
                                    ({(parseInt(pokemon.height) /10)} m)
                                </td>                            
                            </tr> 
                            <tr>
                                <td>Weight</td>
                                <td>
                                    {Math.round((
                                        parseInt(pokemon.weight)/4.5359237
                                        ) *10) /10 }
                                    lbs ({
                                    Math.round((
                                        parseInt(pokemon.weight) /10
                                        ) *10 ) / 10 } 
                                    kg)
                                </td>                            
                            </tr>  
                            <tr>
                                <td>Abilities</td>                            
                                <td>
                                {
                                    pokemon.abilities.map((ability, ind)=>{
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
                                            )
                                        })
                                    }
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
            </div>
        )
    }
}

export default Pokemon;
    