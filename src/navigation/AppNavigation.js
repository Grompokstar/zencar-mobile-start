import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateCarManufacturerScreen } from '../screens/CreateCar/Manufacturer';
import { THEME }                       from 'styles/theme';
import Ionicons from '@expo/vector-icons/Ionicons'

const CreateCarStack = createStackNavigator();

export const AppNavigation = ({}) => {
  return (
    <CreateCarStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: THEME.FONT_COLOR_DARK,
        headerTitleStyle: {
          fontFamily: 'Montserrat-Bold',
          fontSize: 20,
          letterSpacing: 0.15
        },
      }}
    >
      <CreateCarStack.Screen
        name="CreateCarManufacturer"
        component={CreateCarManufacturerScreen}
        options={{
          title: 'Ваш автомобиль'
        }}
      />
    </CreateCarStack.Navigator>
  )
}
