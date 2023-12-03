import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Contact = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const contactList = await Contacts.getAll();
        setContacts(contactList);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.error('Permission error: ', error);
    }
  };

  const navigateToProfile = (contact) => {
    navigation.navigate('Profile', { contact });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToProfile(item)}>
        <View style={styles.contactView}>
          <Text style={{ fontSize: 20, color: '#000' }}>{item.displayName}</Text>
          {/* <Image source={require('../Assets/phone.png')} /> */}
          <MaterialIcons name="call" size={30} color="#2194FF"/>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Contact;

// Your styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#2194FF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  contactText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 16,
  },
  mainContainer: {
    width: '100%',
  },
  contactView: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    color: '#000',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
