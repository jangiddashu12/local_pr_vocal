import React, { useState, useEffect, } from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  YellowBox,
  BackHandler
} from 'react-native';
import Header from "./Header"
import { WebView } from "react-native-webview"

import { Scales } from "@common"


export default function Activities({ route, navigation }) {

  function handleBackButtonClick() {
    console.log("activitu")
    navigation.goBack();
    return true;
}
  useEffect(() => {
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ]);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  })
  console.log(route, "--routes")
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
        <Header navigation={navigation} title={route.params.title} dashboard={false} height={Scales.deviceHeight * 0.08} />
      </View>
      <WebView
        source={{
          uri: route.params.url
        }}
        style={{ flex: 1 }}
      />

    </View>
  )
}