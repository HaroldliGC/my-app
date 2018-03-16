import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';


export default class DetailsForm extends Component{
    render(){
        return(
            <Form horizontal id="DetailsForm">
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        国际标准书号:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookIsbn0" defaultValue={this.props.Inf.Isbn}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        书名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookName0" defaultValue={this.props.Inf.Name}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        作者:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookAuthor0" defaultValue={this.props.Inf.Author}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        分类:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookType0" defaultValue={this.props.Inf.Type}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        出版社:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookPress0" defaultValue={this.props.Inf.Press}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        价格:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookPrice0" defaultValue={this.props.Inf.Price}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        总数量:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookNumber0" defaultValue={this.props.Inf.Number}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        借出数量:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookBorrowNum0" defaultValue={this.props.Inf.BorrowNumber}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        剩余数量:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookResidueNum0" defaultValue={this.props.Inf.ResidueNumber}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>
                        简介:
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="textarea" id="bookInfo0" defaultValue={this.props.Inf.Info}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

DetailsForm.Prototype = {
    Inf: PropTypes.object,
}


