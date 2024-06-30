import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FontSize ,FontFamily} from '../theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'

const Header = ({ title, leftIcon, rightIcon, endIcon }) => {
  const { top } = useSafeAreaInsets()
  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: top }}>
      <Image
        contentFit="cover"
        source={leftIcon}
      />

      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ color: '#fff', fontSize: FontSize.size_xl, fontFamily:FontFamily.soraSemiBold, textAlign: 'center', alignSelf: 'center' }}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', columnGap: 15, alignItems: 'center'}}>
        <Image
          contentFit="cover"
          source={rightIcon}
        />

        <Image
          contentFit="cover"
          source={endIcon}
        />
      </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({})