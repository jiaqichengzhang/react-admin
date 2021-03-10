import React, {Component} from 'react';
import ReactEcharts from "echarts-for-react";

class Line extends Component{
    getOption =()=>{
        return {
            tooltip: {},
            legend: {
                data:['a','b','c'],
                bottom:0,
                icon:'pin'
            },
            xAxis: {
                data: ['Jan' ,'Feb' ,'Mar' ,'Apr' ,'May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec']
            },
            yAxis: {},
            series: [
                {
                    name: 'a',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: [118,220,218,265, 44, 93, 96, 276, 271, 193, 59, 189]
                },
                {
                    name: 'b',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: [220, 182, 191, 234, 290, 330, 310,268, 67, 49, 202, 76]
                },
                {
                    name: 'c',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: [150, 154, 190, 201,232, 330, 410, 290, 273,64, 61, 45,]
                },
            ],
            color:['#5C90F9','#5D7092','#5DD9A8']
        }
    }
    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                style={{width: '100%',height:'350px'}}
            />
        );
    }
}

export default Line;
