import React from 'react';
import { View, Text, Button } from 'react-native';

export const MainScreen = ({ navigation }) => {

  return (
    <View>
      <Text>
        Main screen
      </Text>
      <Button
        title="Go to Second screen"
        onPress={() => navigation.navigate('Home')}
      />

    </View>
  )
}
