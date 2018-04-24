import React, {Component} from "react";
import PropTypes from 'prop-types';

import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class ReturnBook extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const url = `${this.props.uri}${this.props.Inf.Id}`;
        this.props.todo(url,this.props.index);
    }
    render(){
        return(
            <ButtonModal title="还书" type="normal" Click={this.handleClick}/>
        )
    }
}

ReturnBook.PropTypes = {
    uri : PropTypes.string,
    index : PropTypes.number,
    todo : PropTypes.func,
    Inf : PropTypes.object
}