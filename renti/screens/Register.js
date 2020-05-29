//This is an example code for Bottom Navigation//
import React, { PureComponent } from 'react';
import colors from '../constants/Colors';
import style from '../constants/Style'
import { scale,verticalScale, moderateScale } from 'react-native-size-matters';
import { Icon, CheckBox } from 'react-native-elements'

//import react in our code.
import {
    View, 
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Picker,
    TextInput,
    DatePickerAndroid,
    Text,
    AsyncStorage,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
const API_URL = 'http://mednat.ieeta.pt:8442';

//import all the basic component we have used

export default class Register extends React.Component {
  //Detail Screen to show from any Open detail button
  constructor(props) {
    super(props);
  }
  state = {
    email:'',
    first_name:'',
    last_name:'',
    password:'',
    height :'',
    current_weight:'',
    diabetic: false,
    colesterol: false,
    weight_goal:'',
    birthday:'Birthdate',
    sex:'M',
    phone_number:'',
    photo:'https://www.healthredefine.com/wp-content/uploads/2018/02/person-placeholder.jpg',
    photo_base64:''
  }

  componentDidMount(){
    
  }

  _storeData = async (token) => {
    console.log("Storing Token: "+token)
    try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', this.state.email);

        this.setState({user_token:token})
  
    } catch (error) {
        console.log(error)
    }
};

  makeRegisterRequest(){
      //unsecure way to send a post
    if (this.state.email=='' || this.state.first_name=='' || this.state.last_name=='' || this.state.password=='' || this.state.height=='' || this.state.current_weight=='' || this.state.weight_goal=='' || this.state.birthday=='Birthday' || this.state.sex=='') {
        alert("Fill in the required information!")
    } else {
        console.log("Fetching:" + `${API_URL}/clients`)
        console.log(JSON.stringify({ //change these params later
            email:this.state.email,
            name:this.state.first_name,
            location: this.state.location,
            password:this.state.password, //this shouldnt go out as clear text
        }))
    fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //change these params later
            email:this.state.email,
            name:this.state.first_name,
            location: this.state.location,
            password:this.state.password, //this shouldnt go out as clear text
        }),
      }).then((response) => response.json())
      .then((json) => {
            console.log(json);
            if (false){
            //Credentials incorrect
                alert(json.message)
            }
            else { 
                //this.makeLoginRequest();
            }
      })
      .catch((error) => {
          alert("Error fetching login")
          console.error(error);
      });
    }
    
  }

  makeLoginRequest(){
    //unsecure way to send a post
  
    console.log("Fetching:" + `${API_URL}/login`);
      fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (false) {
            //Credentials incorrect
            alert("Login Credentials are invalid.");
          } else {
            
            //this._storeData(json.user.id);
            //this.
          }
        })
        .catch(error => {
          alert("Error fetching login");
          console.error(error);
        });
  
}

  render() {  
    return (
        <KeyboardAvoidingView style={styles.container} enabled>
            <Text style={{color:'white',fontSize:style.h1, marginBottom:verticalScale(30)}}>Create a new account!</Text>

            <ScrollView style={{width:'100%', maxHeight:verticalScale(290)}}>
                <View style={styles.containerScroll}>

                    {/* FN */}
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Name" 
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({first_name:text})}/>
                    </View>

                    {/* Intro */}
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Email" 
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({email:text})}/>
                    </View>

                    {/* Password */}
                    <View style={styles.inputView} >
                        <TextInput  
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password" 
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({password:text})}/>
                    </View>

                    {/* Intro */}
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Location" 
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({email:text})}/>
                    </View>
                    

                </View>
            </ScrollView>
 
            <TouchableOpacity onPress={() => this.makeRegisterRequest()} style={styles.loginBtn}>
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
    loginText:{
        color:'white'
    },
    photoText:{
        color:colors.primary
    },
    photoButton:{
        width:"80%",
        backgroundColor:'white',
        borderRadius:5,
        height:45,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    container:{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingVertical:10,
        justifyContent: 'center',
    },

    containerScroll:{
        flex: 1,
        width:'100%',
        height:'20%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputView:{
        width:"80%",
        backgroundColor:'white',
        color:colors.primary,
        borderRadius:20,
        height:45,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    
    inputText:{
        height:40,
        color:colors.primary,
    },

    forgot:{
        color:'white',
        fontSize:14
    },
    
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:45,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },

    register_title:{
        fontSize:style.h2,
        color:'white',
        fontWeight:'bold'
    },

    logo_text:{
        fontSize:style.h1,
        color:'white',
        fontWeight:'bold'
    }
});