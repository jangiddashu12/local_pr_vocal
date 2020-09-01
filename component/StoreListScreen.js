import React, { useState, useEffect } from 'react';
import {
    Image,
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    BackHandler,
    Linking,
    Share,
    ImageBackground
} from 'react-native';
import Header from "./Header"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import Stars from 'react-native-stars';
import { Scales } from "@common"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"


export default function StoreList({ route, navigation }) {
    async function getStoreList() {
        let user_id = await AsyncStorage.getItem("id")
        let cat_id = route.params.cat_id
        let url = "https://local-pe-vocal.in/api/store/nearby/" + String(user_id) + "/" + String(cat_id)
        console.log(url)
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setstorelist(data.data)
            })
            .catch((err) => console.log(err))
    }
    function handleBackButtonClick() {

        navigation.goBack()
        return true;
    }
    React.useEffect(() => {
        getStoreList()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [])

    const [storelist, setstorelist] = useState([])
    console.log(storelist, "store-list")
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={route.params.title} size={18} dashboard={false} height={Scales.deviceHeight * 0.08} />
            </View>
            {storelist.length != 0 ? <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.92, }}>
                <FlatList
                    data={storelist}
                    renderItem={({ item, index }) => <List data={item} navigation={navigation} />}
                    keyExtractor={item => String(item.id)}></FlatList>
            </View> :
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>No Store Found</Text>
                </View>}


        </View>
    )
}

