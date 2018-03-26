import React, {Component} from "react";
import {Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

class NewBookForm extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        var bookItem = [];
        var key = event.target.id;
        if (key === 'Number'){
            bookItem['ResidueNumber'] = event.target.value;
        }
        bookItem[key] = event.target.value;
        this.props.handleBook(bookItem);
    }
    render(){
        return(
            <Form horizontal id="OperatorInfForm" onChange={this.handleChange}> 
                <FormGroup controlid="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={4}>
                        国际标准书号:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Isbn">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalPhone">
                    <Col componentClass={ControlLabel} sm={4}>
                        书名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Name">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={4}>
                        作者:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Author">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalState">
                    <Col componentClass={ControlLabel} sm={4}>
                        分类:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Type">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalUser">
                    <Col componentClass={ControlLabel} sm={4}>
                        出版社:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Press">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalStyle">
                    <Col componentClass={ControlLabel} sm={4}>
                        价格:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Price">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formHorizontalDate">
                    <Col componentClass={ControlLabel} sm={4}>
                        数量:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" id="Number">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlid="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={4}>
                        简介:
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="textarea"  id="Info">
                            
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

NewBookForm.PropTypes = {
    handleBook : PropTypes.func,
}

export default NewBookForm;