import NotificationSystem from 'react-notification-system';
import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './BusinessPage.css';
import {initFormData,addOrder,deleteOrder,editOrder,clearOrderStore,initializationOrder} from '../actions/consts';
import {editOrderRequest,requstInitializationOrder,searchOrder,deleteOrderRequst,addOrderRequest} from '../actions/index';
import SearchBox from "../../../components/SearchBox/SearchBox";

import OrderList from '../components/OrderList';
import FunctionArea from '../components/FunctionArea';
import Header from '../../../components/Header/Header';

const cx = classNames.bind(styles);

class BusinessPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:1,
            paginationNum: 10,
            currentInfItem: 0,
            currentPath:'',
        };
        this.handlePagination = this.handlePagination.bind(this);
        this.handleInfItem = this.handleInfItem.bind(this);
        this.setPaginationNum = this.setPaginationNum.bind(this);
        this.updateCurrentPath = this.updateCurrentPath.bind(this);
    }
    updateCurrentPath(){
        const path = window.location.pathname;
        this.setState({ currentPath: path });
    }
    componentDidMount(){
        this.props.requstInitializationOrder();
    }
    componentWillReceiveProps(nextProps){
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
            title: '业务管理',
            message: message.content,
            level: mylevel
          })
          message.content = '';
          message.type = '';
        }
    }
    handleInfItem(index) {
        let infItem = parseInt(index, 0);
        this.setState({ currentInfItem: infItem });
    }
    setPaginationNum(num) {
        let newNum = parseInt(num, 0);
        this.setState({ paginationNum: newNum });
    }
    handlePagination(num) {
        let pageNum = parseInt(num, 0);
        this.setState({ page: pageNum });
      }
    render(){
        const searchItemIds = ["UserName","BookName"];
        const searchItemNames = ["姓名","书名"];
        return(
            <div>
                <NotificationSystem ref={(c) => (this.notificationSystem = c)} />
                <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
                <div className={cx({appBody3:true})}>
                    <div className={cx({appHead3:true})}>
                        <SearchBox
                        itemIds={searchItemIds}
                        itemNames={searchItemNames}
                        search={this.props.searchOrder}
                        Title="order"
                        />
                    </div>
                    <FunctionArea
                        Index={this.state.currentInfItem}
                        Inf={this.props.inf[this.state.currentInfItem]}
                        handleInfItem={this.handleInfItem}
                        deleteOrder={this.props.deleteOrderRequst}
                        setPaginationNum={this.setPaginationNum}
                        initFormData={this.props.onInitFormData}
                        addOrderRequest={this.props.addOrderRequest}
                        editOrderRequest={this.props.editOrderRequest}
                    />
                    <hr/>
                    <OrderList
                        Inf={this.props.inf}
                        pageIndex={this.state.page}
                        handleInfItem={this.handleInfItem}

                        handlePagination={this.handlePagination}
                        paginationNum={this.state.paginationNum}
                        currentItem={this.state.currentInfItem}
                    />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
      inf: state.present.OperateOrder.orders,
      messages: state.present.OperateOrder.messages,
      pastLength : state.past.length,
      futureLength : state.future.length,
    }
}
function mapDispatchToProps(dispatch){
    return{
        addOrder : (text) => dispatch(addOrder(text)),
        deleteOrder : (index) => dispatch(deleteOrder(index)),
        editOrder : (text,index) => dispatch(editOrder(text,index)),
        clearOrderStore : () => dispatch(clearOrderStore()),
        initializationOrder : (data) => dispatch(initializationOrder(data)),
        onInitFormData: (data) => dispatch(initFormData(data)),
        editOrderRequest : (orderId, index) => dispatch(editOrderRequest(orderId, index)),

        requstInitializationOrder : () => dispatch(requstInitializationOrder()),
        searchOrder : (uri) => dispatch(searchOrder(uri)),
        deleteOrderRequst : (orderId,index) => dispatch(deleteOrderRequst(orderId,index)),
        addOrderRequest : (formData) => dispatch(addOrderRequest(formData)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);