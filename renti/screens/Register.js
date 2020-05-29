//This is an example code for Bottom Navigation//
import React, { PureComponent } from 'react';
import colors from '../constants/Colors';
import style from '../constants/Style'
import { scale,verticalScale, moderateScale } from 'react-native-size-matters';
import { Icon, CheckBox } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

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
const API_URL = 'http://192.168.160.62:8080';

//import all the basic component we have used

export default class Register extends React.Component {
  //Detail Screen to show from any Open detail button
  constructor(props) {
    super(props);
  }
  state = {
    email:'',
    name:'',
    location:'',
    password:'',
    cities: [
      {label: 'Porto', value: '1'},
      {label: 'Aveiro', value: '2'},
    ]
  }

  componentDidMount(){
    this.fetchCities();
  }

  fetchCities(){
    let base_link = `${API_URL}/locations`
    console.log(base_link)
      fetch(base_link, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then(json => {
          console.log(json)
          if (json.error) {
            alert("Failed fetching cities!");
          } else {
            // Success
            let message = json
            let new_cities = []

            for (let index = 0; index < message.length; index++) {
              const city = message[index];

              var dict = {
                label : city.cityName,
                value : city.id,
              }

              new_cities.push(dict)
              
            }

            console.log(new_cities)

            // solution nº46
            this.setState({
              cities: new_cities,
            });

          }
        })
        .catch(error => {
          alert("Error fetching cities.");
          console.log(error);
        });
  }

  _storeData = async (id, email) => {
    console.log("Storing id: " + id);
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("id",id)
      this.setState({
        id: id,
        email: email,
      })
    } catch (error) {
      console.log(error);
    }
};

  makeRegisterRequest(){
      //unsecure way to send a post
    if (this.state.email=='' || this.state.name=='' || this.state.location=='' || this.state.password=='') {
        alert("Fill in the required information!")
    } else {
        console.log("Fetching:" + `${API_URL}/users`)
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

  changeLocation(item){
    this.setState({
      location: item
    })
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
            
            this._storeData(json.user.id, json.user.email);
            // navigate here
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

            <View style={{width:'100%', maxHeight:verticalScale(240)}}>
                <View style={{backgroundColor: colors.primary,
                              alignItems: 'center',
                              justifyContent: 'center',}}>

                    {/* FN */}
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Name" 
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({name:text})}/>
                    </View>

                      <DropDownPicker
                          items={this.state.cities}
                          defaultValue="1"
                          containerStyle={{height: 45, 
                            width:"80%",
                            borderRadius:20,
                            marginBottom:20,
                          }}
                          style={{backgroundColor: 'white'}}
                          dropDownStyle={{backgroundColor: '#fafafa'}}
                          onChangeItem={item => this.changeLocation(item)}
                      />

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
                                       

                </View>
            </View>
 
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