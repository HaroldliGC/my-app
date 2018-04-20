import NotificationSystem from 'react-notification-system';
import React, { Component } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './UserManagePage.css';
import {addReaderUser,deleteReaderUser,editReaderUser,clearReaderUserStore,initializationReaderUser} from '../actions/consts';
import {clearCurrentReaderUserStore,requstInitializationReaderUser,searchUser,blockUpUser} from "../actions/index";
import SearchBox from "../../../components/SearchBox/SearchBox";

import UserList from "../components/UserList";
import FunctionArea from '../components/FunctionArea';
import Header from '../../../components/Header/Header';

const cx = classNames.bind(styles);

class UserManagePage extends Component{
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
        const uri = "http://localhost:61021/api/Users/GetUsers/";
        this.props.requstInitializationReaderUser(uri);
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
            title: '用户管理',
            message: message.content,
            level: mylevel
          })
          message.content = '';
          message.type = '';
        }
    }
    componentWillUnmount(){
        this.props.clearCurrentReaderUserStore();
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
        const searchItemIds = new Array("Name","AccountNumber");
        const searchItemNames = new Array("姓名","账号");
        return(
            <div>
                <NotificationSystem ref={(c) => (this.notificationSystem = c)} />
                <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
                <div className={cx({appBody2:true})}>
                    <div classNaME={cx({appHead2:true})}>
                        <SearchBox
                        itemIds={searchItemIds}
                        itemNames={searchItemNames}
                        search={this.props.searchUser}
                        Title="user"
                        uri = "http://localhost:61021/api/Users/GetReaderUserBySearch/"
                        />
                    </div>
                    <FunctionArea
                        Index={this.state.currentInfItem}
                        Inf={this.props.inf[this.state.currentInfItem]}
                        setPaginationNum={this.setPaginationNum}
                        blockUpUser={this.props.blockUpUser}
                    />
                    <hr/>
                    <UserList
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
      inf: state.present.OperateReaderUser.users,
      messages: state.present.OperateReaderUser.messages,
      //length: state.length,
      pastLength : state.past.length,
      futureLength : state.future.length,
    }
}
function mapDispatchToProps(dispatch){
    return{
        addReaderUser : (text) => dispatch(addReaderUser(text)),
        deleteReaderUser : (index) => dispatch(deleteReaderUser(index)),
        editReaderUser : (text,index) => dispatch(editReaderUser(text,index)),
        clearReaderUserStore : () => dispatch(clearReaderUserStore()),
        initializationReaderUser : (data) => dispatch(initializationReaderUser(data)),

        clearCurrentReaderUserStore : () => dispatch(clearCurrentReaderUserStore()),
        requstInitializationReaderUser : (uri) => dispatch(requstInitializationReaderUser(uri)),
        searchUser : (uri) => dispatch(searchUser(uri)),
        blockUpUser: (uri,data,index) => dispatch(blockUpUser(uri,data,index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserManagePage);