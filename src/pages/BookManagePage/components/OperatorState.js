import React, {Component} from "react";
import PropTypes from 'prop-types';
import {MenuItem, DropdownButton} from 'react-bootstrap';

export default class OperatorStatus extends Component{
    handleClick(eventKey,event){
        //debugger
        var value = eventKey;
        //console.log(value);
        this.props.stateItem(value);
    }
    render(){
        return(
            <div>
                {"状态："}
                <DropdownButton title="正常/停止" onSelect={(eventKey,event)=>this.handleClick(eventKey,event)}>
                <MenuItem eventKey="all">全部</MenuItem>
                <MenuItem eventKey="正常">正常</MenuItem>
                <MenuItem eventKey="停止">停止</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}
OperatorStatus.PropTypes = {
    stateItem : PropTypes.func,
}