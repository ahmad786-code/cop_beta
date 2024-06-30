import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontSize, Border } from '../theme'
import Badge from './Badge'

const ArticleCard = () => {
  return (
    <View style={{width: 250,   borderRadius: 12, marginLeft: 25, position: 'relative'}}>
       <Image source={require('../assets/test.jpg')} style={{height: 217, width: 250, borderRadius: 12}} contentFit="cover"/>
       <View style={[styles.continue, styles.rectangleLayout]}>
          <View style={[styles.rectangleContainer, styles.rectangleLayout, styles.rectangleView, styles.rectangleLayout]}>
             
            <Text style={[styles.trending, styles.parentPosition]}>
              22 May, 23
            </Text>
          </View>
          
        </View>
       <View style={{height: 65, width: 250, borderBottomRightRadius: 12,  borderBottomLeftRadius: 12, backgroundColor: Color.colorGray_600,  bottom: 50}}>
        <Text style={{color: Color.colorWhite, fontSize: FontSize.size_base, maxWidth: 204}}>
        ipsum dolor sit amet co ns ectetur Feugiat...
        </Text>
       </View>
    </View>
  )
}

export default ArticleCard

const styles = StyleSheet.create({
    
    
  
    
  
    rectangleLayout: {
      height: 31,
      width: 121,
      position: "absolute",
      alignItems: 'center',
      textAlign: 'center',
      paddingLeft: 50
    },
   
    
   
  
    rectangleView: {
      borderRadius: 64,
      backgroundColor: Color.colorDarkslateblue,
      left: 0,
      top: 0,
    },
    trending: {
      marginTop: -9.5,
      marginLeft: -47.5,
      top: "50%",
      fontSize: FontSize.size_sm,
      textAlign: "center",
      textTransform: "capitalize",
      color: Color.colorWhite,
    
      fontWeight: "600",
    },
   
    continue: {
      top: 15,
      left: 13,
      zIndex: 2,
    },
    
   
    
    
  });