'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Alert,
    Button,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import Api from '../api'

export default class AddArticle extends Component {
    static navigationOptions = {
        title: '推荐文章',
        headerStyle: {
            backgroundColor: '#649F0C'
        },
        headerTintColor: '#fff'
    }
    _submit(){
        Alert.alert('提交成功')
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.label}>文章标题</Text>
                <TextInput style={styles.input} placeholder="100字以内" maxLength={100}/>
                <Text style={styles.label}>文章URL</Text>
                <TextInput style={styles.input} placeholder="256字以内" maxLength={256}/>
                <Text style={styles.label}>推荐理由</Text>
                <TextInput 
                    style={styles.textarea} 
                    placeholder="请填写为什么推荐这篇文章或者该文章的简介，512字内，允许html" 
                    maxLength={512}
                    multiline={true}
                />
                <Text style={styles.label}>关键词</Text>
                <TextInput style={styles.input} placeholder="比如Javascript, 响应式。多个用逗号隔开"/>
                <Text style={styles.label}>您的名字</Text>
                <TextInput style={styles.input} placeholder=""/>
                <TouchableWithoutFeedback onPress={this._submit}>
                    <View>
                        <Text style={styles.button}>提交</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fafafa'
    },
    label: {
        height: 20,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10
    },
    input: {
        borderRadius: 6,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#333',
        height: 32,
        paddingLeft: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        marginBottom: 10 
    },
    textarea: {
        borderRadius: 6,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#333',
        height: 82,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        paddingLeft: 8,
        marginBottom: 10
    },
    button: {
        marginTop: 6,
        backgroundColor: '#0078E7',
        color: '#fff',
        fontSize: 14,
        width: 68,
        height:32,
        lineHeight: 30,
        textAlign: 'center'
    }
})