import React, { Component } from 'react';
import styles from './TypeList.module.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { filterRequest } from '../../modules/Load';
import { loadRequest } from '../../modules/Load';

class TypeList extends Component {    

    
    state={
        filterValue: 'none'
        }

    handleChange = (event) => {       
        const {filterValue} = this.state
        const {filterRequest, loadRequest} = this.props
        if (event.target.value !== filterValue){
            this.setState({
                filterValue: event.target.value
            })
            event.target.value !== 'none' 
            ? filterRequest(event.target.value)
            : loadRequest('https://pokeapi.co/api/v2/pokemon/?limit=20');            
        }
    }
      
    renderMenuItems(){
        const {typeList} = this.state
        return typeList.map(type => (
            <MenuItem 
                key={type}
                value={type}
                >
                {type}
            </MenuItem>
        ))
    }

    render(){
        const { types } =  this.props  
        const {filterValue} = this.state
        return(
            <div className={styles.container}>
                <Typography className={styles.title}>
                    Filter pokemons by type
                </Typography>
                <TextField
                    id="types"
                    select                  
                    name="types"
                    value={filterValue}
                    placeholder='Chose type'
                    onChange={this.handleChange}                 
                >
                   {   types.length
                        ? types.map(type => {
                            return (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>)
                          })
                        : null}    
                         <MenuItem key='none' value='none'>
                              none
                        </MenuItem>               
                </TextField>                     
            </div>
        )
    }
}

const mapDispatchToProps = {
    filterRequest,
    loadRequest
  }

export default connect( null, mapDispatchToProps)(TypeList);