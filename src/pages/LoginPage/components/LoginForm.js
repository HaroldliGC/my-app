import React, { Component } from "react";
import classNames from 'classnames/bind';
import styles from './LoginForm.css';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const userAccount = encodeURIComponent(document.getElementById("userAccount").value);
        const userPassword = encodeURIComponent(document.getElementById("userPassword").value);
        const userSign =  encodeURIComponent(document.getElementById("userSign").value);
        const data = "?userAccount"+"="+userAccount+"&userPassword"+"="+userPassword+"&userSign"+"="+userSign;
        const url = this.props.uri + data;
        this.props.search(url);
    }
    render(){
        return(
            <div>
                <div className={cx({formContainer: true})}>
                    <div className={cx({inputContainer: true})}>
                        <input
                            className={cx({fieldInput: true})}
                            name="name"
                            type="text"
                            placeholder="name"
                            id="userAccount"
                        >
                        </input>
                    </div>
                    <div className={cx({inputContainer: true})}>
                        <input
                            className={cx({fieldInput: true})}
                            name="password"
                            type="password"
                            placeholder="password"
                            id="userPassword"
                        >
                        </input>
                    </div>
                    <div className={cx({inputContainer: true})}>
                        <input
                            className={cx({fieldInput: true})}
                            name="sign"
                            type="text"
                            placeholder="sign"
                            id="userSign"
                        >
                        </input>
                    </div>
                    <div className={cx({inputContainer: true})}>
                        <button
                            className={cx({loginButton: true})}
                            name="login"
                            onClick = {this.handleClick}
                        >
                        登陆
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

LoginForm.PropTypes = {
    search : PropTypes.func,
    uri : PropTypes.string,
}