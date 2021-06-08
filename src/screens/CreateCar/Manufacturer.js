import React                      from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME }                  from 'styles/theme';

export const CreateCarManufacturerScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>
        Main screen
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: THEME.BACKGROUND_COLOR
  }
})
