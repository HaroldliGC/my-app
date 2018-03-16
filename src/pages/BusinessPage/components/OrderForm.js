import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form,FormGroup,Col,ControlLabel,FormControl,} from 'react-bootstrap';

export default class OrderForm extends Component{
    render(){
        var show = true;
        if (this.props.Inf.OrderState==="unfinished"){
            show = false;
        }
        return(
            <Form horizontal id="OrderForm">
                <FormGroup key="orderId">
                    <Col componentClass={ControlLabel} sm={4}>
                        订单号:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text"  defaultValue={this.props.Inf.Id}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="userName">
                    <Col componentClass={ControlLabel} sm={4}>
                        用户名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.ReaderUser.Name}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="bookName">
                    <Col componentClass={ControlLabel} sm={4}>
                        书籍名:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.Book.Name}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="businessState">
                    <Col componentClass={ControlLabel} sm={4}>
                        业务状态:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.BusinessState}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="orderState">
                    <Col componentClass={ControlLabel} sm={4}>
                        订单状态:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.OrderState}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="starDate">
                    <Col componentClass={ControlLabel} sm={4}>
                        租赁日期:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.props.Inf.StartDate}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup key="endDate">
                    <Col componentClass={ControlLabel} sm={4}>
                        预定归还日期:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text"defaultValue={this.props.Inf.EndDate}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                {show&&
                    <FormGroup key="returnDate">
                    <Col componentClass={ControlLabel} sm={4}>
                        实际归还日期:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text"defaultValue={this.props.Inf.ReturnDate}>
                            
                        </FormControl>
                    </Col>
                </FormGroup>
                }
            </Form>
        )
    }
}

OrderForm.PropTypes = {
    Inf : PropTypes.object,
}