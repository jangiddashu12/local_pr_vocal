import React, { useState, useEffect } from 'react';
import {
    Image,
    FlatList,
    Linking,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import Header from "./Header"
import Stars from 'react-native-stars';
import { Scales } from "@common"
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import RazorpayCheckout from 'react-native-razorpay';

export default function StoreDetail({ route, navigation }) {
    async function getDetail() {
        let store_id = await AsyncStorage.getItem("id")
        if(route.params!=undefined){
            store_id = route.params.store_id
        }
        let url = "https://local-pe-vocal.in/api/customer/" + String(store_id)
        console.log(url)
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                setstoreDetail(data.data)
            })
    }
    useEffect(() => {
        getDetail()
    }, [])
    const [storeDetail, setstoreDetail] = useState([])
    console.log(storeDetail)
    let url =""
    
    try{
        url = "geo:" + storeDetail.customer_address[0].latitude + "," + storeDetail.customer_address[0].longitude + "?q=" +"daa"
        console.log(url)
    }
    catch{

    }

    console.log(navigation)
    return (
        <View style={{ flex: 1 , backgroundColor:"#ffffff"}}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07, }}>
                <Header navigation={navigation} title={"Customer Detail"} dashboard={false} height={Scales.deviceHeight * 0.08} size={18} />
            </View>
           
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }}>
                <FlatList
                    data={storeDetail.files}
                    renderItem={({ item, index }) => <ImageCorosal data={item} navigation={navigation} />}
                    keyExtractor={item => String(item.id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.20, paddingTop: 25, paddingLeft: 20,  borderBottomWidth:2,borderColor:"#c7c7c7", flexDirection: 'row' }}>
                <View style={{ width: Scales.deviceWidth * 0.60, height: Scales.deviceHeight * 0.15, }}>
                    <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.10, }}>
                        <Text style={{ fontSize: Scales.moderateScale(20),textTransform:"capitalize" }}>{storeDetail.name}</Text>
                        <Text style={{ fontSize: Scales.moderateScale(14), color: "#575757",textTransform:"capitalize" }}>{storeDetail.email}</Text>
                        <Text style={{ fontSize: Scales.moderateScale(14), color: "#575757",textTransform:"capitalize" }}>{storeDetail.customer_address==undefined?null:storeDetail.customer_address[0].address}, {storeDetail.customer_address==undefined?null:storeDetail.customer_address[0].city}</Text>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.06,alignItems:"center", flexDirection: "row" }}>
                    <Stars
                        default={4.5}
                        count={5}
                        
                        half={true}
                        disabled={true}
                        starSize={50} 
                        fullStar={<Material size={22} name={'star'} style={[styles.myStarStyle]} />}
                        emptyStar={<Material size={22} name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                        halfStar={<Material size={22} name={'star-half'} style={[styles.myStarStyle]} />}
                    />
                     <View style={{width: Scales.deviceWidth * 0.45,justifyContent:"center", height: Scales.deviceHeight * 0.05,}}>
                       <Image source={{uri:storeDetail.membership_icon}} style={{width:Scales.deviceWidth*0.10, height:Scales.deviceHeight*0.04, resizeMode:"contain"}} />
                    </View>
                    </View>
                    
                </View>
                <View style={{ width: Scales.deviceWidth * 0.30, height: Scales.deviceHeight * 0.10,justifyContent:"center",  }}>
                    <TouchableOpacity onPress={()=>Linking.openURL(url)}><FontAwesome size={24} name={"map-marker-alt"} style={{ alignSelf: "flex-end",paddingRight:10 }} /></TouchableOpacity>
                </View>
                
            </View>

            <View style={{width:Scales.deviceWidth*1.0, height:Scales.deviceHeight*0.24,justifyContent:"center" }}>
                <View style={{width:Scales.deviceWidth*1.0,paddingLeft:20, height:Scales.deviceHeight*0.20,borderColor:"#c7c7c7", borderBottomWidth:2}}>
                    <Text style={{fontSize:Scales.moderateScale(16)}}>Description</Text>
                    <View style={{width:Scales.deviceWidth*0.80,justifyContent:"center", height:Scales.deviceHeight*0.05,}}>
                        <Text>{storeDetail.business_detail==undefined?null:storeDetail.business_detail[0].title}</Text>
                    </View>
                    <View style={{width:Scales.deviceWidth*0.80, height:Scales.deviceHeight*0.10,}}>
                        <Text style={{color:"#676767"}}>{storeDetail.business_detail==undefined?null:storeDetail.business_detail[0].detail}</Text>
                        <Text style={{color:"#676767"}}>{storeDetail.business_detail==undefined?null:storeDetail.business_detail[0].moto}</Text>
                        <Text style={{color:"#676767"}}>{storeDetail.business_detail==undefined?null:storeDetail.business_detail[0].web_url}</Text>
                    </View>
                </View>
            </View>
            <View style={{width:Scales.deviceWidth*1.0,alignItems:"center", height:Scales.deviceHeight*0.10,justifyContent:"center", }}>
                <TouchableOpacity onPress={()=>navigation.navigate("pay",{"name":storeDetail.name})}><View style={{width:Scales.deviceWidth*0.70,borderRadius:20,backgroundColor:'#e32e59', height:Scales.deviceHeight*0.055, justifyContent:"center"}}>
                    <Text style={{textAlign:"center", color:"#ffffff", fontSize:Scales.moderateScale(16)}}>PAY</Text>
                </View></TouchableOpacity>
            </View>
           
        </View>
    )
}

function ImageCorosal({ data }) {
    // console.log(data)
    return (
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }}>
            <Image source={{ uri: data.file }} style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }} />
        </View>
    )
}

const styles = StyleSheet.create({
    myStarStyle: {
      color: '#dd2956',

     
    },
    myEmptyStarStyle: {
      color: 'white',
    }
  });