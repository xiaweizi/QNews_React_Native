/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, ToastAndroid, FlatList, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    View,
    Text,
    Card,
    CardItem
} from 'native-base';
import Loading from '../utils/Loading'
import Color from "../utils/Color";
import Size from "../utils/Size";
import String from "../utils/String";
import NetworkFailureLayout from "../utils/NetworkFailureLayout";

const url = 'http://v.juhe.cn/todayOnhistory/queryEvent.php?key=f5f7d655ef148f6bb777c80167f7f6de&date=';

export default class Today extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // {
                //     title: '罗马共和国开始使用儒略历1',
                //     date: '前45年01月01日',
                //     e_id: '1',
                // },
                // {
                //     title: '罗马共和国开始使用儒略历2',
                //     date: '前45年01月01日',
                //     e_id: '2',
                // },
                // {
                //     title: '罗马共和国开始使用儒略历3',
                //     date: '前45年01月01日',
                //     e_id: '3',
                // },
                // {
                //     title: '罗马共和国开始使用儒略历4',
                //     date: '前45年01月01日',
                //     e_id: '4',
                // },
            ],
            refreshing: false,
            loadingVisible: true,
            netErrorVisible: false,
        };
    };

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Color.main_color}}
                        androidStatusBarColor={Color.main_color_primary}>
                    <Body>
                    <Title style={{marginLeft: Size.public_margin}}>历史上的今天</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={this.keyExtractor}
                        renderItem={({item, index}) => {
                            return this.getView(item, this.props.navigation)
                        }}
                        numColumns={2}
                        horizontal={false}
                        //下拉刷新，必须设置refreshing状态
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                    />
                    {
                        this.state.loadingVisible ? (
                            <Loading/>
                        ) : null
                    }
                    {
                        this.state.netErrorVisible ? (
                                <NetworkFailureLayout retryClick={() => {
                                    this.setState({
                                        loadingVisible: true,
                                        netErrorVisible: false,
                                    });
                                    this.getData()
                                }
                                }/>)
                            : null
                    }
                </View>
            </Container>
        );
    }

    keyExtractor = (item, index) => item.e_id;
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
            loadingVisible: true,
        });
        this.getData()
    };

    getView(item, navigation) {
        //这里返回的就是每个Item
        return (
            <View style={styles.today_card}>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                      navigation.navigate('TodayDetail', {
                                          e_id: item.e_id
                                      })
                                  }}>
                    <Text style={{color: Color.main_text_color, fontSize: Size.middle_text_size}}>
                        {item.title}
                    </Text>

                    <Text style={styles.today_date}>
                        {item.date}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        let nowDate = new Date();
        let date = nowDate.getMonth() + 1 + '/' + nowDate.getDate();
        fetch(url + date)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                this.onSuccess(response)
            })
            .catch((error) => {
                    //网络错误处理
                this.onFailed(String.public_net_error)
            });
    }

    onSuccess(response) {
        console.log('Joker', response);
        if (response.error_code == 0) {

            this.setState({
                data: response.result,
                loadingVisible: false,
                refreshing: false,
                netErrorVisible: false,
            })
        } else {
            this.onFailed(response.reason)
        }
    }

    onFailed(msg) {
        this.setState({
            loadingVisible: false,
            refreshing: false,
            netErrorVisible: true,
        });
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    today_card: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        margin: 5,
        height: 120,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    today_date: {
        marginTop: Size.public_margin / 2,
        alignSelf: 'flex-end',
        color: Color.sub_text_color,
        fontSize: Size.sub_text_size
    }
});
