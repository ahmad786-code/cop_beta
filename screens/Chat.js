import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, ImageBackground, Button, Pressable, Image, FlatList, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bubble from '../components/Bubble'
import { TextInput } from 'react-native'
import { Color, FontFamily, FontSize } from '../theme'
import { useSelector } from 'react-redux'
import { createChat, sendTextMessage } from '../utils/actions/chatActions'

import ProfileImage from '../components/ProfileImage'
import { listenToUserStatus, monitorUserPresence } from '../utils/actions/percence'
import { getFirebaseApp } from '../utils/firebaseHalper'
// import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore';
 
const Chat = (props) => {


  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef();
  const [userProfiles, setUserProfiles] = useState({});
  const { chatId, chatTitle, isGroup, chatImage ,members, otherUserId} = props.route.params;
 
    const userData = useSelector((state) => state.auth.userData);
    
  useEffect(() => {
    const fetchMessages = async () => {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const collectionPath = isGroup ? `groups/${chatId}/messages` : `chats/${chatId}/messages`;
      const q = query(collection(db, collectionPath), orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    };

    fetchMessages();
  }, [chatId, isGroup]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const app = getFirebaseApp();
  //     const db = getFirestore(app);
  //     const collectionPath = isGroup ? `groups/${chatId}/messages` : `chats/${chatId}/messages`;
  //     const q = query(collection(db, collectionPath), orderBy('createdAt', 'asc'));

  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const fetchedMessages = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setMessages(fetchedMessages);
  //     });

  //     return () => unsubscribe();
  //   };

  //   fetchMessages();
  // }, [chatId, isGroup]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const uniqueUserIds = [...new Set(messages.map(msg => msg.userId))];

       

      const profiles = {};
      for (let userId of uniqueUserIds) {
        try {
          const userRef = doc(db, 'users', userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
          
            profiles[userId] = userData.profilePicURL;
          } else {
            profiles[userId] = null; // If user profile does not exist
          }
        } catch (error) {
          console.error(`Error fetching user data for ${userId}:`, error);
        }
      }
      
      setUserProfiles(profiles);
    };

    if (messages.length > 0) {
      fetchUserProfiles();
    }
  }, [messages]);
  
  // const sendMessage = async () => {
  //   if (messageText.trim()) {
  //     const app = getFirebaseApp();
  //     const db = getFirestore(app);
  //     const collectionPath = isGroup ? `groups/${chatId}/messages` : `chats/${chatId}/messages`;

  //     await addDoc(collection(db, collectionPath), {
  //       text: messageText,
  //       createdAt: serverTimestamp(),
  //       userId: userData.userId,
  //       userName: userData.userName,
  //     });
 
      
  //     setMessageText('');
      
  //     flatListRef.current.scrollToEnd({ animated: true });
  //   }
  // };
  
  const sendMessage = async () => {
    if (messageText.trim()) {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const collectionPath = isGroup ? `groups/${chatId}/messages` : `chats/${chatId}/messages`;

      const messageDoc = {
        text: messageText,
        createdAt: serverTimestamp(),
        userId: userData.userId,
        userName: userData.userName,
      };

      await addDoc(collection(db, collectionPath), messageDoc);
      setMessageText('');
      flatListRef.current?.scrollToEnd({ animated: true });

      const notificationTitle = isGroup ? `New message in ${chatTitle}` : `New message from ${userData.userName}`;
      const notificationBody = messageText;
      const targetUserIds = isGroup ? members.filter(id => id !== userData.userId) : [otherUserId];

      sendNotificationsToUsers(targetUserIds, notificationTitle, notificationBody);
    }
  };

  const sendNotificationsToUsers = async (userIds, title, body) => {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    console.log("Sending notifications to users:", userIds);
  
    const tokens = [];
    for (let userId of userIds) {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().pushToken) {
        tokens.push(userSnap.data().pushToken);
        console.log(`Found token for user ${userId}: ${userSnap.data().pushToken}`);
      } else {
        console.log(`No token found for user ${userId}`);
      }
    }
  
    console.log("Tokens collected for notification:", tokens);
  
    for (let token of tokens) {
      const message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'goes here' },
      };
  
      console.log("Sending message:", message);
  
      try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
          },
          body: JSON.stringify(message),
        });
        const responseData = await response.json();
        console.log('Notification sent response:', responseData);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };
  
 
  const renderItem = ({ item }) => {
    const userProfile = userProfiles[item.userId];
    
    return (
      <View style={item.userId === userData.userId ? styles.otherChatBox :  styles.ownChatBox  }>
        <View style={styles.user}>
          {userProfile ? (
            <Image source={{ uri: userProfile }} style={styles.profileImg} />
          ) : (
            <Image source={require('../assets/img/userImage.jpeg')} style={styles.profileImg} />
          )}
          <Text style={styles.username}>{item.userName}</Text>
        </View>
        <View style={item.userId === userData.userId ? styles.textContainer : styles.textContainerOther}>
          <Text style={item.userId === userData.userId ? styles.text : [styles.text, styles.other]}>{item.text}</Text>
        </View>
      </View>
    );
  };

 
  return (

    <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>

        <View style={{ backgroundColor: Color.colorLightslateblue, height: 109, }}>
          <SafeAreaView>
            <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => props.navigation.goBack()}>
                <Image source={require('../assets/vectors/ChevronLeft.png')} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => isGroup ? props.navigation.navigate("Group_Profile", {chatImage, chatTitle, chatId, members}) : props.navigation.navigate('User_Profile', {chatTitle,chatImage, otherUserId})} style={{ flexDirection: 'row', marginLeft: 16, columnGap: 12, alignItems: 'center' }}>

               
              {isGroup ? <View>
                  { chatImage ? (
                <Image source={{ uri: chatImage }} style={{ width: 60, height: 60, borderRadius: 9 }} />
              ) : (
                <Image source={require('../assets/img/userImage.jpeg')} style={{ width: 60, height: 60, borderRadius: 9 }} />
              )}
                 
                <View style={{ alignItems: 'flex-end', marginTop: -10 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 6, backgroundColor: Color.colorDarkslateblue, }}>

                    <Image style={{ width: 16, height: 16 }} source={require('../assets/vectors/GroupIcon.png')} />

                  </View>
                </View>

               

                </View> : 
                  <ProfileImage uri={chatImage}  height={60} width={60} /> 
                }

              

                <View>
                  <Text style={{ color: '#fff', fontFamily: FontFamily.soraSemiBold, fontSize: 16 }}> {chatTitle}</Text>
                  <Text style={{ color: Color.colorGray_100, fontFamily: FontFamily.soraRegular, fontSize: 12 }}> Online </Text>

                </View>
              </TouchableOpacity>
              
            </View>
          </SafeAreaView>
        </View>


        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
          />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
          <View style={{ paddingHorizontal: 20, marginBottom: 40, marginTop: 18 }}>
            <View style={{ justifyContent: 'center', backgroundColor: Color.colorLightslateblue, height: 60, borderRadius: 12, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput value={messageText}
                  onChangeText={(text) => setMessageText(text)} style={{ color: Color.colorWhite, flex: 1, flexShrink: 1, marginRight: 10 }} multiline={true} placeholder='Write Message here' placeholderTextColor={Color.colorGray_100} />

                <TouchableOpacity onPress={sendMessage}>
                  <View style={{ backgroundColor: Color.colorDarkslateblue, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <Image source={require('../assets/img/Send.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>





    </ImageBackground>
  )
}

export default Chat

const styles = StyleSheet.create({
  scrollToBottomButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bubble: {
    margin: 10,
    height: 50,
    backgroundColor: '#ddd',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  ownMessage: {
    backgroundColor: Color.colorLightslateblue,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: 274,
    padding: 17
  },
  otherMessage: {

    alignSelf: 'flex-start',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    width: 274,
    padding: 17
  },


  textContainer: {
    backgroundColor: Color.colorDarkslateblue,
    width: 274,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
  },
  textContainerOther: {
    backgroundColor: Color.colorLightslateblue,
    width: 274,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
  },
  text: {
    color: Color.colorWhite,
    fontSize: FontSize.size_smi,
    lineHeight: 20,
  },
  other: {
    color: Color.colorGray_100,
  },
  profileImg: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  username: {
    color: Color.colorGray_100,
    fontSize: 7,
  },
  ownChatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 13,
    marginHorizontal: 9,
  },
  otherChatBox: {
    marginVertical: 30,
    marginHorizontal: 9,
    flexDirection: 'row-reverse',
  },
  user: {
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 7,
  },
});





