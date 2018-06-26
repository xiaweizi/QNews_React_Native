/**
 * created by xiaweizi on 2018/6/22
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, ScrollView, ToastAndroid, Image} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    View,
    Text,
    Left,
    Icon,
    Button,
    Card,
    CardItem,
} from 'native-base';
import Color from "../utils/Color";
import Size from "../utils/Size";

const {width, height} = Dimensions.get('window');
import Loading from '../utils/Loading'
import Swiper from 'react-native-swiper';
import String from "../utils/String";
import NetworkFailureLayout from "../utils/NetworkFailureLayout";


const url = 'http://v.juhe.cn/todayOnhistory/queryDetail.php?key=f5f7d655ef148f6bb777c80167f7f6de&e_id=';
export default class TodayDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            e_id: this.props.navigation.getParam('e_id', '1'),
            title: '',
            content: '',
            loadingVisible: true,
            pic: [],
            swipeShow: false, // 控制滚动图片是否展示
            netErrorVisible: false,
        };
    };

    render() {
        let pages = [];
        this.state.pic.forEach(item => {
            console.log('TodayDetail', item);
            pages.push(
                <View style={{height: 250}} key={'key'}>
                    <Image style={{flex: 1}}
                           source={{uri: item.url}}/>
                </View>
            )
        });
        return (
            <Container>
                <Header style={{backgroundColor: Color.main_color}}
                        androidStatusBarColor={Color.main_color_primary}>
                    <Left>
                        <Button
                            transparent={true}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>
                        {this.state.title}
                    </Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {
                                this.state.swipeShow ?
                                    <Swiper style={styles.today_detail_swiper} autoplay={true}>
                                        {pages}
                                    </Swiper> : null
                            }
                            <View style={styles.today_detail_content_card}>
                                <Text style={{
                                    fontSize: Size.middle_text_size,
                                    color: Color.main_text_color
                                }}>
                                    {this.state.content}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                </View>
                {
                    this.state.loadingVisible ? (
                        <Loading/>
                    ) : null
                }
                {
                    this.state.netErrorVisible ? (
                        <NetworkFailureLayout retryClick={()=>{
                            this.getData();
                            this.setState({
                                netErrorVisible: false,
                                loadingVisible: true,
                            })
                        }} />
                    ) : null
                }
            </Container>
        );
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        console.log('TodayDetail', this.state.e_id);
        fetch(url + this.state.e_id)
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
                title: response.result[0].title,
                content: response.result[0].content,
                loadingVisible: false,
                pic: response.result[0].picUrl
            });
            let visible = response.result[0].picUrl.length !== 0;
            this.setState({
                swipeShow: visible,
                netErrorVisible: false,
            })
        } else {
            this.onFailed(response.reason)
        }
    }

    onFailed(msg) {
        this.setState({
            loadingVisible: false,
            netErrorVisible: true,
        });
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    today_detail_content_card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Size.public_margin,
        paddingLeft: Size.public_margin,
        paddingRight: Size.public_margin,
        paddingTop: Size.public_margin / 2,
        width: width - Size.public_margin * 2,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: Color.white,
        borderWidth: 0,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: Size.public_margin,
        elevation: 3,
        overflow: 'hidden',
    },
    today_detail_swiper: {
        width: width,
        height: 250,
        marginTop: Size.public_margin,
    }
});