import React, { Component} from "react";
import "../CSS/App.css";
import DeleteButton from '../../../components/Buttons/DeleteButton';
import SetPagination from '../../../components/SetPagination';
import FileUpload from '../../../components/FileUpload/FileUpload';

import {NEW_BOOK,DETAIL_BOOK, EDIT_BOOK} from '../../../common/OperateKeys';
import BookPanel from '../../../components/ReduxForm/BookPanel';

export default class FunctionArea extends Component {


    render() {
        return (
            <div className="appFunctionArea">
            {/*
                <AddNewButton 
                    postNewBook={this.props.postNewBook}
                    uri="http://localhost:26800/api/Books/postbook/"
            />*/}
                <BookPanel
                    inputType = {NEW_BOOK}
                    todo = {this.props.postNewBook}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                />
                <BookPanel
                    inputType = {EDIT_BOOK}
                    todo = {this.props.updateBook}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                    index={this.props.Index}
                />
                 <BookPanel
                    inputType = {DETAIL_BOOK}
                    info =  {this.props.Inf}
                    initFormData={this.props.initFormData}
                />
                 <FileUpload
                    info = {this.props.Inf}
                    index={this.props.Index}
                    todo={this.props.postBookImg}
                />
                <DeleteButton
                    index={this.props.Index}
                    handleInfItem={this.props.handleInfItem}
                    deleteBook = {this.props.deleteBook}
                    Inf={this.props.Inf}
                />
                {/*
                <UnRedoButton
                    Undo={this.props.onUndo}
                    Redo={this.props.onRedo}
                    pastLength={this.props.pastLength}
                    futureLength={this.props.futureLength}
                />*/}
                <SetPagination
                    setPaginationNum={this.props.setPaginationNum}
                />
            </div>
        )
    }
}