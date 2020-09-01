import React, { useState, useEffect } from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Header from "./Header"
import IonicI from 'react-native-vector-icons/Ionicons'
import Toast from "react-native-simple-toast"
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

  async function Recharges() {
    let url = "https://local-pe-vocal.in/api/recharge/services"
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        // console.log(json, "--json")
        if (json.status == true) {
          setRecharge(json.data)

        }
        else {
          Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM)
        }
      })
      .catch((err) => console.log(err))
  }

  async function getBaner() {
    fetch("https://local-pe-vocal.in/api/home/banner")
      .then((resp) => resp.json())
      .then((json) => {
        if (json.status == true) {
          setBanner(json.data)

        }
        else {
          Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM)

        }


      })
      .catch((err) => console.log(err))


  }
  function handleBackButtonClick() {
    console.log("dashboard")
    // navigation.goBack();
    return true;
}



  useEffect(() => {

    getBaner()
    GetCat()
    Recharges()
    console.log("===useeffect=====")
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
return () => {
    console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);}

//   }
  }, [])
  const [banner, setBanner] = useState([]);
  const [category, setcategory] = useState([]);
  const [recharge, setRecharge] = useState([]);
  // console.log(navigation, "--nav")

  return (

    <View style={{ flex: 1, }}>

      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
        <Header navigation={navigation} title={"Vocal Pe Local"} dashboard={true} noti={true} height={Scales.deviceHeight * 0.08} />
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

          <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.20, justifyContent: "center" }}>
            <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.18, alignSelf: "center", backgroundColor: "white", elevation: 3, borderRadius: 10 }}>
              <View style={{width:Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.05,justifyContent:"center"}}>
                <Text style={{fontSize:14, paddingLeft:10, color:"#676767"}}>Recharge and Pay Bills</Text>
              </View>
            <FlatList
              data={recharge}
              renderItem={({ item }) => <Recharge data={item} navigation={navigation} />}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

            />
            </View>

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
      <View style={{ width: Scales.deviceHeight * 0.20, top: Scales.deviceHeight * 0.83, left: Scales.deviceWidth * 0.32, height: Scales.deviceHeight * 0.065, borderRadius: Scales.deviceHeight * 0.3, position: "absolute", backgroundColor: '#e32e59', alignItems: "center", flexDirection: "row" }}>
        <IonicI color="white" name="md-qr-code-outline" size={24} style={{ paddingLeft: 15 }} />
        <View style={{ width: Scales.deviceWidth * 0.22, }}>
          <Text style={{ textAlign: "center", color: "white", alignSelf: "center" }}>Scan QR</Text>
        </View>
      </View>
    </View>


  );
}

function Recharge({ data,navigation }) {
  console.log(data)
  return (
    <View style={{ width: Scales.deviceWidth * 0.27, height: Scales.deviceHeight * 0.12, justifyContent: "center" }}>
      <View style={{ width: Scales.deviceWidth * 0.25, height: Scales.deviceHeight * 0.09, alignSelf: "center", }}>
        <Image source={{uri:data.icon}} style={{resizeMode:"contain",width: Scales.deviceWidth * 0.25, height: Scales.deviceHeight * 0.09,alignSelf:"center" }} />
      </View>
      <View style={{width: Scales.deviceWidth * 0.25, height: Scales.deviceHeight * 0.03, justifyContent:"center"}}>
        <Text style={{textAlign:"center"}}>{data.title}</Text>
      </View>

    </View>
  )
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