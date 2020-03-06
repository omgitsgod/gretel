import React from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Switch value={true} />
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

export default Settings;
