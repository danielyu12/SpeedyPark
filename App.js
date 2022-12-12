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

  const reopenGetStarted = () => {
    setShowStarted(true);
  };

  return showGetStarted ? (
    <GettingStarted getStarted={getStarted} />
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Saved') {
              iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
            }
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{ headerShown: false }}
          initialParams={{
            setShowStarted: reopenGetStarted,
          }}
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
