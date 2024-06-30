import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../theme'

const CustomSearch = ({ placeholder,onChangeText  }) => {
   
  return (
    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor:Color.colorGray_300, borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20}}>
    
          <Image source={require('../assets/app_icon/concert-articles/search-info.png')} style={{width:18, height:18}} />
          <TextInput onChangeText={onChangeText} style={{flex: 1,  paddingHorizontal: 10, color:Color.colorGray_100}} placeholder={placeholder} placeholderTextColor={Color.colorGray_100} />
          <Image source={require('../assets/app_icon/concert-articles/filter.png')}style={{width:18, height:18}} />
        
    </View>
  )
}

export default CustomSearch

