import React, { Component } from "react";
import NotificationSystem from 'react-notification-system';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {initBookByNumber, initBookByReview} from '../actions/consts';
import {getBookByNumber,getBookByReview} from '../actions/index';

import Header from '../../../components/Header/Header';
import BookByNumberCharts from '../components/BookByNumberCharts';
import BookByReviewCharts from '../components/BookByReviewCharts';
import classNames from 'classnames/bind';

import styles from './AnalysisPage.css';

const cx = classNames.bind(styles);

class AnalysisPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPath:'',
        };
        this.updateCurrentPath = this.updateCurrentPath.bind(this);
    }
    componentDidMount(){
        this.props.getBookByNumber(`api/Analysis/GetBookByNumber`);
        this.props.getBookByReview(`api/Analysis/GetBookByReview`);
    }
    updateCurrentPath(){
        const path = window.location.pathname;
        this.setState({ currentPath: path });
    }

    render(){
        return(
            <div>
                <NotificationSystem ref={(c) => (this.notificationSystem = c)} />
                <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
                <div className={cx({appBody4:true})}>
                    <BookByNumberCharts
                        Inf={this.props.bookByNumber}
                    />
                    <BookByReviewCharts
                        Inf={this.props.bookByReview}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookByNumber: state.present.OperateAnalysis.bookByNumber,
        bookByReview: state.present.OperateAnalysis.bookByReview,
        messages: state.present.OperateAnalysis.messages
    }
}

function mapDispatchToProps(dispatch) {
    return{
        initBookByNumber: (data) => dispatch(initBookByNumber(data)),
        initBookByReview: (data) => dispatch(initBookByReview(data)),

        getBookByNumber: (uri) => dispatch(getBookByNumber(uri)),
        getBookByReview: (uri) => dispatch(getBookByReview(uri)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisPage);