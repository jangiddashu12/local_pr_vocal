import * as React from 'react';
import { Button, View, Text, Platform, ActivityIndicator, TouchableOpacity ,BackHandler} from 'react-native';
import Header from "./Header"
import { Scales } from "@common"
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import Entypo from 'react-native-vector-icons/Entypo'



export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: [{ latitude: 22.7196, longitude: 75.8577 }],
            lat: this.props.route.params.lat,
            long: this.props.route.params.long,
            x: {
                latitude: 30.7196,
                longitude: 75.8577,
            },
            title: "",
            desc: "",
            address: "",
            city: "",
            latdelta: 0.05,
            longdelta: 0.05,
            default:true
        }
        this.mapRef = React.createRef(this);
    }

    getAddress = (lat = this.state.lat, long = this.state.long, e = null) => {
        if (e != null) {
            this.setState({ lat: e.latitude, long: e.longitude, longdelta: e.longitudeDelta, latdelta: e.latitudeDelta })
            // this.mapRef.current.region({
            //     latitude: this.state.lat,
            //     longitude: this.state.long,
            //     latitudeDelta: 0.05,
            //     longitudeDelta: 0.05,
            // })
        }
        Geocoder.from(lat, long)
            .then(json => {
                // console.log(json)

                var addressComponent = json.results[0].address_components[0];
                let city = json.results[0].formatted_address.split(",")
                // console.log(city)
                let pincode = city[city.length - 2]
                pincode = pincode.split(" ")
                pincode = pincode[pincode.length - 1]
                // console.log(pincode, "---opicnode")
                city = city[city.length - 3]
                this.setState({ title: addressComponent.short_name, desc: addressComponent.long_name, address: json.results[0].formatted_address, city: city })

            })
            .catch(error => console.warn(error));

    }
    handleBackButtonClick=()=> {

        navigation.goBack();
        return true;
    }
    
    

    
    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        console.log(this.props.route.params)
        let def = true
        if(this.props.route.params.default==false){
            def = false
        }

        this.setState({ lat: this.props.route.params.lat, long: this.props.route.params.long, default:def })
        
        Geocoder.init("AIzaSyDIwiyTe7w1QL55xwNPrEompjwsLX3SuMA");


    }

    componentWillUnmount=()=>{
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    // callLocation = async() => {
    //     //alert("callLocation Called");
    //     this.a = 0
    //     let b = await Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //         (position) => {
    //             // console.log(position, "pppositon")
    //             const currentLongitude = (position.coords.longitude);
    //             //getting the Longitude from the location json
    //             const currentLatitude = (position.coords.latitude);
    //             console.log(currentLongitude, "---", currentLatitude)
    //             this.a = currentLatitude
    //             console.log(currentLatitude,currentLongitude, "{{{{{")
    //             this.setState({ long: currentLongitude, lat: currentLatitude })

    //             this.getAddress(currentLatitude,currentLongitude)
    //             return currentLatitude
    //         },
    //         (error) => alert("error.message"),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //     this.watchID = Geolocation.watchPosition((position) => {
    //         const lastPosition = JSON.stringify(position);
    //         this.setState({ x: lastPosition });
    //     });

    //     // this.getAddress(this.state.lat,this.state.long)
    //     console.log(this.state.lat,this.state.long, "[][][]")


    // }

    GoBAck = () => {

        this.props.route.params.Setfunc(this.state.city, this.state.address, "452001")
        this.props.navigation.goBack()
    }
    render() {


        console.log(this.props.navigation, "marker")
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.07 }}>
                    <Header navigation={this.props.navigation} title={"Map"} dashboard={false} height={Scales.deviceHeight * 0.08} />
                </View>
                <View style={{ flex: 1, }}>

                    {this.state.lat == 0 && this.state.long == 0 ?
                        <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.70, justifyContent: "center" }}><ActivityIndicator style={{ alignSelf: "center" }} /></View>
                        : <MapView
                            style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.70 }}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsMyLocationButton={true}
                            showsCompass={true}
                            ref={this.mapRef}

                            zoomControlEnabled={true}
                            // showsTraffic={true}
                            toolbarEnabled={true}
                            // onMarkerDrag={e=>console.log(e)}
                            onPress={e => console.log(e)}
                            // region={{
                            //     latitude: this.state.lat,
                            //     longitude: this.state.long,
                            //     latitudeDelta: this.state.latdelta,
                            //     longitudeDelta: this.state.longdelta,
                            // }}
                            loadingEnabled={true}
                            // 
                            initialRegion={{
                                latitude: this.state.lat,
                                longitude: this.state.long,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                            // region ={{
                            //     latitude: this.state.lat==0?22.9676:this.state.lat,
                            //     longitude: this.state.long==0?75.9000058:this.state.long,
                            //     latitudeDelta: 0.05,
                            //     longitudeDelta: 0.05,
                            // }}
                            onRegionChange={e => this.setState({ lat: e.latitude, long: e.longitude })}
                            // onRegionChange={(result) => this.setState({lat:result.latitude,long:result.longitude,latdelta:result.latitudeDelta,longdelta:result.longitudeDelta})}
                            // onMarkerDragEnd={(e) => console.log(e)}
                            onRegionChangeComplete={(e) => this.getAddress(e.latitude, e.longitude, e)}
                        >

                            <Marker draggable={true}
                                coordinate={{
                                    latitude: this.state.lat,
                                    longitude: this.state.long,
                                }}
                                onDrag={e => console.log(e)}
                                onDragStart={e => console.log(e)}
                            />

                        </MapView>}
                    <View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.10, alignItems: "center", flexDirection: "row" }}>
                        <Entypo name="location" size={30} color="#900" />
                        <View style={{ width: Scales.deviceWidth * 0.90, height: Scales.deviceHeight * 0.10, justifyContent: "center" }}>
                            <Text style={{ textAlign: "center" }}>{this.state.address}</Text>
                        </View>
                    </View>
                    {this.state.default?<View style={{ width: Scales.deviceWidth * 1.0, height: Scales.deviceHeight * 0.10, justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => this.GoBAck()}><View style={{ backgroundColor: "red", width: Scales.deviceWidth * 0.60, justifyContent: "center", height: Scales.deviceHeight * 0.08, borderRadius: Scales.deviceHeight * 0.04, backgroundColor: "#e32e59", alignSelf: "center" }}>
                            <Text style={{ textAlign: "center", fontSize: Scales.moderateScale(16), color: "white" }}>Confirm Location</Text>
                        </View></TouchableOpacity>
                    </View>:null}
                </View>

            </View>
        );
    }
}