import NotificationSystem from 'react-notification-system';
import React, { Component } from "react";
import "../CSS/App.css";
import { connect } from 'react-redux';
import { initFormData, newOperatorAction, editInf, deleteInfItem, initializationData, undoAction, redoAction} from "../actions/consts";
import { postBookImg, postNewBook, deleteBook, updateBook, requstInitializationData, clearCurrentStore, searchBook} from "../actions/index";

import BookList from "../components/BookList";
import FunctionArea from '../components/FunctionArea';
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
    this.props.requstInitializationData();
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
    let pageNum = parseInt(num, 0);
    this.setState({ page: pageNum });
  }
  handleInfItem(index) {
    let infItem = parseInt(index, 0);
    this.setState({ currentInfItem: infItem });
  }
  setPaginationNum(num) {
    let newNum = parseInt(num, 0);
    this.setState({ paginationNum: newNum });
  }
  render() {
    const searchItemIds = ["Name","Author","Type","Press","Isbn"];
    const searchItemNames = ["书名","作者","类型","出版社","Isbn"];
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
              postBookImg={this.props.postBookImg}

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

    requstInitializationData: () => dispatch(requstInitializationData()),
    postNewBook: (data) => dispatch(postNewBook(data)),
    deleteBook : (bookId,index) => dispatch(deleteBook(bookId,index)),
    updateBook:(bookId,data,index) => dispatch(updateBook(bookId,data,index)),
    searchBook:(uri) => dispatch(searchBook(uri)),
    postBookImg: (formdata,id) => dispatch(postBookImg(formdata,id)),

    clearCurrentStore: () => dispatch(clearCurrentStore()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookManagePage);


