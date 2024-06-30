import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList  } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import UserList from '../components/UserList'

import CustomSearch from '../components/CustomSearch'

import { useSelector } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseHalper'

import  { getFirestore, collection, getDocs, query, orderBy, limit, getDoc, onSnapshot } from 'firebase/firestore';
 

import { generateChatId } from '../utils/chatUtils'
const Inbox = (props) => {
  const { top } = useSafeAreaInsets()
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const currentUser = useSelector((state) => state.auth.userData);
 
 

  // useEffect(() => {
  //   const fetchUsersAndGroups = async () => {
  //     try {
  //       const app = getFirebaseApp();
  //       const db = getFirestore(app);

  //       // Fetch users
  //       const usersRef = collection(db, 'users');
  //       const usersSnapshot = await getDocs(usersRef);
  //       const fetchedUsers = usersSnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       const filteredUsers = fetchedUsers.filter(user => user.userId !== currentUser.userId);

  //       // Fetch groups and filter based on current user's membership
  //       const groupsRef = collection(db, 'groups');
  //       const groupsSnapshot = await getDocs(groupsRef);
  //       let fetchedGroups = groupsSnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));

  //       // Filter groups to include only those where currentUser is a member
  //       fetchedGroups = fetchedGroups.filter(group => group.members.includes(currentUser.userId));

  //       // Fetch last message for each user and group
  //       const usersWithLastMessage = await Promise.all(filteredUsers.map(async user => {
  //         const chatId = generateChatId(currentUser.userId, user.userId);
  //         const lastMessage = await fetchLastMessage(db, chatId, false);
  //         return { ...user, lastMessage };
  //       }));

  //       const groupsWithLastMessage = await Promise.all(fetchedGroups.map(async group => {
  //         const lastMessage = await fetchLastMessage(db, group.id, true);
  //         return { ...group, lastMessage };
  //       }));

  //       setUsers(usersWithLastMessage);
  //       setGroups(groupsWithLastMessage);
  //     } catch (error) {
  //       console.error("Error fetching users and groups:", error);
  //     }
  //   };

  //   fetchUsersAndGroups();
  // }, [currentUser.userId, groups]);


  /*********Recent***********************/ 
  //  useEffect(() => {
  //   const fetchUsersAndGroups = async () => {
  //     try {
  //       const app = getFirebaseApp();
  //       const db = getFirestore(app);

  //       // Fetch users
  //       const usersRef = collection(db, 'users');
  //       const usersSnapshot = await getDocs(usersRef);
  //       const fetchedUsers = usersSnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       const filteredUsers = fetchedUsers.filter(user => user.userId !== currentUser.userId);

  //       // Fetch groups and filter based on current user's membership
  //       const groupsRef = collection(db, 'groups');
  //       const groupsSnapshot = await getDocs(groupsRef);
  //       let fetchedGroups = groupsSnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));

  //       // Filter groups to include only those where currentUser is a member
  //       fetchedGroups = fetchedGroups.filter(group => group.members.includes(currentUser.userId));

  //       // Fetch last message for each user and group
  //       const usersWithLastMessage = await Promise.all(filteredUsers.map(async user => {
  //         const chatId = generateChatId(currentUser.userId, user.userId);
  //         const lastMessage = await fetchLastMessage(db, chatId, false);
  //         return { ...user, lastMessage };
  //       }));

  //       const groupsWithLastMessage = await Promise.all(fetchedGroups.map(async group => {
  //         const lastMessage = await fetchLastMessage(db, group.id, true);
  //         return { ...group, lastMessage };
  //       }));

  //       setUsers(usersWithLastMessage);
  //       setGroups(groupsWithLastMessage);
  //     } catch (error) {
  //       console.error("Error fetching users and groups:", error);
  //     }
  //   };

  //   fetchUsersAndGroups();
  // }, [currentUser.userId,groups]);

  useEffect(() => {
    const fetchUsersAndGroups = async () => {
      try {
        const app = getFirebaseApp();
        const db = getFirestore(app);

        // Fetch users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const fetchedUsers = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const filteredUsers = fetchedUsers.filter(user => user.userId !== currentUser.userId);

        // Fetch groups and filter based on current user's membership
        const groupsRef = collection(db, 'groups');
        const groupsSnapshot = await getDocs(groupsRef);
        let fetchedGroups = groupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filter groups to include only those where currentUser is a member
        fetchedGroups = fetchedGroups.filter(group => group.members.includes(currentUser.userId));

        // Fetch last message for each user and group
        const usersWithLastMessage = await Promise.all(filteredUsers.map(async user => {
          const chatId = generateChatId(currentUser.userId, user.userId);
          const lastMessage = await fetchLastMessage(db, chatId, false);
          return { ...user, lastMessage };
        }));

        const groupsWithLastMessage = await Promise.all(fetchedGroups.map(async group => {
          const lastMessage = await fetchLastMessage(db, group.id, true);
          return { ...group, lastMessage };
        }));

        // Combine users and groups, then sort by the last message timestamp
        const combinedData = [...usersWithLastMessage, ...groupsWithLastMessage].sort((a, b) => {
          const aTimestamp = a.lastMessage?.createdAt?.toDate?.() || new Date(0);
          const bTimestamp = b.lastMessage?.createdAt?.toDate?.() || new Date(0);
          return bTimestamp - aTimestamp;
        });

        setUsers(combinedData);
        setFilteredUsers(combinedData);
      } catch (error) {
        console.error("Error fetching users and groups:", error)
      }
    };

    fetchUsersAndGroups();
  }, [currentUser.userId,users, groups]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        const filteredUsersList = users.filter(user =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredGroupsList = groups.filter(group =>
          group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredUsersList);
        setFilteredGroups(filteredGroupsList);
      } else {
        setFilteredUsers(users);
        setFilteredGroups(groups);
      }
    }, 300); // Adjust the timeout duration as needed

    return () => clearTimeout(timeoutId);
  }, [searchTerm, users, groups]);

  // Utility function to fetch the last message
  const fetchLastMessage = async (db, chatId, isGroup) => {
    const collectionPath = isGroup ? `groups/${chatId}/messages` : `chats/${chatId}/messages`;
    const lastMessageQuery = query(collection(db, collectionPath), orderBy('createdAt', 'desc'), limit(1));
    const lastMessageSnapshot = await getDocs(lastMessageQuery);
    const lastMessage = lastMessageSnapshot.docs[0]?.data() || { text: "No messages yet" };
    return lastMessage;
  };

   
  const renderItem = ({ item }) => {
    
    const isGroup = !!item.groupName;
    const chatId = isGroup ? item.id : generateChatId(currentUser.userId, item.userId); // Use group id if it's a group
    const chatTitle = item.userName || item.groupName; // Use groupName if it's a group
    // const chatImage = isGroup ? item.chatImage : null;
    const chatImage = isGroup ? item.chatImage : item.profilePicURL;
    const members = isGroup ? item.members : null;
    const otherUserId = item.userId;
    const navigationParams = isGroup
      ? { chatId, chatTitle, chatImage, members, isGroup: true }
      : { chatId, chatTitle, chatImage, otherUserId: item.userId, isGroup: false ,otherUserId};
    return (
     
        <UserList chatTitle={chatTitle} chatImage={chatImage} isGroupChat={isGroup} lastMessage={item.lastMessage ? item.lastMessage.text : "No messages yet"}
        onPress={() => props.navigation.navigate('Chat', navigationParams)}/>
      
    );
  };
 
  return (
    <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 10 }}  >


      <SafeAreaView style={{ paddingHorizontal: 25, marginTop: top + 30 }}>
        <CustomSearch placeholder='Search User' onChangeText={setSearchTerm}  />

      </SafeAreaView>
 

     

      
<FlatList
        // data={[...users, ...groups]}
        data={[...filteredUsers, ...filteredGroups]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 25 }}
    
      />


    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({})