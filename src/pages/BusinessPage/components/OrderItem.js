import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './OrderItem.css';

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
        let haveBackground = false;
        if (this.props.index%2==0){
            haveBackground = true;
        }
        var select = this.props.index == this.props.currentItem;
        return(
            <tr onClick={this.handleClick} className={cx({itemBackground:haveBackground,tr_oncheck:select})}>
                <th>{this.props.Information.Id}</th>
                <th>{this.props.Information.Book.Name}</th>
                <th>{this.props.Information.ReaderUser.Name}</th>
                <th>{this.props.Information.BusinessState}</th>
                <th>{this.props.Information.OrderState}</th>
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