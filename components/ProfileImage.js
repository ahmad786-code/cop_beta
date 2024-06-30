import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import { launchImagePicker, uploadImageAsync } from '../utils/imagePickerHelper'
import userImage from '../assets/img/userImage.jpeg'
import { updateUserData } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { updateLoginUserData } from '../store/authSlice'
import { Color } from '../theme'
import { updateChatData } from '../utils/actions/chatActions'

const ProfileImage = props => {
    const dispatch = useDispatch();
    const imageSource = props.uri ? { uri: props.uri } : userImage;
 
    const [image, setImage] = useState(imageSource)
    const [isLoading, setIsLoading] = useState(false);

    const showEditButton = props.showEditButton && props.showEditButton === true

    const userId = props.userId
    const chatId = props.chatId

    // const imagePick = async () => {


    //     try {
    //         setIsLoading(true);
    //         const tempUri = await launchImagePicker()
    //         setIsLoading(false);

    //         if (!tempUri) return

    //         const uploadUrl = await uploadImageAsync(tempUri, chatId !== undefined)

    //         if (!uploadUrl) {
    //             throw new Error("not upload image")
    //         }

    //         if(chatId) {
    //             await updateChatData(chatId, userId, {chatImage: uploadUrl})
    //         } else {
    //             const newData = { profilePicURL: uploadUrl }


    //             await updateUserData(userId, newData)
    //             dispatch(updateLoginUserData({ newData }));
    //         }

         

    //         setImage({ uri: uploadUrl })

    //     } catch (error) {
    //         console.log(error);
    //         setIsLoading(false);
    //     }
    // }

    const imagePick = async () => {
        try {
            setIsLoading(true);
            const tempUri = await launchImagePicker();
            setIsLoading(false);

            if (!tempUri) return;

            const uploadUrl = await uploadImageAsync(tempUri, chatId !== undefined);

            if (!uploadUrl) {
                throw new Error("Image not uploaded");
            }

            if (chatId) {
                await updateChatData(chatId, userId, { chatImage: uploadUrl });
            } else {
                const newData = { profilePicURL: uploadUrl };
                await updateUserData(userId, newData);
                dispatch(updateLoginUserData({ newData }));
            }

            setImage({ uri: uploadUrl });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const Container = showEditButton ? TouchableOpacity : View 
    return (
        <Container onPress={imagePick} style={{ alignItems: 'center', position: 'relative' }}>
            {isLoading ? <ActivityIndicator size='small' color={Color.colorDarkslateblue} /> : (
                <>
                {showEditButton && !isLoading &&
                    <View style={{ position: 'relative' }}>
                        <Image source={require('../assets/app_icon/my-account/pp-background.png')} style={{ width: 140, height: 140 }} />
                    </View> }
                    <View  style={ showEditButton && !isLoading && {  position: 'absolute', top: 30, right: 30, }}>
                        <Image source={image} style={{ width: props.width, height: props.height, borderRadius: 100 }} />
                    </View>
                    {showEditButton && !isLoading &&
                        <View style={{ width: 95, height: 95, borderRadius: 100, position: 'absolute', backgroundColor: '#783F8E', opacity: 0.67, top: 30, right: 30 }} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: ' 100%' }}>
                                <Image source={require('../assets/app_icon/my-account/change-pp.png')} style={{ width: 34, height: 32.03 }} />
                            </View>
                        </View>}
                </>
            )}

        </Container>
    )
}

export default ProfileImage

