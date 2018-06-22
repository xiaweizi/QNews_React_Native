/**
 * created by xiaweizi on 2018/6/22
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView, Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri:'http://mini.eastday.com/mobile/180622100846232.html'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}//开启dom存贮
                    javaScriptEnabled={true}//开启js
                    style={styles.webview_style}
                    onLoad={(e) => console.log('onLoad')}
                    onLoadEnd={(e) => console.log('onLoadEnd')}
                    onLoadStart={(e) => console.log('onLoadStart')}>
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview_style:{
        width: width,
        height: height,
    }
});