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
      <View style={styles.container}>
        <View style={styles.column_container}>
            <Text>Ola</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal:10,
    marginTop: 30 //TODO change to android top windo
  },
  column_container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal:10,
    marginTop: 30 //TODO change to android top windo
  },
  items: {
    flex:1,
    borderRadius:10,
    flexDirection:'row',
    marginTop:10,
    padding: 10,
    minHeight:130,
    backgroundColor:'#fff'
  }
});
