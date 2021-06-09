import React                           from 'react';
import { createStackNavigator }        from '@react-navigation/stack';
import { CreateCarManufacturerScreen } from '../screens/CreateVehicle/Manufacturer';
import { CreateCarModelScreen }        from '../screens/CreateVehicle/Model';
import { THEME }                       from 'styles/theme';

const CreateCarStack = createStackNavigator();

const commonScreenOptions = {
  headerStyle: {
    backgroundColor: '#fff'
  },
  headerTintColor: THEME.FONT_COLOR,
  headerTitleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    letterSpacing: 0.15,
  },
}

export const AppNavigation = ({}) => {
  return (
    <CreateCarStack.Navigator
      screenOptions={commonScreenOptions}
    >
      <CreateCarStack.Screen
        name="CreateCarManufacturer"
        component={CreateCarManufacturerScreen}
        options={{
          title: 'ВАШ АВТОМОБИЛЬ',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
        }}
      />
      <CreateCarStack.Screen
        name="CreateCarModel"
        component={CreateCarModelScreen}
        options={{
          title: 'AUDI',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
        }}
      />
    </CreateCarStack.Navigator>
  )
}
