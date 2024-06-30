import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { EditProfile, Profile } from '../screens';
import { Color, FontFamily } from '../theme';
import { Image, View } from 'react-native';
const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal'
      }}>
      <Stack.Screen name="Profile" component={Profile} options={({ navigation }) => ({
        title: 'My Profile',
        headerTitleAlign: 'center',
        headerStyle: {

          elevation: 0,
          shadowOpacity: 0,

        },
        headerTitleStyle: {

          color: Color.colorWhite,
          fontFamily: FontFamily.soraBold,
          fontSize: 20,
          textTransform: 'capitalize',
        },
        headerTransparent: true,
        headerLeft: () => (
          <View style={{ alignItems:'center', justifyContent:'center',  marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
            <Image source={require('../assets/O_icon.png')} style={{ width: 23.65, height: 26 }} />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 25 }}>
            <View style={{  flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
              <Image source={require('../assets/app_icon/header/settings.png')} style={{ width: 16, height: 16 }} />
              <Image source={require('../assets/app_icon/header/search.png')} style={{ width: 16, height: 16 }} />


            </View>
          </View>
        )
      })} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={({ navigation }) => ({
        title: 'Edit Profile',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,

        },
        headerTitleStyle: {

          color: Color.colorWhite,
          fontFamily: FontFamily.soraBold,
          fontSize: 20,
          textTransform: 'capitalize',
        },
        headerTransparent: true,
        headerLeft: () => (
          <View style={{ alignItems:'center', justifyContent:'center', marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
            <Image source={require('../assets/O_icon.png')} style={{ width: 23.65, height: 26 }} />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 25 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>

              <Image source={require('../assets/app_icon/header/search.png')} style={{ width: 16, height: 16 }} />

            </View>
          </View>
        )
      })} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator