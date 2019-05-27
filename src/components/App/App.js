import React, { Component, Fragment } from 'react';
import TypeList from '../TypeList'
import PokemonList from '../PokemonList'
//import styles from './App.module.css';
import { connect } from 'react-redux';
import {loadTypes} from './api.js'
import { loadRequest } from '../../modules/Load';


class App extends Component {
    state={
        typeList: []
    }

componentDidMount() {    
    console.log('app mount')
    const { loadRequest } = this.props;
    loadRequest('https://pokeapi.co/api/v2/pokemon/?limit=20');
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

handleScroll = (ev) => {
    console.log("Scrolling!");
    const { next, loadRequest } = this.props
    let element = ev.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        console.log('end')
        console.log(next)
        if (next){
            loadRequest(next);
            // do something at end of scroll
        }
    }
      
}

render(){
    //const {pokemons, isLoading, error} = this.props
    const {typeList} = this.state
    const outterStyle = {
        width: '100%',
        height: '90%',
        overflowY: 'auto'
      }
    return(
        <Fragment>
            <TypeList 
            types={typeList}
            />
            <div
            style={outterStyle}
            onScroll={this.handleScroll}
            >
                
                <PokemonList/>
            </div>
        </Fragment>
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

  const mapStateToProps = state => ({
    next: state.all.next,
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);

