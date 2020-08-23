import React, { useState, useEffect } from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,Alert

} from 'react-native';

import { Scales } from "@common"

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "./DashboardScreen"
import Clean from "./Clean"
import News from "./NewsScreen"
import ScanQR from "./ScanQr"
import NearBy from "./NeatbyScreen"
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeI from 'react-native-vector-icons/FontAwesome5'
import IonicI from 'react-native-vector-icons/Ionicons'
import StoreDetail from "./StoreDetailScreen"
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from "./Header"



function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
       

        return (
          <View style={{backgroundColor:"#e32e59", width:Scales.deviceWidth*0.20,height:Scales.deviceHeight*0.08}}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={{height:Scales.deviceHeight*0.045,width:Scales.deviceWidth*0.20, justifyContent:"center"}}>
              {label=="Dashboard"?<Icon  color="white" name="home" size={isFocused?24:22} style={{alignSelf:"center", marginTop:isFocused?0:Scales.deviceHeight*0.02}} />:null}
              {label=="स्वच्छता अभियान"?<Icon  color="white" name="google-drive" size={isFocused?24:22} style={{alignSelf:"center", marginTop:isFocused?0:Scales.deviceHeight*0.02}} />:null}
              {label=="Scan QR"?<IonicI  color="white" name="scan" size={isFocused?24:22} style={{alignSelf:"center", marginTop:isFocused?0:Scales.deviceHeight*0.02}} />:null}
              {label=="News"?<IonicI  color="white" name="newspaper-outline" size={isFocused?24:22} style={{alignSelf:"center", marginTop:isFocused?0:Scales.deviceHeight*0.02}} />:null}
              {label=="Near By"?<FontAwesomeI color="white" name="map-marker-alt" size={isFocused?24:20} style={{alignSelf:"center",marginTop:isFocused?0:Scales.deviceHeight*0.02}} />:null}
            </View>
            {isFocused?<Text  style={{ color: isFocused ? '#ffffff' : '#222', textAlign:"center",fontSize:label=="स्वच्छता अभियान"?isFocused ?Scales.moderateScale(10):Scales.moderateScale(8) :isFocused ?Scales.moderateScale(12):Scales.moderateScale(10),  }}>
              {label}
            </Text>:null}
          </TouchableOpacity></View>
        );
      })}
    </View>
  );
}


function jobs({navigation}){
  return(
    <View style={{flex:1}}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
          <Header navigation={navigation} title={"Home"} dashboard={true} height={Scales.deviceHeight * 0.08} />
        </View>
       <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{textAlign:"center"}}>coming Soon!</Text>
            </View>
    </View>
  )
}


const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator  tabBar={props => <MyTabBar  {...props} />}>
      <Tab.Screen  name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Near By" component={NearBy} />
      <Tab.Screen  name="Scan QR" component={jobs} />
      <Tab.Screen  name="News" component={News} />
      <Tab.Screen name="स्वच्छता अभियान" component={Clean} />
     
      
    </Tab.Navigator>
  );
}




export default function HomeScreen({ route, navigation }) {
  function handleBackButtonClick() {
    // console.log(route)
    // if(route.name=="Home"){
    //   Alert.alert("Local pe Vocal!", "Are you really want to exit?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    // }
    return true;
  }
  React.useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  })
  return (
    <MyTabs navigation={navigation} />
    
    
  );
}


