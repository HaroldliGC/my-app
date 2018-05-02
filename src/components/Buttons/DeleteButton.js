import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./Buttons.css";

const cx = classNames.bind(styles);

export default class DeleteButton extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.deleteBook(this.props.Inf.Id,this.props.index);
        this.props.handleInfItem(0);
    }
    render(){
        return(
            <button onClick={this.handleClick} className={cx({deleteButton:true,functionButton:true})}>删除</button>
        )
    }
}

DeleteButton.PropTypes = {
    handleInfItem : PropTypes.func,
    deleteBook : PropTypes.func,
    index : PropTypes.number,
    Inf : PropTypes.number,
}