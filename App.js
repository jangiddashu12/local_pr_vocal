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
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage,

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
    <Auth.Screen name="businessregister" options={{ headerShown: false }} component={BusinessRegister} />
    <Auth.Screen name="customersignup" options={{ headerShown: false }} component={CustomerSignup} />
    <Auth.Screen name="SelectCategory" options={{ headerShown: false }} component={SelectCategory} />

    <Auth.Screen name="SelectSubCategory" options={{ headerShown: false }} component={RegisterCatSub} />
    <Auth.Screen name="plan" options={{ headerShown: false }} component={Plans} />
    <Auth.Screen name="payment" options={{ headerShown: false }} component={Payment} />


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
        <RootStack.Screen name='ScanScreen' component={ScanScreen} />
        
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
