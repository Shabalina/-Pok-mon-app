import React, { Component } from 'react';
import styles from './TypeList.module.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { filterRequest } from '../../actions/filterActions';
import { loadRequest } from '../../actions/loadActions';

class TypeList extends Component {

    /*state={

        filterValue: 'none'
    }   */

    constructor(props) {
        super(props);
        console.log("CONSTRUCT")
        this.state={
            filterValue: 'none'
        }
    }    

    handleChange = (event) => {       
        const {filterValue} = this.state
        const {filterRequest, loadRequest} = this.props
        console.log(event.target.value) 
        if (event.target.value !== filterValue){
            this.setState({
                filterValue: event.target.value
            })
            event.target.value !== 'none' 
            ? filterRequest(event.target.value)
            : loadRequest();            
        }
    }
      
    renderMenuItems(){
        const {typeList} = this.state
        return typeList.map(type => (
            <MenuItem 
                key={type}
                value={type}
                //onClick={this.handleClick}
                >
                {type}
            </MenuItem>
        ))
    }

    render(){
        const { types } =  this.props  
        const {filterValue} = this.state
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
                    value={filterValue}
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