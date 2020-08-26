import * as React from 'react';
import { Button, View, Text, FlatList, AsyncStorage,Image } from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import Toast from "react-native-simple-toast"



export default function BusinessCateogry({ navigation }) {

  async function GetCategiry() {
    let id = await AsyncStorage.getItem("id")
    let url = "https://local-pe-vocal.in/api/customer/business/category/parent/" + String(id)
    fetch(url)
      .then(resp => resp.json())
      .then((json) => {
        if (json.status == true) {
          setData(json.data)
        }
        else {
          Toast.showWithGravity(json.message, Toast.SHORT, Toast.BOTTOM);
          return 0
        }

      })
      .catch((err) => {
        alert(err)
      })
  }
  React.useEffect(() => {
    GetCategiry()
  }, [])
  const [data, setData] = React.useState([])
  return (
    <View style={{ flex: 1 ,backgroundColor:"#ffffff"}}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.08 }}>
        <Header navigation={navigation} title={"BusinessCateogry"} dashboard={true} height={Scales.deviceHeight * 0.08} />
      </View>
      <View style={{width: Scales.deviceWidth*1.0,height:Scales.deviceHeight*0.91 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <CatHeader data={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}



function CatHeader({ data }) {
  console.log(data.sub_category)
  return (
    <View style={{ width: Scales.deviceWidth * 1.0, minHeight: Scales.deviceHeight * 0.20, justifyContent: "center", }}>
      <View style={{ width: Scales.deviceWidth * 0.90, borderRadius: 10, alignSelf: "center", backgroundColor: "white", borderRadius: 10, elevation: 5, minHeight: Scales.deviceHeight * 0.18, }}>
        <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.05, justifyContent: "center", paddingLeft: 10 }}>
          <Text style={{ fontSize: Scales.moderateScale(16), color: "#676767" }}>{data.title}</Text>
        </View>
        <View style={{ width: Scales.deviceWidth * 0.90, }}>
          <FlatList
            data={data.sub_category}
            renderItem={({ item }) => <SubCategory data={item} />}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

function SubCategory({ data }) {
  console.log(data, "========sub var==============")
  function onImageError(e) {
    console.log("onImageError");
    setloaded(false)

  }
  let [loaded,setloaded] = React.useState(true)
  return (
    <View style={{ width: Scales.deviceWidth * 0.22,  }}>
      <View style={{ width: Scales.deviceWidth * 0.16, backgroundColor: data.image == "" ? "#c7c7c7" : "transparent", height: Scales.deviceHeight * 0.08,borderRadius:Scales.deviceHeight * 0.10,  alignSelf: "center", }}>
        <Image onError={(e) => { onImageError(e) }} source={{ uri: data.image }} style={[{ width: Scales.deviceWidth * 0.16, alignSelf: "center", height: Scales.deviceHeight * 0.08,borderRadius:Scales.deviceHeight*0.20,   }, { transform: ([{ skewX: "45deg" }]) }]} />
      </View>
      <View style={{ width: Scales.deviceWidth * 0.16, alignSelf: "center",  justifyContent: "center" }}>
        <Text style={{ fontSize: Scales.moderateScale(12), textAlign: "center" }}>{data.title}</Text>
      </View>
    </View>
  )
}