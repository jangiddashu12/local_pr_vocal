import * as React from 'react';
import { Image, View,Text,FlatList,TouchableOpacity } from 'react-native';
import Header from "./Header"
import {Scales} from "@common"
import {useEffect,useState} from "react"
import IonicI from 'react-native-vector-icons/Ionicons'




export default function Nearby({navigation}) {
  async function GetParentCategory(){
    let url = "https://local-pe-vocal.in/api/business/categories/parent/"
    fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{
      setparentCat(data.data)
    })
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    GetParentCategory()
  },[])
  const [parentCat,setparentCat] = useState([])
    return (
      <View style={{flex:1,backgroundColor:"#ffffff"}}>
       <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
          <Header navigation={navigation} title={"Home"} dashboard={true} height={Scales.deviceHeight * 0.08} />
        </View>
        <View style={{width:Scales.deviceWidth*1.0,flexDirection:"row", height:Scales.deviceHeight*0.08, backgroundColor:'#f3f7f8'}}>
           <View style={{width:Scales.deviceWidth*0.50, height:Scales.deviceHeight*0.08,justifyContent:"center"}}>
           <Text style={{paddingLeft:10,color:"#969a9b", fontSize:Scales.moderateScale(14)}}>All CATEGORIES</Text>
           </View>
           <View style={{width:Scales.deviceWidth*.50,justifyContent:"center", height:Scales.deviceHeight*0.08,}}>
           <TouchableOpacity onPress={()=>navigation.navigate("storelist",{"cat_id":0,"title":"    NearBy Business Users"})}><Text style={{textAlign:"right",fontSize:Scales.moderateScale(14),color:"#325f98", paddingRight:10}}>See All</Text></TouchableOpacity>
           </View>
        </View>
        <View style={{width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.78, }}>
        <FlatList
                data={parentCat}
                renderItem={({ item,index }) => <NearbyList data={item} index={index} navigation={navigation} />}
                keyExtractor={item => String(item.id)}
              
              
                ></FlatList>
        </View>
      </View>
    );
  }


function NearbyList({data,index, navigation}){
  return(
    <TouchableOpacity onPress={()=>navigation.navigate("subcat",{"data":data})}><View style={{width:Scales.deviceWidth*1.0,flexDirection:"row",alignItems:"center", height:Scales.deviceHeight*0.075,backgroundColor:"#ffffff", borderTopWidth:index==0?0:0.8}}>
     
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