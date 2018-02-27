'use strict'

import React, { Component } from 'react'
import {
    View, 
    Text,
    Image,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    Button
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Api from '../api'
import AddBtn from '../common/addBtn'
import List from './list'

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            page: 0
        }
    }
    static navigationOptions = ({navigation})=>{
        return {
            title: '往期',
            headerStyle: {
                backgroundColor: '#649F0C'
            },
            headerTintColor: '#fff',
            headerRight: (
                <AddBtn navigation={navigation}/>
            ),
            tabBarLabel: '往期',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ tintColor }) => (
            <Image
                resizeMode='contain'
                source={require('../icon/old.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
            )
        }
    }
    componentDidMount(){
        let apiResult;
        apiResult = Api.getList(++this.state.page);
        apiResult
        .then((responseData) => {
          this.setState({
              data: responseData
          })
        })
        .done();
    }
    _loadMore = ()=>{
        let apiResult;
        apiResult = Api.getList(++this.state.page);
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
    _jumpPage = (item)=>{
        this.props.navigation.push('List',{
            iid: item.iid,
            title: `奇舞周刊第${item.iid}期`
        })
    }
    _renderItem = ({item})=>{
        return (
            <View style={styles.item}>
                <TouchableWithoutFeedback onPress={()=>this._jumpPage(item)}>
                    <View>
                        <Text style={styles.itemHeader}>奇舞周刊第{item.iid}期</Text>
                        <Text style={styles.itemText}>{item.date}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    _keyExtractor = (item, index) => item.iid.toString();
    render(){
        if(this.state.data){
            return (
                <ScrollView style={{backgroundColor: '#fafafa'}}>
                    <FlatList
                        data={this.state.data.data}
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
            return (
                <Text>Loading...</Text>
            )
        }
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
