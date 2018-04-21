import React, {Component} from "react";
import PropTypes from 'prop-types';
import {STOP_USER, RECOVER_USER, RESET_PASSWORD} from '../../../common/OperateKeys';

import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class StateCtr extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleOption = this.handleOption.bind(this);
    }
    handleClick(){
        if (this.props.type !== RESET_PASSWORD){
            let temp = JSON.stringify(this.props.Inf);
            let data = JSON.parse(temp);
            switch(this.props.type){
                case STOP_USER:
                    data.State = "stop";
                    break;
                case RECOVER_USER:
                    data.State = "normal";
                    break;
                default:
                    data.State = "default_state";
            }
            const uri = this.props.uri + data.Id;
            this.props.todo(uri,data,this.props.index);
        } else {
            const uri = `${this.props.uri}${this.props.Inf.Id}`;
            this.props.todo(uri,this.props.index);
        } 
    }
    handleOption(option){
        let type = '';
        switch(option){
            case STOP_USER:
                type = "danger";
                break;
            default:
                type = "normal";
        }
        return type;
    }
    render(){
        const type = this.handleOption(this.props.type)
        return(
            <ButtonModal title={this.props.title} type={type} Click={this.handleClick}/>
        )
    }

}

StateCtr.PropTypes = {
    uri : PropTypes.string,
    index : PropTypes.number,
    Inf : PropTypes.object,
    todo : PropTypes.func,
    title : PropTypes.string,
    type : PropTypes.string,
}