'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    SectionList,
    TouchableWithoutFeedback
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Api from '../api'
import AddBtn from '../common/addBtn'
import List from './list'

export default class Home extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: '奇舞周刊',
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff',
            headerRight: (
                <AddBtn navigation={navigation}/>
            ),
            tabBarLabel: '最新',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ tintColor }) => (
            <Image
                resizeMode='contain'
                source={require('../icon/newest.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
            )
        }
    }
    render(){
        return (
            <List/>
        )
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    }
})