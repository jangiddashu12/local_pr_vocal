import * as React from 'react';
import { Button, View, Text, TextInput, BackHandler, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'
import PostFetch from '../ajax/PostFetch'
import Toast from "react-native-simple-toast"


export default function Plans({ route, navigation }) {
    async function getPLans() {

        fetch("https://local-pe-vocal.in/api/business/subscription/plan")
            .then((resp) => resp.json())
            .then((json) => {
                // console.log(json)
                if (json.status == true) {
                    setPlan(json.data)
                }
                else {
                    alert(json.message)
                }
            })
    }
    function handleBackButtonClick() {
        navigation.goBack()
        return true;
      }
      React.useEffect(()=>{
          getPLans()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      },[])
    const [plan, setPlan] = React.useState([])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Select Your Subscription"} dashboard={false} size={16} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={plan}
                    renderItem={(data) => <PlanList data={data} navigation={navigation} route={route.params} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

function PlanList({ data, navigation, route }) {
    async function Payment(){
        let route_data = route
        route_data["package_id"] = data.item.id
        route_data["price"]=data.item.price
        rout_data["service_id"]=data.item.service.id
        navigation.navigate("payment",{route_data})
      
    }
    return (
        <View style={{ justifyContent: "center", width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.45 }}>
            <View style={{ alignSelf: "center", width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.42, backgroundColor: "white", elevation: 3, borderRadius: 5 }}>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, justifyContent: "flex-end" }}>
                    <Text style={{ textAlign: "center", color: "#e32e59", fontSize: Scales.moderateScale(18) }}>{data.item.title}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, alignItems: "flex-end", flexDirection: "row" }}>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>Main Service</Text>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>{data.item.service.title}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, alignItems: "flex-end", flexDirection: "row" }}>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>Business Overview</Text>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>{data.item.overview}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, alignItems: "flex-end", flexDirection: "row" }}>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>Detail</Text>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>{data.item.details}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, alignItems: "flex-end", flexDirection: "row" }}>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>Price</Text>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>{data.item.price}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, alignItems: "flex-end", flexDirection: "row",  }}>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05,paddingLeft:8, textAlign: "left", textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>You Saved</Text>
                    <Text style={{ width: Scales.deviceWidth * 0.45, height: Scales.deviceHeight * 0.05, textAlign: "left",paddingLeft:8, textAlignVertical: "center", fontSize: Scales.moderateScale(15) }}>{data.item.subscription_save_amount}</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.10, justifyContent: "center" }}>
                    <TouchableOpacity onPress={()=>Payment()}><View style={{width: Scales.deviceWidth * 0.60, height: Scales.deviceHeight * 0.055,borderRadius:Scales.deviceHeight*0.25,alignSelf:"center",backgroundColor:"#e32e59", justifyContent: "center"}}>
                        <Text style={{textAlign:"center",color:"#ffffff",fontSize:Scales.moderateScale(16),fontWeight:"900"}}>Proceed to pay</Text>
                    </View></TouchableOpacity>
                </View>
            </View>

        </View>
    )
}