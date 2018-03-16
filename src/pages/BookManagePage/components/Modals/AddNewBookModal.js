import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import NewBookForm from '../NewBookForm';

export default class AddNewBookModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        this.props.handleShow()
        const bookIsbn = document.getElementById("bookIsbn").value.toString();
        const bookName = document.getElementById("bookName").value.toString();
        const bookType = document.getElementById("bookType").value.toString();
        const bookPress = document.getElementById("bookPress").value.toString();
        const bookPrice = document.getElementById("bookPrice").value.toString();
        const bookNumber = document.getElementById("bookNumber").value.toString();
        const bookInfo = document.getElementById("bookInfo").value.toString();
        const bookAuthor = document.getElementById("bookAuthor").value.toString();
        
        var book = {
            Id : 0,
            Isbn : bookIsbn,
            Name : bookName,
            Type : bookType,
            Press : bookPress,
            Price : Number(bookPrice),
            Number: parseInt(bookNumber),
            BorrowNumber : 0,
            ResidueNumber: 0,
            Info : bookInfo,
            Author: bookAuthor,
        }
        const uri = this.props.uri;
        this.props.postNewBook(uri,book);
        event.preventDefault();
    }
    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>书籍信息录入</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewBookForm/>
                </Modal.Body>
                <ModalFooter>
                    <FormGroup>
                        <Col smOffset={8} sm={2}>
                            <Button onClick={this.handleSubmit}>
                            确认
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={this.handleClose}>
                            取消
                            </Button>
                        </Col>
                    </FormGroup>
                </ModalFooter>
            </Modal>
        );
    }

}

AddNewBookModal.PropTypes = {
    postNewBook : PropTypes.func,
    uri : PropTypes.string,
    show: PropTypes.bool,
    handleShow : PropTypes.func,
}