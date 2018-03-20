import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './BusinessPage.css';
import {addOrder,deleteOrder,editOrder,clearOrderStore,initializationOrder} from '../actions/consts';
import {requstInitializationOrder,searchOrder,deleteOrderRequst} from '../actions/index';
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
        //debugger
        const uri = "http://localhost:26800/api/BusinessOrders/GetBusinessOrders/";
        this.props.requstInitializationOrder(uri);
    }
    handleInfItem(index) {
        let infItem = parseInt(index);
        this.setState({ currentInfItem: infItem });
        //console.log(this.state.currentInfItem);
    }
    setPaginationNum(num) {
        let newNum = parseInt(num);
        this.setState({ paginationNum: newNum });
        //console.log(this.state.paginationNum);
    }
    handlePagination(num) {
        let pageNum = parseInt(num);
        this.setState({ page: pageNum });
        //console.log(this.state.page);
      }
    render(){
        const searchItemIds = new Array("UserName","BookName");
        const searchItemNames = new Array("姓名","书名");
        return(
            <div>
                <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
                <div className={cx({appBody3:true})}>
                    <div classNaME={cx({appHead3:true})}>
                        <SearchBox
                        itemIds={searchItemIds}
                        itemNames={searchItemNames}
                        search={this.props.searchOrder}
                        Title="order"
                        uri="http://localhost:26800/api/BusinessOrders/GetBusinessOrderBySearch/" 
                        />
                    </div>
                    <FunctionArea
                        Index={this.state.currentInfItem}
                        Inf={this.props.inf[this.state.currentInfItem]}
                        handleInfItem={this.handleInfItem}
                        deleteOrder={this.props.deleteOrderRequst}
                        setPaginationNum={this.setPaginationNum}
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
    //console.log("state:",state.present.OperateBook)
    return {
      inf: state.present.OperateOrder,
      //length: state.length,
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

        requstInitializationOrder : (uri) => dispatch(requstInitializationOrder(uri)),
        searchOrder : (uri) => dispatch(searchOrder(uri)),
        deleteOrderRequst : (uri,index) => dispatch(deleteOrderRequst(uri,index)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);