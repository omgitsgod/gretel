import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Profile from '../components/Profile';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Profile />
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

export default ProfileScreen;
