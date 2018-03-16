import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Modal,Header,Body,Button} from 'react-bootstrap';
import styles from './Buttons.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class DetailsButton extends React.Component{
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
                <button onClick={this.handleShow} className={cx({normalButton:true,functionButton:true})}>
                    明细
                </button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>书籍信息</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.form}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

DetailsButton.PropTypes = {
    Inf : PropTypes.object,
    form: PropTypes.element,
}
