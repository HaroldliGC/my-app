import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {Table} from 'react-bootstrap';
import BookItem from "./BookItem";
import PaginationBasic from "../../../components/PaginationBasic/PaginationBasic";
import styles from "../CSS/App.css"

const cx = classNames.bind(styles);

export default class BookList extends Component{
    render(){
        var infList = [];
        var infListGroup = [];
        const colNum = this.props.paginationNum;
        var json = this.props.Inf;
        if (json!=undefined){
            const infGroup = json;
            //console.log("infGroup:",infGroup);
            const length = infGroup.length;
            //console.log("length:",length);

            for (let i=0; i<length; i++){
                infList.push(<BookItem
                        Information={infGroup[i]} 
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
            if (temp.length!=0){
                infListGroup.push(temp);
            }
            
        }
        //console.log("infListGroup",infListGroup);
        
        return(
            <div className={cx({infList:true})}>
            <Table responsive bordered >
                <thead>
                    <tr>
                        <th>国际标准书号</th>
                        <th>书名</th>
                        <th>作者</th>
                        <th>分类</th>
                        <th>出版社</th>
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

BookList.PropTypes = {
    Inf : PropTypes.array,
    pageIndex : PropTypes.number,
    handleInfItem : PropTypes.func,

    handlePagination : PropTypes.func,
    paginationNum : PropTypes.number,
    currentItem : PropTypes.number,
}