import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {Image} from 'react-bootstrap';
import styles from './OrderItem.css';
import hasReject from '../../../images/hasReject.png';
import isAllDone from '../../../images/isAllDone.png';
import rednotice from '../../../images/rednotice.png';
import greennotice from '../../../images/greennotice.png';

const cx = classNames.bind(styles);

export default class OrderItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            onSelect:false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        this.props.handleInfItem(this.props.index);
        this.setState({onSelect:true})
    }
    render(){
        //设置样式
        let haveBackground = false;
        if (this.props.index%2==0){
            haveBackground = true;
        }
        var select = this.props.index == this.props.currentItem;
        //设置Icon
        let orderIcon = hasReject;
        if (this.props.Information.OrderState === 'finished') {
            orderIcon = isAllDone;
        }
        const orderState = <div><span><Image className={cx({icon: true})} src={orderIcon}/>{this.props.Information.OrderState}</span></div>;
        let businessIcon = greennotice;
        if (this.props.Information.BusinessState === 'overTime') {
            businessIcon = rednotice;
        }
        const businessState = <div><span><Image className={cx({icon: true})} src={businessIcon}/>{this.props.Information.BusinessState}</span></div>;
        return(
            <tr onClick={this.handleClick} className={cx({itemBackground:haveBackground,tr_oncheck:select})}>
                <th>{this.props.Information.Id}</th>
                <th>{this.props.Information.Book.Name}</th>
                <th>{this.props.Information.ReaderUser.Name}</th>
                <th>{businessState}</th>
                <th>{orderState}</th>
            </tr>
        )
    }
}
OrderItem.PropTypes = {
    Information : PropTypes.array, 
    handleInfItem : PropTypes.func,
    index : PropTypes.number,
    currentItem : PropTypes.number,
}