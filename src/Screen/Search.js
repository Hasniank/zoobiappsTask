import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const Search = () => {
  const [numberWithCountryCode, setNumberWithCountryCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');

  // Function to handle searching the number with country code
  const handleSearch = () => {
    // Perform your logic here for searching the number
    // For example: You might want to make an API call to fetch data based on the entered number
    // Replace this with your actual logic
    Alert.alert('Search', `Searching for ${numberWithCountryCode}`);
  };

  // Function to fetch address from latitude and longitude
  const fetchAddress = async (lat, long) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&zoom=18&addressdetails=1&accept-language=en`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: long } = position.coords;
        setLatitude(lat);
        setLongitude(long);
        fetchAddress(lat, long);
      },
      error => {
        console.error('Error getting location:', error);
        // Handle errors when getting user's location
        Alert.alert('Error', 'Failed to get current location');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    // Get current location when the component mounts
    getCurrentLocation();
  }, []);

  return (
    <View>
      <TextInput
        value={numberWithCountryCode}
        onChangeText={text => setNumberWithCountryCode(text)}
        placeholder="Enter number with country code"
      />
      <Button title="Search" onPress={handleSearch} />
      <View>
        <Text>Current Address:</Text>
        <Text>{address}</Text>
      </View>
    </View>
  );
};


