import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../theme'

const Badge = ({title, height, width}) => {

  return (
    <View style={[styles.rectangleContainer, styles.rectangleLayout, styles.rectangleView, styles.rectangleLayout] }>
                <Text style={[styles.trending, styles.parentPosition]}>
              22 May, 23
            </Text>
    
  </View>
  )
}

export default Badge

 


const styles = StyleSheet.create({
    
       
  
    
  
  rectangleLayout: {
   
    position: "absolute",
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 50
  },
 
  rectangleView: {
    borderRadius: 64,
    backgroundColor: Color.colorDarkslateblue,
  
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
 
 
  
 
  
    
    
  });