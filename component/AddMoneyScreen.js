import React, { useState, useEffect, } from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    AsyncStorage,
    BackHandler
} from 'react-native';
import Header from "./Header"
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

import { Scales } from "@common"
import RazorpayCheckout from 'react-native-razorpay';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import PostFetch from '../ajax/PostFetch'

export default function AddMoney({ navigation }) {
    async function GetData(ref=false) {
        if(ref == true){
            setrefresh(true)
        }
        let user_id = await AsyncStorage.getItem("id")
        let url = "https://local-pe-vocal.in/api/customer/wallet/" + String(user_id)
        fetch(url)
            .then(resp => resp.json())
            .then((json) => {
                if (json.status == true) {
                    setData(json.data)
                    // console.log(data.wallet_ledger, "---------")
                }
                else {
                    alert(json.message)
                }

            })
            if(ref == true){
                setrefresh(false)
            }
    }
   function handleBackButtonClick(){
        console.log("add money")
        // navigation.goBack();
        return true;
    }
    
   
   
   
    function EnterAmt(text){
        setamt(text)
    }
    function EnterDesc(text){
        setdesc(text)
    }

    function MakePayment(){
        if(amt==""){
            return 0
        }
        var options = {
            description: desc,
            image: 'https://i.imgur.com/3g7nmJC.png',
            key: "rzp_test_4wgIHBPaYpaAac",
            amount: amt*100,
            currency:"INR",
            name: data.name,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                email: data.email,
                contact: data.phone,
                name: data.name
            },
            theme: { color: '#53a20e' }
        }
        RazorpayCheckout.open(options).then(async(data) => {
            // handle success
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            };
            let send_id = await AsyncStorage.getItem("id")
            // console.log(data)
            let payload={"amount":amt,"transaction_id":data.razorpay_payment_id,"transaction_type":"Razerpay","transaction_title":desc,"transaction_description":desc,"sender_id":send_id}
            let url = "https://local-pe-vocal.in/api/customer/wallet/addmoney/" + String(send_id)
            // console.log(payload)
            const json = await PostFetch(url, payload, headers)
            // console.log(json)
            if(json!=null){
                if(json.status==true){
                    Toast.showWithGravity("Successfully", Toast.SHORT, Toast.BOTTOM);
                }
                else{
                    Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM);
                }
            }

        }).catch((error) => {
            // handle failure
            Toast.showWithGravity(`Error: ${error.code} | ${error.description}`, Toast.SHORT, Toast.BOTTOM);
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    
    }
    const [data, setData] = useState([])
    const [amt, setamt] = useState(0)
    const [desc,setdesc] =useState("")
    let[refresh,setrefresh] = useState(false)

    function handleBackButtonClick() {

        // navigation.goBack();
        return true;
    } 
    React.useEffect(()=>{
        GetData()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Add Money"} size={18} dashboard={true} height={Scales.deviceHeight * 0.08} />
            </View>
            <ScrollView refreshControl={ <RefreshControl refreshing={refresh} onRefresh={()=>GetData(true)} />} style={{ flex: 1 }}><View style={{ width: Scales.deviceWidth * 1.0, paddingTop: 30, paddingLeft: 30, paddingRight: 10, height: Scales.deviceHeight * 0.60, }}>
                <View style={{ width: Scales.deviceWidth * 0.80, height: Scales.deviceHeight * 0.06, }}>
                    <Text style={{ fontSize: Scales.moderateScale(18) }}>Add money to wallet</Text>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.85, borderRadius: 5, paddingTop: 20, paddingLeft: 25, paddingRight: 20, height: Scales.deviceHeight * 0.50, backgroundColor: '#ffffff', elevation: 9 }}>
                    <View style={{ width: Scales.deviceWidth * 0.75, justifyContent: "center", height: Scales.deviceHeight * 0.06, }}>
                        <Text style={{ textAlign: "center", fontWeight: "100", fontSize: Scales.moderateScale(16) }}>Available Balance</Text>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.75, flexDirection: "row", height: Scales.deviceHeight * 0.06, justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome name={"rupee-sign"} size={18} color={"#31aee4"} /><Text style={{ textAlign: "center", color: "#31aee4", fontWeight: "100", fontSize: Scales.moderateScale(18), paddingLeft: 10 }}>{data.wallet != undefined ? data.wallet.raw_balance : null}</Text>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.75, justifyContent: "center", height: Scales.deviceHeight * 0.05, }}>
                        <Text style={{ fontWeight: "100", fontSize: Scales.moderateScale(16) }}>How much you like to add ?</Text>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.70, justifyContent: "flex-end", height: Scales.deviceHeight * 0.08 }}>
                        <TextInput keyboardType="number-pad" placeholder={"Enter Amount"} onChangeText={(text)=>EnterAmt(text)} style={{ fontWeight: "100", borderBottomWidth: 0.8, textAlignVertical: "bottom", fontSize: Scales.moderateScale(14) }} />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.70, justifyContent: "flex-end", height: Scales.deviceHeight * 0.08, }}>
                        <TextInput placeholder={"What's this for ?"} onChangeText={(text)=>EnterDesc(text)} style={{ fontWeight: "100", borderBottomWidth: 0.8, textAlignVertical: "bottom", fontSize: Scales.moderateScale(14) }} />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.70, justifyContent: "flex-end", height: Scales.deviceHeight * 0.09, }}>
                        <TouchableOpacity onPress={() => MakePayment()}><View style={{ width: Scales.deviceWidth * 0.50, alignSelf: "center", justifyContent: "center", height: Scales.deviceHeight * 0.06, borderRadius: 20, backgroundColor: "#e32e59" }}>
                                <Text style={{ textAlign: "center", color: "#ffffff", fontSize: Scales.moderateScale(16) }}>Add to wallet</Text>
                            </View></TouchableOpacity>
                    </View>

                </View>

            </View>
                <View style={{ paddingLeft: 28, flex: 1, }}>
                    <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.06, justifyContent: "center" }}>
                        <Text style={{ fontSize: Scales.moderateScale(18) }}>All Transactions</Text>
                    </View>
                    <FlatList
                        data={data.wallet_ledger}
                        renderItem={({ item, index }) => <WalletLedger data={item} index={index} navigation={navigation} />}
                        keyExtractor={item => String(item.id)}
                        style={{ backgroundColor: "#ffffff", width: Scales.deviceWidth * 0.90 }}
                        



                    ></FlatList>
                </View>
            </ScrollView>

        </View>
    )
}

