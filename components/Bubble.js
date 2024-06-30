import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontSize } from '../theme'

const Bubble = (props) => {
    const { text, type,name,profile } = props;

    console.log(profile);

    const bubbleStyle = { ...styles.textContainer };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle }

    switch (type) {
        
        case "myMessage":
           
            bubbleStyle.backgroundColor = Color.colorDarkslateblue;

            bubbleStyle.width = 274;
            bubbleStyle.borderTopLeftRadius = 30;
            bubbleStyle.borderTopRightRadius = 30;
            bubbleStyle.borderTopLeftRadius = 30;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.justifyContent = 'center';
            bubbleStyle.padding = 17;
            textStyle.  color = Color.colorWhite;
            wrapperStyle.marginVertical = 30;
            wrapperStyle.marginHorizontal = 9;
            wrapperStyle.flexDirection = 'row-reverse';
            break;
        case "theirMessage":
           
        bubbleStyle.backgroundColor = Color.colorGray_200;
        bubbleStyle.width = 274;

        bubbleStyle.borderTopLeftRadius = 30;
        bubbleStyle.borderTopRightRadius = 30;
        bubbleStyle.borderBottomRightRadius = 30;
        bubbleStyle.alignItems = 'center';
        bubbleStyle.justifyContent = 'center';
        bubbleStyle.padding = 17;
        textStyle.  color = Color.colorGray_100;
        textStyle.fontSize = FontSize.size_smi;
        textStyle.lineHeight = 20;
        wrapperStyle.flexDirection = 'row';
        wrapperStyle.alignItems = 'center';
        wrapperStyle.columnGap = 13;
        wrapperStyle.marginHorizontal = 9;
            break;

        default:
            break;
    }

    return (
        
<>
            <View style={styles.chatBox}>
                <View style={styles.user}>
                    <Image source={require('../assets/img/user.jpg')} style={styles.profileImg} />
                    <Text style={styles.username}>Arlene McCoy</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hey, guess what? I just got tickets to the upcoming Starlight Symphony concert!</Text>
                </View>
            </View>


            <View style={[styles.chatBox, styles.otherChatBox]}>
            <View style={styles.user}>
                    <Image source={require('../assets/img/user.jpg')} style={styles.profileImg} />
                    <Text style={styles.username}>Arlene McCoy</Text>
                </View>
                <View style={styles.textContainerOther}>
                    <Text style={[styles.text, styles.other]}>Hey, guess what? I just got tickets to the upcoming Starlight Symphony concert!</Text>
                </View>
            </View>

            
              {/* <View style={wrapperStyle}>
                <View style={styles.user}>
                {props.isGroupChat &&  <Image source={{uri: profile}} style={styles.profileImg} />}    
                    <Text style={styles.username}>{name}</Text>
                </View>
                <View style={bubbleStyle}>
                    <Text style={textStyle}>{text}</Text>
                </View>
            </View>   */}
        </>


             
         
    )
}


export default Bubble

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: Color.colorGray_200,
        width: 274,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17
    },
    textContainerOther: {
        backgroundColor: Color.colorDarkslateblue,

        width: 274,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17



    },

    text: {
        color: Color.colorGray_100,
        fontSize: FontSize.size_smi,
        lineHeight: 20

    },
    other: {
        color: Color.colorWhite
    },

    profileImg: {
        height: 25,
        width: 25,
        borderRadius: 50
    },
    username: {
        color: Color.colorGray_100,
        fontSize: 7
    },
    chatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 13,
        marginHorizontal: 9
    },
    user: {
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 7,

    },
    otherChatBox: {
       marginVertical: 30,
       marginHorizontal: 9,
        flexDirection: 'row-reverse'
    }
})