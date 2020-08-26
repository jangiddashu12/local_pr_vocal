import * as React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Image,
  View,
  Text,
  FlatList,
  AsyncStorage,

} from 'react-native';
import Header from "./Header"
import Toast from "react-native-simple-toast"
import { Scales } from "@common"
import Modal from "react-native-modal"

export default function NotificationScreen({ navigation }) {
  async function GetNotfication() {
    setLoading(true)
    let id = await AsyncStorage.getItem("id")
    let uri = "https://local-pe-vocal.in/api/customer/notification/" + String(id)
    fetch(uri)
      .then(resp => resp.json())
      .then(json => {

        if (json.status == true) {
          setNoti(json.data)
        }
        else {
          Toast(json.message, Toast.SHORT, Toast.BOTTOM)
        }
      })
      .catch(err => {
        alert(err)
      })
      setLoading(false)

  }
  React.useEffect(() => {
    GetNotfication()
  }, [])

  const [notification, setNoti] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
        <Header navigation={navigation} title={"Notification"} dashboard={false} height={Scales.deviceHeight * 0.08} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={notification}
          renderItem={({ item }) => <NotificationList data={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}

        />
      </View>

      <Modal isVisible={loading}>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={20} style={{ alignSelf: "center" }} />
        </View>

      </Modal>
    </View>
  );
}

function NotificationList({ data }) {
  return (
    <View style={{ width: Scales.deviceWidth * 1.0, minHeight: Scales.deviceHeight * 0.18, justifyContent: "center" }}>
      <View style={{ width: Scales.deviceWidth * 0.95, alignSelf: "center", flexDirection: "row", minHeight: Scales.deviceHeight * 0.17, backgroundColor: "white", elevation: 5, borderRadius: 10 }}>
        <View style={{ width: Scales.deviceWidth * 0.25, justifyContent: "center", height: Scales.deviceHeight * 0.15 }}>
          <Image source={{ uri: data.image }} style={{ width: Scales.deviceWidth * 0.20, height: Scales.deviceHeight * 0.10, resizeMode: "center", alignSelf: "center", aborderWidth: 1 }} />
        </View>
        <View style={{ width: Scales.deviceWidth * 0.50, justifyContent: "center", height: Scales.deviceHeight * 0.15 }}>
          <Text style={{ fontSize: Scales.moderateScale(12) }}>{data.title}</Text>
          <Text style={{ fontSize: Scales.moderateScale(10), paddingTop: 5 }}>{data.body}</Text>
        </View>
        <View style={{ width: Scales.deviceWidth * 0.20, paddingTop: 15, height: Scales.deviceHeight * 0.15 }}>
          <Text style={{ fontSize: Scales.moderateScale(10) }}>{data.updated_at.slice(0, 10)}</Text>
        </View>
      </View>
    </View>
  )
}