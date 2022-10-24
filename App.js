import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapPage from './src/pages/MapPage';
import HomePage from './src/pages/HomePage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen
          name="Map"
          component={MapPage}
          options={{ title: 'Park Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
