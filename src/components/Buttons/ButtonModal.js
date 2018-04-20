import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Buttons.css';

const cx = classNames.bind(styles);

export default class ButtonModal extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.Click();
    }
    render(){
        let normal0 = this.props.type === "normal";
        let delete0 = (this.props.type === "delete" || this.props.type === "stop");
        let search0 = this.props.type === "search";
        return(
            <button className={cx({functionButton:true,normalButton:normal0,deleteButton:delete0,searchButton:search0})} onClick={this.handleClick}>
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