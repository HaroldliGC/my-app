import React, {Component} from "react";
import PropTypes from 'prop-types';

import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class DeleteButton extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.deleteOrder(this.props.Inf.Id,this.props.index);
        this.props.handleInfItem(0);
    }
    render(){
        return(
            <ButtonModal title="删除" type="danger" Click={this.handleClick}/>
        )
    }
}
DeleteButton.PropTypes = {
    handleInfItem : PropTypes.func,
    deleteOrder : PropTypes.func,
    index : PropTypes.number,
    Inf : PropTypes.number,
}