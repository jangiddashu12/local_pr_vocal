import * as React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"



export default function BusinessDetail({ navigation }) {
    async function Getdata() {
        let user_data = await AsyncStorage.getItem("user_data")
        user_data = JSON.parse(user_data)
        console.log((user_data.data.business_detail))
        setData(user_data.data.business_detail)
    }

    React.useEffect(() => {
        Getdata()
        // setData(user_data.data.business_detail)
    }, [])
    // console.log(data)
    const [data, setData] = React.useState({})
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
                <Header navigation={navigation} title={"Business Detail"} dashboard={true} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ flex: 1, paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ height: Scales.deviceHeight * 0.09, }}>
                    <View style={{ width: Scales.deviceWidth * 0.88, height: Scales.deviceHeight * 0.06, justifyContent: "center", borderBottomWidth: 0.8 }}>
                        <Text style={{ color: "#575757", paddingLeft: 5, fontSize: Scales.moderateScale(15) }}>Business Name : {data[0]==undefined?null: data[0].title}</Text>
                    </View>
                </View>

                <View style={{ height: Scales.deviceHeight * 0.09, }}>
                    <View style={{ width: Scales.deviceWidth * 0.88, height: Scales.deviceHeight * 0.06, justifyContent: "center", borderBottomWidth: 0.8 }}>
                        <Text style={{ color: "#575757", paddingLeft: 5, fontSize: Scales.moderateScale(15) }}>Web Url : {data[0]==undefined?null:data[0].web_url}</Text>
                    </View>
                </View>
                <View style={{ height: Scales.deviceHeight * 0.09, }}>
                    <View style={{ width: Scales.deviceWidth * 0.88, height: Scales.deviceHeight * 0.06, justifyContent: "center", borderBottomWidth: 0.8 }}>
                        <Text style={{ color: "#575757", paddingLeft: 5, fontSize: Scales.moderateScale(15) }}>Business Detail : {data[0]==undefined?null:data[0].detail}</Text>
                    </View>
                </View>
                <View style={{ height: Scales.deviceHeight * 0.09, }}>
                    <View style={{ width: Scales.deviceWidth * 0.88, height: Scales.deviceHeight * 0.06, justifyContent: "center", borderBottomWidth: 0.8 }}>
                        <Text style={{ color: "#575757", paddingLeft: 5, fontSize: Scales.moderateScale(15) }}>Business Moto : {data[0]==undefined?null:data[0].moto}</Text>
                    </View>
                </View>
                

            </View>
        </View>
    );
}