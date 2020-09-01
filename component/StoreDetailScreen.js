// import React, { useState, useEffect } from 'react';
// import {
//     Image,
//     FlatList,
//     Linking,
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     AsyncStorage,
// } from 'react-native';
// import Header from "./Header"
// import Stars from 'react-native-stars';
import { Scales } from "@common"
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialIcons'
import IonicI from 'react-native-vector-icons/Ionicons'
// import Modal from "react-native-modal"

// export default function StoreDetail({ route, navigation }) {
// async function getDetail() {
//     let store_id = await AsyncStorage.getItem("id")
//     if (route.params != undefined) {
//         store_id = route.params.store_id
//     }
//     let url = "https://local-pe-vocal.in/api/customer/" + String(store_id)
//     // console.log(url)
//     fetch(url)
//         .then((resp) => resp.json())
//         .then((data) => {
//             if (data.status == true) {
//                 console.log(data.data, "---------------detail---------------")
//                 setstoreDetail(data.data)
//             }
//             else {
//                 alert(json.message)
//             }

//         })
// }
// useEffect(() => {
//     getDetail()
// }, [])

// function sendWhatsAppMessage () {
//     let link = "https://wa.me/919234567812?"
//     if (true) {
//         Linking.canOpenURL(link)
//             .then(supported => {
//                 if (!supported) {
//                     Alert.alert(
//                         'Please install whats app to send direct message to students via whatapp'
//                     );
//                 } else {
//                     return Linking.openURL(link);
//                 }
//             })
//             .catch(err => console.error('An error occurred', err));
//     } else {
//         console.log('sendWhatsAppMessage -----> ', 'message link is undefined');
//     }
// };


// const [storeDetail, setstoreDetail] = useState([])
//     // console.log(storeDetail)
// let url = ""

// try {
//     url = "geo:" + storeDetail.customer_address[0].latitude + "," + storeDetail.customer_address[0].longitude + "?q=" + "daa"
//     // console.log(url)
// }
// catch{

// }

//     // console.log(navigation)
//     return (
//         <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
//             <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07, }}>
//                 <Header navigation={navigation} title={"Customer Detail"} dashboard={false} height={Scales.deviceHeight * 0.08} size={18} />
//             </View>

//             <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }}>
//                 <FlatList
//                     data={storeDetail.files}
//                     renderItem={({ item, index }) => <ImageCorosal data={item} navigation={navigation} />}
//                     keyExtractor={item => String(item.id)}
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                 />

//             </View>
//             <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.20, paddingTop: 25, paddingLeft: 20, borderBottomWidth: 2, borderColor: "#c7c7c7", flexDirection: 'row' }}>
//                 <View style={{ width: Scales.deviceWidth * 0.60, height: Scales.deviceHeight * 0.15, }}>
//                     <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.11, }}>
//                         <Text style={{ fontSize: Scales.moderateScale(20), textTransform: "capitalize" }}>{storeDetail.name}</Text>
//                         <Text style={{ fontSize: Scales.moderateScale(14), color: "#575757", textTransform: "capitalize" }}>{storeDetail.email}</Text>
//                         <Text style={{ fontSize: Scales.moderateScale(14), color: "#575757", textTransform: "capitalize" }}>{storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].address}, {storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].city}</Text>
// <View style={{ flexDirection: "row", alignItems: "center" }}>
//     <Text style={{ fontSize: Scales.moderateScale(14), color: "#575757", textTransform: "capitalize" }}>{storeDetail.phone}</Text>
//     <TouchableOpacity onPress={()=>Linking.openURL('tel:'+String(storeDetail.phone))}><FeatherI name={"phone-call"} size={16} style={{ marginLeft: Scales.deviceWidth*0.03 }} /></TouchableOpacity>
//     <TouchableOpacity onPress={()=>sendWhatsAppMessage()}><FeatherI name={"message-square"} size={16} style={{ marginLeft: Scales.deviceWidth*0.03 }} /></TouchableOpacity>
// </View>

//                     </View>
//                     <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.06, alignItems: "center", flexDirection: "row" }}>
//                         <Stars
//                             default={4.5}
//                             count={5}

//                             half={true}
//                             disabled={true}
//                             starSize={50}
//                             fullStar={<Material size={22} name={'star'} style={[styles.myStarStyle]} />}
//                             emptyStar={<Material size={22} name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
//                             halfStar={<Material size={22} name={'star-half'} style={[styles.myStarStyle]} />}
//                         />
//                         <View style={{ width: Scales.deviceWidth * 0.45, justifyContent: "center", height: Scales.deviceHeight * 0.05, }}>
//                             <Image source={{ uri: storeDetail.membership_icon }} style={{ width: Scales.deviceWidth * 0.10, height: Scales.deviceHeight * 0.04, resizeMode: "contain" }} />
//                         </View>
//                     </View>

