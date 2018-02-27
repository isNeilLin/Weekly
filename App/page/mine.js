'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import AddBtn from '../common/addBtn'

const toMarkAction = NavigationActions.navigate({
    routeName: 'Mark'
})

export default class Mine extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: '我的',
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff',
            headerRight: (
                <AddBtn navigation={navigation}/>
            ),
            tabBarLabel: '我的',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ tintColor }) => (
            <Image
                resizeMode='contain'
                source={require('../icon/my.png')}
                style={[styles.tabIcon, {tintColor: tintColor}]}
            />
            )
        }
    }
    _editProfile = ()=>{
        this.props.navigation.navigate('Setting')
    }
    _openMark = ()=>{
        this.props.navigation.dispatch(toMarkAction);
    }
    _openSetting = ()=>{
        this.props.navigation.navigate('Setting')
    }

    render(){
        const icon = require('../icon/logo-57.png')
        const mark = require('../icon/mark.png')
        const setting = require('../icon/setting.png')
        const arrow = require('../icon/forward.png')
        return (
            <View style={{backgroundColor: '#fafafa'}}>
                <View style={styles.infoHeader}>
                    <TouchableWithoutFeedback onPress={this._editProfile}>
                        <View style={{alignSelf: 'flex-end'}}>
                            <Text style={styles.editProfile}>编辑</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Image source={icon} style={styles.headerIcon}/>
                    <Text style={styles.user}>Username</Text>
                </View>
                <View style={styles.optionList}>
                    <TouchableWithoutFeedback onPress={this._openMark}>
                        <View style={styles.option}>
                            <Image source={mark} style={styles.icon}/>
                            <Text style={styles.optionText}>我的收藏</Text>
                            <Image source={arrow} style={styles.arrow}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#ccc'
                    }}></View>
                    <TouchableWithoutFeedback onPress={this._openSetting}>
                        <View style={styles.option}>
                            <Image source={setting} style={styles.icon}/>
                            <Text style={styles.optionText}>设置</Text>
                            <Image source={arrow} style={styles.arrow}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#ccc'
                    }}></View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    infoHeader: {
        height: 147,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    headerIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginBottom: 16
    },
    user: {
        fontSize: 14,
        color: '#999'
    },
    editProfile: {
        marginTop:12,
        marginRight:12,
        fontSize: 14,
        color: '#bbb'
    },
    optionList: {
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        marginTop: 22,
        flexGrow: 1
    },
    option: {
        height: 44,
        paddingLeft: 16,
        paddingRight: 12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 12
    },
    optionText: {
        fontSize: 14,
        flex: 1
    },
    arrow: {
        width: 8,
        height: 18
    },
    tabIcon: {
        width: 26,
        height: 26,
    }
})
