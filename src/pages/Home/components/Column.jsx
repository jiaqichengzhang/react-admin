import React, {Component} from 'react';
import ReactEcharts from "echarts-for-react";

class Column extends Component{
    getOption =()=>{
        const {seriesName,data} = this.props
        return {
            tooltip: {},
            legend: {
                show:false
            },
            xAxis: {
                data: ['Jan' ,'Feb' ,'Mar' ,'Apr' ,'May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec']
            },
            yAxis: {},
            series: [
                {
                    name: seriesName,
                    type: 'bar',
                    data: data
                },
            ],
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

export default Column;
