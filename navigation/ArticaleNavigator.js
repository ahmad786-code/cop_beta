import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ArticleDetails, Articles, Home,   } from '../screens';
 
import { Color, FontFamily } from '../theme';
import { Image, TouchableOpacity ,View} from 'react-native';
const Stack = createStackNavigator();



const ArticaleNavigator = () => {
 
    return (
        <Stack.Navigator
        initialRouteName='Home'
            screenOptions={{
                headerShown: true,
            }}>
            <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
              title: 'Home',
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
                <View style={{alignItems:'center', justifyContent:'center',   marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20}}>
                 <Image source={require('../assets/O_icon.png')} style={{width:23.65, height:26}} />
                </View>
              ),
              headerRight: () => (
                <View style={{marginRight: 25}}>
                    <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
                      
                      <Image source={require('../assets/app_icon/header/search.png')} style={{height:16, width:16}} />

                    </View>
                </View>
              )
            })}  />
            <Stack.Screen name="Articale" component={Articles}  options={({ navigation }) => ({
              title: 'Article',
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
                  <Image source={require('../assets/app_icon/header/return-back.png')} style={{width:12, height:12}}/>
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
            <Stack.Screen name="Articale_Detail" component={ArticleDetails} options={({ navigation }) => ({
              title: 'Article Details',
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
                   <Image source={require('../assets/app_icon/header/return-back.png')} style={{width:12, height:12}}/>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{marginRight: 25}}>
                    <View style={{flexDirection:'row', alignItems:'center', columnGap:10}}>
                      <Image source={require('../assets/app_icon/header/share-article-page.png')}  style={{width:18, height:18}}/>
                      <Image source={require('../assets/app_icon/header/search.png')}  style={{width:18, height:18}}/>
                    </View>
                </View>
              )
            })}/>
            
        </Stack.Navigator>
    )
}

export default ArticaleNavigator