import React, { useState, useEffect } from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,

} from 'react-native';

import { Scales } from "@common"
import {
    DrawerContentScrollView,
    DrawerItemList,DrawerItem
} from '@react-navigation/drawer';

export default function Content(props) {

    function GetData() {
        async function getData() {
            let data = await AsyncStorage.getItem("user_data")

            data = JSON.parse(data)
            console.log(data, "-----data------")
            // console.log(typeof(data), "---------type----")
            setdrawerData(data.data)
        }
        let Saved_data = getData()
        setdrawerData(Saved_data)
    }
    useEffect(() => {
        GetData()

    }, [])

    async function logout(){
        await AsyncStorage.clear()
        // props.navigation.closeDrawer()
        props.navigation.navigate("Auth")

    }

    const [drawerData, setdrawerData] = useState("");
    // console.log(props.navigation, "-------da----Login")

    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: Scales.deviceWidth * 0.715, height: Scales.deviceHeight * 0.20, }}>
                <Image source={require("../assets/image/logo.png")} style={{ resizeMode: "contain", width: Scales.deviceWidth * 0.71, height: Scales.deviceHeight * 0.20, }} />
            </View>
            <View style={{ width: Scales.deviceWidth * 0.715, justifyContent: "center", height: Scales.deviceHeight * 0.10, }}>
                <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(18) }}>Hi {drawerData.name}</Text>

            </View>
            <View style={{ flex: 1, }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Logout"
                        onPress={() =>logout() }
                    />
                </DrawerContentScrollView>
            </View>

        </View>
    )
}
