import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import {FontSize, Color, FontFamily, Border} from '../theme'

const ENTRIES = [

    {
        id: '76ytytt',
        title: '08# Trending',
        date: '29 May, 2023',
        location: 'Wilshire Blvd. Beverly Grove',
        uri: 'https://picsum.photos/200/300?random=8'
    },
    {
        id: '17ytyty',
        title: '09# Trending',
        date: '30 May, 2023',
        location: 'Washington Blvd. Culver City',
        uri: 'https://picsum.photos/200/300?random=9'
    },
    {
        id: '13dddd',
        title: '10# Trending',
        date: '31 May, 2023',
        location: 'Melrose Ave. Fairfax',
        uri: 'https://picsum.photos/200/300?random=10'
    }
];


const { height, width } = Dimensions.get('window');

const PosterCarousel = () => {
    
    return (
        <View style={[styles.rectangleParent, styles.parentPosition1]}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={{uri: ENTRIES[0].uri}}
        />
  
        <View style={[styles.continue, styles.rectangleLayout]}>
          <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={[styles.trending, styles.parentPosition]}>
              01# trending
            </Text>
          </View>
        </View>
        <View style={[styles.may2023Parent, styles.parentPosition]}>
          <Text style={[styles.may2023, styles.may2023Typo]}>22 May, 2023</Text>
          <Text style={[styles.prestonRdInglewood, styles.may2023Typo]}>
            Preston Rd. Inglewood
          </Text>
        </View>
      </View>
    )

}
 
const styles = StyleSheet.create({
    
    
    parentPosition1: {
      alignItems: "center",
      left: 25,
      position: "absolute",
    },
    groupChildPosition: {
      backgroundColor: Color.colorDarkslateblue,
      left: 0,
      top: 0,
    },
    groupLayout: {
      width: 7,
      opacity: 0.5,
      backgroundColor: Color.colorDarkslateblue,
      borderRadius: Border.br_9xs,
      top: 0,
      height: 7,
      position: "absolute",
    },
    rectangleLayout: {
      height: 31,
      width: 121,
      position: "absolute",
    },
    parentPosition: {
      left: "50%",
      position: "absolute",
    },
    may2023Typo: {
    //   fontFamily: FontFamily.soraRegular,
      marginLeft: -91.5,
      fontSize: FontSize.size_base,
      left: "50%",
      textAlign: "center",
      color: Color.colorWhite,
      textTransform: "capitalize",
      position: "absolute",
    },
    groupViewLayout: {
      width: 341,
      height: 109,
    },
    rectanglePosition: {
      left: 0,
      top: 0,
    },
    mayText: {
      textAlign: "left",
      textTransform: "capitalize",
    },
    oTracedIcon: {
      width: 24,
      height: 26,
    },
    home1: {
      marginLeft: 139,
      fontSize: FontSize.size_xl,
      textAlign: "center",
      textTransform: "capitalize",
    },
    vectorIcon: {
      width: 16,
      height: 16,
      marginLeft: 139,
    },
    oTracedParent: {
      top: 59,
      flexDirection: "row",
    },
    frameChild: {
      width: 380,
      height: 217,
      zIndex: 0,
      borderRadius: Border.br_xs,
    },
    groupChild: {
      width: 18,
      borderRadius: Border.br_9xs,
      backgroundColor: Color.colorDarkslateblue,
      height: 7,
      position: "absolute",
    },
    groupItem: {
      left: 22,
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 4,
      elevation: 4,
      shadowOpacity: 1,
      borderStyle: "solid",
      borderColor: Color.colorBlack,
      borderWidth: 1,
      opacity: 0.5,
    },
    groupInner: {
      left: 33,
      opacity: 0.5,
    },
    rectangleGroup: {
      width: 40,
      zIndex: 1,
      marginTop: 21,
      height: 7,
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
    rectangleContainer: {
      left: 0,
      top: 0,
    },
    continue: {
      top: 19,
      left: 20,
      zIndex: 2,
    },
    
   
    
    
  });

export default PosterCarousel

