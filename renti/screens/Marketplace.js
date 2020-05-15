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
    searchValue : ''
  }

  componentDidMount(){

  }

  updateSearch(newSearch) {
    this.setState({
      searchValue: newSearch
    })
  }

  renderItems() {
    return itemsList.map( item => {
      return(
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
      <Text style={{color:colors.primary, fontWeight:'600',fontSize:style.h2}}>{item.price}€ /day</Text>
              </View>
            
            </View>
    
          </View>
      )
    })
    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row', maxHeight:verticalScale(30)}}>
          <SearchBar
            placeholder="Search item..."
            lightTheme
            searchIcon={<Ionicons size={26} color='white' name="md-menu" />}
            containerStyle={{backgroundColor:'white', flex:3 , borderRadius:5, marginTop:10 }}
            onChangeText={(text) => this.updateSearch(text)}
            value={this.state.searchValue}
          />
          <TouchableOpacity style={{backgroundColor:colors.primary,flex:0.8, borderRadius:5, marginTop:10, }}>
          </TouchableOpacity>
        </View>
        
        {this.renderItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal:10,
    marginTop: 20 //TODO change to android top window
  },
  items: {
    flex:1,
    borderRadius:5,
    flexDirection:'row',
    marginTop:10,
    padding: 10,
    minHeight:130,
    backgroundColor:'#fff'
  }
});
