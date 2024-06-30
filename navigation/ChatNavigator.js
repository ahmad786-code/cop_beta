import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator, } from '@react-navigation/stack';
import { NewChat, UserProfile, GroupProfile, Inbox, ReportUser, ChatSetting } from '../screens';
import { Color, FontFamily } from '../theme';
import { Image, TouchableOpacity, View, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseApp } from "../utils/firebaseHalper";
import { child, get, getDatabase, off, onValue, ref } from "firebase/database";

import { setChatsData } from "../store/chatSlice";
import { setStoredUsers } from '../store/userSlice';
import { setChatMessages } from '../store/messagesSlice';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const Stack = createStackNavigator();



const ChatNavigator = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  // console.log(expoPushToken)
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Handle received notification
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification tapped:");
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',

      }}>
      <Stack.Screen name="Inbox" component={Inbox} options={({ navigation }) => ({
        title: 'Inbox',
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
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
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

      <Stack.Screen name="NewChat" component={NewChat} options={({ route }) => ({
        title: route?.params?.isGroupChat ? 'Add Participta' : 'New Chat',
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
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
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

      <Stack.Screen name="User_Profile" options={({ navigation }) => ({
        title: 'User Profile',
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
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
            <Image source={require('../assets/O_icon.png')} style={{ width: 23.65, height: 26 }} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Report_User')} style={{ padding: 10, marginRight: 15 }}>
            <Image source={require('../assets/app_icon/header/bullet-point-user-profile.png')} style={{ width: 4.35, height: 20 }} />
          </TouchableOpacity>
        )
      })} component={UserProfile} />
      <Stack.Screen name="Group_Profile" component={GroupProfile}
        options={({ navigation }) => ({
          title: 'Group Profile',
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
            <View style={{ marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
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
        })}
      />
      <Stack.Screen name="Report_User" component={ReportUser}
        options={({ navigation }) => ({
          title: 'Report user',
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
            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
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
        })}
      />



      <Stack.Screen name="Group_Setting" component={ChatSetting}
        options={({ navigation }) => ({
          title: 'Group Setting',
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
            <View style={{ marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }}>
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
        })}
      />
    </Stack.Navigator>
  )
}

export default ChatNavigator
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}