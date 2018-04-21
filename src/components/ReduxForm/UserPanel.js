import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import {NEW_USER, EDIT_USER, DETAIL_USER} from '../../common/OperateKeys';
import classNames from 'classnames/bind';
import styles from './BookPanel.css';
import Form from '../ReduxForm/UserForm';

const cx = classNames.bind(styles);

class UserPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            user: {}
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
        if (this.props.inputType === NEW_USER) {
            this.props.initFormData({State:'normal',Gender:'man',Identity:'user'});
        } else {
            this.props.initFormData(this.props.info)
        }
    }
    getButtonName(inputType){
        let rec = {name : '', delete : false, normal : false};
        switch(inputType){
            case NEW_USER:
                rec.name = "新增";
                rec.normal = true;
                break;
            case DETAIL_USER:
                rec.name = "明细";
                rec.normal = true;
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
        const user = {
            Id : 0,
            Account : '',
            Name : '',
            Password : '',
            State: 'normal',
            Gender: '',
            Phone: '',
            Email: '',
            License: '',
            Identity: '',
        }
        user.Password = formData.License.slice(-6);
        user.Email = formData.Account;
        const newUser = {...user,...formData};
        switch(this.props.inputType){
            case NEW_USER:
                this.props.todo(this.props.url,newUser);
                break;
            default:
        }
        this.handleClose();
    }

    render(){
        const {inputType} = this.props;
        const buttonInf = this.getButtonName(inputType);
        return(
            <div>
                <button className={cx({functionButton:true,normalButton:buttonInf.normal,deleteButton:buttonInf.delete})} onClick={this.handleShow}>
                    {buttonInf.name}
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            用户信息
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


UserPanel.PropTypes = {
    todo : PropTypes.func,
    inputType : PropTypes.string,
    info : PropTypes.object,
    url : PropTypes.string,
    initFormData : PropTypes.func,
    index : PropTypes.number
}

export default UserPanel