import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import {NEW_BOOK, EDIT_BOOK, DETAIL_BOOK, DELETE_BOOK} from '../../common/OperateKeys';
import classNames from 'classnames/bind';
import styles from './BookPanel.css';
import Form from '../ReduxForm/BookForm';

const cx = classNames.bind(styles);

class BookPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            book: {}
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getButtonName = this.getButtonName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleClose(){
        this.setState({show:false});
    }

    handleShow(){
        this.setState({show:true});
        if (this.props.inputType === NEW_BOOK) {
            this.props.initFormData({});
        } else {
            this.props.initFormData(this.props.info)
        }
    }

    getButtonName(inputType){
        let rec = {name : '', delete : false, normal : false};
        switch(inputType){
            case NEW_BOOK:
                rec.name = "新增";
                rec.normal = true;
                break;
            case EDIT_BOOK:
                rec.name = "编辑";
                rec.normal = true;
                break;
            case DETAIL_BOOK:
                rec.name = "明细";
                rec.normal = true;
                break;
            case DELETE_BOOK:
                rec.name = "删除";
                rec.delete = true;
                break;
            default:
                rec.name = "defaultButton";
        }
        return rec;
    }

    handleSubmit(){
        this.formIns.getWrappedInstance().submit();
    }
    
    handleFormSubmit(formData){
        //debugger;
        const book = {
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
        }
        const newBook = {...book,...formData};
        switch(this.props.inputType){
            case NEW_BOOK:
                this.props.todo(newBook);
                break;
            case EDIT_BOOK:
                this.props.todo(newBook.Id,newBook,this.props.index);
                break;
            default:
        }
        this.handleClose();
    }

    render(){

        const {
            inputType,
        } = this.props;

        const buttonInf = this.getButtonName(inputType);

        return(
            <div>
                <button className={cx({functionButton:true,normalButton:buttonInf.normal,deleteButton:buttonInf.delete})} onClick={this.handleShow}>
                    {buttonInf.name}
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            书籍信息
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            ref={(c) => (this.formIns = c)}
                            onSubmit={this.handleFormSubmit}
                            inputType={this.props.inputType}
                            info={this.props.info}
                        />
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

BookPanel.PropTypes = {
    todo : PropTypes.func,
    inputType : PropTypes.string,
    info : PropTypes.object,
    initFormData : PropTypes.func,
    index : PropTypes.number
}

export default BookPanel