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

export default class FunctionArea extends Component {


    render() {
        const detailsForm = <DetailsForm
                               Inf = {this.props.Inf} 
                            >
                            </DetailsForm>
        
        return (
            <div className="appFunctionArea">
                <AddNewButton 
                    postNewBook={this.props.postNewBook}
                    uri="http://localhost:26800/api/Books/postbook/"
                />
                <EditButton
                    Inf={this.props.Inf}
                    index={this.props.Index}
                    editInf={this.props.EditInf}
                    updateBook={this.props.updateBook}
                    form={detailsForm}
                    uri="http://localhost:26800/api/Books/putbook/"
                />
                <DeleteButton
                    index={this.props.Index}
                    handleInfItem={this.props.handleInfItem}
                    deleteBook = {this.props.deleteBook}
                    Inf={this.props.Inf}
                    uri="http://localhost:26800/api/Books/deletebook/"
                />
                <DetailsButton
                    Inf={this.props.Inf}
                    form={detailsForm}
                />
                <UnRedoButton
                    Undo={this.props.onUndo}
                    Redo={this.props.onRedo}
                    pastLength={this.props.pastLength}
                    futureLength={this.props.futureLength}
                />
                <SetPagination
                    setPaginationNum={this.props.setPaginationNum}
                />
            </div>
        )
    }
}