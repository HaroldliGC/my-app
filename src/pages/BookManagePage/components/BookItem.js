import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../CSS/App.css';

const cx = classNames.bind(styles);

export default class BookItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            onSelect:false,
        };
        this.handleClick = this.handleClick.bind(this);
        //this.handleBlur = this.handleBlur.bind(this);
    }
    handleClick(event){
        this.props.handleInfItem(this.props.index);
        this.setState({onSelect:true});
    }
    render(){
        let haveBackground = false;
        if (this.props.index%2==0){
            haveBackground = true;
        }
        var select = this.props.index == this.props.currentItem;
        return(
            <tr onClick={this.handleClick} className={cx({bookInfItem:haveBackground,tr_oncheck:select})}>
                <th>{this.props.Information.Isbn}</th>
                <th>{this.props.Information.Name}</th>
                <th>{this.props.Information.Author}</th>
                <th>{this.props.Information.Type}</th>
                <th>{this.props.Information.Press}</th>
            </tr>
        )
    }
}
BookItem.PropTypes = {
    Information : PropTypes.array, 
    handleInfItem : PropTypes.func,
    index : PropTypes.number,
    currentItem : PropTypes.number,
}