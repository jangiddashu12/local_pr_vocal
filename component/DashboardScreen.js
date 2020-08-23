import React, { useState, useEffect } from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Header from "./Header"
import IonicI from 'react-native-vector-icons/Ionicons'

import { Scales } from "@common"
import Category from "./CategoryScreen"


export default function Dashboard({ navigation }) {

  async function GetCat() {
    let user_id = await AsyncStorage.getItem("id")
    let url = "https://local-pe-vocal.in/api/home/popular/" + user_id
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        // console.log(json, "--json")
        setcategory(json.data)
        return 0
      })
      .catch((err) => console.log(err))
  }

  async function getBaner() {
    fetch("https://local-pe-vocal.in/api/home/banner")
      .then((resp) => resp.json())
      .then((json) => {
        setBanner(json.data)
        return 0
      })
      .catch((err) => console.log(err))


  }

  useEffect(() => {

    getBaner()
    GetCat()
    console.log("===useeffect=====")

  }, [])
  const [banner, setBanner] = useState([]);
  const [category, setcategory] = useState([]);
  // console.log(navigation, "--nav")

  return (

    <View style={{ flex: 1, }}>

      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
        <Header navigation={navigation} title={"Home"} dashboard={true} height={Scales.deviceHeight * 0.08} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.28 }}>
            <FlatList
              data={banner}
              renderItem={({ item }) => <Banner data={item} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ flex: 1, }}>
            <FlatList
              data={category}
              renderItem={({ item }) => <Category data={item} navigation={navigation} />}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}

            />
          </View>
        </View></ScrollView>
      <View style={{ width: Scales.deviceHeight * 0.20, top: Scales.deviceHeight * 0.83, left: Scales.deviceWidth * 0.32, height: Scales.deviceHeight * 0.065, borderRadius: Scales.deviceHeight * 0.3, position: "absolute", backgroundColor: '#e32e59',alignItems:"center",flexDirection:"row" }}>
      <IonicI  color="white" name="md-qr-code-outline" size={24} style={{paddingLeft:15 }} />
      <View style={{width:Scales.deviceWidth*0.22,}}>
      <Text style={{textAlign:"center",color:"white",alignSelf:"center"}}>Scan QR</Text>
      </View>
      </View>
    </View>


  );
}


function Banner({ data }) {
  return (
    <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.28, justifyContent: "center", }}>
      <View style={{ width: Scales.deviceWidth * 0.90, borderRadius: 10, alignSelf: "center", justifyContent: "center", height: Scales.deviceHeight * 0.28, }}>
        <Image source={{ uri: data.image }} style={{ borderRadius: 10, height: Scales.deviceHeight * 0.25, width: Scales.deviceWidth * 0.93 }} />
      </View>
    </View>
  )
}