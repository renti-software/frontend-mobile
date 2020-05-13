import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../constants/Colors'
import style from '../constants/Style'
import { SearchBar } from 'react-native-elements';
import itemsList from '../data/ItemsData'


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Search item..."
        lightTheme
        containerStyle={{backgroundColor:'white',    borderRadius:5, marginTop:10 }}
        inputContainerStyle={{backgroundColor:'white'}}
        onChangeText={() => handleHelpPress()}
      />
      {renderItems()}
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function renderItems() {
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

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal:10
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
