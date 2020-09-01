import React,{useState,useEffect}from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  BackHandler,
  AsyncStorage,

} from 'react-native';
import Header from "./Header"
import { Scales } from "@common"

export default function PersonalDetail({ navigation }) {
  function GetData() {
    async function getData() {
        let data = await AsyncStorage.getItem("user_data")

        data = JSON.parse(data)
        console.log(navigation, "-----data------")
        // console.log(typeof(data), "---------type----")
        setdrawerData(data.data)
        seturi(data.data.qrcode[0].file)
    }
    let Saved_data = getData()
    setdrawerData(Saved_data)
}
function handleBackButtonClick() {
  // navigation.goBack()
  return true;
}
React.useEffect(()=>{
  GetData()
  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };
},[console.log(navigation)]
)


const [drawerData, setdrawerData] = useState("");
let [qr_code_url,seturi]=useState(null)


    return (
      <View style={{ flex: 1,backgroundColor:"#ffffff" }}>
       <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
          <Header navigation={navigation} title={"Personal Details"} dashboard={true} height={Scales.deviceHeight * 0.08} />
        </View>
        <View style={{width:Scales.deviceWidth*1.0, height:Scales.deviceHeight*0.35,flexDirection:"column-reverse", }}>
          <Image source={{uri:qr_code_url}} style={{resizeMode:"contain",width:Scales.deviceWidth*0.68, height:Scales.deviceHeight*0.28, alignSelf:"center" }} />
        </View>
        <View style={{flex:1,paddingLeft:20}}>
          <View style={{borderBottomWidth:0.5, width:Scales.deviceWidth*0.88,flexDirection:"column-reverse", height:Scales.deviceHeight*0.08}}>
            <Text style={{fontWeight:"100",fontFamily:"Roboto-Regular", paddingBottom:10, paddingLeft:10,fontSize:Scales.moderateScale(16)}}>Name : {drawerData.name}</Text>
          </View>
          <View style={{borderBottomWidth:0.5, width:Scales.deviceWidth*0.88,flexDirection:"column-reverse", height:Scales.deviceHeight*0.08}}>
          <Text style={{fontWeight:"100",fontFamily:"Roboto-Regular", paddingBottom:10, paddingLeft:10,fontSize:Scales.moderateScale(16)}}>Email : {drawerData.email}</Text>
          </View>
          <View style={{borderBottomWidth:0.5, width:Scales.deviceWidth*0.88, flexDirection:"column-reverse",height:Scales.deviceHeight*0.08}}>
          <Text style={{fontWeight:"100",fontFamily:"Roboto-Regular", paddingBottom:10, paddingLeft:10,fontSize:Scales.moderateScale(16)}}>Mobile Number : {drawerData.phone}</Text>
          </View>
          <View style={{borderBottomWidth:0.5, width:Scales.deviceWidth*0.88, flexDirection:"column-reverse",height:Scales.deviceHeight*0.08}}>
          <Text style={{fontWeight:"100",fontFamily:"Roboto-Regular", paddingBottom:10, paddingLeft:10,fontSize:Scales.moderateScale(16)}}>Unique Number : {drawerData.qrcode==undefined?null:drawerData.qrcode[0].unique_number}</Text>
          </View>
          <View style={{borderBottomWidth:0.5, width:Scales.deviceWidth*0.88,flexDirection:"column-reverse", height:Scales.deviceHeight*0.08}}>
          <Text style={{fontWeight:"100",fontFamily:"Roboto-Regular", paddingBottom:10, paddingLeft:10,fontSize:Scales.moderateScale(16)}}>Refferal Code : {drawerData.referral_code}</Text>
            
          </View>

        </View>
      </View>
    );
  }