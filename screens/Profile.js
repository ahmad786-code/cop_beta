import { View, Text, ScrollView, Image, ImageBackground, SafeAreaView, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontFamily, FontSize } from '../theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import { updateUserData, userLogOut } from '../utils/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import ProfileImage from '../components/ProfileImage'
import { updateLoginUserData } from '../store/authSlice'

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData)
    const [isShowAbout, setIsShowAbout] = useState(false)
    const [bio, setBio] = useState("")
    const [loading, setLoading] = useState(false);


    const onChangeText = (  value) => {
        setBio(value);
    };

    const handleUpdateBio = async () => {
        try {
            await updateUserData(userData.userId, { bio });
            dispatch(updateLoginUserData({ newData: { bio } }));
            setIsShowAbout(false);
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };
    
    
    const handleLogout = async () => {
        setLoading(true);
        try {
            await dispatch(userLogOut(userData));
            navigation.navigate('Login'); // Navigate to Login screen after logout
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userData) {
            navigation.navigate('Login');  
        }
    }, [userData, navigation]);


    if (!userData) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Color.colorDarkslateblue} />
            </View>
        );
    }

    
    const getRankIcon = (rank) => {
        if (rank >= 20) return require('../assets/app_icon/ranks/MVP.png');
        else if (rank >= 15) return require('../assets/app_icon/ranks/BackerMain.png');
        else if (rank >= 10) return require('../assets/app_icon/ranks/Lyrisist.png');
        else if (rank >= 5) return require('../assets/app_icon/ranks/RookieMain_.png');
        else return require('../assets/app_icon/ranks/BeginnerMain.png'); // Default for ranks less than 5
    };

    const rankIcon = userData ? getRankIcon(userData.rank) : require('../assets/app_icon/ranks/BeginnerMain.png');
    return (

        <ImageBackground source={require('../assets/img/Design.png')} style={{ flex: 1 }} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} decelerationRate="fast" removeClippedSubviews={true}  >

                    <SafeAreaView style={{ alignItems: 'center', marginTop: '20%' }}>
                        <View style={{ alignItems: 'center', position: 'relative' }}>
                            <View style={{ position: 'relative' }}>
                                <Image source={require('../assets/app_icon/my-account/pp-background.png')} style={{ width: 140, height: 140 }} />
                            </View>
                            <View style={{ position: 'absolute', top: 30, right: 30, }}>
                            <ProfileImage  uri={userData?.profilePicURL} width={95} height={95}/>
                            </View>
                        </View>  
                        
                    </SafeAreaView>

                    <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 20, fontFamily: FontFamily.soraRegular }}>{userData?.userName}</Text>

                    <View style={styles.followerWrapper}>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ alignItems: 'center', height: 60, justifyContent: 'flex-end' }}>
                                <Image  source={rankIcon}  style={{ width: 27, height: 27 }} />
                                <Text style={{ color: '#fff', fontSize: FontSize.size_smi, fontFamily: FontFamily.soraRegular, textTransform: 'uppercase' }}> RANK</Text>
                            </View>
                        </View>
                        <View style={[styles.following, styles.followerContainer]}>
                            <View style={{ alignItems: 'center', height: 80, justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#fff', fontSize: FontSize.size_9xl, fontFamily: FontFamily.soraSemiBold }}> 26</Text>

                                <Text style={{ color: '#fff', fontSize: FontSize.size_smi, fontFamily: FontFamily.soraRegular, textTransform: 'uppercase' }}> following</Text>
                            </View>
                        </View>
                        <View style={[styles.subscribers, styles.followerContainer]}>
                            <View style={{ alignItems: 'center', height: 80, justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#fff', fontSize: FontSize.size_9xl, fontFamily: FontFamily.soraSemiBold }}> 1675</Text>

                                <Text style={{ color: '#fff', fontSize: FontSize.size_smi, fontFamily: FontFamily.soraRegular, textTransform: 'uppercase' }}> subscribers</Text>
                            </View>
                        </View>
                    </View>



                    <View style={{ flexDirection: 'column', paddingLeft: 26, paddingRight: 10, marginTop: 50, marginBottom: 39, rowGap: 20 }}>
                        <Pressable onPress={() => navigation.navigate('EditProfile')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 19 }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: Color.colorLightslateblue, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../assets/app_icon/my-account/edit.png')} style={{ width: 16, height: 16 }} />
                                    </View>
                                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}>Edit Profile</Text>
                                </View>

                                <Image source={require('../assets/vectors/ChevronRight.png')} />

                            </View>
                        </Pressable>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable onPress={() => setIsShowAbout(!isShowAbout)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 19 }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Color.colorLightslateblue, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/app_icon/my-account/about.png')} style={{ width: 16, height: 16 }} />
                                </View>
                                <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}>Edit About</Text>
                            </Pressable>

                            {
                                isShowAbout ? (
                                    <Image source={require('../assets/vectors/ChevronDown.png')} />
                                ) : (
                                    <Image source={require('../assets/vectors/ChevronRight.png')} />
                                )
                            }




                        </View>

                        {isShowAbout && (

                            <View style={{ flexDirection: 'column', rowGap: 16 }}>
                                <TextInput
                                    value={bio || userData.bio} onChangeText={onChangeText}
                                    style={{ color: Color.colorWhite, backgroundColor: Color.colorGray_400, borderRadius: 12, paddingHorizontal: 21, paddingTop: 18, paddingBottom: 94 }}
                                    placeholder="Tell more about you"
                                    placeholderTextColor={Color.colorGray_100}
                                    multiline={true}
                                />
                                <CustomButton title='Update' onPress={handleUpdateBio} customPadding={6} customFont={14} />
                            </View>

                        )}

                        <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 19 }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Color.colorLightslateblue, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/app_icon/my-account/contact-us.png')} style={{ width: 23, height: 19 }} />
                                </View>
                                <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}>Contact US</Text>
                            </View>

                            <Image source={require('../assets/vectors/ChevronRight.png')} />



                        </Pressable>
                        <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 19 }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Color.colorLightslateblue, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/app_icon/my-account/privacy.png')} style={{ width: 15, height: 21 }} />
                                </View>
                                <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}>Privacy policy</Text>
                            </View>

                            <Image source={require('../assets/vectors/ChevronRight.png')} />



                        </Pressable>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable onPress={handleLogout}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 19 }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: Color.colorLightslateblue, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../assets/app_icon/my-account/logout.png')} style={{ width: 19, height: 17 }} />
                                    </View>
                                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}>Logout</Text>
                                </View>
                            </Pressable>


                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', paddingHorizontal: 94, gap: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 29 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.colorLightslateblue, width: 60, height: 60, borderRadius: 100 }}>
                            <Image source={require('../assets/app_icon/my-account/tiktok.png')} style={{ width: 25.67, height: 30.2 }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.colorLightslateblue, width: 60, height: 60, borderRadius: 100 }}>
                            <Image source={require('../assets/app_icon/my-account/youtube.png')} style={{ width: 28.69, height: 22.65 }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.colorLightslateblue, width: 60, height: 60, borderRadius: 100 }}>
                            <Image source={require('../assets/app_icon/my-account/twitter.png')} style={{ width: 20.58, height: 22.12 }} />
                        </View>
                    </View>



                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>

    )
}
const styles = StyleSheet.create({


    followerWrapper: {
        marginTop: 40,

        flexDirection: 'row',

        justifyContent: 'space-around',
        gap: 55,

        paddingHorizontal: 70

    },
    followerContainer: {

        alignItems: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },










})
export default Profile