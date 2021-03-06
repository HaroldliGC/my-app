import React, { Component} from "react";
//import PropTypes from 'prop-types';
//import { Grid, Row, Col } from 'react-bootstrap';
import styles from './FunctionArea.css';
import classNames from 'classnames/bind';
import SetPagination from '../../../components/SetPagination';

import DeleteButton from './DeleteButton';
import OrderModal from './OrderModal';
import ReturnBook from './ReturnBook';

import {BORROW_BOOK} from '../../../common/OperateKeys';
import OrderPanel from '../../../components/ReduxForm/OrderPanel';

const cx = classNames.bind(styles);

export default class FunctionArea extends Component{
    render(){
        return(
            <div className={cx({OrderFunctionArea:true})}>
            
                <OrderPanel
                    inputType = {BORROW_BOOK}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                    todo = {this.props.addOrderRequest}
                />
                <ReturnBook
                    index={this.props.Index}
                    todo = {this.props.editOrderRequest}
                    Inf = {this.props.Inf}
                />
            
                <OrderModal
                    Inf = {this.props.Inf}
                />
                <DeleteButton
                    index={this.props.Index}
                    handleInfItem={this.props.handleInfItem}
                    deleteOrder = {this.props.deleteOrder}
                    Inf={this.props.Inf}
                />
                <SetPagination
                    setPaginationNum={this.props.setPaginationNum}
                />
            </div>
        );
    }
}