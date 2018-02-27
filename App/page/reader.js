'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    WebView,
    Dimensions
} from 'react-native'
import template from '../common/parseHTML'

export default class Reader extends Component {
    constructor(props){
        super(props)
        let domain = this.props.navigation.state.params.item.url.match(/https?:\/\/([^\/]+)\//i);
        if(domain) {
        if(domain[1]) {
            domain = domain[1];
        } else {
            domain = domain[0];
        }
        } else {
        domain = null;
        }
        this.state = {
            content: '转码中...',
            domain: domain,
            originUrl: null,
            readability_url: this.props.navigation.state.params.item.readability_url
        }
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: `${navigation.state.params.item.title}`,
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff'
        }
    }
    componentDidMount(){
        const { item } = this.props.navigation.state.params;
        try{
            fetch(item.readability_url)
                .then(response=>response.json())
                .then((responseData)=>{
                    console.log(responseData)
                    if(responseData.errno===0){
                        this.setState({
                            content: responseData.data.content,
                            originUrl: responseData.data.url
                        })
                    }else{
                        this.setState({
                            content: '转码失败.'
                        })
                    }
                })
                .done()
        }catch(e){
            alert(e);
        }
    }
    render(){
        const { item } = this.props.navigation.state.params;
        let showUrl = this.state.originUrl;
        if(!showUrl) showUrl = this.state.readability_url;
        console.log(showUrl)
        if(item){
            return (
                <View>
                    <Text 
                        style={{
                            paddingTop: 10,
                            height: Dimensions.get('window').height - 64,
                            textAlign: 'center',
                            color: '#ccc'
                          }}
                    >{`内容由 ${this.state.domain} 提供`}</Text>
                    <WebView
                        style={{
                            position: 'absolute',
                            top: -(Dimensions.get('window').height - 64),
                            height: Dimensions.get('window').height - 64,
                            width: Dimensions.get('window').width,
                            backgroundColor: 'transparent',
                        }}
                        onError={()=>{alert('无法打开页面')}}
                        source={{
                            html:template(this.state.content,showUrl)
                        }}
                    />
                </View>
            )
        }
        return null;
    }
}