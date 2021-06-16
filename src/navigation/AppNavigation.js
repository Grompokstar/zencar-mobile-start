import React                           from 'react';
import { createStackNavigator }        from '@react-navigation/stack';
import { createBottomTabNavigator }    from '@react-navigation/bottom-tabs';
import { CreateCarManufacturerScreen } from '../screens/CreateVehicle/Manufacturer';
import { CreateCarModelScreen }        from '../screens/CreateVehicle/Model';
import { CreateCarModificationScreen } from '../screens/CreateVehicle/Modification';
import { MyGarageScreen }              from '../screens/MyGarage';
import { MainScreen }                  from '../screens/Main';
import Ionicons                        from 'react-native-vector-icons/Ionicons';
import { THEME }                       from 'styles/theme';

const RootStack = createStackNavigator();
const CreateCarStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

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

const tabIcons = {
  Main: 'apps-sharp',
  MyGarage: 'car-outline'
}

function MainScreens() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name={tabIcons[route.name]} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        inactiveTintColor: THEME.GRAY,
        showLabel: false
      }}
    >
      <MainTabs.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Главная',
        }}
      />
      <MainTabs.Screen
        name="MyGarage"
        component={MyGarageScreen}
        options={{
          title: 'Мой гараж',
        }}
      />
    </MainTabs.Navigator>
  )
}

function CreateVehicleScreens() {
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
          title: 'ВАШ АВТОМОБИЛЬ',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
        }}
      />
      <CreateCarStack.Screen
        name="CreateCarModification"
        component={CreateCarModificationScreen}
        options={{
          title: 'ВАШ АВТОМОБИЛЬ'
        }}
      />
    </CreateCarStack.Navigator>
  )
}

export const AppNavigation = ({}) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={MainScreens}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CreateVehicle"
        component={CreateVehicleScreens}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}
