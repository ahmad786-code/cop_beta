import React from 'react';
import { Pressable, View, Image, Text, ImageBackground, TouchableOpacity, Button, SafeAreaView, useWindowDimensions, ScrollView,Dimensions  } from 'react-native';
import { Color, FontFamily } from '../theme.js'


const Introduction = ({navigation}) => {
  const { width, height } = Dimensions.get('window');
  const dynamicFontSize = width > 600 ? 32 : 16;
  return (

    <ImageBackground style={{ flex: 1 ,alignItems: 'center', justifyContent:'center',}} source={require('../assets/img/Design.png')} resizeMode='cover'  >

      
        <View style={{ alignItems: 'center', justifyContent:'center', marginTop: '15%' }}>

            <View style={{ top:48, right:60, transform: [{rotate: '20deg' }], zIndex: 10, alignItems: 'center', justifyContent: 'center', width: 94.46, height: 35,   borderRadius: 64, backgroundColor: 'rgba(255,255,255,.30)' }}>
              <Text style={{ color: '#fff', fontFamily: FontFamily.soraSemiBold, fontSize: 18 }}>Live</Text>
            </View>
           <View >
            <View>

              <View style={{ position: 'absolute', top: 20, right: 22, zIndex: -1, width: width * .5, height: height * .40, borderWidth: 1, borderColor: Color.colorGray_100, borderRadius: 150 }}>
              </View>

              <Image source={require('../assets/img/intro.jpg')} style={{ width: width * .5, height: height * .40, borderRadius: 150, position: 'relative' }} />
              <View style={{ position: 'absolute', top: -20, left: 22, zIndex: -1, width: width * .5, height: height * .40, borderWidth: 1, borderColor: Color.colorGray_100, borderRadius: 150 }}>

              </View>
            </View>

                <View style={{flexDirection:'row', justifyContent:'space-between',}}>
              <View style={{ bottom: 93, right:60, zIndex: 10, alignItems: 'center', justifyContent: 'center', width: 94.46, height: 37.3, backgroundColor: 'red', borderRadius: 64, backgroundColor: 'rgba(255,255,255,.30)' }}>
                <Text style={{ color: '#fff', fontFamily: FontFamily.soraSemiBold, fontSize: 18 }}>MUSIC</Text>
              </View>
              <View style={{  bottom: 120, left:60,transform: [{rotate: '-20deg' }], zIndex: 10, alignItems: 'center', justifyContent: 'center', width: 94.46, height: 37.3, backgroundColor: 'red', borderRadius: 64, backgroundColor: 'rgba(255,255,255,.30)' }}>
                <Text style={{ color: '#fff', fontFamily: FontFamily.soraSemiBold, fontSize: 18 }}>ENJOY</Text>
              </View>
            </View>  
           
          </View>  


          <View style={{ flexDirection: 'column', rowGap: 10, paddingHorizontal: 45, marginTop: '8%', marginBottom: '5%', }}>
            <Text style={{ color: Color.colorWhite, fontFamily: FontFamily.soraSemiBold, fontSize: dynamicFontSize, }}>Lorem ips um olor ipsm sit amet</Text>

            <Text style={{ color: Color.colorGray_100, fontFamily: FontFamily.soraRegular, fontSize: dynamicFontSize, }}>Lorem ipsum dolor sit amet cons ectetur. Feugiat sed a dictum neq ue duis rhoncus integer etiam ha bitasse. Faucibus tellus risus iacu lis. orem ipsum dolor </Text>

          </View>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <View style={{ marginBottom: 15, alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderWidth: 10, borderRadius: 100, borderColor: 'rgba(120,63,142, .50)' }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderWidth: 10, borderRadius: 100, borderColor: 'rgba(120,63,142, .80)' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.colorDarkslateblue, width: 60, height: 60, borderRadius: 100 }}>
                  <Image source={require('../assets/app_icon/introduction/next.png')} style={{width:17.45, height:17.43}}/>
                </View>
              </View>
            </View>
          </Pressable>




        </View>


     
    

    </ImageBackground>

  );
}


export default Introduction;
