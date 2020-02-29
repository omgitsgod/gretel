import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Map">
        <Drawer.Screen name="Map" component={MapScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
