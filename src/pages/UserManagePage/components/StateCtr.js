import React, {Component} from "react";
import PropTypes from 'prop-types';

import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class StateCtr extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        let data = this.props.Inf;
        data.State = this.props.type;
        const uri = this.props.uri + data.Id;
        this.props.blockUpUser(uri,data,this.props.index);
        
    }
    render(){
        return(
            <ButtonModal title={this.props.title} type={this.props.type} Click={this.handleClick}/>
        )
    }

}

StateCtr.PropTypes = {
    uri : PropTypes.string,
    index : PropTypes.number,
    Inf : PropTypes.object,
    blockUpUser : PropTypes.func,
    title : PropTypes.string,
    type : PropTypes.string,
}