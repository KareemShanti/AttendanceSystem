import React ,{Component} from 'react';
import {TouchableOpacity, StyleSheet, View,Text,Alert,Dimensions,AsyncStorage} from 'react-native';
import { BackHandler } from 'react-native';
import Image from 'react-native-scalable-image';
import Toast from 'react-native-simple-toast';
export default class TakeAttendance extends Component {
    _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    );
  }
  //IMPORTANT
  //In the curly brackets in the Name,ID texts add AsyncStorage.getItem('uid')
  // and AsyncStorage.getItem('name')
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.logocontainer}>
                <Image 
                     width={Dimensions.get('window').width}
                    source={require('../../images/cse.png')} />
            </View>
            <View style={styles.middleContainer}>
            <Text style={styles.Text}>{}</Text> 
            <Text style={styles.Text2}>{}</Text>
            
            <TouchableOpacity style={styles.buttonContainer} onPress={this.logout} >
                
                <Text style={styles.buttonText}>logout</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.cameraContainer} onPress={this.GotoCamera} >
                
                <Image 
                     width={200}
                     height={200}
                    source={require('../../images/camera-icon.png')} />

            </TouchableOpacity>
            </View>
        </View>
        );
    }
    static navigationOptions =  {header: null};
    GotoCamera = () => {
        this.props.navigation.navigate('BarcodeScanner');
    }
    logout = () =>{
        
        //IMPORTANT
        const navigation =this.props.navigation;
        Alert.alert(
            'Alert',
            'Are you sure you want to Logout?',
            [
              {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
              {text: 'OK', onPress: () =>{
                  navigation.navigate('Login');
                  AsyncStorage.removeItem('guid');
                }},
            ],
            { cancelable: false }
          )
        
        
        //AsyncStorage.removeItem('name');
        //AsyncStorage.removeItem('uid');
        
    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        );
      }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton() {
        //AsyncStorage.removeItem('guid');
        //this.props.navigate('Login')
        // Alert.alert(
        //     'Alert',
        //     'Are you sure you want to Logout?',
        //     [
        //       {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
        //       {text: 'OK', onPress: () =>{this.logout()}},
        //     ],
        //     { cancelable: false }
        //   )
        return true;
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    middleContainer: {
        
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow:1,
        paddingLeft:40,
        paddingRight:40,
        paddingBottom:100,
    },
    logocontainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
      },
    
    buttonContainer:{
        width: 200,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:'#c0392b'
      },
      cameraContainer:{
          width: 200,
          height:100,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start'
      },
      buttonText:{
        
        textAlign:'center',
        color: 'black',
        fontWeight: '700',
        
        },
      Text:{
        paddingTop:100,
        textAlign:'center',
        color: 'black',
        fontWeight: '700'
        },
        Text2:{
            paddingTop:10,
            paddingBottom:10,
            textAlign:'center',
            color: 'black',
            fontWeight: '700'
            },

})