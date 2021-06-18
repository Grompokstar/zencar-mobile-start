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


export const ExpensesScreen = ({ navigation }) => {

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text>Расходы на авто</Text>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 12
  }
})
