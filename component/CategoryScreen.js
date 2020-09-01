import React, { useState, useEffect } from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    AsyncStorage,
} from 'react-native';
import Header from "./Header"

import { Scales } from "@common"

export default function Category({data, navigation}) {
    // console.log(navigation,'--nacooo')
    function handleBackButtonClick() {
        console.log("catss")
        // navigation.goBack();
        return true;
    }

    React.useEffect(() => {
       
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };},[])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.05, justifyContent: "center", }}>
                <Text style={{ fontSize: Scales.moderateScale(14), paddingLeft: 10, fontSize: Scales.moderateScale(16) }}>{data.title}</Text>
            </View>
            <FlatList
                data={data.sub_categories}
                renderItem={({ item }) => <CategoryList data={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}


function CategoryList({data, navigation}) {
    
    return (
        <View style={{ width: Scales.deviceWidth * 0.95, borderRadius: 10, alignSelf: "center", height: Scales.deviceHeight * 0.24 }}>
            <View style={{ width: Scales.deviceWidth * 0.95, borderRadius: 10, alignSelf: "center", height: Scales.deviceHeight * 0.22, backgroundColor: "#ffffff", elevation: 5 }}>
            <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.05, justifyContent: "center", }}>
                <Text style={{ fontSize: Scales.moderateScale(14), paddingLeft: 10, fontSize: Scales.moderateScale(14), color:"#767676" }}>{data.title}</Text>
            </View>
            <View style={{width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.19,}}>
            <FlatList
                data={data.customers}
                renderItem={({ item }) => <SubCategoryCustomer data={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                
            />
            </View>
        </View>


        </View >
    )
}

function SubCategoryCustomer({data, navigation}){
    let [loaded,setloaded] = useState(true)
   useEffect(()=>{
    
   })

    function onImageError(e){
    console.log("onImageError");
    setloaded(false)

  }
    return(
        
        <View style={{width:Scales.deviceWidth*0.25, height:Scales.deviceHeight*0.16,}}>
           <TouchableOpacity onPress={()=>navigation.navigate("activities",{"nav":navigation,"url":data.business_detail[0].web_url,"title":data.name})}><View style={{width:Scales.deviceWidth*0.17,backgroundColor:loaded==false?"black":"transparent", height:Scales.deviceHeight*0.085,borderRadius:Scales.deviceHeight*0.08, alignSelf:"center",}}>
                <Image   onError={(e) => {onImageError(e)}} source={{uri:data.business_detail[0].logo}}  style={[{width:Scales.deviceWidth*0.175,alignSelf:"center", height:Scales.deviceHeight*0.08,resizeMode:"contain", borderRadius:Scales.deviceHeight*0.12},{transform:([{ skewX: "45deg" }])}]} />
            </View></TouchableOpacity>
            <View style={{width:Scales.deviceWidth*0.20,alignSelf:"center", height:Scales.deviceHeight*0.07, justifyContent:"center"}}>
                <Text style={{fontSize:Scales.moderateScale(12),textAlign:"center"}}>{data.name}</Text>
            </View>
        </View> 
    )
}