import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedLocationPage from './src/pages/SavedLocationPage';
import MapPage from './src/pages/MapPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GettingStarted from './src/components/GettingStartedComponents/GettingStarted';

const Tab = createBottomTabNavigator();

const App = () => {
  const [showGetStarted, setShowStarted] = useState(true);

  const getStarted = () => {
    setShowStarted(false);
  };

  return showGetStarted ? (
    <GettingStarted getStarted={getStarted} />
  ) : (
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
          component={MapPage}
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
