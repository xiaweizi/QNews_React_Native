/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Dimensions
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Loading from "../utils/Loading";
import Color from '../utils/Color'
import Size from '../utils/Size'
import String from '../utils/String'

import NewsDetail from "./NewsDetail";
import NetworkFailureLayout from "../utils/NetworkFailureLayout";

const {width, height} = Dimensions.get('window');


export default class NewsItem extends Component {

    static defaultProps = {
        url: 'http://v.juhe.cn/toutiao/index?key=d78b502268f7456b79fbe7228cecdd46&type='
    };

    constructor(props) {
        super(props);
        console.log('NewsItem', "type:" + props.type);
        this.state = {
            data: [
                // {
                //     thumbnail_pic_s: "http://06.imgmini.eastday.com/mobile/20180621/20180621185141_f561ba39d77a3362e95ae7c816dce18e_1_mwpm_03200403.jpg",
                //     title: 'tittitletitletitletitletitletitletitltittitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitleleetitletitletitletitletitletitletitletitletitlele',
                //     date: "2018-06-21 18:51",
                //     author_name: '金十数据',
                //     uniquekey: 'da',
                //     url:'http://xiaweizi.cn'
                // }
            ], //存储列表使用的数据
            refreshing: false, //当前的刷新状态
            loadingVisible: true,
            type: props.type,
            navigation: props.navigation,
            netErrorVisible: false,
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={({item}) => {
                        return this.getView(item, this.state.navigation)
                    }}

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
                        <NetworkFailureLayout retryClick={()=>{
                            this.setState({
                               loadingVisible: true,
                               netErrorVisible: false,
                            });
                            this.getData()
                        }} />
                    ) : null
                }
            </View>
        );
    }

    getView(item, navigation) {
        //这里返回的就是每个Item
        return (
            <TouchableOpacity activeOpacity={0.8}
                              onPress={() => {
                                  console.log('NewsItem', item.url);
                                  navigation.navigate("NewsDetail", {
                                      url: item.url,
                                      title: item.title
                                  })
                              }}>
                <View style={styles.item}>
                    <View style={styles.news_content}>
                        <Text style={styles.new_title} numberOfLines={3}>
                            {item.title}
                        </Text>
                        <Text style={styles.new_bottom} numberOfLines={1}>
                            {item.author_name} {item.date}
                        </Text>
                    </View>

                    <View>
                        <Image source={{uri: item.thumbnail_pic_s}} style={styles.image}/>
                    </View>

                </View>
            </TouchableOpacity>
        )
    };

    keyExtractor = (item, index) => item.uniquekey;

    /**
     * 下拉属性
     */
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
            loadingVisible: true,
        });
        this.getData();
    };

    //渲染完成，请求网络数据
    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(this.props.url + this.state.type)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                this.onSuccess(response)
            })
            .catch((error) => {
                //网络错误处理
                console.log('error', error);
                this.onFailed(String.public_net_error)
            });
    }

    onSuccess(response) {
        console.log('NewsItem', response);
        if (response.error_code == 0) {
            this.setState({
                data: response.result.data,
                loadingVisible: false,
                refreshing: false,
                netErrorVisible: false,
            });
        } else {
            this.onFailed(response.reason)
        }
    }

    onFailed(msg) {
        console.log('NewsItem', msg);
        this.setState({
            loadingVisible: false,
            refreshing: false,
            netErrorVisible: true,
        });
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: width - 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    image: {
        width: 120,
        height: 100,

        borderRadius: 5,
        marginRight: 5,
    },
    news_content: {
        width: width - 120,
        height: 110,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    new_title: {
        marginRight: 5,
        overflow: 'hidden',
        color: Color.main_text_color,
        fontSize: Size.main_text_size,
    },
    new_bottom: {
        color: Color.sub_text_color,
        fontSize: Size.sub_text_size,
    }
});
