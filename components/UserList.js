import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../theme'
import ProfileImage from './ProfileImage'

const UserList = ({   chatTitle , chatImage,isGroupChat,onPress, lastMessage }) => {
 
  
  return (
    <View style={styles.rootContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ width: '100%',  flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
          
         {isGroupChat   ?  
              <View>
                  {chatImage ? (
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
          
              <View>

                  <ProfileImage uri={chatImage}   height={60} width={60} /> 
              </View> }
            {/* )
          } */}
          <View >
            <Text style={styles.userName}>{chatTitle}</Text>
              <Text style={styles.userMessage}>{lastMessage.substring(0, 10)}</Text> 
          </View>

         
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default UserList

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    





  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,

  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  userName: {
    fontSize: FontSize.size_lg,
    color: Color.colorWhite
  },
  userMessage: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_100
  },
  notificationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 8
  },
  time: {
    fontSize: FontSize.size_xsm,
    color: Color.colorGray_100
  },
  notificationBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: Color.colorDarkslateblue
  },
  notificationNumber: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xsm,
  },

  addUser: {
    color:Color.colorLightslateblue
  },
  active: {
    color:Color.colorDarkslateblue
  }
})