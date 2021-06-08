import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from './src/store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer }    from '@react-navigation/native';
import { AppNavigation  }         from './src/navigation/AppNavigation';

async function loadApplication() {
  await Font.loadAsync({
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const store = useStore({});

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
    </Provider>
  );
}
