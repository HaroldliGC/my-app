import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Body,Title,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Buttons.css';

const cx = classNames.bind(styles);

export default class EditButton extends Component{
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
        const bookIsbn = document.getElementById("bookIsbn0").value.toString();
        const bookName = document.getElementById("bookName0").value.toString();
        const bookType = document.getElementById("bookType0").value.toString();
        const bookPress = document.getElementById("bookPress0").value.toString();
        const bookPrice = document.getElementById("bookPrice0").value.toString();
        const bookNumber = document.getElementById("bookNumber0").value.toString();
        const bookBorrowNum = document.getElementById("bookBorrowNum0").value.toString();
        const bookResidueNum = document.getElementById("bookResidueNum0").value.toString();
        const bookInfo = document.getElementById("bookInfo0").value.toString();
        const bookAuthor = document.getElementById("bookAuthor0").value.toString();
        const bookId = this.props.Inf.Id;

        var book = {
            Id : bookId,
            Isbn : bookIsbn,
            Name : bookName,
            Type : bookType,
            Press : bookPress,
            Price : Number(bookPrice),
            Number: parseInt(bookNumber),
            BorrowNumber : parseInt(bookBorrowNum),
            ResidueNumber: parseInt(bookResidueNum),
            Info : bookInfo,
            Author: bookAuthor,
        }
        //console.log("formBook:",book);
        const uri = this.props.uri + bookId;
        this.props.updateBook(uri,book,this.props.index);
        event.preventDefault();
    }

    render(){
        //const mes0 = this.props.Inf[0];       
        return(
            <div>
                <button class={cx({functionButton:true, normalButton:true})} onClick={this.handleShow}>
                    编辑
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>书籍信息</Modal.Title>
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

EditButton.PropTypes = {
    uri : PropTypes.string,
    Inf : PropTypes.array,
    index : PropTypes.number,
    editInf : PropTypes.func,
    updateBook : PropTypes.func,
    form : PropTypes.element,
}
