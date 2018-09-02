import React , {Component} from 'react';
import {
   StyleSheet, 
   Text, 
   TextInput,
   View,
   AsyncStorage,
   KeyboardAvoidingView, 
   TouchableOpacity ,
   Dimensions,
   alerts
  } from 'react-native';
  import FormData from 'FormData';
  import Toast from 'react-native-simple-toast';
  import Image from 'react-native-scalable-image';
  
  var sha1 = require('../sha1');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
    }
  }
  static navigationOptions =  {header: null};
  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async ()=>{
    const value = await AsyncStorage.getItem('guid');
    if(value !== null) {
      this.props.navigation.navigate('TakeAttendance');
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.logocontainer}>
            <Image 
             width={Dimensions.get('window').width}
            source={require('../../images/cse.png')} />
        </View>
        <View style={styles.container}>
        <TextInput
            placeholder="Email"
            returnKeyType="next"
            style={styles.input}
            onSubmitEditting={()=>this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText= {(username)=>this.setState({username}) }
            />
         <TextInput
            placeholder="Password"
            secureTextEntry
            returnKeyType="go"
            style={styles.input}
            autoCapitalize="none"
            ref={(input)=> this.passwordInput=input}
            onChangeText= {(password)=>this.setState({password})}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login} >
                
                <Text style={styles.buttonText}>Login</Text>

            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  test = () => {
   // var sha1 = require('sha1');
    //Toast.show('pass: ' + this.state.password + '\nencrypt: ' + sha1(this.state.password));
    this.props.navigation.navigate('TakeAttendance');
  }
  isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('guid')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  login = () => {
    let formData = new FormData();
    formData.append('token', 'ea069c0c-5228-441a-a5cc-3510df5f56af');
    formData.append('username', this.state.username);
    formData.append('password', sha1(this.state.password));
    const navigation= this.props.navigation;
    fetch('http://auscse.com/etalab/attendance/test_login.php', {
      method: 'POST',
       body: formData
      
    }).then((response) => response.json())
    .then(function(data) {
      if(data.status === "Success"){
        AsyncStorage.setItem('guid', data.guid);
        
        // AsyncStorage.setItem('UID',res.uid);
        // AsyncStorage.setItem('Name',res.name);
       navigation.navigate('TakeAttendance');
      }
      else alert(JSON.stringify(data.status));
    }).done();
    
   }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    
    
  },
  logocontainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft:40,
    paddingRight:40,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10
},
buttonContainer:{
  width: 200,
  paddingVertical:10,
  borderRadius:10,
  backgroundColor:'#c0392b'
},
buttonText:{
  textAlign:'center',
  color: 'black',
  fontWeight: '700'
  }
});


