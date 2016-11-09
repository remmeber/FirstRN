'use strict';
import React, {
    Component,
    PropTypes
} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Image,
    Text,
    View
    
} from 'react-native';

class Title extends Component {
    render() {
        return (
            <View style={styles.horizontal}>
                <View style={{ width: 45, height: 45 }}>
                    <TouchableHighlight 
                    onPress={this.props.onBack}
                    activeOpacity={0.5}
                    underlayColor={'#dcdcdc55'}
                    >
                        <Image
                            style={styles.image}
                            
                            source={require('image!a')} />
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 45 }}>
                    <Text style={styles.textCenter}>
                        {this.props.title}
                    </Text>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    vertical: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // alignSelf: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        // flex: 1,//指定某个组件扩张以撑满所有剩余的空间
        // flexDirection: 'row-reverse',//row:布局内容水平排列，从左往右；column：为垂直排列，从上往下；row-reverse:从右往左排列；column-reverse:从下往上排列
        // justifyContent: 'center',//用于child在主轴上的分布，flex-start, center, flex-end, space-around(平分空间), and space-between
        // alignSelf: 'center',
        // alignItems: 'center',//用于child在垂直主轴上的分布 flex-start, center, flex-end, and stretch
        backgroundColor: '#F5F5F5',
    },
    textCenter: {
        // flex: 1,
        fontSize: 20,
        // backgroundColor: 'black',
        color: 'black',
        textAlign: 'left',//水平居中
        textAlignVertical: 'center',//垂直居中
        marginTop: 5,
        alignSelf: 'center',
        // width: 40,
        // height: 40,
    },
    image: {
        marginBottom: 5,
        marginTop: 5
    },
    sectionLine: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});

module.exports = Title;