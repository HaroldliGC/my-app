import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {Table} from 'react-bootstrap';
import UserItem from './UserItem';
import PaginationBasic from "../../../components/PaginationBasic/PaginationBasic";
import styles from "./UserList.css";

const cx = classNames.bind(styles);

export default class UserList extends Component{
    render(){
        var infList = [];
        var infListGroup = [];
        const colNum = this.props.paginationNum;
        var userInf = this.props.Inf;
        if (userInf!==undefined){
            const infGroup = userInf;
            const length = infGroup.length;
            for (let i=0; i<length; i++){
                let inf = infGroup[i];
                infList.push(<UserItem
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
            <div className={cx({UserList:true})}>
            <Table responsive bordered >
                <thead>
                    <tr>
                        <th>账号</th>
                        <th>姓名</th>
                        <th>状态</th>
                        <th>电话</th>
                        <th>身份</th>
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

UserList.PropTypes = {
    Inf : PropTypes.array,
    pageIndex : PropTypes.number,
    handleInfItem : PropTypes.func,

    handlePagination : PropTypes.func,
    paginationNum : PropTypes.number,
    currentItem : PropTypes.number,
}