import NotificationSystem from 'react-notification-system';
import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import "../CSS/App.css";
import { connect } from 'react-redux';
import { initFormData, newOperatorAction, editInf, deleteInfItem, initializationData, undoAction, redoAction} from "../actions/consts";
import { postNewBook, deleteBook, updateBook, requstInitializationData, clearCurrentStore, searchBook} from "../actions/index";

import BookList from "../components/BookList";
import FunctionArea from '../components/FunctionArea';
import UnRedoButton from '../components/UnRedoButton';
import Header from '../../../components/Header/Header';

import SearchBox from "../../../components/SearchBox/SearchBox";

class BookManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      currentInfItem: 0,
      paginationNum: 10,
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
    const uri = "http://localhost:61021/api/Books/GetBooks";
    this.props.requstInitializationData(uri);
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
        title: '书籍管理',
        message: message.content,
        level: mylevel
      })
      message.content = '';
      message.type = '';
    }
  }
  /*
  componentWillUnmount(){
    this.props.clearCurrentStore();
  }
  */
  handlePagination(num) {
    let pageNum = parseInt(num);
    this.setState({ page: pageNum });
    //console.log(this.state.page);
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
  render() {
    const searchItemIds = new Array("Name","Author","Type","Press","Isbn");
    const searchItemNames = new Array("书名","作者","类型","出版社","Isbn");
    return (
      <div>
        <NotificationSystem ref={(c) => (this.notificationSystem = c)} />
        <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
        <div className="appBody">
            <div className="appHead">
              <SearchBox
                itemIds={searchItemIds}
                itemNames={searchItemNames}
                search={this.props.searchBook}
                Title = "book"
                uri = "http://localhost:61021/api/Books/getbookbysearch/" 
              />
            </div>
            <FunctionArea
              Index={this.state.currentInfItem}
              Inf={this.props.inf[this.state.currentInfItem]}
              EditInf={this.props.onEditInf}
              DeleteInfItem={this.props.onDeleteInfItem}
              setPaginationNum={this.setPaginationNum}
              handleInfItem={this.handleInfItem}
              initFormData={this.props.onInitFormData}

              onUndo={this.props.onUndo}
              onRedo={this.props.onRedo}
              pastLength={this.props.pastLength}
              futureLength={this.props.futureLength}

              postNewBook={this.props.postNewBook}
              deleteBook={this.props.deleteBook}
              updateBook={this.props.updateBook}

              errors={this.props.errors}
            />
            <hr/>
            <BookList
              Inf={this.props.inf}
              pageIndex={this.state.page}
              handleInfItem={this.handleInfItem}

              handlePagination={this.handlePagination}
              paginationNum={this.state.paginationNum}
              currentItem={this.state.currentInfItem}
            />
            {/*
            <UnRedoButton 
              Undo={this.props.onUndo}
              Redo={this.props.onRedo}
              pastLength={this.props.pastLength}
              futureLength={this.props.futureLength}
            />
            */}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log("state:",state.present.OperateBook)
  return {
    inf: state.present.OperateBook.books,
    messages: state.present.OperateBook.messages,
    //length: state.length,
    pastLength : state.past.length,
    futureLength : state.future.length,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onAddNewOperator: (text) => dispatch(newOperatorAction(text)),
    onInitializationData: (data) => dispatch(initializationData(data)),
    onDeleteInfItem: (index) => dispatch(deleteInfItem(index)),
    onEditInf: (text, index) => dispatch(editInf(text, index)),
    onInitFormData: (data) => dispatch(initFormData(data)),

    onUndo : () => dispatch(undoAction()),
    onRedo : () => dispatch(redoAction()),

    requstInitializationData: (data) => dispatch(requstInitializationData(data)),
    postNewBook: (uri,data) => dispatch(postNewBook(uri,data)),
    deleteBook : (uri,index) => dispatch(deleteBook(uri,index)),
    updateBook:(uri,data,index) => dispatch(updateBook(uri,data,index)),
    searchBook:(uri) => dispatch(searchBook(uri)),

    clearCurrentStore: () => dispatch(clearCurrentStore()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookManagePage);


