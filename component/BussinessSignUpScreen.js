import * as React from 'react';
import { Button, View, Text, TextInput, CheckBox,TouchableOpacity,ScrollView,BackHandler } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'

import Toast from "react-native-simple-toast"


export default function BusinessRegister({navigation}){
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
    let [businessName, setbusinessName] = React.useState("")
    let [businessDetail, setbusinessDetail] = React.useState("")
    let [businessMoto, setbusinessMoto] = React.useState("")

    async function UserRegister() {
        
        if(name==""){
            Toast.showWithGravity("Enter a name .", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
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
        if(businessName==""){
            Toast.showWithGravity("Enter a Business Name .", Toast.SHORT, Toast.BOTTOM);
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
        if(businessDetail==""){
            Toast.showWithGravity("Enter a Business Detail .", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(businessMoto==""){
            Toast.showWithGravity("Enter a Business Moto .", Toast.SHORT, Toast.BOTTOM);
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

       
       navigation.navigate("SelectCategory",{"address":address,"city":city,"detail":businessDetail,"email":email,"latitude":lat,"longitude":long,"phone":no,"moto":businessMoto,"name":name,"password":pass,"title":businessName,"zip":pin})
        
    }

    function SetAddressDetail(lat, long,city,add,pin){
        setlat(lat)
        setlong(long)
        setcity(city)
        setaddress(add)
        setPin(pin)
        console.log(address)
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
    return(
        <View style={{flex:1}}>
             <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Business Registration"} dashboard={false} height={Scales.deviceHeight * 0.08} />
            </View>
            <ScrollView style={{flex:1,}}>
                <View style={{ flex:1,   }}>
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
                            label="Business Name*"
                            onChangeText={(e) => { setbusinessName(e) }}
                            enter_data={businessName}
                            
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
                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Business Detail*"
                            onChangeText={(e) => { setbusinessDetail(e) }}
                            enter_data={businessDetail}
                            
                        />
                    </View>

                    <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                        <FloatingLabelInput
                            label="Business Moto*"
                            onChangeText={(e) => { setbusinessMoto(e) }}
                            enter_data={businessMoto}
                            
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
                </ScrollView>
                <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.10, justifyContent:"center" }}>
                   <TouchableOpacity onPress={()=>UserRegister()}><View style={{ width: Scales.deviceWidth * 0.80, justifyContent: "center", borderRadius: Scales.deviceHeight * 0.04, height: Scales.deviceHeight * 0.07, backgroundColor: button_status ? "#e32e59" : '#cccccc', alignSelf: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(18), color: button_status ? "#ffffff" : "#696969" }}>Next</Text>
                    </View></TouchableOpacity>
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
    // UNSAFE_componentWillUpdate=(props)=>{
        
        
    //     if(props.enter_data.length!=0&&props.label=="Address"){
    //         console.log(props, "LLLLLLLLLLL")
    //         this.setState({ focus: false,isFocused:true  })
    //     }
    // }



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