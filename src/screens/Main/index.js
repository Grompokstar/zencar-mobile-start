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
  ScrollView, Text
}                        from 'react-native';
import API               from 'api/index';
import  THEME            from 'styles/theme';
import VehicleCard       from 'components/Vehicle/Card';
import { SafeAreaView }  from 'react-native-safe-area-context';
import AsyncStorage      from '@react-native-async-storage/async-storage';
import ScreenHeader      from 'components/Screen/Header';


export const MainScreen = ({ navigation }) => {
  const [vehicle, setVehicle] = useState(null)

  useEffect(() => {
    const getGarageVehicles = async () => {
      try {
        const vehicles = await AsyncStorage.getItem('ZEN__garageVehicles')
        const parsedVehicles = JSON.parse(vehicles);
        setVehicle(parsedVehicles[0])
      } catch(e) {
        console.log(e)
      }
    }

    getGarageVehicles();
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <ScreenHeader/>
        <View style={styles.container}>
          <If condition={vehicle}>
            <VehicleCard data={vehicle}/>
          </If>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 12
  }
})
