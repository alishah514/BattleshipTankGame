import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Game from '../screens/Game/Game.js';
import Menu from '../screens/Menu/Menu.js';
import Splash from '../screens/Splash/Splash.js';
import Settings from '../screens/Settings/Settings.js';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Games" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
