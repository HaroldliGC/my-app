import React, { Component } from "react";
import NotificationSystem from 'react-notification-system';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {initBookByAllNumber, initBookByNumber, initBookByReview} from '../actions/consts';
import {getBookByNumber,getBookByReview,getAllBook} from '../actions/index';

import Header from '../../../components/Header/Header';
import BookByNumberCharts from '../components/BookByNumberCharts';
import BookByReviewCharts from '../components/BookByReviewCharts';
import BookByAllCharts from '../components/BookByAllCharts';
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
        this.props.getBookByNumber();
        this.props.getBookByReview();
        this.props.getAllBook();
    }
    updateCurrentPath(){
        const path = window.location.pathname;
        this.setState({ currentPath: path });
    }
    componentWillReceiveProps(nextProps){
        //debugger
        if (nextProps.messages.content !== ''){
          const message = nextProps.messages;
          let mylevel = '';
          switch(message.type){
            case 'success':
              mylevel = 'success';
              break;
            case 'error':
              mylevel = 'error';
              break;
            default:
              mylevel = 'info';
          }
          this.notificationSystem.addNotification({
            title: '业务分析',
            message: message.content,
            level: mylevel
          })
          message.content = '';
          message.type = '';
        }
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
                    <BookByAllCharts
                        Inf={this.props.bookByAll}
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
        bookByAll: state.present.OperateAnalysis.bookByAll,
        messages: state.present.OperateAnalysis.messages
    }
}

function mapDispatchToProps(dispatch) {
    return{
        initBookByNumber: (data) => dispatch(initBookByNumber(data)),
        initBookByReview: (data) => dispatch(initBookByReview(data)),
        initBookByAllNumber: (data) => dispatch(initBookByAllNumber(data)),

        getBookByNumber: () => dispatch(getBookByNumber()),
        getBookByReview: () => dispatch(getBookByReview()),
        getAllBook: () => dispatch(getAllBook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisPage);