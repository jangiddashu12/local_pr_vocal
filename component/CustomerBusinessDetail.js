import * as React from 'react';
import { Button, View, Text, TextInput, CheckBox,TouchableOpacity,ScrollView,BackHandler,Platform,PermissionsAndroid } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal"
import Toast from "react-native-simple-toast"
import BusinessDetail from './BusinessDetailScreen';

export default function BusinessCustomerDetail({navigation}){
    const [businessName,setbusinessName] = React.useState("")
    const [businessMoto,setbusinessMoto] = React.useState("")
    const [businessDetail,setbusinessDetail] = React.useState("")
    function UserRegister(){
        if(businessName==""){
            Toast.showWithGravity("Enter a Business Name.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
        if(BusinessDetail==""){
            Toast.showWithGravity("Enter a Business Detail.", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
      
        if(businessMoto==""){
            Toast.showWithGravity("Enter a Business Moto .", Toast.SHORT, Toast.BOTTOM);
            return 0;
        }
      
       
       navigation.navigate("SelectCategory",{"moto":businessMoto,"detail":BusinessDetail,"title":businessName})
    }
    function handleBackButtonClick() {

        navigation.goBack();
        return true;
    }

    React.useEffect(() => {
         
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        setbusinessName("")
        setbusinessMoto("")
        setbusinessDetail("")
        console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };},[])
    return(
        <View style={{ flex: 1 }}>
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
            <Header navigation={navigation} dashboard={false} title={"Business Detail"} special={true} nav={"Login"} />
        </View>
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, paddingTop: 25, height: Scales.deviceHeight * 0.70, }}>
                <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                    <FloatingLabelInput
                        label="Business Name*"
                        onChangeText={(e) => { setbusinessName(e) }}
                        enter_data={businessName}
                        value = {businessName}

                    />
                </View>
                <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                    <FloatingLabelInput
                        label="Business Detail*"
                        onChangeText={(e) => { setbusinessDetail(e) }}
                        enter_data={businessDetail}
                        value = {businessDetail}

                    />
                </View>
                <View style={{ width: Scales.deviceWidth * 1.0, paddingLeft: 20, height: Scales.deviceHeight * 0.10, }}>
                    <FloatingLabelInput
                        label="Business Moto*"
                        onChangeText={(e) => { setbusinessMoto(e) }}
                        enter_data={businessMoto}
                        value={businessMoto}
                    />
                </View>
                
               
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.20, flexDirection: "column-reverse" }}>
                <TouchableOpacity onPress={() => UserRegister()}><View style={{ width: Scales.deviceWidth * 0.80, justifyContent: "center", borderRadius: Scales.deviceHeight * 0.04, height: Scales.deviceHeight * 0.07, backgroundColor: true ? "#e32e59" : '#cccccc', alignSelf: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(18), color: true ? "#ffffff" : "#696969" }}>Next</Text>
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
UNSAFE_componentWillReceiveProps = (props) => {
    // console.log(props.label)
    if (props.label == "Address*") {
        if (props.enter_data.length != 0) {
            console.log(props)
            if (!this.state.isFocused) {
                this.setState({ focus: !this.state.focus, isFocused: true })
            }

        }
        else {
            this.setState({ focus: !this.state.focus, isFocused: false })
        }
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
