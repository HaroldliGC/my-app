import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Image } from 'react-bootstrap';
import styles from './LoginPage.css';
import loginImage1 from '../images/loginImage1.jpeg';
import logo from '../images/logo.png';
import { requstLogin } from '../actions/index';

import LoginForm from '../components/LoginForm';

const cx = classNames.bind(styles);

class LoginPage extends Component{
    render(){
        return(
            <div className={cx({loginBody: true})}>
                <div className={cx({leftImage: true})}>
                    <Image src={loginImage1}/>
                </div>
                <div className={cx({rightPanel: true})}>
                    <Image src={logo} responsive className={cx({logo: true})}/>
                    <LoginForm 
                        search={this.props.requstLogin}
                        uri="http://localhost:26800/api/ReaderUsers/getreaderuserlogin/"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        inf: state,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        requstLogin: (uri) => dispatch(requstLogin(uri)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);