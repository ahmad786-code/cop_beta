import React from 'react'
import { Text, View, ImageBackground,  ScrollView,TextInput, KeyboardAvoidingView,Platform } from 'react-native'
import CityPicker from '../components/CityPicker'
 
import { Color, FontFamily, FontSize } from '../theme'
 
 
 import CustomButton from '../components/CustomButton'
 

const ReportUser = () => {
    return (
        <View style={{ flex: 1,    marginTop:'30%'}}>
            <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1,  }}>
           
            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' || 'Android' ? 'padding' : 'height'}  keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 0}
        >
            <ScrollView>
                    <View style={{ paddingHorizontal: 25, flexDirection: 'column', rowGap: 8 }}>
                        <Text style={{ fontFamily: FontFamily.soraSemiBold, fontSize: 24, color: Color.colorWhite }}>@Arlene_McCoy</Text>
                        <Text style={{ fontFamily: FontFamily.soraRegular, fontSize: 16, color: Color.colorGray_100 }}>Lorem ipsum dolor sit amet cons ectetur. Feugi at sed a dictum.</Text>
                    </View>

                    <View style={{ paddingHorizontal: 25, marginVertical: 10 }}>
                        <Text style={{ color: Color.colorWhite, fontSize: FontSize.size_base, marginVertical: 5 }}>Reasons for Reporting</Text>
                        <View style={{ backgroundColor: Color.colorGray_400, paddingVertical: 10, borderRadius: 12 }}>
                            <CityPicker label='Select Reason' />

                        </View>
                    </View>

                    <View style={{paddingHorizontal:25}}>
                        <Text style={{ color: Color.colorWhite, fontSize: FontSize.size_base, marginVertical: 5 }}>Additional note</Text>
                        <TextInput multiline={true}
                            placeholder='Write here...' placeholderTextColor={Color.colorGray_100} numberOfLines={10} style={{ height: 130, textAlignVertical: 'top', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, color: Color.colorGray_100, backgroundColor: Color.colorGray_400 }} />
                    </View>

                    <View style={{paddingHorizontal:40, marginTop:20,  }}>
                        
                        <CustomButton title='Submit Report'/>

                      
                    </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
              
            </ImageBackground>
        </View>
    )
}

export default ReportUser
