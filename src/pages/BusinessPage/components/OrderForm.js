import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form,FormGroup,Col,ControlLabel,FormControl,} from 'react-bootstrap';

export default class OrderForm extends Component{
    constructor(props){
        super(props);
        this.handleState = this.handleState.bind(this);
    }

    handleState(str){
        let rec = '';
        switch(str){
            case 'done':
                rec = '归还';
                break;
            case 'renting':
                rec = '租借中';
                break;
            case 'overdone':
                rec = '逾期归还';
                break;
            case 'overdue':
                rec = '逾期';
                break;
            default:
                rec = 'default';
        }
        return rec;
    }
    
    render(){
        let show = true;
        if (this.props.Inf.State==="renting"){
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
                        <FormControl type="text" defaultValue={this.props.Inf.User.Name}>
                            
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
                <FormGroup key="orderState">
                    <Col componentClass={ControlLabel} sm={4}>
                        订单状态:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" defaultValue={this.handleState(this.props.Inf.State)}>
                            
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