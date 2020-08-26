
import React, { useState, useEffect, Component } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    AsyncStorage,
    BackHandler

} from 'react-native';
import Toast from 'react-native-simple-toast';

import { Scales } from "@common"
import Header from "./Header"
import PostFetch from '../ajax/PostFetch'
import Modal from "react-native-modal"

export default function LoginScreen({ route, navigation }) {

    async function Login(email, password) {

        // let email=email
        // let password = password
        if (email.length == 0) {
            Toast.showWithGravity("Enter Email or Phone", Toast.SHORT, Toast.BOTTOM);
            return 0
        }
        if (password.length == 0) {
            Toast.showWithGravity("Enter Password", Toast.SHORT, Toast.BOTTOM);
            return 0
        }
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Key': await AsyncStorage.getItem('token')
        };



        let payload = {
            "email_number": email, "password": password
        }
        // console.log(payload)
        setLoading(true)
        const json = await PostFetch("https://local-pe-vocal.in/api/customer/login", payload, headers)
        // console.log(json)
        if (json != null) {
            if (json.status == true) {

                await AsyncStorage.setItem("token", "avbsdivinsvonvown")
                await AsyncStorage.setItem("id", JSON.stringify(json.data.id))
                await AsyncStorage.setItem("user_data", JSON.stringify(json))

                if (json.data.business_customer == false) {
                    navigation.navigate("AppCustomer")
                }
                else {
                    navigation.navigate("App")
                }
            }
            else {
                Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM);
            }


        }
        else {
            alert("Something Went Wrong !!!")
        }
        setLoading(false)

    }
    function handleBackButtonClick() {

        navigation.goBack();
        return true;
    }

    useEffect(() => {
        // console.log(navigation.navigate)
        // fetch("https://extreme-ip-lookup.com/json/")
        // .then((resp)=>resp.json())
        // .then((json)=>{
        //     console.log(json)
        //     // console.log("==================== json ====================================")
        // })

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };

    }, [])

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
                <Header title={"Login"} />
            </View>
            <View style={{ flex: 1, }}>

                <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.50, marginTop: Scales.deviceHeight * 0.12 }}>
                    <View style={{ flexDirection: 'row', height: Scales.deviceHeight * 0.10, alignSelf: "center", alignContent: "center" }}>
                        {/* <TextInput placeholder="Password" secureTextEntry={this.state.password_hide} onChangeText={this.OnEnterPassword} style={{ height: Scales.deviceHeight * 0.06, width: "88%", fontFamily: 'roboto-medium', textAlign: 'left', paddingLeft: 10, fontSize: Scales.moderateScale(16), }}></TextInput> */}
                        <FloatingLabelInput
                            label="Email/Number*"
                            onChangeText={(e) => { setEmail(e) }}
                            enter_data={email}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', height: Scales.deviceHeight * 0.10, marginTop: 10, alignSelf: "center", alignContent: "center" }}>
                        {/* <TextInput placeholder="Password" secureTextEntry={this.state.password_hide} onChangeText={this.OnEnterPassword} style={{ height: Scales.deviceHeight * 0.06, width: "88%", fontFamily: 'roboto-medium', textAlign: 'left', paddingLeft: 10, fontSize: Scales.moderateScale(16), }}></TextInput> */}
                        <FloatingLabelInput
                            label="Password*"
                            onChangeText={(e) => { setPassword(e) }}
                            enter_data={password}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={{ height: Scales.deviceHeight * 0.08, width: Scales.deviceWidth * 1.0, justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => Login(email, password)}><View style={{ alignSelf: "center", height: Scales.deviceHeight * 0.06, backgroundColor: email != "" && password != "" ? "#e32e59" : "#cccccc", width: Scales.deviceWidth * 0.75, justifyContent: "center", borderRadius: Scales.deviceWidth * 0.35 }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontFamily: "OpenSans-Light", color: email.length != 0 && password.length != 0 ? "#ffffff" : "#5f5f5f", fontSize: Scales.moderateScale(16) }}>Login</Text>

                        </View></TouchableOpacity>

                    </View>
                    <View style={{ height: Scales.deviceHeight * 0.08, width: Scales.deviceWidth * 1.0, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(14) }}>Don't have an account?<Text style={{ color: "#e32e59", fontWeight: "900" }}> Sign Up</Text></Text>

                    </View>

                </View>
            </View>

            <Modal isVisible={loading}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size={20} style={{ alignSelf: "center" }} />
                </View>

            </Modal>
        </View>
    )
}


class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
        password_hide: true,
        focus: false
    };

    handleFocus = () => this.setState({ isFocused: true, focus: true });
    handleBlur = () => {

        if (this.props.enter_data.length == 0) {
            this.setState({ isFocused: false });
        }
        this.setState({ focus: !this.state.focus })

    }




    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;

        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: !isFocused ? 25 : 5,
            fontSize: !isFocused ? Scales.moderateScale(14) : Scales.moderateScale(12),
            color: !this.state.focus ? 'black' : '#e32e59', fontFamily: "../assets/font/Roboto-Bold",
            paddingLeft: 10

        };
        let view_style = {}
        if (this.props.pass != true) {
            view_style = {}
        }
        else {
            view_style = { flexDirection: "row", width: Scales.deviceWidth * 0.90 }
        }
        return (
            <View style={{ paddingTop: 10 }}>
                <Text style={labelStyle}>
                    {label}
                </Text>
                <View style={view_style}>
                    <TextInput
                        {...props}
                        style={{ paddingLeft: 10 }}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}


                    />

                </View>
                <View style={{ borderWidth: 0.8, backgroundColor: "#e32e59", bottom: 10, borderColor: this.state.focus ? "#e32e59" : '#b1b1b1', width: Scales.deviceWidth * 0.88 }}></View>
            </View>
        );
    }
}