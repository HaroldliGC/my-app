import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import {Panel,Collapse,Body} from 'react-bootstrap';

import ButtonModal from '../../../components/Buttons/ButtonModal';

class BookByAllCharts extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: true,
            isPie: false
        }
        this.getData = this.getData.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getOption = this.getOption.bind(this);
        this.getPieOption = this.getPieOption.bind(this);
        this.getPieData = this.getPieData.bind(this);
    }
    getData(array){
        let rec = [];
        array.forEach(function(item){
            rec.push(item.Number);
        })
        return rec;
    }
    getPieData(array){
        let rec = [];
        array.forEach(function(item){
            rec.push({value:item.Number,name:item.Name});
        })
        return rec;
    }
    getTitle(array){
        let rec = [];
        array.forEach(function(item){
            rec.push(item.Name);
        })
        return rec;
    }
    getPieOption(Inf = this.props.Inf){
        let title = [];
        let data = [];
        if (Inf.length === 0){
            title = ["default"];
            data = [0];
        } else {
            title = this.getTitle(Inf);
            data = this.getPieData(Inf);
        }
        const option = {
            title: {
                text:'图书数量',
                x:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: title
            },
            series: [
                {
                    name: '图书',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%','60%'],
                    data: data,
                    itemStyle: {
                        emphasis:{
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }

            ]
        }
        return option;
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
                text:'图书数量',
                x:'center'
            },
            color: ['#D2B48C'],
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
                    name:'图书数量',
                    type:'bar',
                    barWidth: '60%',
                    data:data
                }
            ]
        }
        return option;
    }
    render(){
        let option = {};
        if (this.state.isPie){
            option = this.getPieOption();
        } else {
            option = this.getOption();
        }
        return(
            <div>
                <ButtonModal
                    title="图书"
                    type = "normal"
                    Click = {() => this.setState({show:!this.state.show})}
                />
                <ButtonModal
                    title="表示切换"
                    type = "search"
                    Click = {() => this.setState({isPie:!this.state.isPie})}
                />
                <Panel expanded={this.state.show}>
                    <Panel.Collapse>
                        <Panel.Body>
                        <ReactEcharts
                            option={option}
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

BookByAllCharts.PropTypes = {
    Inf: PropTypes.array
}

export default BookByAllCharts;