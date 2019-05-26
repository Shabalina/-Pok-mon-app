import React, { Component } from 'react';
import TypeList from '../TypeList'
import Pokemon from '../Pokemon'
import styles from './App.module.css';
import { connect } from 'react-redux';
import {loadTypes} from '../../api.js'
import { loadRequest } from '../../actions/loadActions';


class App extends Component {
    state={
        typeList: []
    }

componentDidMount() {    
    const { loadRequest } = this.props;
    loadRequest();
    loadTypes()        
    .then(types => {
        return (
            this.setState({ 
                typeList: types.map(type => type.name)
            })
        )                         
    })
    .catch(error => {
        console.log(error);
    })  
}




renderPokemons() {
    const {pokemons} = this.props    
    return pokemons.map(pokemon => (
        <Pokemon 
            key={pokemon.id} 
            pokemon={pokemon}>
        </Pokemon>
    ))           
}

render(){
    const {pokemons, isLoading, error} = this.props
    const {typeList} = this.state
    //console.log(pokemons)
    if (isLoading) return <p>Pokemons are loading...</p>;
    if (error) return <p>Error is happend</p>;
    return(
        <div>
            <TypeList types={typeList}/>
            <div className={styles.searchPanel}>
                {pokemons ? 
                    this.renderPokemons()                        
                    :
                    null
                }
                
            </div>
        </div>
    )}
}

const mapStateToProps = state => ({
    pokemons: state.all.pokemons,
    isLoading: state.all.isLoading,
    error: state.all.error,
  })
  
  
  const mapDispatchToProps = {
    loadRequest
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);

