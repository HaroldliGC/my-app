import React, { Component} from "react";
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './FunctionArea.css';
import classNames from 'classnames/bind';

import SetPagination from '../../../components/SetPagination';
import UserInfModal from './UserInfModal';
import StateCtr from './StateCtr';

const cx = classNames.bind(styles);

export default class FunctionArea extends Component{
    render(){
        return(
            <div className={cx({UserFunctionArea:true})}>
                <UserInfModal
                    Inf = {this.props.Inf}
                />
                <StateCtr
                    title="停用"
                    type = "stop"
                    Inf = {this.props.Inf}
                    index = {this.props.Index}
                    blockUpUser = {this.props.blockUpUser}
                    uri = "http://localhost:26800/api/ReaderUsers/putreaderuser/"
                />
                <StateCtr
                    title="恢复"
                    type = "normal"
                    Inf = {this.props.Inf}
                    index = {this.props.Index}
                    blockUpUser = {this.props.blockUpUser}
                    uri = "http://localhost:26800/api/ReaderUsers/putreaderuser/"
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
    Index : PropTypes.number,
}