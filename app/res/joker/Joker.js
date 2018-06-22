/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    View,
    Text,
} from 'native-base';
import Color from "../utils/Color";
import Size from "../utils/Size";

export default class Joker extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Color.main_color}} androidStatusBarColor={Color.main_color_primary}>
                    <Body>
                    <Title style={{marginLeft: Size.public_margin}}>段子</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <Text>
                        Joker
                    </Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});