import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import MapScreen from '../screens/MapScreen';

const Drawer = createDrawerNavigator();

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const MapIcon = ({focused, color}) => (
  <Icon
    name="google-maps"
    type="material-community"
    color={color}
    size={50}
    underlayColor="transparent"
  />
);

const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName="Map">
        <Drawer.Screen
          name="Map"
          component={MapScreen}
          options={{title: 'Map', drawerLabel: 'Map', drawerIcon: MapIcon}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
