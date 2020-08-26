import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,ActivityIndicator} from 'react-native';
export default class PreLoader extends Component {
  _renderLoader = () => {
    if (this.props.preLoaderVisible) return (
      <View style={styles.background}>
        <ActivityIndicator color={'green'} size={30} />
      </View>
    )
    else return null;
  }
render () {
    return (
      this._renderLoader()
    )
  }
}
const styles = StyleSheet.create ({
  background: {
    backgroundColor: "black",
    opacity:0.8,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});