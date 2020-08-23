import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar,AsyncStorage,ActivityIndicator } from 'react-native';

import PostFetch from './ajax/PostFetch'

export default class Loading extends Component{
    constructor(props){
     super(props) 
     this.state = {  
      ready: false,  
      where: {lat:null, lng:null},  
      error: null  
  }  
     
    }
     
  
    componentDidMount=async()=>{
     
   
      
      let token = await AsyncStorage.getItem('token')
      let user_data = await AsyncStorage.getItem("user_data")
      console.log(user_data, "-------userdata---------")
      user_data = JSON.parse(user_data)
    
      if(token==null){
       
        this.props.navigation.navigate("Auth")
      }
      else{
        if(user_data.data.business_customer==false){
          this.props.navigation.navigate("AppCustomer")
        }
        else{
          this.props.navigation.navigate("App")
        }
        
      }
      
     
      }
    
      
  
    render(){
      return(
        <View style={{flex:1, justifyContent:"center"}}>
          <ActivityIndicator />
        </View>
      )
    }
  }
  