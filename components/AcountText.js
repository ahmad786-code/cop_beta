import { StyleSheet, Text, View } from 'react-native'
import { Color, FontFamily, FontSize } from '../theme'
 

const AcountText = ({title, subTitle, onPress}) => {
    return (

        <View style={styles.accountContainer}>
            <Text style={styles.acountTitle}> {title} </Text>
            <Text onPress={onPress} style={styles.accountsubTitle}>{subTitle}</Text>
        </View>
    )
}

export default AcountText

const styles = StyleSheet.create({
    accountContainer: {
        flexDirection: 'row'
    },
    acountTitle: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.soraRegular
    },
    accountsubTitle: {
        color: Color.colorDarkslateblue,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.soraRegular
    }
})