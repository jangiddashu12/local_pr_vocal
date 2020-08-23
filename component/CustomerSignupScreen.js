import * as React from 'react';
import { Button, View, Text, TextInput, CheckBox,AsyncStorage,BackHandler } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'
import PostFetch from '../ajax/PostFetch'
import Toast from "react-native-simple-toast"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomerSignup({ route,navigation }) {
    let [name, setName] = React.useState("")
    let [email, setemail] = React.useState("")
    let [no, setNo] = React.useState("")
    let [pass, setpass] = React.useState("")
    const [isSelected, setSelection] = React.useState(false);
    let button_status = name != "" && email != "" && no != "" && pass != "" ? true : false
    let [lat, setlat] = React.useState("")
    let [long, setlong] = React.useState("")
    let [city, setcity] = React.useState("")
    let [address, setaddress] = React.useState("")
    let [pin, setPin] = React.useState("")

    function SetAddressDetail(lat, long,city,add,pin){
        setlat(lat)
        setlong(long)
        setcity(city)
        setaddress(add)
        setPin(pin)
        console.log(address)
    }
    async function UserRegister() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };
        if(email==""){
            Toast.showWithGravity("Enter a email address.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email_test = re.test(String(email).toLowerCase());
        if (email_test == false) {
            Toast.showWithGravity("Enter a valid email address.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(name==""){
            Toast.showWithGravity("Enter a name .", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(no==""){
            Toast.showWithGravity("Enter a Mobile No.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(pass==""){
            Toast.showWithGravity("Enter a Password.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(pass.length<=8){
            Toast.showWithGravity("Please enter a password with atleast 8 characters", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(isSelected==""){
            Toast.showWithGravity("Please accept the privacy.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(city==""||address==""||pin==""){
            Toast.showWithGravity("Addreses is not found.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }

       
        let payload = {
            "address": address,
            "city": city,
            "email": email,
            "latitude": lat,
            "longitude": long,
            "name": name,
            "password": pass,
            "password_confirmation": pass,
            "phone": no,
            "zip": pin
        }
        let url = "https://local-pe-vocal.in/api/customer/create"
        console.log(payload)
        const json = await PostFetch(url, payload, headers)

        if(json!=null){
            if(json.status==true){
                await AsyncStorage.setItem("token", "avbsdivinsvonvown")
                await AsyncStorage.setItem("id", JSON.stringify(json.data.id))
                await AsyncStorage.setItem("user_data", JSON.stringify(json))
              
                navigation.navigate("AppCustomer", {"data":json})
            }
            else{
                alert(json.message)
            }
        }
        else{
            // alert("Something went wrong")
        }
    }
    function handleBackButtonClick(){
        return true
    }
    React.useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    },[])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"User Registration"} dashboard={false} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ width: Scales.deviceWidth * 1.0, paddingTop: 25, height: Scales.deviceHeight * 0.70, }}>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Name*"
                            onChangeText={(e) => { setName(e) }}
                            enter_data={name}

                        />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Email*"
                            onChangeText={(e) => { setemail(e) }}
                            enter_data={email}

                        />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Mobile Number*"
                            onChangeText={(e) => { setNo(e) }}
                            enter_data={no}
                            maxLength={10}
                            keyboardType={"number-pad"}

                        />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Password*"
                            onChangeText={(e) => { setpass(e) }}
                            enter_data={pass}
                            secureTextEntry = {true}

                        />
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, flexDirection: "row", height: Scales.deviceHeight * 0.10, }}>
                        <View style={{ width: Scales.deviceWidth * 0.70, height: Scales.deviceHeight * 0.10, }}>
                            <FloatingLabelInput
                                label="Address*"
                                enter_data={address}
                                value = {address}
                               

                            />
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate("map",{"Setfunc":SetAddressDetail})}><View style={{ width: Scales.deviceWidth * 0.12, paddingTop: 10, height: Scales.deviceHeight * 0.10, }}>
                            <IonicI size={24} name="location" style={{ alignSelf: "flex-end" }} />
                        </View></TouchableOpacity>
                    </View>
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, flexDirection: 'row' }}>
                        <View style={{ width: Scales.deviceWidth * 0.10, height: Scales.deviceHeight * 0.05, }}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                            />
                        </View>
                        <View style={{ width: Scales.deviceWidth * 0.60, justifyContent: "center", height: Scales.deviceHeight * 0.045 }}>
                            <Text style={{ color: "#e32e59" }}>Privacy Policy</Text>
                        </View>

                    </View>


                </View>
                <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.20, flexDirection: "column-reverse" }}>
                   <TouchableOpacity onPress={()=>UserRegister()}><View style={{ width: Scales.deviceWidth * 0.80, justifyContent: "center", borderRadius: Scales.deviceHeight * 0.04, height: Scales.deviceHeight * 0.07, backgroundColor: button_status ? "#e32e59" : '#cccccc', alignSelf: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(18), color: button_status ? "#ffffff" : "#696969" }}>Register</Text>
                    </View></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}



class FloatingLabelInput extends React.Component {
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
    UNSAFE_componentWillReceiveProps=(props)=>{
        // console.log(props)
        if(this.props.enter_data.length!=0){
            this.setState({ focus: !this.state.focus,isFocused:true })
        }
    }



    render() {
        
        const { label, ...props } = this.props;
        const { isFocused } = this.state;

        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: !isFocused ? 25 : 5,
            fontSize: !isFocused ? Scales.moderateScale(14) : Scales.moderateScale(12),
            color: !this.state.focus ? '#676767' : '#e32e59', fontFamily: "../assets/font/Roboto-Bold",
            paddingLeft: 10

        };
        let view_style = {}
        if (this.props.pass != true) {
            view_style = {}
        }
        else {
            view_style = { flexDirection: "row", width: Scales.deviceWidth * 0.85 }
        }
        return (
            <View style={{ paddingTop: 10 }}>
                <Text style={labelStyle}>
                    {label}
                </Text>
                <View style={view_style}>
                    <TextInput
                        
                        {...props}
                        style={{ paddingLeft: 10, }}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    
                    />

                </View>
                <View style={{ borderWidth: 0.8, backgroundColor: "#e32e59", bottom: 10, borderColor: this.state.focus ? "#e32e59" : '#b1b1b1', width: Scales.deviceWidth * 0.85 }}></View>
            </View>
        );
    }
}