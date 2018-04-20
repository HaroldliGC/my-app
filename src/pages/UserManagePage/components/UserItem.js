import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {Image} from 'react-bootstrap';
import styles from './UserItem.css';
import fineIcon from '../../../images/status-fine.png';
import forbiddenIcon from '../../../images/status-forbidden.png';

const cx = classNames.bind(styles);

export default class UserItem extends Component{
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
        //设置ICon
        let Icon = fineIcon;
        if (this.props.Information.State === 'stop'){
            Icon = forbiddenIcon;
        }
        const state = <div><span><Image className={cx({icon: true})} src={Icon}/>{this.props.Information.State}</span></div>;

        return(
            <tr onClick={this.handleClick} className={cx({itemBackground:haveBackground,tr_oncheck:select})}>
                <th>{this.props.Information.Account}</th>
                <th>{this.props.Information.Name}</th>
                <th>{state}</th>
                <th>{this.props.Information.Phone}</th>
            </tr>
        )
    }
}
UserItem.PropTypes = {
    Information : PropTypes.array, 
    handleInfItem : PropTypes.func,
    index : PropTypes.number,
    currentItem : PropTypes.number,
}