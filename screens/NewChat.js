import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Button, Pressable, Image, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import UserList from '../components/UserList'

import CustomSearch from '../components/CustomSearch'

import { Color, FontFamily } from '../theme'
import { searchUser } from '../utils/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { setStoredUsers } from '../store/userSlice'




const NewChat = (props) => {
  const dispatch = useDispatch()

  const { top } = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState('anna');
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const userData = useSelector(state => state.auth.userData);


  const isGroupChat = props.route?.params && props.route?.params?.isGroupChat
  const isGroupChatDisabled = selectedUsers.length === 0 || chatName === "";



  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers();
        setNoResultsFound(false);
        return;
      }

      setIsLoading(true);

      const usersResult = await searchUser(searchTerm);
      console.log(usersResult);

      delete usersResult[userData.userId];
      setUsers(usersResult);

      if (Object.keys(usersResult).length === 0) {
        setNoResultsFound(true);
      }
      else {
        setNoResultsFound(false);

        dispatch(setStoredUsers({ newUsers: usersResult }))
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const userPressed = userId => {
    if (isGroupChat) {
      const newSelectedUsers = selectedUsers.includes(userId) ?
        selectedUsers.filter(id => id !== userId) :
        selectedUsers.concat(userId);

      setSelectedUsers(newSelectedUsers);

    } else {
      props.navigation.navigate("Inbox", {
        selectedUserId: userId
      })
    }
  }


  return (
    <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 10 }}  >


      <SafeAreaView style={{ paddingHorizontal: 25, marginTop: top + 30 }}>
        <CustomSearch placeholder='Search User' />
        {isGroupChat &&
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, backgroundColor: Color.colorGray_300, borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20 }}>
            <TextInput
              style={{ flex: 1, paddingHorizontal: 10, color: Color.colorGray_100 }}
              placeholder="Enter a name for your chat"
              placeholderTextColor={Color.colorGray_100}
              onChangeText={text => setChatName(text)}
            />
            <TouchableOpacity disabled={isGroupChatDisabled} onPress={() => {
              props.navigation.navigate("Inbox", {
                selectedUsers,
                ...(isGroupChat && { chatName })
              })
            }}>
              <Text style={{ color: isGroupChatDisabled ? Color.colorLightslateblue : Color.colorDarkslateblue }}>Create</Text>
            </TouchableOpacity>
          </View>
        }

      </SafeAreaView>

      {
        isLoading &&
        <View style={{}}>
          <ActivityIndicator size={'large'} color={Color.colorDarkslateblue} />
        </View>
      }



      {
        !isLoading && !noResultsFound && users &&
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;
            const userData = users[userId];

            return <UserList profile={userData?.profilePicURL
            } title={userData?.userName} onPress={() => userPressed(userId)}
              type={isGroupChat ? "checkbox" : ""}
              isChecked={selectedUsers.includes(userId)}
            />
          }}
        />
      }



    </View>
  )
}

export default NewChat

const styles = StyleSheet.create({})