import React, {Component, Fragment} from 'react';
import {Card, Button} from "antd";
import ReactEcharts from 'echarts-for-react';

class Bar extends Component {
    state = {
        sales:[5, 20, 36, 10, 10, 20],
        store:[15, 30, 46, 46, 46, 30]
    }
    getOption =()=>{
        const {sales,store} = this.state
        return {
            title: {
                text: '销量库存周数量柱状图'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'bar',
                    data: store
                }
            ],
            color:['skyblue','orange']
        }
    }
    update = ()=>{
        const arr = [0,0,0,0,0,0]
        const sales = arr.map(v=>Math.floor(Math.random() * 100))
        const store = arr.map(v=>Math.floor(Math.random() * 100))
        this.setState({
            sales,
            store
        })
    }
    onChartClick = (param,echarts)=>{
        console.log(param)
    }
    render() {
        const onEvents={
            'click': this.onChartClick.bind(this)
        }
        const title = <Button type="primary" onClick={this.update}>更新</Button>
        return (
            <Fragment>
                <Card title={title}>
                </Card>
                <Card title="柱状图一">
                    <ReactEcharts
                        option={this.getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        onEvents={onEvents}
                        style={{width: '100%',height:'350px'}}
                    />
                </Card>
            </Fragment>

        )
    }
}

export default Bar;
