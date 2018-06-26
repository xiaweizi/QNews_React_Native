import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
} from 'react-native';
import {Button} from 'native-base';
import Color from "./Color";
import String from "./String";
import Size from "./Size";

export default class NetworkFailureLayout extends Component {

    static propTypes = {
        retryClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <View style={netStyles.wrapper}>
                <Image
                    source={require('../../src/net.png')}
                    style={{width: 100, height: 100}}
                />
                <Text style={{
                    marginTop: Size.public_margin, color: Color.sub_text_color,
                }}>
                    {String.public_net_error}
                </Text>

                <Button
                    onPress={() => {
                        if (this.props.retryClick != null) {
                            this.props.retryClick()
                        }
                    }}
                    style={netStyles.bt_retry}>
                    <Text style={{
                        flex: 1,
                        color: Color.white,
                        textAlign: 'center',
                    }}>
                        重试
                    </Text>
                </Button>
            </View>
        )
    }
}

const netStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        zIndex: 10,
    },
    bt_retry: {
        backgroundColor: Color.public_green_color,
        width: 100,
        marginTop: Size.public_margin,
        alignSelf: 'center',
        height: 30,
    }
});

