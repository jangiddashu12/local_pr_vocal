import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';
 


 
export default class ScanScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };
 
  render() {
    return (
    //   <QRCodeScanner
    //     onRead={this.onSuccess}
    //     topContent={
    //       <Text style={styles.centerText}>
    //         Go to{' '}
    //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
    //         your computer and scan the QR code.
    //       </Text>
    //     }
    //     bottomContent={
    //       <TouchableOpacity style={styles.buttonTouchable}>
    //         <Text style={styles.buttonText}>OK. Got it!</Text>
    //       </TouchableOpacity>
    //     }
    //   />
    <View>

    </View>
    );
  }
}
 
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});