/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {YellowBox} from 'react-native';

import NewsItem from "./NewsItem";
import {Container, Header, Content, Tab, Tabs, ScrollableTab} from 'native-base';
import Color from "../utils/Color";
import {
    createStackNavigator,
} from 'react-navigation';
import NewsDetail from "./NewsDetail";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Container>
                <Tabs tabBarBackgroundColor={Color.white}
                      tabBarUnderlineStyle={{backgroundColor: Color.main_red}}
                      renderTabBar={() => <ScrollableTab/>}>
                    <Tab heading="头条" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='top'/>
                    </Tab>
                    <Tab heading="社会" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='shehui'/>
                    </Tab>
                    <Tab heading="国内" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='guonei'/>
                    </Tab>
                    <Tab heading="国际" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='国际'/>
                    </Tab>
                    <Tab heading="娱乐" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='yule'/>
                    </Tab>
                    <Tab heading="体育" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='tiyu'/>
                    </Tab>
                    <Tab heading="军事" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='junshi'/>
                    </Tab>
                    <Tab heading="科技" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='keji'/>
                    </Tab>
                    <Tab heading="财经" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='caijing'/>
                    </Tab>
                    <Tab heading="时尚" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='shishang'/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

