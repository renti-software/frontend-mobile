import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors'
import style from '../constants/Style'

import itemsList from '../data/ItemsData';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';


export default class Product extends React.Component {
  constructor(props){
    super(props);
  }

  state = { 
    id : "4",
    name : "Fato Homem - M",
    image : "https://www.youlikeitstore.com/wp-content/uploads/2019/08/8718475994657_a_en_hd_1.jpg",
    location : "Lisboa, Portugal",
    description: 'Estou a vender este fato porque tenho-o parado há muito tempo e já nao lhe dou uso. Está em ótimas condições e serve para todo o tipo de ocasiões.',
    price : 18.00
  }

  componentDidMount(){

  }

  //GET Request
  getLogs() {
    console.log(`${API_URL}/food-logs/${this.state.current_day}`);
    fetch(`${API_URL}/food-logs/${this.state.current_day}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.user_token
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.state == "Error") {
          alert(json.message);
        } else {
          // Success
          this.setState({
            data: json.message,
            refresh: false,
            loading: false
          });

          console.log("New state");
          console.log(this.state.data);
        }
      })
      .catch(error => {
        alert("Error adding Food Log.");
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.column_container}>
        <View style={styles.container}>
            <View style={{flex:1, alignItems:'center',paddingHorizontal:40}}>
                <Text style={{fontSize:style.h1, fontWeight:'700'}}>{this.state.name}</Text>
                <Image
                    style={{height:moderateScale(180),width:moderateScale(180),marginTop:10}}
                    source={{uri: this.state.image}}
                >
                </Image>
                <Text style={{fontSize:style.h3, fontWeight:'bold',color:colors.primary}}>{this.state.location}</Text>
                <Text style={{fontSize:style.body, fontWeight:'700', textAlign:'justify',marginTop:10}}>{this.state.description}</Text>
            
                <Text style={{fontSize:style.h1, fontWeight:'bold',color:colors.primary,marginTop:25}}>{this.state.price}€ /day</Text>
                <View style={{flexDirection:'row', marginTop:40}}>
                    <TouchableOpacity style={{alignItems:'center', height:verticalScale(44), borderRadius:8 ,backgroundColor:colors.secondary, flex:1,marginRight:5}}>
                        <Text style={{fontSize:style.h3, fontWeight:'700', textAlign:'justify',marginTop:10, color:'white'}}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center', height:verticalScale(44), borderRadius:8 ,backgroundColor:colors.primary,flex: 1,marginLeft:5}}>
                        <Text style={{fontSize:style.h3, fontWeight:'700', textAlign:'justify',marginTop:10, color:'white'}}>Rent</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 50 //TODO change to android top windo
  },
  column_container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 30 //TODO change to android top windo
  },
  items: {
    flex:1,
    borderRadius:10,
    flexDirection:'row',
    marginTop:10,
    minHeight:130,
    backgroundColor:'#fff'
  }
});