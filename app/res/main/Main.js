/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import NewsItem from '../news/NewsItem'
import NewsDetail from '../news/NewsDetail'
import News from '../news/News'
import Joker from '../joker/Joker'
import Today from '../today/Today'
import Robot from '../robot/Robot'

import {YellowBox} from 'react-native';
import TodayDetail from "../today/TodayDetail";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let TAB_NAMES = ['新闻', '段子', '历史的今天', '小爱同学'];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Navigator/>
        );
    }
}

const Tab = createBottomTabNavigator({
    News: {
        screen: News,
        navigationOptions: ({navigations}) => {
            return {
                tabBarLabel: '新闻',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../src/news.png')}
                        style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                    />
                ),
            }
        },
    },
    Joker: {
        screen: Joker,
        navigationOptions: ({navigations}) => {
            return {
                tabBarLabel: '段子',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../src/joker.png')}
                        style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                    />
                ),
            }
        },
    },
    Today: {
        screen: Today,
        navigationOptions: ({navigations}) => {
            return {
                tabBarLabel: '历史今天',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../src/today.png')}
                        style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                    />
                ),
            }
        },
    },
    Robot: {
        screen: Robot,
        navigationOptions: ({navigations}) => {
            return {
                tabBarLabel: '小爱',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../../src/girl.png')}
                        style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                    />
                ),
            }
        },
    },
}, {
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    lazy: true,
    // initialRouteName: 'Today',
    tabBarOptions: {
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        showIcon: true,//是否显示图标，默认关闭
        activeTintColor: '#03a9f4',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 7,
        }
    }
});

const navigationOptions = {
    navigationOptions: ({navigation}) => {
        let title = TAB_NAMES[navigation.state.index];
        return {
            headerTitle: title,
            headerStyle: {
                backgroundColor: '#03a9f4'
            },
            gestureResponseDistance: {horizontal: 300},

            headerTitleStyle: {
                color: 'white',
                //设置标题的大小
                fontSize: 18,
                //居中显示
                alignSelf: 'center',
            }
        }
    },
    headerMode: 'none',
    mode: 'card',
};

const Navigator = createStackNavigator({
    Tab: {
        screen: Tab,
    },
    NewsDetail: {
        screen: NewsDetail
    },
    TodayDetail: {
        screen: TodayDetail
    }
}, navigationOptions);

