
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {

  SafeAreaProvider,

} from 'react-native-safe-area-context';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
 
 






SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

    //  AsyncStorage.clear()

  useEffect(() => {

    const prepare = async () => {
      try {
        await Font.loadAsync({

          "bold": require("./assets/fonts/Sora-Bold.ttf"),
          "regular": require("./assets/fonts/Sora-Regular.ttf"),
          "semiBold": require("./assets/fonts/Sora-SemiBold.ttf"),


        });
      }
      catch (error) {
        console.log.error();
      }
      finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  


  return (
     <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <NavigationContainer theme={DarkTheme} >
          <AppNavigator />
        </NavigationContainer>


        <StatusBar style='light' translucent={true} />

      </SafeAreaProvider>
    
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
