import * as React from 'react';
import { Button, View, Text, BackHandler,Share, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import Stars from 'react-native-stars';
import Material from 'react-native-vector-icons/MaterialIcons'
import FontAw from "react-native-vector-icons/FontAwesome5"
import Fontisto from "react-native-vector-icons/Fontisto"


export default function ProductDetail({ navigation }) {
    async function onShare(){
        try {
          const result = await Share.share({
            message:'प्रिय ग्राहक मेरा व्यवसाय Vani Krashi Sewa Kendra लोकल पे वोकल पर उपलब्ध हूं, कृपया लोकल पे वोकल द्वारा पैसे का भुगतान करें, अपना उत्पाद खरीदें या लोकल पे वोकल द्वारा सेवाएं प्राप्त करें ताकि मैं डिजिटल बन जाऊं Download LocalPeVocal https://play.google.com/store/apps/details?id=com.sumanwebdev.app.locapevocal',
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
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Product Detail"} dashboard={false} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.27, backgroundColor: "red" }}>
                <Image source={require("../assets/image/no_image.png")} style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.27 }} />
            </View>
            <View style={{ paddingTop: 8, paddingLeft: 10 }}>
                <Text style={{ fontSize: Scales.moderateScale(17) }}>NA Product Name</Text>
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.05, flexDirection: "row", alignItems: "center", }}>
                <View style={{ width: Scales.deviceWidth * 0.32, height: Scales.deviceHeight * 0.05, justifyContent: "center" }}>
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
                <View style={{ width: Scales.deviceWidth * 0.65, height: Scales.deviceHeight * 0.05, justifyContent: "center" }}>
                    <Text style={{ textAlign: "right", color: "#e32e59" }}>Review 5.0</Text>
                </View>
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08, flexDirection: "row", }}>
                <View style={{ width: Scales.deviceWidth * 0.70, height: Scales.deviceHeight * 0.08, paddingLeft: 10 }}>
                    <View style={{ flexDirection: "row", height: Scales.deviceHeight * 0.04, alignItems: "center", marginTop: 5, }}>
                        <FontAw name={"rupee-sign"} size={10} color={"#676767"} />
                        <Text style={{ textAlignVertical: "top", color: "#676767", fontSize: Scales.moderateScale(17) }}> 1000.00</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                        <Text style={{ color: "#676767", fontSize: Scales.moderateScale(14) }}>MRP : <Text style={{ fontSize: Scales.moderateScale(12) }}>₹ </Text><Text style={{ fontSize: Scales.moderateScale(16) }}>1000  </Text></Text>
                        <Text style={{ color: "#676767", fontSize: Scales.moderateScale(12), color: "#e32e59" }}>Save<Text style={{ fontSize: Scales.moderateScale(12) }}> </Text><Text style={{ fontSize: Scales.moderateScale(14), color: "#e32e59" }}>600</Text></Text>
                    </View>
                </View>
                <View style={{ width: Scales.deviceWidth * 0.24, justifyContent: "center", height: Scales.deviceHeight * 0.08 }}>
                    <TouchableOpacity onPress={onShare} ><Fontisto name={"share"} size={26} style={{ alignSelf: "flex-end" }} color={"#e32e59"} /></TouchableOpacity>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    myStarStyle: {
        color: 'orange',


    },
    myEmptyStarStyle: {
        color: 'white',
    }
});     