import * as React from 'react';
import { Button, View, Text, ScrollView, TouchableOpacity, AsyncStorage, Image,BackHandler } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', width: "100%", height: 50, backgroundColor: "#faf9fd" }}>
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
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, backgroundColor: "#faf9fd" }}
          ><View style={{ backgroundColor: isFocused ? '#626a72' : '#faf9fd', width: 180, justifyContent: "center", alignSelf: 'center', height: 40, borderRadius: 10 }}>
              <Text style={{ textAlign: "center", fontFamily: "roboto-medium", color: isFocused ? "white" : 'black' }}>
                {label}
              </Text></View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function HEading({ navigation,name }) {
  async function GetNews() {
    let id = AsyncStorage.getItem("id")
    let uri = "https://local-pe-vocal.in/api/news/india/"+String(name)+ "/" + String(id)
    fetch(uri)
      .then(resp => resp.json())
      .then(json => {
        if (json.status == true) {
          setNews(json.data)
        }
      })
      .catch(err => console.log(err))
  }
  React.useEffect(() => {
    GetNews()
  }, [])
  const [News, setNews] = React.useState([{}, {}])
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={News}
        renderItem={(item) => <NewsComponent navigation={navigation} data={item} />}
        // style={{justifyContent:"space-between"}}
      />
    </View>
  )
}

function NewsComponent({ navigation, data }) {
  // console.log(data)
  return (
    <View style={{ width: Scales.deviceWidth * 1.0,  justifyContent: "center" }}>
      <View style={{ width: Scales.deviceWidth * 0.95, alignSelf: "center",marginTop:10,  elevation: 3, backgroundColor: "white", borderRadius: 10 }}>
        <View style={{ width: Scales.deviceWidth * 0.95,  paddingTop: 20, paddingLeft: 15, }}>
          <Text style={{ fontSize: 18, fontWeight: "900" }}>{data.item.title}</Text>
        </View>
        <View style={{ width: Scales.deviceWidth * 0.95,  }}>
          <Text style={{ fontSize: 14, paddingLeft: 10, paddingRight: 10, color: "#676767" }}>{data.item.content}</Text>
        </View>
        <View style={{ width: Scales.deviceWidth * 0.95,  }}>
          <Image source={{ uri: data.item.urlToImage }} style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.25 }} />
        </View>
        <View style={{ width: Scales.deviceWidth * 0.95,  paddingLeft: 15, paddingRight: 15 }}>
          <Text>{data.item.description ? String(data.item.description).slice(0, 100) : null}</Text>
        </View>
        <View style={{width:Scales.deviceWidth*0.95, height:Scales.deviceHeight*0.08,justifyContent:"center" }}>
          <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("activities",{url:data.item.url,title:data.item.title})}><View style={{width:Scales.deviceWidth*0.50, height:Scales.deviceHeight*0.05,justifyContent:"center", backgroundColor:"#e32e59",alignSelf:"center",borderRadius:10,elevation:3}}>
            <Text style={{textAlign:"center",color:"white",fontSize:16}}>View More</Text>
          </View></TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default function News({ navigation }) {
  async function GetTopNavigation(){
    let id = AsyncStorage.getItem("id")
    let uri = "https://local-pe-vocal.in/api/news/category/"+String(id)
    fetch(uri)
    .then(resp=>resp.json())
    .then(json=>{
      if(json.status==true){
        console.log(json)
        setCategory(json.data)
      }
      else{
        alert(json.message)
      }
    })
  }
  function handleBackButtonClick() {

    // navigation.goBack();
    return true;
}

React.useEffect(() => {
  GetTopNavigation()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
return () => {
    console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
}
;},[])
  // let renderCat=[]
  // console.log(renderCat())
  const [category, setCategory] = React.useState([])
  let data = []
  for(let i of category){
    console.log(i)
    let a = <Tab.Screen name={i.name}>{()=><HEading name = {i.category} navigation={navigation} />}</Tab.Screen>
    console.log(a)
    data.push(a)
  }
  console.log(data)
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
        <Header noti={true} navigation={navigation} title={"Vocal Pe Local"} dashboard={true} />
      </View>

      {category.length!=0?<Tab.Navigator tabBarOptions={{ scrollEnabled: true, style: { height: Scales.deviceHeight * 0.055, justifyContent: "center" }, activeTintColor: "#e32e59", inactiveTintColor: "black", indicatorStyle: { backgroundColor: 'red', width: 120 }, labelStyle: { fontSize: 12, textAlignVertical: "center", alignSelf: "center" }, tabStyle: { width: 130, alignSelf: "center", } }} >
        {/* <Tab.Screen name="TOP">{()=><HEading name = {"top"} navigation={navigation} />}</Tab.Screen> */}
        {/* <Tab.Screen name="BUSINESS">{()=><HEading name = {"business"} navigation={navigation} />}</Tab.Screen>
        <Tab.Screen name="ENTERAINMENT">{()=><HEading name = {"enterainments"} navigation={navigation} />}</Tab.Screen>
        <Tab.Screen name="HEALTH">{()=><HEading name = {"health"} navigation={navigation} />}</Tab.Screen>
        <Tab.Screen name="SCIENCE">{()=><HEading name = {"science"} navigation={navigation} />}</Tab.Screen>
        <Tab.Screen name="SPORTS" >{()=><HEading name = {"sports"} navigation={navigation} />}</Tab.Screen>
        <Tab.Screen name="TECHNOLOGY" >{()=><HEading name = {"technology"} navigation={navigation} />}</Tab.Screen> */}
        {data}
      </Tab.Navigator>:null}



    </View>
  );
}