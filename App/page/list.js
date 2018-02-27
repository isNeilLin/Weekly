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
import Api from '../api'
import {withNavigation} from 'react-navigation'

class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: navigation.getParam('title') || '奇舞周刊',
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff'
        }
    }

    componentWillMount(){
        if(this.props.navigation.getParam('iid')){
            this._fetchData(this.props.navigation.getParam('iid'))
        }else{
            this._fetchData();
        }
    }
    _fetchData(iid){
        let apiResult;
        if(typeof iid === 'undefined'){
            apiResult = Api.getNewest()
        }else {
            apiResult = Api.getDetail(iid)
        }
        console.log(apiResult)
        apiResult
        .then((responseData) => {
          console.log(responseData)
          this.setState({
              data: responseData
          })
        })
        .done();
        console.log(this.state)
    }

    _jumpPage = (item)=>{
        this.props.navigation.navigate('Reader', {
            item: item
        });
    }

    _renderItem = ({item})=>{
        const editor = this.state.data.editor;
        const share = require('../icon/share.png');
        const mark = require('../icon/mark.png');
        return (
            <TouchableWithoutFeedback onPress={()=>{this._jumpPage(item)}}>
                <View>
                    <StatusBar barStyle='light-content'/>
                    <View style={styles.recommend}>
                        <Text style={{fontSize:12,color:'#999',lineHeight:24,flexGrow:1}}>{editor}推荐</Text>
                        <Text
                            style={{fontSize:18,lineHeight:24}}
                        ><Image source={share}
                            style={{width:18,height:18}}
                        /> 分享</Text>
                        <Text
                            style={{marginLeft:12,fontSize:18,lineHeight:24,color:'#649F0C'}}
                        ><Image source={mark}
                            style={{width:18,height:18,tintColor:'#649F0C'}}
                        /> 收藏</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.text}>{item.description}</Text>
                        <Text style={styles.text}>{item.tags.join(' ')}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _renderSectionHeader = ({section})=>{
        return (
            <Text style={styles.sectionHeader}>{section.title}</Text>
        )
    }
    _keyExtractor = (item, index) => item.title;

    render(){
        const data = this.state.data;
        if(data){
            const section = data.article.map(item=>{
                let title = Object.keys(item)[0];
                let data = Object.values(item)[0];
                return {
                    title,
                    data
                }
            })
            return (
                <ScrollView style={styles.container}>
                    <StatusBar
                        animated={true}
                        hidden={false}
                        backgroundColor={'#fff'}
                        translucent={false}
                        barStyle={'default'}
                        showHideTransition={'fade'}
                        networkActivityIndicatorVisible={false}
                    />
                    <View style={styles.content}>
                        <Text style={styles.header}>奇舞周刊第{data.iid}期  更新于{data.date}</Text>
                        <SectionList
                            sections={section}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            renderSectionHeader={this._renderSectionHeader}
                        >
                        </SectionList>
                    </View>
                </ScrollView>
            )
        }else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 54,
        fontSize: 16,
        lineHeight: 54,
        textAlign: 'center',
        color: '#541167'
    },
    item: {
        paddingBottom: 16,
        paddingLeft: 12,
        paddingRight: 12
    },
    sectionHeader: {
        width: 180,
        height: 30,
        lineHeight: 30,
        backgroundColor: '#649F0C',
        color: '#fff',
        fontSize: 16,
        paddingLeft: 20
    },
    itemTitle: {
        fontSize: 20,
        marginBottom: 4,
        marginTop: 8
    },
    text: {
        fontSize: 16,
        color: '#999',
        marginTop: 12
    },
    recommend: {
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 16,
        height:24,
        flex: 1
    },
    icon: {
        width: 26,
        height: 26,
    }
})

export default withNavigation(List)