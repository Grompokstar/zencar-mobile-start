import React from 'react';
import { View, Text, Button } from 'react-native';

export const MainScreen = ({ navigation }) => {

  return (
    <View>
      <Text>
        Main screen
      </Text>
      <Button
        title="Open modal screen"
        onPress={() => navigation.navigate('Modal')}
      />

    </View>
  )
}
