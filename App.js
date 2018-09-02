import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Components/Login/Login';
import BarcodeScanner from './src/Components/Camera/BarcodeScanner';
import TakeAttendance from './src/Components/Camera/TakeAttendance';
import {StackNavigator} from 'react-navigation';


const Stacknavigator = StackNavigator({
 Login: {screen:Login},
 TakeAttendance: {screen:TakeAttendance},
 BarcodeScanner: {screen:BarcodeScanner},
}, {
  index: 0,
  initialRouteName: 'Login',
  
}
);

export default class App extends Component {
  render() {
    return (
      <Stacknavigator />
    );
  }
};
