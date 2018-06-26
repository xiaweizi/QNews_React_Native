/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, FlatList, Image, TextInput, Dimensions, Alert} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    View,
    Text,
    Button,
} from 'native-base';
import Color from "../utils/Color";
import Size from "../utils/Size";
import Loading from "../utils/Loading";
import String from "../utils/String";

const {width, height} = Dimensions.get('window');
const url = 'http://op.juhe.cn/robot/index?userid=12&key=98b8f13ededd2f7e1d593819a6bb3639&info=';
export default class Robot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    isSend: true,
                    content: '小爱同学~',
                    time:'1',
                },
                {
                    isSend: false,
                    content: '我在~',
                    time: '2',
                }
            ],
            loadingVisible: false,
            sendEnable: false,
            sendContent: '',
        };
    };

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Color.main_color}}
                        androidStatusBarColor={Color.main_color_primary}>
                    <Body>
                    <Title style={{marginLeft: Size.public_margin}}>小爱同学</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <FlatList
                        ref = '_FlatList'
                        style={{height: height - 350}}
                        data={this.state.data}
                        keyExtractor={this.keyExtractor}
                        renderItem={({item, index}) => {
                            return this.getView(item, this.props.navigation)
                        }}
                    />

                    {
                        this.state.loadingVisible ? (
                            <Loading/>
                        ) : null
                    }
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    backgroundColor: Color.white,
                }}>
                    <TextInput
                        style={{
                            width: width / 3 * 2,
                            flex: 1,
                            height: 50,
                            marginLeft: Size.public_margin,
                            marginRight: Size.public_margin
                        }}
                        placeholder={'请输入内容'}
                        maxLength={30}
                        returnKeyType={'send'}
                        onSubmitEditing={()=>{
                            this.sendMsg();
                        }}
                        value={this.state.sendContent}
                        onChangeText={
                            (text) => {
                                console.log('Robot', text !== '');
                                this.setState({
                                    sendEnable: text !== '',
                                    sendContent: text,
                                })
                            }
                        }
                    />
                    <Button
                        disabled={!this.state.sendEnable}
                        style={{
                            width: 60,
                            height: 30,
                            alignSelf: 'center',
                            marginRight: Size.public_margin,
                            backgroundColor:this.state.sendEnable ? 'green' : '#b5b5b5',
                        }}
                        onPress={() => {
                            this.sendMsg();
                        }}>
                        <Text>
                            发送
                        </Text>
                    </Button>

                </View>
            </Container>
        );
    }

    sendMsg() {
        if (this.state.sendContent == '') {
            Alert.alert(
                '提示',
                '内容不能为空'
            );
            return
        }
        let msg = {
            isSend: true,
            content: this.state.sendContent,
            time: (new Date()).valueOf() + ''
        };
        console.log('Robot', msg);
        this.state.data.push(msg);
        this.refs._FlatList.scrollToEnd();
        this.getData(this.state.sendContent);
        this.setState({
            sendContent: ''
        })
    }

    keyExtractor = (item, index) => item.time;

    getView(item, navigation) {
        //这里返回的就是每个Item
        return (
            <View>
                {
                    item.isSend ? <SendItem content={item.content}/> :
                        <ReceiverItem content={item.content}/>
                }
            </View>
        )
    };

    getData(content) {
        this.setState({
            loadingVisible: true
        });
        fetch(url + content)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                this.onSuccess(response)
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    this.onFailed(String.public_net_error)
                }
            });
    }

    onSuccess(response) {
        console.log('Joker', response);
        if (response.error_code == 0) {
            let msg = {
                isSend: false,
                content: response.result.text,
                time: (new Date()).valueOf() + ''
            };
            console.log('Robot', msg);
            this.state.data.push(msg);
            this.refs._FlatList.scrollToEnd();
            this.setState({
                loadingVisible: false,
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

class SendItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>

                <Text style={{
                    paddingTop: Size.public_margin,
                    paddingLeft: 74,
                    paddingBottom: Size.public_margin,
                    minHeight: 34,
                    alignSelf: 'center'
                }}>
                    {this.state.content}
                </Text>
                <Image
                    source={require('../../src/send.png')}
                    style={styles.send_image}
                />
            </View>
        )
    }
}

class ReceiverItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Image
                    source={require('../../src/receiver.png')}
                    style={styles.send_image}
                />
                <Text style={{
                    paddingTop: Size.public_margin,
                    paddingRight: 74,
                    paddingBottom: Size.public_margin,
                    minHeight: 34,
                    alignSelf: 'center'
                }}>
                    {this.state.content}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.white
    },
    send_image: {
        height: 34,
        width: 34,
        borderRadius: 17,
        margin: Size.public_margin,
    }
});