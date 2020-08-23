import React, { useState, useEffect } from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Header from "./Header"

import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'


export default function SubCategory({route,navigation}) {

    // console.log(route.params)
    function getSubCat(){
        let url = "https://local-pe-vocal.in/api/business/categories/parent/"+String(route.params.data.id) 
        console.log(url)
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>{
            // console.log(data.data, "Data")
            setcat(data.data)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getSubCat()
    },[])
    const [cat,setcat] = useState([])
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07,  }}>
                <Header navigation={navigation} title={route.params.data.title} dashboard={false} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{width:Scales.deviceWidth*1.0,height:Scales.deviceHeight*0.92, }}>
            <FlatList
                data={cat}
                renderItem={({ item,index }) => <CateList data={item} index={index} navigation={navigation} />}
                keyExtractor={item => String(item.id)}></FlatList>
                </View>

        </View>
    )
}


function CateList({data,index, navigation}){

    return(
      <TouchableOpacity onPress={()=>navigation.navigate("storelist",{"title":data.title,"cat_id":data.id})}><View style={{width:Scales.deviceWidth*1.0,flexDirection:"row",alignItems:"center", height:Scales.deviceHeight*0.075,backgroundColor:"#ffffff", borderTopWidth:index==0?0:0.8}}>
       
       <View style={{ height:Scales.deviceHeight*0.06,justifyContent:"center",width:Scales.deviceWidth*0.15,}}>
          <Image source={{uri:data.image}} style={{resizeMode:"contain",height:Scales.deviceHeight*0.04,width:Scales.deviceWidth*0.10, borderRadius:10}} />
        </View>
        <View style={{ height:Scales.deviceHeight*0.06,width:Scales.deviceWidth*0.60,justifyContent:"center"}}>
        <Text style={{paddingLeft:10, fontSize:Scales.moderateScale(16)}}>{data.title}</Text>
        </View>
        <View style={{height:Scales.deviceHeight*0.06,width:Scales.deviceWidth*0.18,justifyContent:"center"}}>
          <IonicI style={{alignSelf:"flex-end"}} size={24} name={"chevron-forward-outline"} />
        </View>
      
      </View></TouchableOpacity>
    )
  }