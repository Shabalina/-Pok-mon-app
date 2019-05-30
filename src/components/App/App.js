import React, { Component, Fragment } from 'react';
import TypeList from '../TypeList'
import PokemonList from '../PokemonList'
import styles from './App.module.css';
import { connect } from 'react-redux';
import {loadTypes} from './api.js'
import { loadRequest } from '../../modules/Load';


class App extends Component {
    state={
        typeList: []
    }

componentDidMount() {    
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
    const { next, loadRequest } = this.props
    let element = ev.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (next){
            loadRequest(next);
        }
    }
      
}

render(){
    const {typeList} = this.state

    return(
        <Fragment>
            <TypeList 
                types={typeList}
            />
            <div 
                className={styles.container}                
                onScroll={this.handleScroll}
            >              
                <PokemonList/>
            </div>
        </Fragment>
    )}
}
  const mapDispatchToProps = {
    loadRequest
  }

  const mapStateToProps = state => ({
    next: state.all.next,
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);

