import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';
import { MainScreen } from '../screens/MainScreen';
import { SecondScreen } from '../screens/SecondScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { UsersScreen } from '../screens/UsersScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import { THEME } from '../theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Messages' component={MessagesScreen}/>
      <Tab.Screen name='Users' component={UsersScreen}/>
    </Tab.Navigator>
  )
}

export const AppNavigation = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'My home'
        }}
      />
      <Stack.Screen
        name='Home'
        component={HomeTabNavigation}
      />

      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  )
}
