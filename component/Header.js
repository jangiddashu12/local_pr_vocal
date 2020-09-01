
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    AsyncStorage,
    BackHandler

} from 'react-native';

import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'

export default function Header({ navigation,dashboard,title,size=20,noti = false, special = false, nav = "" }) {
    // function handleBackButtonClick() {

    //     navigation.goBack();
    //     return true;
    // }
    
    // React.useEffect(() => {
      
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    // return () => {
    //     console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
    //     BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    // };},[])
    // console.log(navigation,"Header navigation")
    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: Scales.deviceWidth * 1.0,flexDirection:"row", height: Scales.deviceHeight * 0.07,  backgroundColor: "#e32e59" }}>
                {dashboard==true?<View style={{width: Scales.deviceWidth * 0.20, justifyContent:"center"}}><TouchableOpacity onPress={()=>navigation.openDrawer()} ><Image style={{width:Scales.deviceWidth*0.05,resizeMode:"contain",left:15, height:Scales.deviceHeight*0.05}} source={require("../assets/image/sidebar-menu.png")}/></TouchableOpacity></View>:dashboard==false?<View style={{width: Scales.deviceWidth * 0.20, justifyContent:"center"}}>
                    <TouchableOpacity onPress={()=>special==true?navigation.push("Login"): navigation.goBack()} ><IonicI  color="white" name="arrow-back-outline" size={32} style={{alignSelf:"center",}} /></TouchableOpacity></View>:<View style={{width: Scales.deviceWidth * 0.20, justifyContent:"center"}}></View>}
                     
               <View style={{width: Scales.deviceWidth * 0.60, justifyContent:"center"}}><Text style={{ textAlign: "center", fontFamily: "Roboto-Bold", color: "white", fontSize: Scales.moderateScale(size) }}>{title}</Text></View>
               {noti?<View style={{width:Scales.deviceWidth*0.20,justifyContent:"center",paddingLeft:10}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("notification")}><IonicI name={"notifications-outline"} size={22} color={"white"} style={{alignSelf:"center"}} /></TouchableOpacity>
               </View>:null}
            </View>
           
        </View>
    );
}


