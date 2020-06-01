import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors'
import style from '../constants/Style'

import itemsList from '../data/ItemsData';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const API_URL = 'http://192.168.160.62:8080';

export default class Product extends React.Component {
  constructor(props){
    super(props);
  }

  state = { 
    product: {
      id : 0,
      name : "Fato Homem - M",
      imageLink : "https://www.youlikeitstore.com/wp-content/uploads/2019/08/8718475994657_a_en_hd_1.jpg",
      location : "Lisboa, Portugal",
      description: 'Estou a vender este fato porque tenho-o parado há muito tempo e já nao lhe dou uso. Está em ótimas condições e serve para todo o tipo de ocasiões.',
      price : 18.00
    }
  }

  componentDidMount(){
    this.fetchProduct()
  }

  fetchProduct(){
    let base_link = `${API_URL}/products/${this.state.id}`
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
            alert(json.message);
          } else {
            // Success
            let message = json

          }
        })
        .catch(error => {
          alert("Error fetching cities.");
          console.log(error);
        });
  }

  //GET Request


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
                    <TouchableOpacity style={{alignItems:'center', height:verticalScale(44), borderRadius:8 ,backgroundColor:colors.orange, flex:1.3,marginRight:5}}>
                        {/* Aqui ligar logo otelemovel com o nr que vem do user */}
                        <Text style={{fontSize:style.h3, fontWeight:'700', textAlign:'justify',marginTop:10, color:'white'}}>Add Favourite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center', height:verticalScale(44), borderRadius:8 ,backgroundColor:colors.secondary,flex: 1,marginLeft:5}}>
                        <Text style={{fontSize:style.h3, fontWeight:'700', textAlign:'justify',marginTop:10, color:'white'}}>Contact</Text>
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
