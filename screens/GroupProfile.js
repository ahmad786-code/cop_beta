import React, { useState , useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert,ActivityIndicator } from 'react-native'
import { Color, FontFamily, FontSize } from '../theme'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubmitButton from '../components/SubmitButton'
import CustomButton from '../components/CustomButton'
 
import { getFirebaseApp } from '../utils/firebaseHalper'
import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux'
import { removeGroupFromUser } from '../store/userSlice'
  
const GroupProfile = (props) => {
    
    const [textShown, setTextShown] = useState(false);
    const [members, setMembers] = useState([]);
    const [concertDetails, setConcertDetails] = useState(null);
    const {  chatImage ,chatTitle, members: groupMembers, chatId } = props.route.params;
    const currentUser = useSelector((state) => state.auth.userData);
 
    console.log(concertDetails);

    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchMemberDetails = async () => {
          try {
            const app = getFirebaseApp();
            const db = getFirestore(app);
            const memberDetails = await Promise.all(groupMembers.map(async (memberId) => {
              const userRef = doc(db, 'users', memberId);
              const userDoc = await getDoc(userRef);
              return { id: userDoc.id, ...userDoc.data() };
            }));
            setMembers(memberDetails);
          } catch (error) {
            console.error('Error fetching group members:', error);
          }
        };
    
        fetchMemberDetails();
      }, [groupMembers]);


      useEffect(() => {
        const fetchConcertDetails = async () => {
            try {
                const app = getFirebaseApp();
                const db = getFirestore(app);
                const groupRef = doc(db, 'groups', chatId);
                const groupDoc = await getDoc(groupRef);
                if (groupDoc.exists) {
                    const groupData = groupDoc.data();
                    if (groupData.concertIds && groupData.concertIds.length > 0) {
                        // Fetch the first concert's details as an example
                        const concertRef = doc(db, 'concerts', groupData.concertIds[0]);
                        const concertDoc = await getDoc(concertRef);
                        if (concertDoc.exists) {
                            setConcertDetails(concertDoc.data());
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching concert details:', error);
            }
        };

        fetchConcertDetails();
    }, [chatId]);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        if (date instanceof Date) {
          return date.toLocaleDateString('en-GB', options);
        } else if (typeof date === 'string') {
          const jsDate = new Date(date);
          return jsDate.toLocaleDateString('en-GB', options);
        }
        return date;
      };
    

      const leaveGroup = async () => {
        try {
          const app = getFirebaseApp();
          const db = getFirestore(app);
    
          const groupRef = doc(db, 'groups', chatId);
          const groupDoc = await getDoc(groupRef);
    
          if (!groupDoc.exists) {
            throw new Error('Group does not exist');
          }
    
          const groupData = groupDoc.data();
          console.log('Group data:', groupData);
    
          if (!Array.isArray(groupData.members)) {
            throw new Error('Invalid group data: members field is not an array');
          }
    
          // Remove the user from the group's members list
          await updateDoc(groupRef, {
            members: arrayRemove(currentUser.userId)
          });
    
          const userRef = doc(db, 'users', currentUser.userId);
          const userDoc = await getDoc(userRef);
    
          if (!userDoc.exists) {
            throw new Error('User does not exist');
          }
    
          const userData = userDoc.data();
          console.log('User data:', userData);
    
          if (!Array.isArray(userData.groups)) {
            throw new Error('Invalid user data: groups field is not an array');
          }
    
          // Remove the group from the user's list of groups
          await updateDoc(userRef, {
            groups: arrayRemove(chatId)
          });
    
          dispatch(removeGroupFromUser(chatId));
    
          Alert.alert('Success', 'You have left the group.');
          props.navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
          console.error('Error leaving group:', error);
          Alert.alert('Error', `Failed to leave the group: ${error.message}`);
        }
      };

 
    
      if (!concertDetails) {
           return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Color.colorDarkslateblue} style={{ marginVertical: 20 }} />
        </View>;
      }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >



                    <SafeAreaView style={{ alignItems: 'center', marginTop: '15%' }}>
                        <View style={{ alignItems: 'center', position: 'relative' }}>
                            <View style={{ position: 'relative' }}>
                                <Image source={require('../assets/app_icon/my-account/pp-background.png')} style={{ width: 140, height: 140 }} />
                            </View>
                            <View style={{ position: 'absolute', top: 30, right: 30, }}>
                              {chatImage ?   <Image source={{uri:chatImage}}  style={{ width: 95, height: 95, borderRadius: 100 }} /> : 
                                <Image source={require("../assets/img/userImage.jpeg")}  style={{ width: 95, height: 95, borderRadius: 100 }} />}
                            </View>
                        </View>
                    </SafeAreaView>

                    <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 32, fontSize: 20, fontFamily: FontFamily.soraRegular }}>{chatTitle}</Text>

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {members.slice(0, 5).map((member, index) => (
                                <Image
                                    key={index}
                                    source={member.profilePicURL ? { uri: member.profilePicURL } : require("../assets/img/userImage.jpeg")}
                                  
                                    style={{ width: 34, height: 34, borderRadius: 100, borderWidth: 1, borderColor: '#fff', marginLeft: index !== 0 ? -10 : 0 }}
                                />
                            ))}
                            {members.length > 5 && (
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 100, backgroundColor: Color.colorDarkslateblue, marginLeft: -10 }}>
                                    <Text style={{ color: '#fff', fontSize: FontSize.size_smi }}>+{usersGrop.length - 5}</Text>
                                </View>
                            )}
 

                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 42, paddingHorizontal: 25 }}>
                        <Text style={{ alignSelf: 'flex-start', marginBottom: 16, color: Color.colorWhite, fontSize: 20, fontFamily: FontFamily.soraSemiBold }}>Concert Information</Text>
                        <Image source={{uri: concertDetails?.image}} resizeMode='cover' style={{ width: 380, height: 244, borderRadius: 12 }} />
                    </View>

                    <View style={styles.concertConatiner}>
                        <View style={styles.concertBox}>
                            <View style={styles.concertDate}>
                                <Text style={styles.title}>Date</Text>
                                <Text style={styles.subTitle}>{formatDate(concertDetails.date)}</Text>
                            </View>
                        </View>
                        <View style={styles.concertBox}>
                            <View style={styles}>
                                <Text style={styles.title}>City</Text>
                                <Text style={styles.subTitle}>{concertDetails?.location}</Text>
                            </View>
                        </View>
                        <View style={styles.concertBox}>
                            <View style={styles.concertDate}>
                                <Text style={styles.title}>Venue</Text>
                                <Text style={styles.subTitle}>{concertDetails?.venue}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 25 }}>
                        <Text style={{ alignSelf: 'flex-start', color: Color.colorWhite, fontSize: 20, fontFamily: FontFamily.soraSemiBold }}>About</Text>

                        <Text style={{ color: Color.colorGray_100, fontFamily: FontFamily.soraRegular, fontSize: 16 }} numberOfLines={textShown ? undefined : 3}>{concertDetails?.description}</Text>
                        <TouchableOpacity onPress={() => setTextShown(!textShown)}>
                            <Text style={styles.readMore}>
                                {textShown ? 'See less' : 'See more'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ paddingHorizontal: 25, marginVertical: 25 }}>
                        <CustomButton title='Leave' onPress={leaveGroup} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default GroupProfile

const styles = StyleSheet.create({

    concertConatiner: {
        paddingHorizontal: 25,
        marginTop: 25,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10
    },
    concertBox: {

        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        padding: 12


    },
    aboutContainer: {
        marginBottom: 22
    },
    title: {
        color: Color.colorWhite
    },
    subTitle: {
        color: Color.colorDarkslateblue
    },

    aboutTitle: {
        marginBottom: 6,
        fontSize: FontSize.size_xl,
        color: Color.colorWhite
    },

    aboutContent: {
        fontSize: FontSize.size_base,
        color: Color.colorGray_100,
    },
    readMore: {
        color: Color.colorDarkslateblue,
        fontSize: FontSize.size_base
    }

})


