import React, { Component, PropTypes } from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import "../CSS/App.css";
import DeleteButton from '../../../components/Buttons/DeleteButton';
import DetailsButton from '../../../components/Buttons/DetailsButton';
import EditButton from '../../../components/Buttons//EditButton';
import AddNewButton from '../../../components/Buttons/AddNewButton';

import SetPagination from '../../../components/SetPagination';
import UnRedoButton from './UnRedoButton';
import DetailsForm from "./DetailsForm";
import FileUpload from '../../../components/FileUpload/FileUpload';

import {NEW_BOOK, EDIT_BOOK, DETAIL_BOOK, DELETE_BOOK} from '../../../common/OperateKeys';
import BookPanel from '../../../components/ReduxForm/BookPanel';

export default class FunctionArea extends Component {


    render() {
        const detailsForm = <DetailsForm
                               Inf = {this.props.Inf} 
                            >
                            </DetailsForm>
        
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
                    url = "http://localhost:61021/api/Books/PostBook"
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                />
                <BookPanel
                    inputType = {EDIT_BOOK}
                    todo = {this.props.updateBook}
                    info = {this.props.Inf}
                    initFormData={this.props.initFormData}
                    index={this.props.Index}
                    url="http://localhost:61021/api/Books/putbook/"
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
                    uri="http://localhost:61021/api/Books/deletebook/"
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