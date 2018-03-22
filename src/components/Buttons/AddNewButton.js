import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Buttons.css';
import NewBookForm from '../../pages/BookManagePage/components/NewBookForm';

const cx = classNames.bind(styles);

class AddNewButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false,
            Id : 0,
            Isbn : '',
            Name : '',
            Type : '',
            Press: '',
            Price: 0,
            Number: 0,
            BorrowNumber : 0,
            ResidueNumber: 0,
            Info : '',
            Author : '',
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }
    handleBook(bookItem){
        this.setState(...this.state,bookItem);
    }
    
    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});
    }
    handleSubmit(event){
        this.handleClose();
        const uri = this.props.uri;
        this.props.postNewBook(uri,this.state);
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
                        <NewBookForm
                            handleBook = {this.handleBook}
                        >
                        </NewBookForm> 
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
}

export default AddNewButton