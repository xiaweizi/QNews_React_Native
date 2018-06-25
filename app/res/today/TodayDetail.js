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


const url = 'http://v.juhe.cn/todayOnhistory/queryDetail.php?key=f5f7d655ef148f6bb777c80167f7f6de&e_id=';
export default class TodayDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            e_id: this.props.navigation.getParam('e_id', '1'),
            title: '',
            content: '',
            loadingVisible: true,
            pic: ['1'],
        };
    };

    render() {
        let pages = [];
        this.state.pic.forEach(item => {
            console.log('TodayDetail', item);
            pages.push(
                    <View style={{height: 200, flex: 1}}  key={'key'}>
                        <Image style={{flex: 1}}
                               source={{uri: item.url}}/>
                    </View>
            )
        });
        let v = pages == null;
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
                            <Swiper style={styles.today_detail_swiper} autoplay={true} hidden={true}>
                                {pages}
                            </Swiper>
                            <Card style={styles.today_detail_content_card}>
                                <Text style={{fontSize: Size.main_text_size}}>
                                    {this.state.content}
                                </Text>
                            </Card>
                        </View>
                    </ScrollView>

                </View>
                {
                    this.state.loadingVisible ? (
                        <Loading/>
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
                if (error) {
                    //网络错误处理
                    this.onFailed(error.getMessage())
                }
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
            })
        } else {
            this.onFailed(response.reason)
        }
    }

    onFailed(msg) {
        this.setState({
            loadingVisible: false,
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
        paddingLeft: Size.public_margin,
        paddingRight: Size.public_margin,
        width: width - Size.public_margin * 2,
    },
    today_detail_swiper: {
        width: width,
        height: 150,
    }
});