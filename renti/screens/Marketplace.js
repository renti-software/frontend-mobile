import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors'
import style from '../constants/Style'
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SearchBar } from 'react-native-elements';
import itemsList from '../data/ItemsData';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';


export default class Marketplace extends React.Component {
  constructor(props){
    super(props);
  }

  state = { 
    searchValue : '',
    //esta filtragem vem da API, enviar estes campos e devolver ja os itens conforme esta filtragem
    filters: {
      location: '',
      max_price: 1000,
      min_price: 0,
      category: '',
    }
  }

  componentDidMount(){

  }

  updateSearch(newSearch) {
    this.setState({
      searchValue: newSearch
    })
  }

  makeSearchUpdate() {
    alert(this.state.searchValue)
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

  renderItems() {
    return itemsList.map( item => {
      //Fazer aqui um filtro pelo item.name
      if(item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
        return(
        <TouchableOpacity onPress={() => alert(`Going to page ${item.name}`)}>
          <View style={styles.items}>
              <Image
                style={{height:110,padding:20,width:110,borderRadius:5,flex:1}}
                source={{uri: item.image}}
              >
              </Image>
      
              <View style={{flexDirection:'column',flex:2}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center', marginLeft:20}}>
                  <Text style={{fontSize:style.h3,fontWeight:'bold'}}>{item.name}</Text>
                </View>
      
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center', marginLeft:20}}>
                  <Text style={{}}>{item.location}</Text>
                </View>
      
                <View style={{flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-start', marginLeft:20,paddingVertical:20}}>
                  <Text style={{color:colors.primary, fontWeight:'bold',fontSize:style.h2}}>{item.price}€ /day</Text>
                </View>
              
              </View>
      
            </View>
          </TouchableOpacity>
        )
      }
    })
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <SearchBar
            placeholder="Search item..."
            lightTheme
            searchIcon={<Ionicons size={26} color='white' name="md-menu" />}
            inputContainerStyle={{backgroundColor:'white',borderColor:colors.gray,borderWidth:0}}
            containerStyle={{backgroundColor:'white', flex:3 , borderRadius:5, marginTop:10 ,borderBottomWidth:0,borderTopWidth:0}}
            onChangeText={(text) => this.updateSearch(text)}
            value={this.state.searchValue}
          />
        </View>
        
        {this.renderItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_gray,
    paddingHorizontal:10,
    marginTop: 30 //TODO change to android top window
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
