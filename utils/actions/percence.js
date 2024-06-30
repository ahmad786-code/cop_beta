 // presence.js
import { ref, onDisconnect, onValue, set } from "firebase/database";
import { doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { getFirebaseApp } from "../firebaseHalper";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const app = getFirebaseApp();
const database = getDatabase(app);
const firestore = getFirestore(app);

const isOfflineForFirestore = {
  online: false,
  lastChanged: serverTimestamp(),
};

const isOnlineForFirestore = {
  online: true,
  lastChanged: serverTimestamp(),
};

export function monitorUserPresence(userId) {
  const userStatusDatabaseRef = ref(database, `/status/${userId}`);
  const userStatusFirestoreRef = doc(firestore, "users", userId);

  const connectedRef = ref(database, '.info/connected');
  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === false) {
      updateDoc(userStatusFirestoreRef, isOfflineForFirestore);
      return;
    }

    onDisconnect(userStatusDatabaseRef).set(isOfflineForFirestore).then(() => {
      set(userStatusDatabaseRef, isOnlineForFirestore);
      updateDoc(userStatusFirestoreRef, isOnlineForFirestore).then(() => {
        console.log("User is online");
      }).catch(error => console.error("Error updating Firestore: ", error));
    }).catch(error => console.error("Error setting onDisconnect: ", error));
  });
}

export function listenToUserStatus(userId, callback) {
  const userDocRef = doc(firestore, "users", userId);
  const unsubscribe = onSnapshot(userDocRef, (doc) => {
    const status = doc.data();
    console.log("Status updated: ", status);
    callback(status);
  }, error => console.error("Error listening to user status: ", error));
  
  return unsubscribe; // Ensure the unsubscribe function is returned
}


