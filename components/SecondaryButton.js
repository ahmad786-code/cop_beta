import React from 'react'
import { StyleSheet, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { FontSize, Color, FontFamily, Border } from "../theme";
const SecondaryButton = ({title, onPress, cutomWidth}) => {
    const {width} = useWindowDimensions()
  return  <TouchableOpacity style={{...styles.button, width : width * cutomWidth }} onPress={onPress}>
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
        // fontFamily: FontFamily.soraSemiBold,
        fontWeight: "700",
        color: Color.colorWhite,
        fontSize: FontSize.size_lg,
        textAlign: "center",
    }
});
export default SecondaryButton