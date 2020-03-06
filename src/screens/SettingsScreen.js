import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Settings from '../components/Settings';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
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
});

export default SettingsScreen;
