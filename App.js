import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedLocationPage from './src/pages/SavedLocationPage';
import LinedMapPage from './src/pages/LinedMapPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import spotNumbers from './scripts/CreateStreetSpotNumberObject';

const Tab = createBottomTabNavigator();

export const BottomSheetContext = React.createContext();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Saved') {
              iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen
          name="Map"
          component={LinedMapPage}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedLocationPage}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
