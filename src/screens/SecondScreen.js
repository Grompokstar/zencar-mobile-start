import React from 'react';
import { View, Text, Button } from 'react-native';

export const SecondScreen = ({ navigation }) => {

  return (
    <View>
      <Text>
        Second screen
      </Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Second')}
      />

      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  )
}
