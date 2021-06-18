import React, {
  useEffect,
  useState
}                        from 'react';
import {
  View, StyleSheet,
  ScrollView
}                        from 'react-native';
import  THEME            from 'styles/theme';
import VehicleCard       from 'components/Vehicle/Card';
import { SafeAreaView }  from 'react-native-safe-area-context';
import AsyncStorage      from '@react-native-async-storage/async-storage';
import CustomButton      from 'components/UI/CustomButton';


export const MyGarageScreen = ({ navigation }) => {
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <If condition={garageVehicles}>
            <For each='vehicle' of={garageVehicles}>
              <VehicleCard data={vehicle} key={vehicle.modification.id}/>
            </For>
          </If>
          <CustomButton
            label='Добавить авто'
            iconName='plus'
            onPress={() => {navigation.navigate('CreateVehicle', {screen: 'CreateCarManufacturer'})}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 20
  }
})
