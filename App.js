import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapPage from './src/pages/MapPage';
import MapPage1 from './src/pages/MapPage1';
import MapPage2 from './src/pages/MapPage2';
import HomePage from './src/pages/HomePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          options={{ title: 'Park Map' }}
        />
        <Stack.Screen
          name="Map1"
          component={MapPage1}
          options={{ title: 'Park Map' }}
        />
        <Stack.Screen
          name="Map2"
          component={MapPage2}
          options={{ title: 'Park Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
