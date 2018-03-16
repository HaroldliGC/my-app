import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem} from 'react-bootstrap';

export default class SetPagination extends Component{
    constructor(props){
        super(props);
        this.state = {
            colNum : 10
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(eventKey,event){
        //debugger
        var value = eventKey;
        //console.log(value);
        this.setState({colNum:value});
        this.props.setPaginationNum(value);
    }
    render(){
        return(
            <div>
                {"分页数："}
                <DropdownButton title={this.state.colNum} onSelect={(eventKey,event)=>this.handleClick(eventKey,event)}>
                <MenuItem eventKey="10">10</MenuItem>
                <MenuItem eventKey="20">20</MenuItem>
                <MenuItem eventKey="50">50</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

SetPagination.PropTypes = {
    setPaginationNum : PropTypes.func,
}