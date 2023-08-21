// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3aGORDTJrLeUPFEPNM00gGoT_eZ8m26E",
  authDomain: "reactjs-courseudemy.firebaseapp.com",
  projectId: "reactjs-courseudemy",
  storageBucket: "reactjs-courseudemy.appspot.com",
  messagingSenderId: "601173348775",
  appId: "1:601173348775:web:1fa4e52a1b59b9d4f6e682",
};

// untuk CRUD, Authentication etc using code in below
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// disini artinya ketika user ingin login menggunakan google auth
// maka dia harus dikasih pilihan select_account
// jadi ga langsung milih account yg utama
provider.setCustomParameters({
  prompt: "select_account",
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

// untuk add collection/table ke firestore, kasus disini menambah data categories di method products.context
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  // await Promise.reject(new Error("New Error Oops"));

  // untuk mengambil data categories
  const querySnapshot = await getDocs(q);
  // console.log("Category Query Snapshot ", querySnapshot.docs)
  const categoryMap = querySnapshot.docs.map((docSnapshot) =>
    docSnapshot.data()
  );
  console.log(categoryMap);
  return categoryMap;
};

// userAuth mengambil data response google auth berisi name email img etc
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  // getDoc mendapatkan doc atau data dari users berdasarkan uid nya
  const userSnapshot = await getDoc(userDocRef);

  // dicek .exists punya output boolean. kalo datanya tidak ada maka false
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassowrd = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged akan mendapatakan data user setelah login sampai user tersebut logout. jadi ketika refresh browser data tersebut masih ada
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  // Promise merupakan simulasi operasi asyncron dengan mempunyai status resolve jika operasi berhasil reject jika gagal
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
