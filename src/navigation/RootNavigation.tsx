import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';
import {MainScreen} from '../screens/MainScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
