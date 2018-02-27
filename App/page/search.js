'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Image,
    ScrollView,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Api from '../api'
import AddBtn from '../common/addBtn'

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            page: 0,
            text: ''
        }
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: '搜索',
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff',
            headerRight: (
                <AddBtn navigation={navigation}/>
            ),
            tabBarLabel: '搜索',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ tintColor }) => (
            <Image
                resizeMode='contain'
                source={require('../icon/search.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
            )
        }
    }
    _searchArticle = (event)=>{
        let {text} = event.nativeEvent;
        if(!text){
            return this.setState({
                data: null,
                page: 0,
                text: ''
            })
        }
        let result = Api.getSearch(text,++this.state.page);
        result
        .then((responseData) => {
            this.setState({
                data: responseData,
                text: text
            })
        })
        .done();
    }
    _loadMore = ()=>{
        if(!this.state.text){
            return;
        }
        let apiResult;
        apiResult = Api.getSearch(this.state.text,++this.state.page);
        apiResult
        .then((responseData) => {
          let newData = responseData.data;
          this.setState((prevState)=>{
               prevState.data.data = prevState.data.data.concat(newData)
               return prevState;
          })
        })
        .done();
    }
    render(){
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
                <List
                    data={this.state.data} _loadMore={()=>{
                    this._loadMore()
                }}/>
            </View>
        )
    }
}
class List extends Component {
    constructor(props){
        super(props)
    }
    _renderItem({item}){
        return (
            <TouchableWithoutFeedback>
                <View style={styles.item}>
                    <Text style={styles.itemHeader}>{item.title}</Text>
                    <Text style={styles.itemText}>奇舞周刊第{item.iid}期</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    _loadMore = ()=>{
        this.props._loadMore();
    }
    _keyExtractor = (item, index) => item.title;
    render(){
        const data = this.props.data;
        if(data){
            if(data.data.length){
                return (
                    <ScrollView>
                        <FlatList
                            data={data.data}
                            style={{paddingLeft:16,paddingRight:16}}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        ></FlatList>
                        <Button
                            onPress={this._loadMore}
                            title="加载更多..."
                            color="#841584"                     
                        />
                    </ScrollView>
                )  
            }else{
                return (<Text>没有结果...</Text>)
            }    
        }
        return null;
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
    },
    icon: {
        width: 26,
        height: 26,
    }
})
