import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import spots from './scripts/CreateStreetObject.js';

const blockValue = ({}) => {};

const ListOfStreets = () => {
  return (
    <SectionList
      sections={spots}
      renderItem={({ item }) => {
        <View>
          <Text>{item.title}</Text>
        </View>;
      }}
      renderSectionHeader={(section) => {
        <View>
          <Text style={styles.streetTitle}>{section.title}</Text>
        </View>;
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ListOfStreets;
