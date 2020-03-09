import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import Settings from '../components/Settings';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Icon
          name="menu"
          type="material-community"
          size={50}
          color="#1ec5e3"
          onPress={navigation.openDrawer}
          underlayColor="transparent"
        />
      </View>
      <Settings />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 20,
    left: 5,
  },
});

export default SettingsScreen;
