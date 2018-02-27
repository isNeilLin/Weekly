'use strict'

import React, { Component } from 'react';
// import { Image, StatusBar, View } from 'react-native';
// import TabBarNavigator from 'react-native-tab-navigator';
import HomePage from './App/page/home.js';
import HistoryPage from './App/page/history.js';
import SearchPage from './App/page/search.js';
import MinePage from './App/page/mine.js';
import {TabNavigator,StackNavigator} from 'react-navigation'
import Reader from './App/page/reader'
import AddArticle from './App/page/addAticle'
import Setting from './App/page/setting'
import Mark from './App/page/mark'
import List from './App/page/list'
/* class Weekly extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }
  
  render(){
    const homeIcon = require('./App/icon/newest.png');
    const historyIcon = require('./App/icon/old.png');
    const searchIcon = require('./App/icon/search.png');
    const mineIcon = require('./App/icon/my.png');
    return (
      <TabBarNavigator
        navTintColor='#fff'
        navBarTintColor='#333'
        tabTintColor='#649F0C'
        tabBarTintColor='#f0f0f0'
      >
        <TabBarNavigator.Item 
            title='最新' 
            selected={this.state.selectedTab === 'home'}
            onPress={()=>this.setState({selectedTab:'home'})}
            renderIcon={()=><Image source={homeIcon}/>}>
            <HomePage/>
        </TabBarNavigator.Item>
        <TabBarNavigator.Item 
            title='往期' 
            selected={this.state.selectedTab === 'history'}
            onPress={()=>this.setState({selectedTab:'history'})}
            renderIcon={()=><Image source={historyIcon}/>}>
            <HistoryPage/>
        </TabBarNavigator.Item>
        <TabBarNavigator.Item 
            title='搜索' 
            selected={this.state.selectedTab === 'search'}
            onPress={()=>this.setState({selectedTab:'search'})}
            renderIcon={()=><Image source={searchIcon}/>}>
            <SearchPage/>
        </TabBarNavigator.Item>
        <TabBarNavigator.Item 
            title='我的' 
            selected={this.state.selectedTab === 'mine'}
            onPress={()=>this.setState({selectedTab:'mine'})}
            renderIcon={()=><Image source={mineIcon}/>}>
            <MinePage/>
        </TabBarNavigator.Item>
      </TabBarNavigator>
    )
  }
} */

const TabScreens =  TabNavigator({
  HomePage: {
    screen: HomePage
  },
  HistoryPage: {
    screen: HistoryPage
  },
  SearchPage: {
    screen: SearchPage
  },
  MinePage: {
    screen: MinePage
  },
},{
  activeTintColor: '#e91e63',
  tabBarPosition: 'bottom',
  lazy: true
})

export default StackNavigator({
  Home: {
    screen: TabScreens
  },
  Reader: {
    screen: Reader
  },
  AddArticle: {
    screen: AddArticle
  },
  Setting: {
      screen: Setting
  },
  Mark: {
      screen: Mark
  },
  List: {
    screen: List
  }
})