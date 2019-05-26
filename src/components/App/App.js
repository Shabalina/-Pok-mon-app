import React, { Component } from 'react';
import TypeList from '../TypeList'
import PokemonList from '../PokemonList'
//import styles from './App.module.css';
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

render(){
    //const {pokemons, isLoading, error} = this.props
    const {typeList} = this.state
    return(
        <div>
            <TypeList types={typeList}/>
            <PokemonList/>
        </div>
    )}
}

/*const mapStateToProps = state => ({
    pokemons: state.all.pokemons,
    isLoading: state.all.isLoading,
    error: state.all.error,
  })*/
  
  
  const mapDispatchToProps = {
    loadRequest
  }

export default connect(null, mapDispatchToProps)(App);

