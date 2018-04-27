import autoBind from 'react-autobind';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import ButtonModal from '../Buttons/ButtonModal';
import {Image,Modal,Header,Title,Body,FormGroup,Button,Col,ModalFooter} from 'react-bootstrap';

import styles from './FileUpload.css';
import addButton from '../../images/addButton.png';

const cx = className.bind(styles);

export default class FileUpload extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            image: addButton,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        /*
        debugger
        const bookId = this.props.info.Id;
        if (this.props.file !== undefined){
            let formDate = this.state.file;
            this.props.todo(formDate,bookId);
        }*/

        this.handleClose();
    }
    handleClose(){
        this.setState({show:false,image:addButton});
    }

    handleShow(){
        this.setState({show:true});
    }
    handleChange(event){
        const e = event;
        const target = e.target;
        const file = target.files[0];
        if (file !== undefined){
            var windowURL = window.URL;
            var dataURL = windowURL.createObjectURL(file);
            this.setState({image:dataURL});
            const formData = new FormData();
            formData.append("files",file);
            this.props.todo(formData,this.props.info.Id);
        }
    }
    render(){
        return(
            <div>
                <ButtonModal
                    title = "封面上传"
                    type = "normal"
                    Click = {this.handleShow}
                />
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.info === undefined?'书籍':`《${this.props.info.Name}》`}封面上传
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class={cx({uploadGroup:true})}>
                        <input type="file" className={cx({fileInput:true})} onChange={this.handleChange}></input>
                            <Image
                                src={this.state.image}
                                className={cx({defaultImg:true})}
                                responsive
                            />
                        </div>
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

FileUpload.PropTypes = {
    todo: PropTypes.func,
    info : PropTypes.object,
    index : PropTypes.number
}