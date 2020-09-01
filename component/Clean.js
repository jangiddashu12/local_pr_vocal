import * as React from 'react';
import { Button, View,Text ,BackHandler} from 'react-native';
import Header from "./Header"
import {Scales} from "@common"



export default function Clean({navigation}) {
  function handleBackButtonClick() {
    console.log("")
    // navigation.goBack();
    return true;
}

React.useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
return () => {
    console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
};
})
    return (
      <View style={{ flex:1}}>
          <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
          <Header navigation={navigation} noti={true} title={"Vocal Pe Local"} dashboard={true} height={Scales.deviceHeight * 0.08} />
        </View>
        <View style={{flex:1, justifyContent:"center"}}> 
          <Text style={{alignSelf:"center"}}>Coming Soon!</Text>
        </View>
      </View>
    );
  }