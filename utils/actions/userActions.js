// import { child, get, getDatabase, ref,query, orderByChild, startAt, endAt } from "firebase/database"
 import { getFirestore, doc, getDoc,    collection, query, where, getDocs, orderBy, startAt, endAt} from "firebase/firestore";
import { getFirebaseApp } from "../firebaseHalper";

export const getUserData = async (userId) => {
    // try {
    //     const app = getFirebaseApp()
    //     const dbRef = ref(getDatabase(app));
    //     const userRef = child(dbRef, `users/${userId}`);

    //     const snapshot = await get(userRef);
    //     return snapshot.val();
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", userId);

        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log(error);
    }
    
}

 
export const searchUser = async (queryText) => {
 
     
    const searchTerm = queryText 

    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const usersCollection = collection(db, "users");

        const usersQuery = query(
            usersCollection,
            orderBy("userName"),
            startAt(searchTerm),
            endAt(searchTerm + "\uf8ff")
        );

        const snapshot = await getDocs(usersQuery);

        if (!snapshot.empty) {
            let results = {};
            snapshot.forEach(doc => {
                results[doc.id] = doc.data();
            });
            return results;
        }

        return {};
    } catch (error) {
        console.log(error);
        throw error;
    }
}