function List({ data, navigation }) {
    function sendWhatsAppMessage() {
        let link = "https://wa.me/" + String(data.phone) + "?"
        if (link) {
            Linking.canOpenURL(link)
                .then(supported => {
                    if (!supported) {
                        Alert.alert(
                            'Please install whats app to send direct message to students via whatapp'
                        );
                    } else {
                        return Linking.openURL(link);
                    }
                })
                .catch(err => console.error('An error occurred', err))
        }
        else {
            console.log('sendWhatsAppMessage -----> ', 'message link is undefined')
        }
    }


    let [err, setErr] = React.useState(false)
    React.useEffect(() => {
        if (data.business_detail[0].logo == null) {
            setErr(true)
        }
    }, [])
    return (
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.43, justifyContent: "center" }}>
            {/* <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("StoreDetail",{"store_id":data.id})}><View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.38, alignSelf: "center", backgroundColor: "#ffffff", elevation: 5, borderRadius: 10 }}>
                <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.24, }}>
                    <Image onError={()=>{console.warn("err");setErr(true)}} source={err?require("../assets/image/no_image.png"):{ uri: data.business_detail[0].logo }} style={{ width: Scales.deviceWidth * 0.95,borderTopLeftRadius:10,borderTopRightRadius:10, height: Scales.deviceHeight * 0.24 }}></Image>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.05,flexDirection:"row"  }}>
                   <View style={{width: Scales.deviceWidth * 0.50,justifyContent:"center",paddingRight:30, height: Scales.deviceHeight * 0.05,}}>
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
                   </View>
                   <View style={{width: Scales.deviceWidth * 0.45,justifyContent:"center", height: Scales.deviceHeight * 0.05,}}>
                       <Image source={{uri:data.membership_icon}} style={{width:Scales.deviceWidth*0.10, height:Scales.deviceHeight*0.04, resizeMode:"contain"}} />
                    </View>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.95, flexDirection: "row", alignItems: "center", height: Scales.deviceHeight * 0.05, }}>
                    <View style={{ width: Scales.deviceWidth * 0.60, justifyContent: "center", height: Scales.deviceHeight * 0.06 }}>
                        <Text style={{ paddingLeft: 10, fontSize: Scales.moderateScale(16) }}>{data.business_detail[0].title}</Text>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.35, justifyContent: "flex-end", paddingRight: 10, flexDirection: "row", alignItems: "center", height: Scales.deviceHeight * 0.06, }}>
                        <Material size={24} color="red" name="map-marker-distance" />
                        <Text style={{ color: 'red', paddingLeft: 10 }}>{Math.round(data.distance)} km</Text>
                    </View>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.95, justifyContent: "center", paddingLeft: 10, height: Scales.deviceHeight * 0.03, }}>
                    <Text style={{ color: "#a5a5a5" }}>{data.customer_address[0].address} {data.customer_address[0].city}</Text>
                </View>
            </View></TouchableOpacity> */}

            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("StoreDetail", { "store_id": data.id })}>
                <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.42, alignSelf: "center", backgroundColor: "#ffffff", elevation: 5, borderRadius: 10 }}>
                    <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.24, alignSelf: "center" }}>
                        <ImageBackground onError={() => { console.warn("err"); setErr(true) }} source={err ? require("../assets/image/no_image.png") : { uri: data.business_detail[0].logo }} style={{ width: Scales.deviceWidth * 0.95,justifyContent:"flex-end",  height: Scales.deviceHeight * 0.24 }}>
                        <Image source={{ uri: data.membership_icon }} style={{ width: Scales.deviceWidth * 0.05,alignSelf:"flex-end", height: Scales.deviceHeight * 0.04, resizeMode: "contain",marginRight:10 }} />

                        </ImageBackground>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.95, flexDirection: "row", minHeight: Scales.deviceHeight * 0.05 }}>
                        <View style={{ width: Scales.deviceWidth * 0.60, justifyContent: "center", minHeight: Scales.deviceHeight * 0.05, }}>
                            <Text style={{ paddingLeft: 10, fontSize: Scales.moderateScale(16) }}>{data.business_detail[0].title}</Text>
                        </View >
                        <View style={{ width: Scales.deviceWidth * 0.35, alignItems: "center", flexDirection: "row", minHeight: Scales.deviceHeight * 0.05 }}>
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

                        </View>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 0.95, flexDirection: "row", minHeight: Scales.deviceHeight * 0.125, paddingLeft: 10 }}>
                        <View style={{ width: Scales.deviceWidth * 0.57, flexDirection: "row", height: Scales.deviceHeight * 0.125, alignItems: "center" }}>
                            <View >
                                <IconI name="location-sharp" size={30} color={"#e32e59"} />
                            </View>
                            <View style={{}}>
                                <Text style={{ color: "#a5a5a5", paddingLeft: 5 }}>{data.customer_address[0].address} {data.customer_address[0].city}</Text>
                            </View>
                        </View>
                        <View style={{ width: Scales.deviceWidth * 0.36, minHeight: Scales.deviceHeight * 0.125, }}>
                            <View style={{ width: Scales.deviceWidth * 0.36, minHeight: Scales.deviceHeight * 0.07, flexDirection: "row", justifyContent: "space-between", }}>
                                <View style={{ width: Scales.deviceWidth * 0.18, minHeight: Scales.deviceHeight * 0.07 }}>
                                    <TouchableOpacity onPress={sendWhatsAppMessage}><Image source={require("../assets/image/whatsapp.png")} style={{ width: Scales.deviceWidth * 0.18, alignSelf: "flex-end", resizeMode: "contain", aspectRatio: 0.7, height: Scales.deviceHeight * 0.07 }} /></TouchableOpacity>
                                </View>
                                <View style={{ width: Scales.deviceWidth * 0.18, minHeight: Scales.deviceHeight * 0.07, justifyContent: "center" }}>
                                    {/* <Image source={require("../assets/image/whatsapp.png")} /> */}
                                    <TouchableOpacity onPress={() => Linking.openURL('tel:' + String(data.phone))}><Feather name={"phone-call"} size={28} style={{ alignSelf: "center" }} /></TouchableOpacity>

                                </View>
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.34, alignSelf: "flex-end", minHeight: Scales.deviceHeight * 0.055,  }}>
                                <View style={{ width: Scales.deviceWidth * 0.34, justifyContent: "flex-end", paddingRight: 10, flexDirection: "row", alignItems: "center", height: Scales.deviceHeight * 0.06, }}>
                                    <Material size={24} color="red" name="map-marker-distance" />
                                    <Text style={{ color: 'red', paddingLeft: 10 }}>{Math.round(data.distance)} km</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>


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