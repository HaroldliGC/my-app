import React, { Component } from "react";
import classNames from 'classnames/bind';
import styles from './LoginForm.css';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

export default class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.serializeObj = this.serializeObj.bind(this);
    }
    serializeObj(obj) {
        var result = [];
        for (var property in obj){
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        }
        return result.join("&");
    }

    handleClick(){
        const userAccount = document.getElementById("userAccount").value;
        const userPassword = document.getElementById("userPassword").value;
        /*
        let formData = new FormData();
        formData.append("grant_type","password");
        formData.append("username",userAccount);
        formData.append("password",userPassword);*/
        const data = {
            'grant_type': 'password',
            'username': userAccount,
            'password': userPassword,
        }
        const formData = this.serializeObj(data);
        this.props.search(formData,data);
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
}