'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    ScrollView,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import Api from '../api'
import Reader from './reader'

import { StackNavigator } from 'react-navigation'
const data = [
    {
        "aid": 9045,
        "iid": 245,
        "title": "走进 Node.<b>js</b> 之多进程模型",
        "url": "https://mp.weixin.qq.com/s/BsJV8C71wssATrYEjuEnlg",
        "description": "如何让 Web 应用扩展到多进程模型，充分利用 CPU 资源呢？答案就是 Cluster。这篇文章将带着大家一起分析 Node.js 的多进程模型。",
        "tags": ["Node.js"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FBsJV8C71wssATrYEjuEnlg"
    },
    {
        "aid": 9022,
        "iid": 244,
        "title": "2018 年构建更好的 Node.<b>js</b> 应用的 8 个技巧",
        "url": "https://github.com/xitu/gold-miner/blob/master/TODO/node-js-development-tips-2018.md",
        "description": "本文收集了作者认为 Node.js 开发者在 2018 年需要知道的技巧，快来学习吧~",
        "tags": ["Node.js"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/https%3A%2F%2Fgithub.com%2Fxitu%2Fgold-miner%2Fblob%2Fmaster%2FTODO%2Fnode-js-development-tips-2018.md"
    },
    {
        "aid": 9015,
        "iid": 244,
        "title": "借助 HTML5 details & summary 无 <b>JS</b> 实现各种交互效果",
        "url": "http://www.zhangxinxu.com/wordpress/2018/01/html5-details-summary-no-js-ux/",
        "description": "HTML5 details & summary 这两个标签元素内置交互行为，我们可以充分利用这种交互特性不借助任何 JavaScript 代码实现各种交互效果。当然，前提需要解决自定义以及outline等体验问题。本文就将带你深入探索这两个非常实用的标签元素。",
        "tags": ["Node.js","HTML5"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/http%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2018%2F01%2Fhtml5-details-summary-no-js-ux%2F"
    },
    {
        "aid": 8994,
        "iid": 243,
        "title": "Nuxt.<b>js</b> 踩坑分享",
        "url": "http://mp.weixin.qq.com/s/B8wTL_ETy7NdtzHMz8znkw",
        "description": "本文主要分享 Nuxt.js 开发、构建过程中遇到的坑，如预编译的支持、浏览器环境的 window 对象支持以及 ENV 的配置等。",
        "tags": ["Node.js","Nuxt.js"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/http%3A%2F%2Fmp.weixin.qq.com%2Fs%2FB8wTL_ETy7NdtzHMz8znkw"
    },
    {
        "aid": 8953,
        "iid": 242,
        "title": "用 Node.<b>js</b> 写一个跳一跳外挂",
        "url": "https://blog.jedm.cn/jump-game/",
        "description": "换个方式来玩“跳一跳”小游戏。",
        "tags": ["Node.js","JavaScript","图形处理"],
        "provider": "jedmeng",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/https%3A%2F%2Fblog.jedm.cn%2Fjump-game%2F"
    },
    {
        "aid": 8944,
        "iid": 241,
        "title": "N 阶贝塞尔曲线生成器：bezierMaker.<b>js</b>",
        "url": "https://juejin.im/post/5a450dcdf265da43305ec65a",
        "description": "Canvas 绘制多个控制点的贝塞尔曲线。",
        "tags": ["JavaScript", "canvas"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/https%3A%2F%2Fjuejin.im%2Fpost%2F5a450dcdf265da43305ec65a"
    },
    {
        "aid": 8890,
        "iid": 239,
        "title": "Node.<b>js</b> 中遇到含空格 URL 的神奇“Bug”：小范围深入 HTTP 协议",
        "url": "https://zhuanlan.zhihu.com/xtech",
        "description": "作者深入探索问题的经历，再次体现了遇到问题看源码看规范的重要性。",
        "tags": ["Node.js","HTTP"],
        "provider": "",
        "status": 1,
        "readability_url": "http://weeklyapi.75team.com/transcode/https%3A%2F%2Fzhuanlan.zhihu.com%2Fxtech"
    }
]
export default class Mark extends Component {
    static navigationOptions = {
        title: '收藏',
        headerStyle: {
            backgroundColor: '#649F0C'
        },
        headerTintColor: '#fff'
    }
    _searchArticle = (event)=>{
        
    }

    render(){
        console.log(this.props.navigation)
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fafafa'
            }}>
                <View style={{
                        height: 44,
                        backgroundColor:'#C9C9CE',
                        padding: 8,
                    }}>
                    <TextInput placeholder="Search"
                        style={{
                            height: 28,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                            color: '#333'
                        }}
                        blurOnSubmit={true}
                        onSubmitEditing={this._searchArticle}
                        clearButtonMode='while-editing'
                        placeholderTextColor='#8E8E93'
                    />
                </View>
                <List navigation={this.props.navigation}/>
            </View>
        )
    }
}

class List extends Component {
    constructor(props){
        super(props)
    }
    _jumpPage = (item)=>{
        console.log(this.props.navigation)
        this.props.navigation.navigate('Reader',{
            item:item
        })
    }
    _renderItem = ({item})=>{
        const _this = this;
        return (
            <TouchableWithoutFeedback onPress={()=>{
                _this._jumpPage(item)
            }}>
                <View style={styles.item}>
                    <Text style={styles.itemHeader}>{item.title}</Text>
                    <Text style={styles.itemText}>奇舞周刊第{item.iid}期</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _keyExtractor = (item, index) => item.title;
    render(){
        return (
            <ScrollView>
                <FlatList
                    data={data}
                    style={{paddingLeft:16,paddingRight:16}}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                ></FlatList>
            </ScrollView>
        )         
    }
}
const styles = StyleSheet.create({
    item: {
        paddingTop: 18,
        paddingBottom: 16,
        borderColor: '#979797',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    itemHeader: {
        fontSize: 18,
        color: '#666666',
        marginBottom: 14
    },
    itemText: {
        fontSize: 14,
        color: '#999999'
    }
})

/* export default StackNavigator({
    Home: {
        screen: Mark
    },
    Reader: {
        screen: Reader
    }
},{
    mode: 'modal',
    headerMode: 'none'
}) */