//                 </View>
//                 <View style={{ width: Scales.deviceWidth * 0.30, height: Scales.deviceHeight * 0.10, justifyContent: "center", }}>
// <TouchableOpacity onPress={() => Linking.openURL(url)}><FontAwesome size={24} name={"map-marker-alt"} style={{ alignSelf: "flex-end", paddingRight: 10 }} /></TouchableOpacity>
//                 </View>

//             </View>

//             <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.24, justifyContent: "center" }}>
//                 <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.20, borderColor: "#c7c7c7", borderBottomWidth: 2 }}>
//                     <Text style={{ fontSize: Scales.moderateScale(16) }}>Description</Text>
//                     <View style={{ width: Scales.deviceWidth * 0.80, justifyContent: "center", height: Scales.deviceHeight * 0.05, }}>
//                         <Text>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].title}</Text>
//                     </View>
//                     <View style={{ width: Scales.deviceWidth * 0.80, height: Scales.deviceHeight * 0.10, }}>
//                         <Text style={{ color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].detail}</Text>
//                         <Text style={{ color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].moto}</Text>
//                         <Text sbackgroundColor: 'red'tyle={{ color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].web_url}</Text>
//                     </View>
//                 </View>
//             </View>
// <View style={{ width: Scales.deviceWidth * 1.0, alignItems: "center", height: Scales.deviceHeight * 0.10, justifyContent: "center", }}>
//     <TouchableOpacity onPress={() => navigation.navigate("pay", { "name": storeDetail.name })}><View style={{ width: Scales.deviceWidth * 0.70, borderRadius: 20, backgroundColor: '#e32e59', height: Scales.deviceHeight * 0.055, justifyContent: "center" }}>
//         <Text style={{ textAlign: "center", color: "#ffffff", fontSize: Scales.moderateScale(16) }}>PAY</Text>
//     </View></TouchableOpacity>
// </View>

//         </View>
//     )
// }

// function ImageCorosal({ data }) {
//     // console.log(data)
//     return (
//         <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }}>
//             <Image source={{ uri: data.file }} style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.30, }} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     myStarStyle: {
//         color: '#dd2956',


//     },
//     myEmptyStarStyle: {
//         color: 'white',
//     }
// });




import React, { useRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
    BackHandler,
    FlatList,
    Linking,
    TouchableOpacity,
    Alert,
    Image,
    Share,
    TextInput
} from "react-native";

import Feather from "react-native-vector-icons/Feather"
import FontAw from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/Ionicons"
import MatI from "react-native-vector-icons/MaterialCommunityIcons"
import Geolocation from 'react-native-geolocation-service';
import Toast from "react-native-simple-toast"
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import * as Animate from 'react-native-animatable'
import Stars from 'react-native-stars';
import FontO from "react-native-vector-icons/Fontisto"
// const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');



