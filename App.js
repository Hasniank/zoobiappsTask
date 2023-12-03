import {View, Text} from 'react-native';
import React from 'react';
import ContactScreen from './src/Screen/Contact';
import { MyStack } from './src/Navigation/MyStack';
import Login from './src/Screen/Login';
import { Search } from './src/Screen/Search';


const App = () => {
  return (
    // <MyStack/>
    <Search/>
  );
};

export default App;
