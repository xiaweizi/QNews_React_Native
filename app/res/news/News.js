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
import Loading from "../utils/Loading";
import Color from '../utils/Color'
import Size from '../utils/Size'

const {width, height} = Dimensions.get('window');

export default class News extends Component {

    static defaultProps = {
        url: 'http://v.juhe.cn/toutiao/index?key=d78b502268f7456b79fbe7228cecdd46&type=top'
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [], //存储列表使用的数据
            refreshing: false, //当前的刷新状态
            loadingVisible: true,
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.getView}

                    //下拉刷新，必须设置refreshing状态
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                />
                {
                    this.state.loadingVisible ? (
                        <Loading/>
                    ) : null
                }
            </View>
        );
    }

    getView({item}) {
        //这里返回的就是每个Item
        return (
            <TouchableOpacity activeOpacity={0.5}
                              onPress={() => {
                                  console.log('News', item);
                              }}>
                <View style={styles.item}>
                    <View style={styles.news_content}>
                        <Text style={styles.new_title} numberOfLines={3} >
                            {item.title}
                        </Text>
                        <Text style={styles.new_bottom} numberOfLines={1}>
                            {item.author_name}    {item.date}
                        </Text>
                    </View>

                    <View>
                        <Image source={{uri: item.thumbnail_pic_s}} style={styles.image}/>
                    </View>

                </View>
            </TouchableOpacity>
        )
    };

    keyExtractor = (item, index) => item.id;

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
        fetch(this.props.url)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                this.onSuccess(response)
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    console.log('error', error);
                }
            });
    }

    onSuccess(response) {
        console.log('News', response);
        if (response.error_code == 0) {
            this.setState({
                data: response.result.data,
                loadingVisible: false,
                refreshing: false,

            });
        } else {
            this.onFailed(response.reason)
        }
    }

    onFailed(msg) {
        console.log('News', msg);
        this.setState({
            loadingVisible: false,
            refreshing: false,
        }),
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
        width: width,
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
        fontSize: 20,
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