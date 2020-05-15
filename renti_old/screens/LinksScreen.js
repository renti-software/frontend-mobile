import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import colors from '../constants/Colors'
import style from '../constants/Style'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{flex:1,flexDirection:'row', alignContent:'center',justifyContent:'center'}}>
          <Text style={{fontSize:style.h1}}>Page under construction</Text>
        </View>
        <View style={{flex:1,flexDirection:'row', alignContent:'center',justifyContent:'center'}}>
          <Text style={{fontSize:style.h3}}>Check back later!</Text>
        </View>
    </ScrollView>
  );
}            


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
