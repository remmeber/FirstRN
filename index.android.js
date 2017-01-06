import React, {
    Component,
    PropTypes
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Text,
    View,
    Navigator,
    ToastAndroid
} from 'react-native';

// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showText: true };
//     // setInterval(
//     //   () => {
//     //     this.setState({ showText: !this.state.showText })
//     //   }, 1000
//     // );
//   }
//   render() {
//     let display = this.state.showText ? this.props.text : '';
//     return (
//       <Text>
//         {display}
//       </Text>
//     );
//   }
// }

// class Person extends Component {

//     static propTypes = {
//         name: PropTypes.string.isRequired,
//         age: PropTypes.number.isRequired
//     }
//     static get defaultProps() {//获取默认属性
//         return {
//             name: "陈    洋",
//             age: 18,
//         }
//     }
//     render() {
//         var names = ['rhg', 'cy'];
//         names.map((name) => {
//             // console.log(name)
//         })
//         return (
//             <View >
//                 <Text style={{
//                     color: 'black',
//                     textAlign: 'center',//水平居中
//                     textAlignVertical: 'center'
//                 }}>
//                     name: {this.props.name}
//                 </Text>
//                 <Text style={{
//                     color: 'black',
//                     textAlign: 'center',//水平居中
//                     textAlignVertical: 'center'
//                 }}>
//                     age: {this.props.age}</Text>
//                 <View
//                     style={{ height: 1, backgroundColor: '#CCCCCC' }}
//                     />


//             </View >
//         );
//     }
// }

// function BoilingVerdict(props) {
//     if (props.celsius >= 100) {
//         return <p>The water would boil.</p>;
//     } else {
//         return <p>The water would not boil.</p>;
//     }
// }



var Title = require('./Title');


class AwesomeProject extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });


        this.state = {
            dataSource: ds,//.cloneWithRowsAndSections({
            //   第一组: ['rhg', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'],
            //   第二组: ['Rhg', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'],
            //   第三组: ['Rhg', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'],
            //   第四组: ['Rhg', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'],
            //   第五组: ['Rhg', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin']
            // }),
            textWeight: 'normal',
            loaded: false,
            url: 'http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=football&_sport_s_=opta&_sport_a_=teamOrder&type=213&season=2016&format=json'
        };
    }


    async _fetch(url) {
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            // console.log(responseJson.result.data);
            this.setState(
                {
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.result.data),
                    loaded: true
                }
            )
        } catch (error) {
            console.log(error);
        }

    }

    componentWillMount() {
        console.log('componentWillMount is done');
        this._fetch(this.state.url);
    }

    _renderLoading() {
        return (
            <View style={[styles.vertical, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                <Text >Loading data......</Text>
            </View>
        );
    }

    a_pressRow(rowData, rowID) {
        alert(rowData);
        // this._pressData[rowID] = !this._pressData[rowID];
        // this.setState({ dataSource: this.state.dataSource.cloneWithRows(this._genRows(rowID)) });
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        // console.log(rowData.logo);
        return (

            <TouchableHighlight
                onPress={() => { this.a_pressRow(rowData.team_cn, rowID); } }
                activeOpacity={0.2}    //点击的时候包裹的view的透明度，0表示完全透明，1不透明;范围:[0,1]
                onShowUnderlay={() => { console.log('onShowUnderlay') } }
                underlayColor={'#dcdcdc55'} //区别于andorid:Argb  这里rgbA
                >
                <View style={styles.horizontal}>
                    <View style={[styles.vertical, { marginLeft: 10 }]}>
                        <Text style={[styles.textCenter, { fontSize: 15 }]}>{rowData.team_cn}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12 }]}>{'小组编号:' + rowData.team_id}</Text>
                        <Image style={[styles.image, { marginLeft: 10 }]} source={{ uri: rowData.logo }}
                            // onProgress={(e)=>{Math.round(100*e.nativeEvent.loaded/e.nativeEvent.total)}}
                            />
                    </View>

                    <View style={[styles.vertical, { marginLeft: 15 }]}>
                        <Text style={[styles.textCenter, { fontSize: 15, color: '#ffffff00' }]}>{'主场'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12 }]}>{'得分:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'赢球:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'输球:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'平球:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'进球:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'丢球:'}</Text>
                        <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{'实际进球:'}</Text>
                    </View>

                    <View style={[styles.horizontal, { flex: 1, marginLeft: 15 }]}>
                        <View style={[styles.vertical, { flex: 1 }]}>
                            <Text style={[styles.textCenter, { fontSize: 15, color: 'red' }]}>{'主场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12 }]}>{rowData.home_score + '分'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_win + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_lose + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_draw + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_goal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_losegoal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.home_truegoal + '个'}</Text>
                        </View>
                        <View style={[styles.vertical, { marginLeft: 15 }, { flex: 1 }]}>
                            <Text style={[styles.textCenter, { fontSize: 15 }, { color: 'red' }]}>{'客场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12 }]}>{rowData.away_score + '分'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_win + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_lose + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_draw + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_goal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_losegoal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.away_truegoal + '个'}</Text>
                        </View>
                        <View style={[styles.vertical, { marginLeft: 15 }, { flex: 1 }]}>
                            <Text style={[styles.textCenter, { fontSize: 15 }, { color: 'red' }]}>{'汇总'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12 }]}>{rowData.score + '分'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.win + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.lose + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.draw + '场'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.goal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.losegoal + '个'}</Text>
                            <Text style={[styles.textCenter, { fontSize: 12, marginTop: 0 }]}>{rowData.truegoal + '个'}</Text>
                        </View>
                    </View>
                </View>

            </TouchableHighlight>
        );
    }

    _renderSection(sectionData, sectionID) {
        return (
            <View >
                <Text style={[styles.textCenter, { color: 'green' }]}>
                    {sectionID}
                </Text>

                <View
                    style={styles.sectionLine}
                    />
            </View>
        )

    }


    _renderScreen(route, navigator) {
        var content = this.state.loaded ?
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                onChangeVisibleRows={(visibleRows, changedRows) => { console.log('visible row is: ' + visibleRows.sectionID) } }
                onEndReached={() => { console.log("end") } }
                onEndReachedThreshold={10}
                // renderSectionHeader={this._renderSection}

                // renderFooter={
                //     // () => <Person />
                // }//展示footview
                // renderHeader={
                //     // () => <Person />
                // }//展示headerview
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                    return (
                        <View
                            key={`${sectionID}-${rowID}`}
                            style={{ height: adjacentRowHighlighted ? 4 : 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC', }}
                            />
                    )
                } }

                showsVerticalScrollIndicator={false}
                // renderSectionHeader={(sectionData, sectionID) => <Text style={{ color: 'red' }}>{'section data is:' + sectionData + ' ' + sectionID}</Text>}

                />
            : this._renderLoading();
        return (
            <View style={[styles.vertical, { flex: 1 }]}>
                <Title
                    onBack={() => { ToastAndroid.showWithGravity('back', ToastAndroid.SHORT, ToastAndroid.CENTER) } }
                    title={route.title} />

                {content}
            </View>
        )
    }




    render() {

        return (
            <Navigator
                initialRoute={{ title: '2016足球联赛', index: 0 }}
                renderScene={this._renderScreen.bind(this)}
                />
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
        width: 70,
        height: 90,
        marginBottom: 5,
        marginTop: 5
    },
    sectionLine: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});
// 注意，这里用引号括起来的'AwesomeProject'必须和你init创建的项目名一致 
AppRegistry.registerComponent('First', () => AwesomeProject);  