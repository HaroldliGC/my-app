import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Image } from 'react-bootstrap';
import styles from './LoginPage.css';
import loginImage1 from '../images/timg3.jpg';
import logo from '../images/logo.png';
import { loginAction ,requstLogin } from '../actions/index';

import LoginForm from '../components/LoginForm';

const cx = classNames.bind(styles);

class LoginPage extends Component{
    render(){
        console.log("inf:",this.props.inf)
        const isFailed = (this.props.inf === 'failed');
        console.log("signal",isFailed)
        return(
            <div className={cx({loginBody: true})}>
                <div className={cx({leftImage: true})}>
                    <Image src={loginImage1}/>
                </div>
                <div className={cx({rightPanel: true})}>
                    <Image src={logo} responsive className={cx({logo: true})}/>
                    <LoginForm 
                        search={this.props.requstLogin}
                    />
                    {isFailed &&
                    <div className={cx({inputContainer: true})}>
                        <div className={cx({errorMessage: true})}>用户名或密码错误</div>
                    </div>}
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        inf: state.present.OperateLogin[0]
    }
}

function mapDispatchToProps(dispatch) {
    return{
        requstLogin: (data,formData) => dispatch(requstLogin(data,formData)),
        loginAction: (str) => dispatch(loginAction(str)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);