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


export const MyGarageScreen = ({ navigation }) => {
  const garageVehicles = useSelector(state => state.garageVehicles);

  useEffect(() => {

    console.log(garageVehicles)

  }, [garageVehicles])


  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(garageVehicles)}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {

  }
})
