import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Buttons.css';

const cx = classNames.bind(styles);

class AddNewButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});
    }
    handleSubmit(event){
        this.handleClose();
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
        //console.log("formBook:",book);
        const uri = this.props.uri;
        this.props.postNewBook(uri,book);
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <button className={cx({functionButton:true,normalButton:true})} onClick={this.handleShow}>
                    新添
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>书籍信息录入</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.form} 
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
            </div>
        )
    }
}

AddNewButton.PropTypes = {
    postNewBook : PropTypes.func,
    uri : PropTypes.string,
    form: PropTypes.element,
}

export default AddNewButton