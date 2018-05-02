import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {Table} from 'react-bootstrap';
import OrderItem from './OrderItem';
import PaginationBasic from "../../../components/PaginationBasic/PaginationBasic";
import styles from "./OrderList.css";

const cx = classNames.bind(styles);

export default class OrderList extends Component{
    render(){
        var infList = [];
        var infListGroup = [];
        const colNum = this.props.paginationNum;
        var OrderInf = this.props.Inf;
        if (OrderInf!==undefined){
            const infGroup = OrderInf;
            const length = infGroup.length;
            for (let i=0; i<length; i++){
                let inf = infGroup[i];
                infList.push(<OrderItem
                        Information={inf} 
                        handleInfItem={this.props.handleInfItem}
                        index={i}
                        currentItem={this.props.currentItem}
                        />
                );
            }
            var temp = [];
            for (let i=0,j=1; i<infList.length;i++,j++){
                temp.push(infList[i]);
                if (j%colNum===0){
                    infListGroup.push(temp);
                    temp=[];
                }
            }
            if (temp.length!==0){
                infListGroup.push(temp);
            }    
        }
        return(
            <div className={cx({OrderList:true})}>
            <Table responsive bordered >
                <thead>
                    <tr>
                        <th>订单号</th>
                        <th>书籍名</th>
                        <th>国际标准书号</th>
                        <th>用户名</th>
                        <th>用户账号</th>
                        <th>订单状态</th>
                    </tr>
                </thead>
                <tbody>
                    {infListGroup[this.props.pageIndex-1]}
                </tbody>
            </Table>
            <PaginationBasic
                handlePagination = {this.props.handlePagination}
                paginationNum = {this.props.paginationNum}
                Length = {infListGroup.length}
            />
            </div>
        )
    }

}

OrderList.PropTypes = {
    Inf : PropTypes.array,
    pageIndex : PropTypes.number,
    handleInfItem : PropTypes.func,

    handlePagination : PropTypes.func,
    paginationNum : PropTypes.number,
    currentItem : PropTypes.number,
}