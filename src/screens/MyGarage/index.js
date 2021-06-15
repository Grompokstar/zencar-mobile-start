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
import AsyncStorage      from '@react-native-async-storage/async-storage';


export const MyGarageScreen = ({ navigation }) => {
  //const garageVehicles = useSelector(state => state.garageVehicles);
  const [garageVehicles, setGarageVehicles] = useState([])

  useEffect(() => {
    const getGarageVehicles = async () => {
      try {
        const vehicles = await AsyncStorage.getItem('ZEN__garageVehicles')
        const parsedVehicles = JSON.parse(vehicles);
        setGarageVehicles(parsedVehicles)
      } catch(e) {
        console.log(e)
      }
    }

    getGarageVehicles();
  }, [])



  return (
    <View style={styles.container}>
      <For each='vehicle' of={garageVehicles}>
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
