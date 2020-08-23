
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  AsyncStorage,
  BackHandler,Alert

} from 'react-native';

import { Scales } from "@common"


export default function MainScreen({ navigation }) {

  function handleBackButtonClick() {
    Alert.alert("Hold on!", "Are you really want exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }
  React.useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  })
  return (
    <View style={{ flex: 1, }}>
      <ImageBackground style={{ flex: 1, flexDirection: "column-reverse" }} source={require("../assets/image/login_background.png")}>
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.32, }}>
          <View style={{ height: Scales.deviceHeight * 0.08 }}>
           <TouchableOpacity onPress={()=>navigation.navigate("customersignup")}><View style={{ width: Scales.deviceWidth * .80, alignSelf: 'center', justifyContent: "center", height: Scales.deviceHeight * 0.065, borderRadius: 100, backgroundColor: '#e32e59' }}>
              <Text style={{ textAlign: "center", color: 'white', fontFamily: "OpenSans-Light", fontSize: Scales.moderateScale(14) }}>Register For User</Text>
            </View></TouchableOpacity>
          </View>
          <View style={{ height: Scales.deviceHeight * 0.08 }}>
          <TouchableOpacity onPress={()=>navigation.navigate("businessregister")}><View style={{ width: Scales.deviceWidth * .80, alignSelf: 'center', justifyContent: "center", height: Scales.deviceHeight * 0.065, borderRadius: 100, backgroundColor: '#e32e59' }}>
              <Text style={{ textAlign: "center", color: 'white', fontFamily: "OpenSans-Light", fontSize: Scales.moderateScale(14) }}>Register For Business</Text>
            </View></TouchableOpacity>
          </View>
          <View style={{ height: Scales.deviceHeight * 0.08 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("logins")}>
            <View style={{ width: Scales.deviceWidth * .80, alignSelf: 'center', justifyContent: "center", height: Scales.deviceHeight * 0.065,borderWidth:0.8,backgroundColor:"white", borderRadius: 100, borderColor: '#e32e59' }}>
              <Text style={{ textAlign: "center", color: '#d04a6d', fontFamily: "OpenSans-Light", fontSize: Scales.moderateScale(16) }}>Login</Text>
            </View></TouchableOpacity>
          </View>

        </View>

      </ImageBackground>
    </View>
  );
}

