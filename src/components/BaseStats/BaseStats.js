import React, { Component} from 'react';
import styles from './BaseStats.module.css';

class BaseStats extends Component {

    state= {
        statArr:null
    }

    componentDidMount() {
        const {stats} = this.props
        let statArr=[]
        stats.forEach(function(elem){       
            switch (elem.stat.name.toString()){                
                case 'speed':
                    statArr.push({name:'Speed', val: elem.base_stat}) 
                    break;
                case 'special-defense':
                    statArr.push({name:'Sp. Def', val: elem.base_stat})
                    break;
                case 'special-attack':
                    statArr.push({name:'Sp. Atk', val: elem.base_stat})
                    break;
                case 'defense':
                    statArr.push({name:'Defense', val: elem.base_stat})
                    break;
                case 'attack':
                    statArr.push({name:'Attack', val: elem.base_stat})
                    break;
                case 'hp':
                    statArr.push({name:'HP', val: elem.base_stat})
                    break;
                default:
                    break
            }
        })
        this.setState({
            statArr: statArr.reverse()
        })
    }

    determColor(val){
        switch (true){
            case val < 34:
                return 'blue';
            case val < 67:
                return 'orange'
            case val < 101:
                return 'green'
            default:
                return 'red'
        }
    }

    render(){
        const {statArr} = this.state
        return(
            statArr ?
            <table>
                <tbody>
                {statArr.map(stat => {
                    let color = this.determColor(stat.val)
                    return(
                        <tr key={stat.name}>
                            <td style={{width: '15%'}}>{stat.name}</td>
                            <td 
                                style={{textAlign: 'center', width: '10%'}}
                                >{stat.val}
                            </td>
                            <td>
                            <div className={styles.bar_container}>
                                <div 
                                className={styles.bar} 
                                style={{ 
                                width: stat.val+ '%',
                                border: `2px solid ${color}`,
                                backgroundColor: `${color}`
                                      }}></div>
                            </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            :
            null       

        )
            
    }
}

export default BaseStats;