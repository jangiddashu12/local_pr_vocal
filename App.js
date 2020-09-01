/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  Share,

} from 'react-native';

import Loading from "./Loading"

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from "./component/MainScreen"
import LoginScreen from "./component/LoginScreen"
import Load from "./Loading"
import HomeScreen from "./component/Dashboard"
import Content from "./component/DrawerContent"
import PersonalDetail from "./component/PersonalDetail"
import Activities from "./component/ActivitiesScreen"
import SubCategory from "./component/SubCategoryScreen"
import StoreList from "./component/StoreListScreen"
import BusinessCateogry from "./component/BusinessCatScreen"
import StoreDetail from "./component/StoreDetailScreen"
import BusinessRegister from './component/BussinessSignUpScreen'

import BusinessDetail from "./component/BusinessDetailScreen"
import Pay from "./component/PayScreen"

import CustomerSignup from "./component/CustomerSignupScreen"
import Map from "./component/MapScreen"
import SelectCategory from "./component/BussinessRegisterSelectCat"
import RegisterCatSub from "./component/SelectBusSubCat"
import Plans from "./component/RegisterPlans"
import Payment from "./component/Payment"
import Address from "./component/AddressScreen"
import AddMoney from "./component/AddMoneyScreen"
import ScanScreen from "./component/ScannerQR"
import NotificationScreen from "./component/NotificationScreen"
import BusinessCustomerDetail from "./component/CustomerBusinessDetail"
import Header from "./component/Header"
import {Scales} from "@common"
import Fontisto from "react-native-vector-icons/Fontisto"

import ProductDetail from "./component/ProductDetailScreen"

function Shares({navigation}){
  async function onShare(){
    try {
      const result = await Share.share({
        message:'प्रिय ग्राहक मेरा व्यवसाय Vani Krashi Sewa Kendra लोकल पे वोकल पर उपलब्ध हूं, कृपया लोकल पे वोकल द्वारा पैसे का भुगतान करें, अपना उत्पाद खरीदें या लोकल पे वोकल द्वारा सेवाएं प्राप्त करें ताकि मैं डिजिटल बन जाऊं Download LocalPeVocal https://play.google.com/store/apps/details?id=com.sumanwebdev.app.locapevocal',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return(
    <View style={{flex:1, }}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Share"} size={18} dashboard={true} height={Scales.deviceHeight * 0.08} />
            </View>
      <View style={{width:Scales.deviceWidth*0.95, borderBottomWidth:0.8,alignSelf:"center",flexDirection:"row"}}>
      <View style={{width:Scales.deviceWidth*0.75, paddingLeft:15, marginTop:20}}>
        <Text style={{fontSize:18}}>प्रिय ग्राहक {"\n"}मेरा व्यवसाय Vani Krashi Sewa Kendra लोकल पे वोकल पर उपलब्ध हूं, कृपया लोकल पे वोकल द्वारा पैसे का भुगतान करें, अपना उत्पाद खरीदें या लोकल पे वोकल द्वारा सेवाएं प्राप्त करें ताकि मैं डिजिटल बन जाऊं Download LocalPeVocal https://play.google.com/store/apps/details?id=com.sumanwebdev.app.locapevocal</Text>
      </View>
      <View style={{width:Scales.deviceWidth*0.20,  justifyContent:"center"}}>
        <TouchableOpacity onPress={onShare}><Fontisto name={"share"} size={30} style={{alignSelf:"center"}} color={"#e32e59"} /></TouchableOpacity>
      </View>
      </View>
    </View>
  )
}



const Auth = createStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false
    }}

  >
    <Auth.Screen name="Login" options={{ headerShown: false }} component={MainScreen} />
    <Auth.Screen name="logins" options={{ headerShown: false }} component={LoginScreen} />
    <Auth.Screen name="businessregister" options={{ headerShown: false }}  component={BusinessRegister} />
    <Auth.Screen name="customersignup" options={{ headerShown: false }} component={CustomerSignup} />
    <Auth.Screen name="SelectCategory" options={{ headerShown: false }} component={SelectCategory} />

    <Auth.Screen name="SelectSubCategory" options={{ headerShown: false }} component={RegisterCatSub} />
    <Auth.Screen name="plan" options={{ headerShown: false }} component={Plans} />
    <Auth.Screen name="payment" options={{ headerShown: false }} component={Payment} />
    <Auth.Screen name="businessdetail" options={{ headerShown: false }} component={BusinessCustomerDetail} />


  </Auth.Navigator>
)

// drawer use only in authenticated screens
const Drawer = createDrawerNavigator();
const DrawerStack = ({ navigation }) => {

  return (
    <Drawer.Navigator drawerContent={props => <Content {...props} navigation={navigation} />} initialRouteName={"Home"}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Personal Detail" component={PersonalDetail} />
      <Drawer.Screen name="Address" component={Address} />
      <Drawer.Screen name="Business Categories" component={BusinessCateogry} />
      <Drawer.Screen name="Business Detail" component={BusinessDetail} />
      <DrawerCustomer.Screen name='Account' component={AddMoney} />
      <DrawerCustomer.Screen name='Share' component={Shares} />



    </Drawer.Navigator>
  )
}

const DrawerCustomer = createDrawerNavigator();
const DrawerStackCustomer = ({ navigation }) => {

  return (
    <DrawerCustomer.Navigator drawerContent={props => <Content {...props} navigation={navigation} />} initialRouteName={"Home"}>
      <DrawerCustomer.Screen name="Home" component={HomeScreen} />
      <DrawerCustomer.Screen name="Personal Detail" component={PersonalDetail} />
      <DrawerCustomer.Screen name="Address" component={Address} />
      <DrawerCustomer.Screen name='Account' component={AddMoney} />
    </DrawerCustomer.Navigator>
  )
}





const RootStack = createStackNavigator();
function Main() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={"Loading"} headerMode="none">
        <RootStack.Screen name='Loading' component={Load} />
        <RootStack.Screen name='Auth' component={AuthStack} />
        <RootStack.Screen name='App' component={DrawerStack} />
        <RootStack.Screen name='AppCustomer' component={DrawerStackCustomer} />
        <RootStack.Screen name='activities' component={Activities} />
        <RootStack.Screen name='subcat' component={SubCategory} />
        <RootStack.Screen name='storelist' component={StoreList} />
        <RootStack.Screen name='StoreDetail' component={StoreDetail} />
        <RootStack.Screen name='pay' component={Pay} />
        <RootStack.Screen name='map' component={Map} />
        <RootStack.Screen name='notification' component={NotificationScreen} />
        <RootStack.Screen name='ScanScreen' component={ScanScreen} />
        <RootStack.Screen name='ProductDetail' component={ProductDetail} />
        
      </RootStack.Navigator>
    </NavigationContainer>)
}

const App = ({ navigation }) => {

  return (
    <Main navigation={navigation} />
  );
};

const styles = StyleSheet.create({

});

export default App;
