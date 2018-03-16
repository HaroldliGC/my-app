import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';

export default class UserInfForm extends Component{
    render(){
        return(
            <Form horizontal id="UserInfForm">
                <FormGroup key="userName">
                    <Col componentClass={ControlLabel} sm={4}>
                        姓名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text"  defaultValue={this.props.Inf.Name}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userAccount">
                    <Col componentClass={ControlLabel} sm={4}>
                        账号:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.AccountNumber}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userState">
                    <Col componentClass={ControlLabel} sm={4}>
                        状态:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.State}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userGender">
                    <Col componentClass={ControlLabel} sm={4}>
                        性别:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.Gender}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userAge">
                    <Col componentClass={ControlLabel} sm={4}>
                        年龄:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.Age}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userPhone">
                    <Col componentClass={ControlLabel} sm={4}>
                        电话:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.Phone}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userEmail">
                    <Col componentClass={ControlLabel} sm={4}>
                        Email:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text"defaultValue={this.props.Inf.Email}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

UserInfForm.PropTypes = {
    Inf : PropTypes.object,
}