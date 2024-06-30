import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import { Border, Color, FontSize } from '../theme';
 

const ConcertCard = () => {
  return (
    <>
    <View style={{ width: 380, height:146, zIndex:1}}>
    <ImageBackground source={require('../assets/img/concert.jpg')} resizeMode='cover' style={{  width: 380, height:146, overflow:'hidden', borderTopEndRadius:12, borderTopStartRadius: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginHorizontal: 10}}>
            <View>
            <Text style={{fontSize: responsiveFontSize(1.9),color: Color.colorWhite, marginBottom: 5 }}> Brooklyn Simmons</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', columnGap: 5 }}>
              <Image source={require('../assets/img/Location.png')}/>
            <Text style={{fontSize:FontSize.size_xs, color:Color.colorGray_100,}}> Syracuse, Connecticut</Text>
            </View>

            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 86, height: 25, backgroundColor:Color.colorDarkslateblue, borderRadius:Border.br_45xl}}>
              <Text style={{color: Color.colorWhite, fontSize: FontSize.size_xs}}>22, May, 25 </Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginHorizontal: 10}}>
            <View>
            

            </View>
            <View>
              <Image   source={require('../assets/img/concertIcon.png')}/>
            </View>
        </View>
    </ImageBackground>
    </View>
    <View style={{backgroundColor: 'black',  width: 380, height: 95, justifyContent: 'center',  borderBottomLeftRadius: 12, borderBottomRightRadius: 12}}>

      <Text style={{fontSize: 16, color: '#fff', maxWidth: responsiveWidth(90), paddingHorizontal: 15,  }}>ipsum dolor sit amet co ns ectetur giatipsum damet co ns ectetur...</Text>


</View>
    </>
  )
}

export default ConcertCard

const styles = StyleSheet.create({
    
})