function StoreDetail({ route, navigation }) {

    async function getDetail() {
        let store_id = route.params.store_id
        if (route.params != undefined) {
            store_id = route.params.store_id
        }
        let url = "https://local-pe-vocal.in/api/customer/" + String(store_id)
        // console.log(url)
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status == true) {
                    // console.log(data.data, "---------------detail---------------")
                    setstoreDetail(data.data)
                    let imgs = []
                    for (let i of data.data.files) {
                        let img = i.file
                        imgs.push(img)
                    }
                    // console.log(imgs, "---")
                    setImage(imgs)
                }
                else {
                    alert(json.message)
                }

            })
    }


    function handleBackButtonClick() {
        console.log("detail")
        navigation.goBack()
        return true;
    }
    React.useEffect(() => {
        getDetail()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [])


    const [storeDetail, setstoreDetail] = React.useState([])
    const [images, setImage] = React.useState([])
    const [laodedimg, setloadimg] = React.useState(false)
    const [fav, setFav] = React.useState(false)
    const scrollX = useRef(new Animated.Value(0)).current;
    let [lat, setlat] = React.useState("")
    let [long, setlong] = React.useState("")

    const { width: windowWidth } = useWindowDimensions();
    const [enabled, setEnabled] = React.useState(true)
    const scrollRef = React.useRef();

    const [showPopover, setShowPopover] = React.useState(false);
    const [scrollOffsetAnim, setscrollOffsetAnim] = React.useState(new Animated.Value(0))
    let url = ""
    const [ani, setAni] = React.useState(false)

    try {
        url = "geo:" + storeDetail.customer_address[0].latitude + "," + storeDetail.customer_address[0].longitude + "?q=" + "daa"
        // console.log(url)
    }
    catch{

    }
    function sendWhatsAppMessage() {
        let link = "https://wa.me/" +"+91"+ String(storeDetail.phone) + "?"
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

    function SetAddressDetail() {

    }
    async function onShare() {
        try {
            const result = await Share.share({
                message: 'Shop link to access',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    console.log(images, "storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].latitude")
    return (
        <View>
            <ScrollView onScroll={(e) => { console.log(e.nativeEvent.contentOffset.y); if (e.nativeEvent.contentOffset.y > 115) { setEnabled(false) } else { setEnabled(true) } }}>
                <View><View style={{ flex: 1, }}>

                    {/* <ScrollView onScroll={(e) => {console.log(e.nativeEvent.contentOffset.y); if (e.nativeEvent.contentOffset.y > 150) { setEnabled(false) } else { setEnabled(true) } }}> */}

                    <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.35, }}>

                        {images.length == 0 ? <Image source={require("../assets/image/no_image.png")} style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.35 }} /> : <ScrollView
                            horizontal={true}
                            pagingEnabled
                            style={{}}
                            showsHorizontalScrollIndicator={false}

                        >
                            {images.map((image, imageIndex) => {
                                console.log(image, "---image")
                                return (
                                    <View
                                        style={{ width: windowWidth, height: Scales.deviceHeight * 0.35 }}
                                        key={imageIndex}
                                    >
                                        <ImageBackground  source={ { uri: image }} style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.35 }}>


                                        </ImageBackground>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        }
                    </View>


                    {/* </ScrollView> */}



                    <View style={{ height: Scales.deviceHeight * 1.0, backgroundColor: "white" }}>
                        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.33, }}>
                            {/* back vacent place */}
                        </View>
                        <View style={{ backgroundColor: "#e32e59", flexDirection: 'row', width: Scales.deviceWidth * 1.0, justifyContent: "space-between", height: Scales.deviceHeight * 0.09 }}>
                            <View style={{ width: Scales.deviceWidth * 0.33, justifyContent: "center", height: Scales.deviceHeight * 0.09 }}>
                                <Icon name={"md-qr-code-outline"} style={{ alignSelf: "center" }} size={24} />
                                <Text style={{ textAlign: "center", color: "white", paddingTop: 5, fontSize: 16 }}>QR Code</Text>
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.33, justifyContent: "center", height: Scales.deviceHeight * 0.09 }}>
                                {/* <Icon name={"md-qr-code-outline"} style={{alignSelf:"center"}} size={24} /> */}
                                <TouchableOpacity onPress={sendWhatsAppMessage}><Image source={require("../assets/image/whatsapp.png")} style={{ width: Scales.deviceWidth * 0.16, alignSelf: "center", resizeMode: "contain", aspectRatio: 0.7, height: Scales.deviceHeight * 0.04 }} /></TouchableOpacity>
                                <Text style={{ textAlign: "center", color: "white", paddingTop: 5, fontSize: 16 }}>WhatsApp</Text>
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.33, justifyContent: "center", height: Scales.deviceHeight * 0.09 }}>
                                {/* <Icon name={"md-qr-code-outline"} style={{alignSelf:"center"}} size={24} /> */}
                                <TouchableOpacity onPress={() => Linking.openURL('tel:' + String(storeDetail.phone))}><Feather name={"phone-call"} size={22} style={{ alignSelf: "center" }} /></TouchableOpacity>

                                <Text style={{ textAlign: "center", color: "white", paddingTop: 5, fontSize: 16 }}>Call</Text>
                            </View>
                        </View>
                        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.23, justifyContent: "center", }}>
                            <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.18, alignSelf: "center", backgroundColor: "white", elevation: 5 }}>
                                <View style={{ width: Scales.deviceWidth * 0.95, justifyContent: "center", height: Scales.deviceHeight * 0.04, }}>
                                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(16), color: "#e32e59" }}>D E T A I L S</Text>
                                </View>
                                <View style={{ width: Scales.deviceWidth * 0.95, justifyContent: "center", height: Scales.deviceHeight * 0.04, }}>
                                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(16), color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].title}</Text>

                                </View>
                                <View style={{ width: Scales.deviceWidth * 0.95, justifyContent: "center", height: Scales.deviceHeight * 0.09, }}>
                                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(13), color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].detail}</Text>

                                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(13), color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].moto}</Text>

                                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(13), color: "#676767" }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].web_url}</Text>

                                </View>
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.03, alignSelf: "center", borderBottomWidth: 2.0, borderColor: "#c7c7c7" }}></View>

                        </View>

                        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.04, justifyContent: "center" }}>
                            <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(16), color: "#e32e59" }}>PRODUCT DETAIL</Text>

                        </View>
                        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.24, justifyContent: 'center', }}>
                            <View style={{ width: Scales.deviceWidth * 0.95,alignSelf:"center", height: Scales.deviceHeight * 0.22, }}>
                                <FlatList 
                                    horizontal={true}
                                    data = {[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
                                    renderItem={({item})=><ProductList data={item} navigation={navigation} />}
                                />

                            </View>

                        </View>

                    </View>


                </View>


                    <View style={{ width: Scales.deviceWidth * 0.92, height: Scales.deviceHeight * 0.45, backgroundColor: "white", elevation: 9, alignSelf: "center", position: "absolute", top: Scales.deviceHeight * 0.20, }}>
                        <View style={{ width: Scales.deviceWidth * 0.92, flexDirection: "row" }}>
                            <View style={{ width: Scales.deviceWidth * 0.30, height: Scales.deviceHeight * 0.06, justifyContent: "center" }}>
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
                            <View style={{ width: Scales.deviceWidth * 0.15, justifyContent: "center", height: Scales.deviceHeight * 0.06, }}>
                                <View style={{ width: Scales.deviceWidth * 0.10, justifyContent: "center", height: Scales.deviceHeight * 0.04, alignSelf: "center", borderRadius: 10, backgroundColor: "#e32e59" }}>
                                    <Text style={{ textAlign: "center", color: "white" }}>4.5</Text>
                                </View>
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.42, height: Scales.deviceHeight * 0.06, justifyContent: "center" }}>
                                <Image source={{ uri: storeDetail.membership_icon }} style={{ width: Scales.deviceWidth * 0.07, alignSelf: "flex-end", height: Scales.deviceHeight * 0.04, resizeMode: "contain", marginRight: 10 }} />

                            </View>
                        </View>
                        <View style={{ width: Scales.deviceWidth * 0.90, paddingLeft: 10, justifyContent: "center", height: Scales.deviceHeight * 0.04, }}>
                            <Text style={{ paddingLeft: 10, color: "#676767", textTransform: "capitalize", fontSize: 16 }}>{storeDetail.name}</Text>
                        </View>
                        <View style={{ width: Scales.deviceWidth * 0.90, paddingLeft: 10, flexDirection: "row", alignItems: "center", height: Scales.deviceHeight * 0.04, }}>
                            <View >
                                <Icon name="location-sharp" size={20} color={"#e32e59"} />
                            </View>
                            <View style={{ width: Scales.deviceWidth * 0.60 }}>
                                <Text style={{ color: "#a5a5a5", paddingLeft: 5 }}>{storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].address} {storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].city}</Text>
                            </View>
                            <View style={{}}>
                                <TouchableOpacity onPress={()=>Linking.openURL('https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=route&destination='+String(storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].address)+'+'+String(storeDetail.customer_address == undefined ? null : storeDetail.customer_address[0].city))}><Text style={{ color: "blue", fontSize: 12 }}>Get Direction</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: Scales.deviceWidth * 0.92, height: Scales.deviceHeight * 0.27, justifyContent: "space-evenly", }}>
                            <View style={{ alignSelf: "center", paddingLeft: 20, width: Scales.deviceWidth * 0.85, alignItems: "center", borderRadius: 5, flexDirection: "row", height: Scales.deviceHeight * 0.07, elevation: 5, backgroundColor: 'white' }}>
                                <Icon name={"call"} color={"#676767"} size={26} style={{}} />
                                <Text style={{ color: "#676767", paddingLeft: 10 }}>{storeDetail.phone}</Text>
                            </View>
                            <View style={{ alignSelf: "center", paddingLeft: 20, alignItems: "center", flexDirection: "row", width: Scales.deviceWidth * 0.85, borderRadius: 5, height: Scales.deviceHeight * 0.07, elevation: 5, backgroundColor: 'white' }}>
                                <FontO name={"email"} color={"#676767"} size={24} />
                                <Text style={{ color: "#676767", paddingLeft: 10 }}>{storeDetail.email}</Text>
                            </View>
                            <View style={{ alignSelf: "center", paddingLeft: 20, alignItems: "center", flexDirection: "row", width: Scales.deviceWidth * 0.85, borderRadius: 5, height: Scales.deviceHeight * 0.07, elevation: 5, backgroundColor: 'white' }}>
                                <MatI name={"web"} color={"#676767"} size={24} />
                                <Text style={{ color: "#676767", paddingLeft: 10 }}>{storeDetail.business_detail == undefined ? null : storeDetail.business_detail[0].web_url}</Text>
                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.06, flexDirection: "row", backgroundColor: enabled ? 'transparent' : '#e32e59', alignItems: "center", justifyContent: "space-between", position: "absolute", top: 0, left: 0, paddingLeft: 25, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><View>
                    <IonicI name={"arrow-back"} color={true ? "white" : "black"} size={28} />
                </View></TouchableOpacity>
                {ani == false ? <View style={{ alignSelf: "flex-end", width: Scales.deviceWidth * 0.30, flexDirection: "row", alignItems: "center", height: Scales.deviceHeight * 0.05 }}>
                    <View style={{ justifyContent: "center", width: Scales.deviceWidth * 0.09 }}>
                        <TouchableOpacity onPress={() => { setFav(!fav); Toast.showWithGravity("This shop is added in Fav list", Toast.SHORT, Toast.BOTTOM) }}><Material size={20} color={true ? "white" : "black"} name={"favorite"} /></TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center", width: Scales.deviceWidth * 0.09 }}>
                        <TouchableOpacity onPress={() => onShare()} ><Feather name={"share"} size={20} color={true ? "white" : "black"} /></TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center", width: Scales.deviceWidth * 0.09 }}>

                        <TouchableOpacity onPress={() => { setAni(true) }}><Feather name={"search"} size={20} color={true ? "white" : "black"} /></TouchableOpacity>

                    </View>
                </View> :
                    <Animate.View animation="slideInRight" duration={1000}
                        style={{
                            height: Scales.deviceHeight * 0.06,
                            color: "black",
                            flexDirection: 'row',
                            width: Scales.deviceWidth * 0.80,
                            alignItems: 'center',


                        }}>
                        < TextInput placeholder="Search" style={{ fontSize: 18, width: Scales.deviceWidth * 0.70, color: "black" }} />
                        <TouchableOpacity onPress={() => { setAni(false) }}>< Icon name="close" color={enabled ? "white" : "black"} size={22} style={{}} /></TouchableOpacity>

                    </Animate.View>
                }
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, alignItems: "center", height: Scales.deviceHeight * 0.10, justifyContent: "center", position: "absolute", top: Scales.deviceHeight * 0.90 }}>
                <TouchableOpacity onPress={() => navigation.navigate("pay", { "name": storeDetail.name, "store_id": route.params.store_id })}><View style={{ width: Scales.deviceWidth * 0.50, borderRadius: 20, backgroundColor: '#e32e59', height: Scales.deviceHeight * 0.055, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#ffffff", fontSize: Scales.moderateScale(16) }}>PAY</Text>
                </View></TouchableOpacity>
            </View></View>
    );
}


