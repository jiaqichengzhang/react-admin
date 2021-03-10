import React, {Component, Fragment} from 'react';
import {Card,} from "antd";
import ReactEcharts from 'echarts-for-react';

class Pie extends Component {
    state = {
        sales:[5, 20, 36, 10, 10, 20],
        store:[15, 30, 46, 46, 46, 30]
    }
    getOption1 =()=>{
       return {
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 274, name: '联盟广告'},
                        {value: 235, name: '视频广告'},
                        {value: 400, name: '搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
    }
    getOption2 =()=>{
        return {
            title: {
                text: '某站点用户访问来源',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
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
    render() {
        return (
            <Fragment>
                <Card title="饼图一">
                    <ReactEcharts
                        option={this.getOption1()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{width: '100%',height:'350px'}}
                    />
                </Card>
                <Card title="饼图二">
                    <ReactEcharts
                        option={this.getOption2()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{width: '100%',height:'350px'}}
                    />
                </Card>
            </Fragment>

        )
    }
}

export default Pie;
