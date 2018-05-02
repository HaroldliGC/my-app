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
        this.handleIcon = this.handleIcon.bind(this);
    }
    handleClick(event){
        this.props.handleInfItem(this.props.index);
        this.setState({onSelect:true})
    }
    handleIcon(str){
        const rec = {};
        switch(str){
            case 'done':
                rec.Icon = isAllDone;
                rec.Title = "归还";
                break;
            case 'renting':
                rec.Icon = greennotice;
                rec.Title = "租借中";
                break;
            case 'overdue':
                rec.Icon = rednotice;
                rec.Title = "逾期";
                break;
            case 'overdone':
                rec.Icon = hasReject;
                rec.Title = "逾期归还";
                break;
            default:
                rec.Icon = rednotice;
                rec.Title = "defaultTitle";
        }
        return rec;
    }
    render(){
        //设置样式
        let haveBackground = false;
        if (this.props.index%2===0){
            haveBackground = true;
        }
        var select = this.props.index === this.props.currentItem;
        //设置Icon
        let orderIcon = this.handleIcon(this.props.Information.State);
        const orderState = <div><span><Image className={cx({icon: true})} src={orderIcon.Icon}/>{orderIcon.Title}</span></div>;
        return(
            <tr onClick={this.handleClick} className={cx({itemBackground:haveBackground,tr_oncheck:select})}>
                <th>{this.props.Information.Id}</th>
                <th>{this.props.Information.Book.Name}</th>
                <th>{this.props.Information.Book.Isbn}</th>
                <th>{this.props.Information.User.Name}</th>
                <th>{this.props.Information.User.Account}</th>
                <th>{orderState}</th>
                {/*
                <th>{businessState}</th>
                <th>{orderState}</th>
                */}
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