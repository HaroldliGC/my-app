import React, { Component} from "react";
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './FunctionArea.css';
import classNames from 'classnames/bind';
import SetPagination from '../../../components/SetPagination';

import DeleteButton from './DeleteButton';
import OrderModal from './OrderModal';

const cx = classNames.bind(styles);

export default class FunctionArea extends Component{
    render(){
        return(
            <div className={cx({OrderFunctionArea:true})}>
                <OrderModal
                    Inf = {this.props.Inf}
                />
                <DeleteButton
                    index={this.props.Index}
                    handleInfItem={this.props.handleInfItem}
                    deleteOrder = {this.props.deleteOrder}
                    Inf={this.props.Inf}
                    uri="http://localhost:26800/api/BusinessOrders/DeleteBusinessOrder/"
                />
                <SetPagination
                    setPaginationNum={this.props.setPaginationNum}
                />
            </div>
        );
    }
}