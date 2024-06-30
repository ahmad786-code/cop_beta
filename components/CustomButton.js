import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Color, FontFamily } from '../theme'

const CustomButton = ({onPress, title, customPadding, customFont}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,   customPadding !== undefined && { paddingVertical: customPadding }]}>
        <Text style={[styles.text, customFont !== undefined && {fontSize: customFont}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 64,
        backgroundColor: Color.colorDarkslateblue,
        alignItems: 'center'
    },
    text: {
        color: Color.colorWhite,
        fontSize: 18,
        fontFamily : FontFamily.soraBold,
        textTransform: 'uppercase'
    }
})