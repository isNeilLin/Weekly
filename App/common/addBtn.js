'use strict'

import React, { Component } from 'react'
import {
    View, 
    Image,
    TouchableWithoutFeedback
} from 'react-native'

export default class AddBtn extends Component {
    constructor(props){
        super(props)
    }
    _addArticle = ()=>{
        this.props.navigation.navigate('AddArticle')
    }
    render(){
        const addIcon = require('../icon/add.png');
        return (
            <View>
                <TouchableWithoutFeedback onPress={this._addArticle}>
                    <View>
                        <Image source={addIcon} style={{
                            width: 25,
                            height: 25,
                            marginRight: 12
                        }}></Image>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}