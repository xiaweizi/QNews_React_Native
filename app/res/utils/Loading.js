/**
 * created by xiaweizi on 2018/6/21
 * function:
 * desc:
 */
import Color from './Color'
import React from 'react';

import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

export default class Loading extends React.Component{
    render(){
        return(
            <View style={loadStyles.wrapper}>
                <View style={loadStyles.box}>
                    <ActivityIndicator
                        animating={true}
                        color={Color.white}
                        size='large'
                    />
                    <Text style={loadStyles.txt}>数据加载中...</Text>
                </View>
            </View>
        )
    }
}

const loadStyles=StyleSheet.create({
    wrapper:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        zIndex:10,
    },
    box:{
        paddingVertical:12,
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)',
        borderRadius:6
    },
    txt:{
        marginLeft:20,
        fontSize:14,
        color:Color.white,
    }
})