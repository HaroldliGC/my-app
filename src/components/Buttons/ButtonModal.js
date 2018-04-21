import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Buttons.css';

const cx = classNames.bind(styles);

export default class ButtonModal extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleOption = this.handleOption.bind(this);
    }
    handleClick(){
        this.props.Click();
    }
    handleOption(option){
        const type = {
            normal : false,
            danger : false,
            search : false
        }
        switch(option){
            case 'normal':
                type.normal = true;
                break;
            case 'danger':
                type.danger = true;
                break;
            case 'search':
                type.search = true;
                break;
            default:
        }
        return type;
    }
    render(){
        const type = this.handleOption(this.props.type);
        return(
            <button className={cx({functionButton:true,normalButton:type.normal,deleteButton:type.danger,searchButton:type.search})} onClick={this.handleClick}>
                {this.props.title}
            </button>
        );

    }
}

ButtonModal.PropTypes = {
    title : PropTypes.string,
    type  : PropTypes.string,
    Click : PropTypes.func,
}