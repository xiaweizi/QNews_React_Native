/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {YellowBox} from 'react-native';

import NewsItem from "./NewsItem";
import {
    Container,
    Header,
    Tab,
    Tabs,
    ScrollableTab,
    Body,
    Title,
    Text,
    View
} from 'native-base';
import Color from "../utils/Color";
import Size from "../utils/Size";


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Color.main_color}}
                        androidStatusBarColor={Color.main_color_primary}>
                    <Body>
                    <Title style={{marginLeft: Size.public_margin}}>新闻</Title>
                    </Body>
                </Header>
                <Tabs tabBarBackgroundColor={Color.white}
                      tabBarUnderlineStyle={{backgroundColor: Color.main_red}}
                      renderTabBar={() => <ScrollableTab/>}
                      style={{height: 12}}>
                    <Tab heading="头条" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='top' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="社会" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='shehui' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="国内" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='guonei' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="国际" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='国际' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="娱乐" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='yule' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="体育" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='tiyu' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="军事" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='junshi' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="科技" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='keji' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="财经" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='caijing' navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="时尚" tabStyle={{backgroundColor: Color.white}}
                         activeTabStyle={{backgroundColor: Color.white}}
                         activeTextStyle={{color: Color.main_red}}
                         textStyle={{color: 'black'}}>
                        <NewsItem type='shishang' navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

