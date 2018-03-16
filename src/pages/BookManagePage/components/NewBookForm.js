import React, {Component} from "react";
import {Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';

class NewBookForm extends Component{
    render(){
        return(
            <Form horizontal id="OperatorInfForm">
                <FormGroup controlid="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={4}>
                        国际标准书号:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookIsbn">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalPhone">
                    <Col componentClass={ControlLabel} sm={4}>
                        书名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookName">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={4}>
                        作者:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookAuthor">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalState">
                    <Col componentClass={ControlLabel} sm={4}>
                        分类:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookType">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalUser">
                    <Col componentClass={ControlLabel} sm={4}>
                        出版社:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookPress">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalStyle">
                    <Col componentClass={ControlLabel} sm={4}>
                        价格:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookPrice">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalDate">
                    <Col componentClass={ControlLabel} sm={4}>
                        数量:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="bookNumber">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={4}>
                        简介:
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="textarea"  id="bookInfo">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}


export default NewBookForm;