import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity,ActivityIndicator  } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color, FontFamily, FontSize } from '../theme'
import SubmitButton from '../components/SubmitButton'
import Header from '../components/Header'

import SearchIcon from '../assets/img/Search.png'
import SpeakerIcon from '../assets/img/Speaker.png'
import { } from 'react-native'
import CustomButton from '../components/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirebaseApp } from '../utils/firebaseHalper'
import { useSelector } from 'react-redux'


const Participate = ({route}) => {
    const { concertId } = route.params;
    console.log("participte", concertId);

    const { width } = useWindowDimensions()
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const storage = getStorage(app);
    const db = getFirestore(app);
    const currentUser = useSelector((state) => state.auth.userData);

    // const pickImage = async () => {
    //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    //     if (permissionResult.granted === false) {
    //       alert("You've refused to allow this app to access your photos!");
    //       return;
    //     }
    
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });
    
    //     console.log('ImagePicker result:', result);
    
    //     if (!result.canceled) {
    //       setImage(result.assets[0].uri);
    //       console.log('Image selected:', result.assets[0].uri);
    //     }
    //   };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log('ImagePicker result:', result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          console.log('Image selected:', result.assets[0].uri);
        }
      };
    //   const uploadImage = async () => {
    //     if (!image) {
    //       alert('No image selected.');
    //       return;
    //     }
    
    //     setUploading(true);
    
    //     try {
    //       const response = await fetch(image);
    //       const blob = await response.blob();
    
    //       const storageRef = ref(storage, `participationPhotos/${currentUser ? currentUser.userId : 'anonymous'}/${blob._data.name}`);
    //       await uploadBytes(storageRef, blob);
    //       const downloadURL = await getDownloadURL(storageRef);
    
    //       console.log('Image uploaded:', downloadURL);
    
    //       if (currentUser) {
    //         // Update Firestore document
    //         const userRef = doc(db, 'users', currentUser.userId);
    //         await updateDoc(userRef, {
    //           hasParticipatePhoto: true,
    //           participatePhotoURL: downloadURL
    //         });
    
    //         console.log('Firestore updated with image URL.');
    //       }
    
    //       alert('Photo uploaded successfully!');
    //     } catch (error) {
    //       console.error('Error uploading photo:', error);
    //       alert('Failed to upload photo. Please try again.');
    //     } finally {
    //       setUploading(false);
    //     }
    //   };
     
    const uploadImage = async () => {
        if (!image) {
          alert('No image selected.');
          return;
        }
    
        setUploading(true);
    
        try {
          const response = await fetch(image);
          const blob = await response.blob();
    
          const storage = getStorage();
          const storageRef = ref(storage, `participationPhotos/${currentUser ? currentUser.userId : 'anonymous'}/${blob._data.name}`);
    
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
    
          console.log('Image uploaded:', downloadURL);
    
          if (currentUser) {
            // Update Firestore document
            const db = getFirestore();
            const userRef = doc(db, 'users', currentUser.userId);
            await updateDoc(userRef, {
              hasParticipatePhoto: true,
              participatePhotoURL: downloadURL,
              concertId: concertId,
              rank: currentUser.rank + 1 
            });
    
            console.log('Firestore updated with image URL.');
          }
    
          alert('Photo uploaded successfully!');
        } catch (error) {
          console.error('Error uploading photo:', error);
          alert('Failed to upload photo. Please try again.');
        } finally {
          setUploading(false);
        }
      };
    
    return (

        <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1, overflow: 'hidden' }}>
            <SafeAreaView>
                {/* Header */}
                <View style={{ paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, marginBottom: 30 }}>

                </View>

            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} >

                <View style={{ alignItems: 'center' }}>
                    <View style={[styles.concertDetailWrappper, { width: width * .90 }]}>
                        <View style={{ flexDirection: 'column', rowGap: 24 }}>
                            <Text style={{ fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>Concert Name</Text>
                            <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite }}>Faucibus tellus risus</Text>
                            <Text style={{ fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>Date</Text>
                            <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite }}>8 march, 2024</Text>
                            <Text style={{ fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>Time</Text>
                            <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite }}>05:49 pm</Text>
                            <Text style={{ fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>location</Text>
                            <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite }}>Stavanger</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 24, paddingHorizontal: 25, }}>
                    <Text style={{ fontSize: 16, fontFamily: FontFamily.soraSemiBold, color: Color.colorGray_100 }}>
                        Thank you for your interest in participating in our upcoming concert! To secure your spot, please submit a screenshot of your performance or rehearsal.
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 33, paddingTop: 24 }}>
                    <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite }}>Instructions</Text>
                    <View style={{ flexDirection: 'column', rowGap: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={{ width: 5, height: 5, backgroundColor: Color.colorGray_100, marginBottom: 15 }} />
                            <Text style={{ textAlign: 'left', fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>
                                Review your submission before clicking the "Send" button.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={{ width: 5, height: 5, backgroundColor: Color.colorGray_100, marginBottom: 15 }} />
                            <Text style={{ textAlign: 'left', fontSize: 16, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>
                                Review your submission before clicking the "Send" button.
                            </Text>
                        </View>
                    </View>
                </View>
 
                <View style={{ paddingHorizontal: 25 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={require('../assets/vectors/Upload.png')} style={{ width: 36, height: 38, marginBottom: 12 }} />
                            <Text style={{ fontSize: 20, fontFamily: FontFamily.soraSemiBold, color: Color.colorWhite, marginBottom: 3 }}>Click here to browse file</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, fontFamily: FontFamily.soraRegular, color: Color.colorGray_100 }}>
                                (Upload up to 1 MB JPEG or PNG file)
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {image && (
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        </View>
                    )}
                    {uploading ? (
                        <ActivityIndicator size="large" color={Color.colorDarkslateblue} style={{ marginVertical: 20 }} />
                    ) : (
                        <View style={{ marginTop: 20, paddingHorizontal: 40 }}>
                            <CustomButton title='Send' onPress={uploadImage} disabled={!image} />
                        </View>
                    )}
                </View>


            </ScrollView>
        </ImageBackground>

    )
}

export default Participate

const styles = StyleSheet.create({

    concertDetailWrappper: {
        flexDirection: 'column',
        backgroundColor: Color.colorGray_300,
        paddingVertical: 29,
        paddingHorizontal: 38,


        borderRadius: 12,
    }
})