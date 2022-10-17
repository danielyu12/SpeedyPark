import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, {useState} from "react";
import {Dropdown}  from 'react-native-material-dropdown';
import spots from '../scripts/CreateStreetObject.js';


export default function App() {
  const[selectedItem, setselectedItem] = useState(null)
  const onSelect = (item) => {
    setselectedItem(item)
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Dropdown
        value = {selectedItem}
        data = {spots}
        onSelect = {onSelect}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
