import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { getFirebaseApp } from "../firebaseHalper";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateEmail, sendEmailVerification, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


import { authenticate, logout } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "./userActions";

import { getFirestore, doc, setDoc, updateDoc, getDoc, ref } from "firebase/firestore";

export const signUp = (email,
    userName,
    city,
    password,
    confirmPassword) => {
    return async dispatch => {
        const app = getFirebaseApp()
        const auth = getAuth(app)


        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const { uid, stsTokenManager } = result.user

            const { accessToken, expirationTime } = stsTokenManager;

            const expiryDate = new Date(expirationTime)

            const userData = await createUser(email, userName, city, uid)
            dispatch(authenticate({ token: accessToken, userData, isNewUser: true }))
            saveDataToStorage(accessToken, uid, expiryDate)
            await storePushToken(userData);
        } catch (error) {
            console.log(error);
            const errorCode = error.code

            let message = "Something went wrong"
            if (errorCode === "auth/email-already-in-use") {
                message = "This email already in use"
            }
            throw new Error(message)
        }
    }
}


const saveDataToStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() }))
}


export const login = (email, password) => {
    return async dispatch => {
        const app = getFirebaseApp();
        const auth = getAuth(app)

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const { uid, stsTokenManager } = result.user

            const { accessToken, expirationTime } = stsTokenManager;

            const expiryDate = new Date(expirationTime)

            const userData = await getUserData(uid)
            dispatch(authenticate({ token: accessToken, userData, isNewUser: false }))
            saveDataToStorage(accessToken, uid, expiryDate)
            await storePushToken(userData);

        } catch (error) {

            const errorCode = error.code

            let message = "Something went wrong"
            if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                message = "The username or password was incorrect";
            }
            throw new Error(message)
        }
    }
}

export const userLogOut = (userData) => {
    return async (dispatch) => {
        try {
            // Clear async storage
            await AsyncStorage.clear();

            // Dispatch logout action to clear user state
            dispatch(logout(userData));

            // Optional: Navigate to the login screen or reset the navigation stack
            //   navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (error) {
            console.error("Error during logout:", error);
            // Handle error, maybe display a message
        }
    }
}


const createUser = async (email, userName, city, userId) => {
    const userData = {
        email,
        userName,
        city,
        userId,
        bio: "",
        profilePicURL: "",
        followers: [],
        following: [],
        Subscribers: [],
        rank: 0,
        NumberOfReports: 0,
        signUpDate: new Date().toISOString()
    }


    const app = getFirebaseApp();
    const db = getFirestore(app);

    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    return userData;

}

export const updateUserData = async (userId, newData) => {


    const app = getFirebaseApp();
    const db = getFirestore(app);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, newData);
}





export const updateUserEmail = async (email, newEmail, password) => {
    console.log(email, newEmail, password);
    const app = getFirebaseApp()
    const auth = getAuth(app)

    try {
        if (auth.currentUser === null) return;

        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        // Update the email after successful reauthentication
        await updateEmail(auth.currentUser, newEmail);

        // Send email verification to the new email
        await sendEmailVerification(auth.currentUser);
        console.log(
            `A verification email has been sent to your new email address ${newEmail}!. Please verify your email to login.`
        );
    } catch (error) {
        console.error(error);
    }

}

const storePushToken = async (userData) => {
    if (!Device.isDevice) {
        console.log('Must use physical device for Push Notifications');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = doc(db, 'users', userData.userId);

    await updateDoc(userRef, {
        pushToken: token
    });

    console.log('Push token stored:', token);
};

 