import React, { Component } from 'react';
import styles from './TypeList.module.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { filterRequest } from '../../actions/filterActions';
import { loadRequest } from '../../actions/loadActions';

class TypeList extends Component {

    state={

        filterValue: 'none',
        isFilter: false
    }   
    

    handleChange = (event) => {
        console.log(event.target.value)        
        const { filterValue, isFilter} =  this.state  
        console.log(filterValue, isFilter)
        if (filterValue !== event.target.value) {
            console.log('under if') 
            this.setState({
                filterValue: event.target.value
            })
            event.target.value !== 'none' ?
            this.applyFilter(event.target.value)
            :
            this.clearFilter();     
        }
    }

    applyFilter = (type) => {
        const {filterRequest} = this.props 
        //console.log(filterValue)
        filterRequest(type);
        this.setState({
            isFilter: true
        })
    }

    clearFilter = () => {
        console.log('clear filter')
        const { isFilter } = this.state
        if (isFilter) {
            loadRequest();
            this.setState({
                isFilter: false,
                filterValue: ''
            })
        }
    }
      
    renderMenuItems(){
        const {typeList} = this.state
        return typeList.map(type => (
            <MenuItem 
                key={type}
                value={type}
                onClick={this.handleClick}
                >
                {type}
            </MenuItem>
        ))
    }

    render(){
        const { types } =  this.props  
        console.log(types)
        return(
            <div className={styles.container}>
                <Typography className={styles.grow}>
                    Filter pokemons by type
                </Typography>
                <TextField
                    id="types"
                    select                  
                    name="types"
                    value={types}
                    placeholder="Chose type"
                    onChange={this.handleChange} 
                    className={styles.textField}                  
                >
                   {   types.length !== 0
                        //? addressList.filter(this.addressFilter(address.from))
                        ? types.map(type => {
                            return (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>)
                          })
                        : null}    
                         <MenuItem key='none' value='none'>
                              clear filter
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