function WalletLedger({ data, index, navigation }) {
    // console.log(data)
    return (
        <View style={{ width: Scales.deviceWidth * 0.90, flexDirection: "row",alignItems:"center"  }}>
            <View style={{  height: Scales.deviceHeight * 0.12,justifyContent:"center" }}>
                <View style={{width: Scales.deviceWidth * 0.15,justifyContent:"center", height: Scales.deviceHeight * 0.07,borderRadius:25, backgroundColor:'#2375fd'}}>
                <Icon name={"wallet"}  style={{alignSelf:"center",}} color={"white"}  size={30}/>
                </View>
            </View>
            <View style={{paddingLeft:13}}>
                <View style={{ width:Scales.deviceWidth*0.40,alignItems: "center", flexDirection: "row",  }}>
                    <View style={{ justifyContent: "center", width: Scales.deviceWidth * 0.35 }}>
                        <Text style={{fontSize:16,textTransform:"capitalize"}}>{data.transaction_description}</Text>
                    </View>
                    <View style={{ justifyContent: "center",width:Scales.deviceWidth*0.35,  }}>
                        <Text style={{ textAlign: "right",fontSize:12,paddingRight:Scales.deviceWidth*0.05, alignSelf: "flex-end", color:Math.sign(data.amount)==-1?"red":"green" }}>{"Rs." + data.amount}</Text>
                    </View>
                </View>
                <View style={{  flexDirection: "row",  alignItems: "center" }}>
                    <Text style={{fontSize:12,color:"#676767",paddingTop:10}}>{data.wallet_transaction_id}</Text>

                </View>
                <View style={{  flexDirection: "row", alignItems: "center" }}>
                    <View style={{ justifyContent: "center", width: Scales.deviceWidth * 0.35, }}>
                        <Text style={{fontSize:12,color:"#676767"}}>{data.updated_at.slice(0, 10)}</Text>
                    </View>
                    <View style={{ justifyContent: "center" ,}}>
                        <Text style={{ textAlign: "center",color:"#676767",fontSize:12, }}>Balance: Rs.{data.running_raw_balance}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}