function ProductList({ data ,navigation}) {
    // console.log(navigation)
    return (
        <View style={{ width: Scales.deviceWidth * 0.35, height: Scales.deviceHeight * 0.22, justifyContent: "center" }}>
           <TouchableOpacity activeOpacity={1}><View style={{width: Scales.deviceWidth * 0.32,alignSelf:"center", height: Scales.deviceHeight * 0.20}}>
               <View>
            <Image source={require("../assets/image/no_image.png")} style={{width: Scales.deviceWidth * 0.32,alignSelf:"center",borderRadius:5, height: Scales.deviceHeight * 0.12}} />

               </View>
               <View style={{width: Scales.deviceWidth * 0.32,alignSelf:"center",paddingLeft:10,paddingTop:5, height: Scales.deviceHeight * 0.08}}>
                    <Text style={{fontSize:12}}>Product Title</Text>
                    <Text style={{fontSize:12}}>Indore M.P</Text>
                    <View style={{flexDirection:"row"}}>
                    <FontAw name={"rupee-sign"} size={14} color={"#e32e59"} />
                    <Text style={{color:"#e32e59",fontSize:12}}>  1000/-</Text>
                    </View>
               </View>
           </View></TouchableOpacity>
         

        </View>
    )
}




export default StoreDetail;



const styles = StyleSheet.create({
    myStarStyle: {
        color: '#dd2956',


    },
    myEmptyStarStyle: {
        color: 'white',
    }
});