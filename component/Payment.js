
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    AsyncStorage,

} from 'react-native';
import PostFetch from "../ajax/PostFetch"
import { Scales } from "@common"
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';

export default function Payment({ route,navigation }) {
    async function OnlinePay(){
        console.log(route)
        var options = {
            description: "",
            image: 'https://i.imgur.com/3g7nmJC.png',
            key: "rzp_test_4wgIHBPaYpaAac",
            amount: route.params.route_data.price*100,
            currency:"INR",
            name: route.params.route_data.name,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                email: route.params.route_data.email,
                contact: route.params.route_data.phone,
                name: route.params.route_data.name
            },
            theme: { color: '#53a20e' }
        }
        RazorpayCheckout.open(options).then(async(data) => {
            // handle success
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Key': await AsyncStorage.getItem('token')
            };
            let cat_ids = route.params.route_data.sub_cat.split(",")
            console.log(cat_ids)
            let cat = []
            for(let i of cat_ids){
                let cat_id = {
                    "id":i
                }
                cat.push(cat_id)
            } 
            let datas = route.params.route_data
            let payload = {
                "address": datas.address,
                "categories": cat,
                "city": datas.city,
                "detail": datas.detail,
                "email": datas.email,
                "latitude": datas.latitude,
                "longitude": datas.longitude,
                "phone": datas.phone,
                "moto": datas.moto,
                "name": datas.name,
                "password": datas.password,
                "password_confirmation": datas.password,
                "title": datas.title,
                "zip": datas.title,
                "service_id": 2,
                "package_id": datas.package_id,
                "transaction_type": 1,
                "amount": datas.price,
                "transaction_id": data.razorpay_payment_id
              }
            console.log(payload)
    
            const json = await PostFetch("https://local-pe-vocal.in/api/business/customer/create", payload, headers)
            if (json != null) {
                console.log(json)
                if(json.status==true){
                    
                    await AsyncStorage.setItem("token", "avbsdivinsvonvown")
                    await AsyncStorage.setItem("id", JSON.stringify(json.data.id))
                    await AsyncStorage.setItem("user_data", JSON.stringify(json))
                  
                    navigation.navigate("App", {"data":json})
                }
                else{
                    Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM);
                }
                
    
            }
            else {
                alert("Something Went Wrong !!!")
            }

        }).catch((error) => {
            // handle failure
            Toast.showWithGravity(`Error: ${error.code} | ${error.description}`, Toast.SHORT, Toast.BOTTOM);
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    }
    return (
        <View style={{ flex: 1, }}>
            <ImageBackground style={{ flex: 1, flexDirection: "column-reverse" }} source={require("../assets/image/login_background.png")}>
                <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.32, }}>

                    <View style={{ height: Scales.deviceHeight * 0.08 }}>
                        <TouchableOpacity ><View style={{ width: Scales.deviceWidth * .80, alignSelf: 'center', justifyContent: "center", height: Scales.deviceHeight * 0.065, borderRadius: 100, backgroundColor: '#e32e59' }}>
                            <Text style={{ textAlign: "center", color: 'white', fontFamily: "OpenSans-Light", fontSize: Scales.moderateScale(14) }}>Cash in hand</Text>
                        </View></TouchableOpacity>
                    </View>
                    <View style={{ height: Scales.deviceHeight * 0.08 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>OnlinePay()} >
                            <View style={{ width: Scales.deviceWidth * .80, alignSelf: 'center', justifyContent: "center", height: Scales.deviceHeight * 0.065, borderWidth: 0.8, backgroundColor: "white", borderRadius: 100, borderColor: '#e32e59' }}>
                                <Text style={{ textAlign: "center", color: '#d04a6d', fontFamily: "OpenSans-Light", fontSize: Scales.moderateScale(16) }}>Online Payment</Text>
                            </View></TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        </View>
    );
}

