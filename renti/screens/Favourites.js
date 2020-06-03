import * as React from 'react';
import { Image, Platform, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors'
import style from '../constants/Style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import itemsList from '../data/ItemsData';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const API_URL = "http://192.168.160.62:8080"

export default class Marketplace extends React.Component {
  constructor(props){
    super(props);
  }

  
  state = { 
    searchValue : '',
    data: [],
    user_id : '',
    //esta filtragem vem da API, enviar estes campos e devolver ja os itens conforme esta filtragem
    //modal
    open : false

  }

  _retriveData = async id => {
    try {
      let id = AsyncStorage.getItem("id")
      this.setState({
        user_id: id
      })
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount(){
    this._retriveData()
    this.getFavourites()
  }

  updateSearch(newSearch) {
    this.setState({
      searchValue: newSearch
    })
  }
    //GET Request
  getFavourites() {
      //Here only get the favourites of the user
      var userID = this.state.user_id
      let base_link = `${API_URL}/favourites/${userID}`

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
          if (false) {
            alert(json.message);
          } else {
            // Success
            let message = json

            // solution nº46
            this.setState({
              data: message,
            });

          }
        })
        .catch(error => {
          alert("Error fetching products.");
          console.log(error);
        });
    }

    removeFavourite(prod_id){
      let userID = localStorage.getItem('userID')
      if (userID !=null) {
        fetch(`${API_URL}/favourites`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({   
            user : { id: userID},
            product : { id : prod_id},
          }
        )})
        //here have the user ID to show only his
          .then(res => res.json())
          .then(result => {
              alert("Deleted from your favourites!")
            },
  
            (error) => {
              alert("Error deleting!")
            }
          );
          
      } else {
        alert("Login first!")
      }
    }

    handleModalClose(){
      this.closeModal()
      console.log("Switch params")
      this.getFavourites()
    }

  async handleFav(id_r,nav){
    await AsyncStorage.setItem('prod_id',id_r)
    nav.navigate('Product',{
      id: product.id
    }) 
  }

  renderItems() {
    let items = this.state.data
    console.log(items)
    return items.map( ({id,product},index) => {
      //Fazer aqui um filtro pelo name
      if(product.name.toLowerCase().includes(this.state.searchValue.toLowerCase())){ //check why this isnt working
        return(
          <TouchableOpacity onPress={() => this.handleFav(product.id,this.props.navigation)}>
          <View style={styles.items}>
              <Image
                style={{height:110,padding:20,width:110,borderRadius:5,flex:1}}
                source={{uri: product.imageLink}}
              >
              </Image>
      
              <View style={{flexDirection:'column',flex:2}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center', marginLeft:20}}>
                  <Text style={{fontSize:style.h3,fontWeight:'bold'}}>{product.name}</Text>
                </View>
      
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center', marginLeft:20}}>
        <Text style={{}}>{product.location.cityName}, {product.location.country}</Text>
                </View>
      
                <View style={{flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-start', marginLeft:20,paddingVertical:20}}>
                  <Text style={{color:colors.primary, fontWeight:'bold',fontSize:style.h2}}>{product.price}€ /day</Text>
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
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_gray,
    paddingHorizontal:10,
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
