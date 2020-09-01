import * as React from 'react';
import { Button, View, Text, TextInput, CheckBox, TouchableOpacity, ScrollView, FlatList,BackHandler  } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import IonicI from 'react-native-vector-icons/Ionicons'
import PostFetch from '../ajax/PostFetch'
import Toast from "react-native-simple-toast"


export default function SelectCategory({ navigation }) {
    
    GetCategory = async () => {
        fetch("https://local-pe-vocal.in/api/business/categories/parent/")
            .then((resp) => resp.json())
            .then((json) => {
                if (json.status == true) {
                    setCatData(json.data)
                }
                else {
                    alert(json.message)
                }
            })
    }
    function handleBackButtonClick() {
        console.log("bu reg cat")
        // navigation.goBack();
        return true;
    }

    React.useEffect(() => {
         GetCategory()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        console.log(" BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);")
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };})
    
  
    const [Catdata, setCatData] = React.useState([])
    const [SelectCat, setSelectCat] = React.useState([])
    const [selected, setselected] = React.useState(false)

    function SelectCatogey(data){
        let arr = SelectCat
        // console.log(arr.indexOf(data))
        if(arr.indexOf(data)>-1){
            arr.pop(data)
        }
        else{
            arr.push(data)
        }
        // console.log(arr)
        
        setSelectCat(arr)
        setselected(true)

    }
    function Goto(){
        if(SelectCat.length==0){
            Toast.showWithGravity("Please atleast one category", Toast.SHORT, Toast.BOTTOM)
            return 0
        }
        let dic = route.params
        dic["ids"] = SelectCat.join(",")
        navigation.navigate("SelectSubCategory",dic)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                <Header navigation={navigation} title={"Select Business Category"} dashboard={false} size={18} height={Scales.deviceHeight * 0.08} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Catdata}
                    renderItem={(data) => <Category data={data} navigation={navigation} SelectCatogey = {SelectCatogey} />}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.10, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => Goto()}><View style={{ width: Scales.deviceWidth * 0.80, justifyContent: "center", borderRadius: Scales.deviceHeight * 0.04, height: Scales.deviceHeight * 0.07, backgroundColor: selected?"#e32e59":'#cccccc', alignSelf: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(18), color: selected?"#ffffff":"#696969" }}>Next</Text>
                </View></TouchableOpacity>
            </View>
        </View>
    )
}

function Category({ data, navigation,SelectCatogey }) {
    // console.log(data)
    const [isSelected, setSelection] = React.useState(false);
    function Onselect(){
        let selected_state = isSelected
        setSelection(!selected_state)
        SelectCatogey(data.item.id)
    }
    return (
        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08, justifyContent: "center" }}>
            <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.06, alignSelf: "center", flexDirection: "row", backgroundColor: "white", elevation: 3,borderRadius:5 }}>
                <View style={{ width: Scales.deviceWidth * 0.70,justifyContent:"center" }}>
                    <Text style={{fontSize:Scales.moderateScale(16),paddingLeft:10}}>{data.item.title}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={Onselect}
                        style={{ alignSelf: "center", }}
                    />
                </View>
            </View>
        </View>
    )
}

