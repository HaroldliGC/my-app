import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';
import OrderForm from './OrderForm';
import ButtonModal from '../../../components/Buttons/ButtonModal';

export default class OrderModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});
    }

    render(){
        return(
            <div>
                <ButtonModal title="详细" type="normal" Click={this.handleShow}/>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>订单信息</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrderForm
                            Inf = {this.props.Inf}
                        />
                    </Modal.Body>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

OrderModal.PropTypes = {
    Inf : PropTypes.object,
}