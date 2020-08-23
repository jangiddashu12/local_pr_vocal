import React, { useState, useEffect, } from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  YellowBox
} from 'react-native';
import Header from "./Header"
import { WebView } from "react-native-webview"

import { Scales } from "@common"


export default function Activities({ route, navigation }) {

  useEffect(() => {
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ]);
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