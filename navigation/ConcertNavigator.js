import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Concert, ConcertDetails, Participate } from '../screens';
import { Color, FontFamily } from '../theme';
import { Image, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

const Stack = createStackNavigator();



const ConcertNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName='Concert'
            screenOptions={{
                headerShown: true,
                gestureEnabled:true,
                gestureDirection: 'horizontal',
            }}>
           
            <Stack.Screen name="Concert" component={Concert} options={({ navigation }) => ({
              title: 'Concert',
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
                <View style={{ alignItems:'center', justifyContent:'center',  marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20}}>
                  <Image source={require('../assets/O_icon.png')} style={{width:23.65, height:26}} />
                </View>
              ),
              headerRight: () => (
                <View style={{marginRight: 25}}>
                    <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
                      
                    <Image source={require('../assets/app_icon/header/search.png')} style={{width:16, height:16}} />

                    </View>
                </View>
              )
            })}/>
            <Stack.Screen name="Concert_Detail" component={ConcertDetails} options={({ navigation }) => ({
              title: 'Concert Details',
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
                <TouchableOpacity style={{  marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20}} onPress={() => navigation.goBack()}>
                  <Image source={require('../assets/app_icon/header/return-back.png')} style={{height:12, width:12}}/>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{marginRight: 25}}>
                    <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
                      <Image source={require('../assets/app_icon/header/share-article-page.png')} style={{width:18, height:18}} />
                      <Image source={require('../assets/app_icon/header/search.png')} style={{width:16, height:16}} />

                    </View>
                </View>
              )
            })} />
            <Stack.Screen name="Participate" component={Participate} options={({ navigation }) => ({
              title: 'Participate',
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
                <TouchableOpacity style={{  marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20}} onPress={() => navigation.goBack()}>
                  <Image source={require('../assets/app_icon/header/return-back.png')} style={{height:12, width:12}}/>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{marginRight: 25}}>
                    <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
                      
                   <Image source={require('../assets/app_icon/header/search.png')} style={{width:16, height:16}} />

                    </View>
                </View>
              )
            })}/>
        </Stack.Navigator>
    )
}

export default ConcertNavigator