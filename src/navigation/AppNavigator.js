import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';

const Drawer = createDrawerNavigator();

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName="Map">
        <Drawer.Screen
          name="Map"
          component={MapScreen}
          options={{title: 'My home'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
