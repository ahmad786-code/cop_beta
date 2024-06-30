import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Color, FontFamily, FontSize } from '../theme'
import CustomButton from '../components/CustomButton'
import ProfileImage from '../components/ProfileImage'
import { getFirebaseApp } from '../utils/firebaseHalper'
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux'
import { generateChatId } from '../utils/chatUtils'
 
 

const UserProfile = (props) => {
     
    
     
    const { chatTitle, chatImage ,otherUserId} = props.route.params
    const [userData, setUserData] = useState(null);
     
 
    const [loading, setLoading] = useState(true);

    const [isFollowing, setIsFollowing] = useState(false);
    const currentUser = useSelector((state) => state.auth.userData);
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const app = getFirebaseApp();
                const db = getFirestore(app);
                const userDoc = await getDoc(doc(db, 'users', otherUserId));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    setIsFollowing(data.followers.includes(currentUser.userId));
                } else {
                    console.log('User not found!');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [otherUserId, currentUser.userId]);

    useEffect(() => {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const userRef = doc(db, 'users', otherUserId);

        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUserData(data);
                setIsFollowing(data.followers.includes(currentUser.userId));
            }
        });

        return () => unsubscribe();
    }, [otherUserId, currentUser.userId]);

    const handleFollow = async () => {
        try {
            const app = getFirebaseApp();
            const db = getFirestore(app);
            const userRef = doc(db, 'users', otherUserId);
            const currentUserRef = doc(db, 'users', currentUser.userId);

            if (isFollowing) {
                // Unfollow user
                await updateDoc(userRef, {
                    followers: arrayRemove(currentUser.userId)
                });
                await updateDoc(currentUserRef, {
                    following: arrayRemove(otherUserId)
                });
                console.log(`Unfollowed ${otherUserId}`);
            } else {
                // Follow user
                await updateDoc(userRef, {
                    followers: arrayUnion(currentUser.userId)
                });
                await updateDoc(currentUserRef, {
                    following: arrayUnion(otherUserId)
                });
                console.log(`Followed ${otherUserId}`);
            }
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
    };


    const handleMessage = () => {
        const chatId = generateChatId(currentUser.userId, otherUserId);
        props.navigation.navigate('Chat', {
            chatId,
            chatTitle: chatTitle,
            chatImage: chatImage,
            otherUserId: otherUserId,
            isGroup: false
        });
    };


    const getRankIcon = (rank) => {
        if (rank >= 20) return require('../assets/app_icon/ranks/MVP.png');
        else if (rank >= 15) return require('../assets/app_icon/ranks/BackerMain.png');
        else if (rank >= 10) return require('../assets/app_icon/ranks/Lyrisist.png');
        else if (rank >= 5) return require('../assets/app_icon/ranks/RookieMain_.png');
        else return require('../assets/app_icon/ranks/BeginnerMain.png'); // Default for ranks less than 5
    };
    
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Color.colorDarkslateblue} />
            </View>
        );
    }


    const rankIcon = userData ? getRankIcon(userData.rank) : require('../assets/app_icon/ranks/BeginnerMain.png');
    return (
        <View style={{ flex: 1, justifyContent: 'center',  }}>
            <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1,  }}>
                <SafeAreaView style={{alignItems:'center', justifyContent:'center', marginTop:'15%'}}>
                    <View style={{ alignItems: 'center', position:'relative'  }}>
                        <View style={{position:'relative'  }}>
                            <Image source={require('../assets/app_icon/my-account/pp-background.png')} style={{ width: 140, height: 140 }} />
                        </View>
                        <View style={{position:'absolute', top:30, right:30,}}>
                           
                            <ProfileImage uri={chatImage} width={95} height={95}/>
                        </View>
                    </View>
                </SafeAreaView>


               <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 20, fontFamily: FontFamily.soraRegular,marginTop:14.5 }}>{chatTitle}</Text>



                <View style={{   flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 55, marginTop:42  }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, color: Color.colorWhite, fontFamily: FontFamily.soraSemiBold }}>{userData ? userData.following.length : 0}</Text>
                        <Text style={{ fontSize: 16, color: Color.colorGray_100, fontFamily: FontFamily.soraRegular }}>Following</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, color: Color.colorWhite, fontFamily: FontFamily.soraSemiBold }}>{userData ? userData.Subscribers.length : 0}</Text>
                        <Text style={{ fontSize: 16, color: Color.colorGray_100, fontFamily: FontFamily.soraRegular }}>subscribers</Text>
                    </View>
                </View>

                <View style={{ marginTop:32, paddingHorizontal: 25,  height: '20%' }}>
                <View style={{ flexDirection: 'row', columnGap: 27, alignItems: 'center', backgroundColor: Color.colorGray_300, borderRadius: 12, paddingHorizontal: 25, paddingVertical: '5%' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={rankIcon} style={{ width: 80, height: 73 }} />
                            <Text style={{ fontFamily: FontFamily.soraSemiBold, fontSize: 16, color: Color.colorWhite }}>  RANK</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: FontFamily.soraBold, fontSize: 20, color: Color.colorWhite }}>About</Text>
                            <View style={{ maxHeight: 100 }}>
                                <Text style={{ fontFamily: FontFamily.soraRegular, fontSize: 14, color: Color.colorGray_100 }}>  
                                {userData ? userData.bio : ""}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{   marginTop:53, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ width: '40%' }}>
                        <CustomButton  title={isFollowing ? 'Unfollow' : 'Follow'} onPress={handleFollow} />

                    </View>
                    <View style={{ width: '40%' }} >
                        <CustomButton title='Message' onPress={handleMessage}/>
                        
                    </View>
                </View>  
 


            </ImageBackground>

        </View>

    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});

export default UserProfile
