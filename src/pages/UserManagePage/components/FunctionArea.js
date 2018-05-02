import React, { Component} from "react";
import PropTypes from 'prop-types';
import styles from './FunctionArea.css';
import classNames from 'classnames/bind';

import SetPagination from '../../../components/SetPagination';
import StateCtr from './StateCtr';
import {STOP_USER, RECOVER_USER, RESET_PASSWORD} from '../../../common/OperateKeys';

import {NEW_USER,DETAIL_USER} from '../../../common/OperateKeys';
import UserPanel from '../../../components/ReduxForm/UserPanel';

const cx = classNames.bind(styles);

export default class FunctionArea extends Component{
    render(){
        return(
            <div className={cx({UserFunctionArea:true})}>
                <UserPanel
                    inputType = {NEW_USER}
                    todo = {this.props.createAccount}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                />
                <UserPanel
                    inputType = {DETAIL_USER}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                />
                {/*
                <UserInfModal
                    Inf = {this.props.Inf}
                />*/}
                <StateCtr
                    title="重置密码"
                    type = {RESET_PASSWORD}
                    Inf = {this.props.Inf}
                    index = {this.props.Index}
                    todo = {this.props.resetPassword}
                />
                <StateCtr
                    title="停用"
                    type = {STOP_USER}
                    Inf = {this.props.Inf}
                    index = {this.props.Index}
                    todo = {this.props.blockUpUser}
                />
                <StateCtr
                    title="恢复"
                    type = {RECOVER_USER}
                    Inf = {this.props.Inf}
                    index = {this.props.Index}
                    todo = {this.props.blockUpUser}
                />
                <SetPagination
                    setPaginationNum={this.props.setPaginationNum}
                />
            </div>

        );
    }
}

FunctionArea.PropTypes = {
    Inf : PropTypes.object,
    etPaginationNum : PropTypes.func,
    blockUpUser : PropTypes.func,
    resetPassword : PropTypes.func,
    initFormData : PropTypes.func,
    createAccount : PropTypes.func,
    Index : PropTypes.number,
}