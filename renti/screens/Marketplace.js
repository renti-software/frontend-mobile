import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors'
import style from '../constants/Style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FAB from "react-native-fab";
import Modal from "react-native-simple-modal";
import { SearchBar } from 'react-native-elements';
import itemsList from '../data/ItemsData';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';


export default class Marketplace extends React.Component {
  constructor(props){
    super(props);
  }

  state = { 
    searchValue : '',
    //esta filtragem vem da API, enviar estes campos e devolver ja os itens conforme esta filtragem
      location: '',
      max_price: 1000,
      min_price: 0,
      category: '',
    //modal
    open : false

  }

  //This is awful, but we cant pass state param as arg

  changeLocation = (val) => {
    this.setState({
        location: val
    })
  }

  changeMaxPrice = (val) => {
    this.setState({
        max_price: val
    })
  }

  changeMinPrice = (val) => {
    this.setState({
        min_price: val
    })
  }

  changeCategory = (val) => {
    this.setState({
        category: val
    })
  }

  //hook like notations
  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
    console.log("Modal did close.");
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

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

    testingAlert(){
      this.closeModal()
      alert(`You chose: \nLocation: ${this.state.location}\ncategory: ${this.state.category}\nmin_price: ${this.state.min_price}\nmax_price: ${this.state.max_price}`)
    }

  renderModal(){
    return(
      <View style={{ alignItems: "center", height:verticalScale(250) }}>
        <Text style={{ fontSize: style.h2, marginBottom: 10 }}>Filter your choices!</Text>

        <TextInput value={this.state.location} onChangeText={text => this.changeLocation(text)} style={{marginTop:10, height:verticalScale(40), width:moderateScale(250), backgroundColor:colors.light_gray, padding:10, fontSize:style.header}} placeholder="Location..." placeholderTextColor={colors.gray}></TextInput>
        <TextInput value={this.state.category} onChangeText={text => this.changeCategory(text)} style={{marginTop:10, height:verticalScale(40), width:moderateScale(250), backgroundColor:colors.light_gray, padding:10, fontSize:style.header}} placeholder="Category..." placeholderTextColor={colors.gray}></TextInput>

        
        <View style={{flexDirection:'row'}}>
          <TextInput value={this.state.min_price} onChangeText={text => this.changeMinPrice(text)} style={{marginTop:10, marginRight:5, height:verticalScale(40), width:moderateScale(120), backgroundColor:colors.light_gray, padding:10, fontSize:style.header}} placeholder="Minimum €" placeholderTextColor={colors.gray}></TextInput>
          <TextInput value={this.state.max_price} onChangeText={text => this.changeMaxPrice(text)} style={{marginTop:10, marginLeft:5, height:verticalScale(40), width:moderateScale(120), backgroundColor:colors.light_gray, padding:10, fontSize:style.header}} placeholder="Maximum €" placeholderTextColor={colors.gray}></TextInput>
        </View>
        <TouchableOpacity onPress={() => this.testingAlert()} style={{flexDirection:'row', justifyContent:'flex-end', marginTop:20, backgroundColor:colors.primary, borderRadius:8, height:verticalScale(35),width:moderateScale(125), alignItems:'center', justifyContent:'center'}}><Text style={{color:'white', fontSize:style.h3}}>Confirm</Text></TouchableOpacity>
      </View>
    )
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
    <View style={styles.container}>
      <ScrollView>
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
      <TouchableOpacity
        style={styles.fab}
        onPress={this.openModal}
        >
          <AntDesign
           name={'piechart'}
           size={moderateScale(30)}
           color="white"
          >
          </AntDesign>
      </TouchableOpacity>
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{ alignItems: "center" }}
        >
          {this.renderModal()}
        </Modal>
    </View>
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
  fab : {
    backgroundColor: colors.primary,
    width: moderateScale(65),
    height: moderateScale(65),
    elevation:3,
    right:30,
    bottom:30,
    position:'absolute',
    alignItems:'center',
    borderRadius: 40,
    justifyContent:'center'
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
