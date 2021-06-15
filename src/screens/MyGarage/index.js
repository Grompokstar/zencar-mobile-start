import React, {
  useEffect,
  useState
}                        from 'react';
import {
  useSelector,
  useDispatch
}                        from 'react-redux';
import {
  View, StyleSheet,
  FlatList, TouchableOpacity,
  ActivityIndicator, Text
}                        from 'react-native';
import API               from 'api/index';
import { THEME }         from 'styles/theme';
import VehicleCard       from 'components/Vehicle/Card';


export const MyGarageScreen = ({ navigation }) => {
  const garageVehicles = useSelector(state => state.garageVehicles);

  return (
    <View style={styles.container}>
      <For each='vehicle' of={garageVehicles.items}>
        <VehicleCard data={vehicle} key={vehicle.modification.id}/>
      </For>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 12

  }
})
