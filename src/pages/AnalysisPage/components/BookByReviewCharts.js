import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import {Panel,Collapse,Body} from 'react-bootstrap';

import ButtonModal from '../../../components/Buttons/ButtonModal';

class BookByReviewCharts extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: true
        }
        this.getData = this.getData.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getOption = this.getOption.bind(this);
    }
    getData(array){
        let rec = [];
        array.forEach(function(item){
            rec.push(item.ReviewNumber);
        })
        return rec;
    }
    getTitle(array){
        let rec = [];
        array.forEach(function(item){
            rec.push(item.BookName);
        })
        return rec;
    }
    getOption(Inf = this.props.Inf){
        let title = [];
        let data = [];
        if (Inf.length === 0){
            title = ["default"];
            data = [0];
        } else {
            title = this.getTitle(Inf);
            data = this.getData(Inf);
        }
        const option = {
            title: {
                text:'图书评论量',
                x:'center'
            },
            //color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : title,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'评论量',
                    type:'bar',
                    barWidth: '60%',
                    data:data
                }
            ]
        }
        return option;
    }
    render(){
        return(
            <div>
                <ButtonModal
                    title="热评图书"
                    type = "normal"
                    Click = {() => this.setState({show:!this.state.show})}
                />
                <Panel expanded={this.state.show}>
                    <Panel.Collapse>
                        <Panel.Body>
                        <ReactEcharts
                            option={this.getOption()}
                            notMerge={true}
                            lazyUpdate={true}
                            theme={"theme_name"}
                        />
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )

    }
}

BookByReviewCharts.PropTypes = {
    Inf: PropTypes.array
}

export default BookByReviewCharts;