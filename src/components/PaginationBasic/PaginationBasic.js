import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Pagination, } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './PaginationBasic.css';

const cx = classNames.bind(styles);

export default class PaginationBasic extends Component{
    handClick(event){
        let target = event.target;
        let num = target.innerHTML;
        this.props.handlePagination(num);
    }
    render(){
        const length = this.props.Length;
        const colNum = this.props.paginationNum;
        let items = [];
        for(let i=0; i<length; i++){
            items.push(
                <Pagination.Item>
                    {i+1}
                </Pagination.Item>
            )
        }
        return(
            <div className={cx({paginationBasic:true})}>
                <Pagination onClick={(e)=>this.handClick(e)}
                prev
                next
                first
                last
                items={items.length}
                >
                {items}
                </Pagination>

            </div>
        )
    }
}
PaginationBasic.PropTypes = {
    handlePagination : PropTypes.func,
    Length : PropTypes.number,
    paginationNum : PropTypes.number,
}