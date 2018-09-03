/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  BackHandler,
  alerts
} from 'react-native';
import { QRScannerView } from 'ac-qrcode';
import Toast from 'react-native-simple-toast';
import FormData from 'FormData';

export default class BarcodeScanner extends Component {
    static navigationOptions =  {header: null};
    constructor(props) {
        super(props);
        this.state ={
            latitude: null,
            longitude: null,
            error: null,
          
        }
      }
      
    
    render() {
        return (

            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => this._renderTitleBar()}

                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }

    
    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            ></Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            ></Text>
        )
    }

    test(e) {
        Toast.show('Type: ' + JSON.stringify(e.type) + '\nData: ' + JSON.stringify(e.data));
        //console.log(e)
    }
    // login = (e) => {
        
    //     if(e.type == 'QR_CODE'){
    //         //Toast.show('Type: ' + e.type + '\nData: ' + e.data);
    //     let formData = new FormData();
    //      formData.append('token', 'ea069c0c-5228-441a-a5cc-3510df5f56af');
    //      formData.append('guid', '6683cb01-a55a-11e8-9851-0cc47a761276');
    //      formData.append('qr_code', JSON.stringify(e.data));
    //     const navigation= this.props.navigation;
    //     fetch('http://auscse.com/etalab/attendance/student_scan/submit_scan.php', {
    //       method: 'POST',
    //        body: formData
    //     }).then((response) => response.json())
    //     .then(function(data) {
    //         //IMPORTANT
            
    //       //depending on data.status which is the response, we add if statements to alert the user
    //       navigation.navigate('TakeAttendance');
    //       alert(JSON.stringify(data.status));
    //     }).done();
    //     }
    //     else {
    //         alerts('Wrong Barcode Type \n Please Try Scanning QR Codes Only');
    //     }
        
    // }

    barcodeReceived = (e) => {
        AsyncStorage.getItem('guid').then((data)=>{
            guid=data;
            //Toast.show('guid: ' + guid);
            if(e.type == 'QR_CODE'){
                //Toast.show('Type: ' + e.type + '\nData: ' + e.data);
            let formData = new FormData();
             formData.append('token', 'ea069c0c-5228-441a-a5cc-3510df5f56af');
             formData.append('guid', guid);
             formData.append('qr_code', JSON.stringify(e.data));
            const navigation= this.props.navigation;
            fetch('http://auscse.com/etalab/attendance/student_scan/submit_scan.php', {
              method: 'POST',
               body: formData
            }).then((response) => response.json())
            .then(function(data) {
                //IMPORTANT
                
              //depending on data.status which is the response, we add if statements to alert the user
              navigation.navigate('TakeAttendance');
              alert(JSON.stringify(data.status));
            }).done();
            }
            else {
                alerts('Wrong Barcode Type \n Please Try Scanning QR Codes Only');
            }
        
        },err=>{

        })
        
       }
    // barcodeReceived = (e) => {
    //     if(e.type == 'QR_CODE'){
    //         let formData = new FormData();
    //         formData.append('token', 'ea069c0c-5228-441a-a5cc-3510df5f56af');
    //         formData.append('guid', '6683cb01-a55a-11e8-9851-0cc47a761276');
    //         formData.append('qr_code', 'f28134da-7088-42f5-8788-a91cbef4a511');
    //     fetch('http://auscse.com/etalab/attendance/test_login.php', {
    //       method: 'POST',
    //       body: formData
    //     }).then((response) => response.json())
    //     .then(function(data) {
    //       alert(JSON.stringify(data));
    //      //this.props.navigation.navigate('TakeAttendance');
    //     }).done();
    //     }
    //     else {
    //         alerts('Wrong Barcode Type \n Please Try Scanning QR Codes Only');
    //     }
    //   }
     
}