import * as React from 'react';
import { Button, View,Text } from 'react-native';
import Header from "./Header"
import {Scales} from "@common"



export default function BusinessCateogry({navigation}) {
    return (
      <View style={{ flex:1}}>
          <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
          <Header navigation={navigation} title={"BusinessCateogry"} dashboard={true} height={Scales.deviceHeight * 0.08} />
        </View>
        <View style={{flex:1, justifyContent:"center"}}> 
          <Text style={{alignSelf:"center"}}>Coming Soon!</Text>
        </View>
      </View>
    );
  }