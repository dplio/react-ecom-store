import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9qilTM7uf46LT9x_VLB8iCIYolCmP5pI",
  authDomain: "react-ecom-store-db.firebaseapp.com",
  databaseURL: "https://react-ecom-store-db.firebaseio.com",
  projectId: "react-ecom-store-db",
  storageBucket: "react-ecom-store-db.appspot.com",
  messagingSenderId: "852356052169",
  appId: "1:852356052169:web:f2ee580166abb2df8f0918",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// use this to programmatically add collections and documents to firestore project
// e.g. from a js object like with shop.data.js

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // use firestore.batch to set multiple documents to a collection in one go
  const batch = firestore.batch();
  objectsToAdd.forEach((object) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit();
};

// using this to convert firestore data to format we can consume
// i.e. data normalization
export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  // console.log(collectionsSnapshot);
  const transformedCollections = collectionsSnapshot.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // console.log(transformedCollections);
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    // console.log(accumulator);
    return accumulator;
  }, {});
  // i.e. return 1 object with collections keys like: {jackets:{...}, mens:{...}}
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
