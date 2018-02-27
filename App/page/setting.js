'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Image,
    Switch,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import Api from '../api'

export default class Setting extends Component {
    constructor(props){
        super(props)
        this.state = {
            cache: '1.2M',
            value: true
        }
    }
    static navigationOptions = {
        title: '设置',
        headerStyle: {
            backgroundColor: '#649F0C'
        },
        headerTintColor: '#fff'
    }
    
    _clearCache = ()=>{
        this.setState({
            cache: '0'
        },()=>{
            Alert.alert('缓存已清除')
        })
    }
    _changeValue = ()=>{
        this.setState({
            value: !this.state.value
        })
    }

    render(){
        const icon = require('../icon/logo-120.png');
        return (
            <View style={styles.container}>
                <Image source={icon} style={styles.icon}/>
                <Text style={styles.name}>奇舞周刊 v0.0.1</Text>
                <View style={styles.highOption}>
                    <View style={{alignSelf:'flex-start',flexGrow:1}}>
                        <Text style={{fontSize:17,color: '#000',marginBottom:8}}>网页转码</Text>
                        <Text style={{fontSize:14,color: '#909094'}}>节约流量和优化阅读体验</Text>
                    </View>
                    <Switch 
                        style={{alignSelf:'flex-end'}}
                        value={this.state.value}
                        onValueChange={this._changeValue}
                    ></Switch>
                </View>
                <TouchableWithoutFeedback onPress={this._clearCache}>
                    <View style={styles.option}>
                        <Text style={{fontSize:17,color: '#000',alignSelf:'flex-start',flexGrow:1}}>清除缓存</Text>
                        <Text style={{fontSize:12,color: '#909094',alignSelf:'flex-end'}}>{this.state.cache}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    icon: {
        height: 106,
        width: 106,
        marginTop: 16,
        marginBottom: 4
    },
    name: {
        fontSize: 12,
        color: '#333',
        marginBottom: 22
    },
    highOption: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        marginBottom: 16,
        flexDirection: 'row',
        paddingTop:12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    option: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        marginBottom: 16,
        paddingTop:12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
    }
})