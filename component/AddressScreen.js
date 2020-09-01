import * as React from 'react';
import { Button, View, Text, TextInput, CheckBox, TouchableOpacity, ScrollView, FlatList, BackHandler, AsyncStorage } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'
import PostFetch from '../ajax/PostFetch'
import Toast from "react-native-simple-toast"

export default function Address({ navigation }) {
    async function Getdata() {
        let user_data = await AsyncStorage.getItem("user_data")
        user_data = JSON.parse(user_data)
        setuserData(user_data.data.customer_address)
    }
    function handleBackButtonClick() {
        console.log("Address")
        // navigation.goBack();
        return true;
    }
    
    React.useEffect(() => {
        Getdata()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        console.log(" add money);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

    }, [])
    const [userData, setuserData] = React.useState([])
    // console.log(userData,"dkkd")

    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Address"} dashboard={true} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={userData}
                    renderItem={(data) => <Adds data={data} />}
                // keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

function Adds({ data }) {
    // console.logr(data)
    return (
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.14, justifyContent: "center" }}>
            <View style={{ width: Scales.deviceWidth * 0.95, height: Scales.deviceHeight * 0.12, alignSelf: "center", backgroundColor: "white", elevation: 5, borderRadius: 10, paddingTop: 10, paddingLeft: 10 }}>
                <Text style={{fontSize:Scales.moderateScale(16)}}>Address: {data.item.address}</Text>
                <Text style={{fontSize:Scales.moderateScale(16),paddingTop:5}}>City: {data.item.city}</Text>
            </View>
        </View>
    )
}