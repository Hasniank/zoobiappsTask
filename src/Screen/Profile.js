import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Profile = ({route}) => {
  const {contact} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.displayName}>{contact.displayName}</Text>
      <Text style={styles.phoneNumber}>{contact.phoneNumbers[0]?.number}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#333',
  },
});
