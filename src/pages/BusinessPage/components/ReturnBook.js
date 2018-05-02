import React, {Component} from "react";
import PropTypes from 'prop-types';

import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class ReturnBook extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.todo(this.props.Inf.Id,this.props.index);
    }
    render(){
        return(
            <ButtonModal title="还书" type="normal" Click={this.handleClick}/>
        )
    }
}

ReturnBook.PropTypes = {
    index : PropTypes.number,
    todo : PropTypes.func,
    Inf : PropTypes.object
}