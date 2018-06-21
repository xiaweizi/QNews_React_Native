/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Joker extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Joker
                </Text>
            </View>
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