import React, {Component} from 'react';
import { Card, Col, Row,Statistic,Tabs,DatePicker,Timeline} from 'antd';
import moment from 'moment';
import {ArrowUpOutlined,ArrowDownOutlined,QuestionCircleOutlined} from '@ant-design/icons';
import Line from './components/Line'
import Column from './components/Column'
import './index.less'
const { TabPane } = Tabs;

class Home extends Component {
    dateFormat = 'YYYY/MM/DD';
    render() {
        const dateFormat = this.dateFormat
        return (
            <div className='home'>
                <Card>
                    <Row >
                        <Col span={7} style={{display:'flex',alignItems:'center'}}>
                            <Card title="商品总量" style={{width:'100%'}} extra={<QuestionCircleOutlined />}>
                                <Statistic
                                    value={112893}
                                    suffix="个"
                                    style={{lineHeight:"3.5em"}}

                                />
                                <Statistic
                                    value={11.28}
                                    precision={2}
                                    prefix={'周同比'}
                                    suffix={<div>%<ArrowUpOutlined style={{color: '#3f8600'}}/></div>}
                                    style={{lineHeight:"3.5em"}}
                                />
                                <Statistic
                                    value={16}
                                    precision={2}
                                    prefix={'日同比'}
                                    suffix={<div>%<ArrowDownOutlined  style={{color: '#cf1322'}}/></div>}
                                    style={{lineHeight:"3.5em"}}
                                />
                            </Card>
                        </Col>
                        <Col span={17}>
                            <Line/>
                        </Col>
                    </Row>
                </Card>
                <Tabs
                    size="large"
                    tabBarExtraContent={(
                        <DatePicker.RangePicker
                            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                            format={dateFormat}
                        />

                    )}>
                    <TabPane tab={<span style={{fontSize:'22px'}}>访问量</span>} key="1">
                        <Row>
                            <Col span={17}>
                                <Column seriesName="访问量" data={[67,11, 23, 31, 26, 75, 6, 16, 69, 59, 87, 70]}/>
                            </Col>
                            <Col span={7} style={{paddingTop:'20px'}}>
                                <p>任务</p>
                                <Timeline>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                </Timeline>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span style={{fontSize:'22px'}}>销售量</span>} key="2">
                        <Row>
                            <Col span={17}>
                                <Column seriesName="销售量" data={[15, 77, 37, 99, 21, 70, 50, 78, 13, 27, 28, 22]}/>
                            </Col>
                            <Col span={7} style={{paddingTop:'20px'}}>
                                <p>任务</p>
                                <Timeline>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>Solve initial network problems 1</p>
                                        <p>Solve initial network problems 2</p>
                                        <p>Solve initial network problems 3 2015-09-01</p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="gray">
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="gray">
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Home;
