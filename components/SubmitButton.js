import React from 'react'
import { StyleSheet, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { FontSize, Color, FontFamily, Border } from "../theme";
const SubmitButton = ({title, onPress}) => {
    const {width} = useWindowDimensions()
  return  <TouchableOpacity style={{...styles.button, width : width * 0.8 }} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Border.br_23xl,
        backgroundColor: Color.colorDarkslateblue,
    },
    buttonText: {
        fontFamily: FontFamily.soraSemiBold,
        color: Color.colorWhite,
        fontSize: FontSize.size_lg,
        textAlign: "center",
       
    }
});
export default SubmitButton