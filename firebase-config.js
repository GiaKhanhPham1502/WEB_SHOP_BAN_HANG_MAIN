// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD1iP6dWqo2QJmS0UN_mupi_pc2i2Uruo",
    authDomain: "spck-42f86.firebaseapp.com",
    projectId: "spck-42f86",
    storageBucket: "spck-42f86.firebasestorage.app",
    messagingSenderId: "815290393992",
    appId: "1:815290393992:web:8453b044acc0ef9a8b063d",
    measurementId: "G-EGNHRKRXHN"
};

const firebaseConfig2 = {
    apiKey: "AIzaSyAy3E6W18XpdwatHykZ13SHDk-LZTxcJgY",
    authDomain: "school-management-9be49.firebaseapp.com",
    databaseURL: "https://school-management-9be49-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "school-management-9be49",
    storageBucket: "school-management-9be49.appspot.com",
    messagingSenderId: "124556711513",
    appId: "1:124556711513:web:60e309ecd813394efb4348",
    measurementId: "G-K21GLE45GZ"
};

const app2 = initializeApp(firebaseConfig2, 'app2');
const storage = getStorage(app2);

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'app1');
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add data to Firestore
export async function addUserToFirestore(data) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...data,
            createdAt: new Date(),
        });
        console.log("Document written with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
}

// Get data from Firestore
export async function getUsersFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting documents:", error);
        throw error;
    }
}

export async function handleSignIn(email, password) {
    try {
        const users = await getUsersFromFirestore();
        const user = users.find((user) => user.email === email && user.password === password);
        return user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

export async function addBookToFirestore(data) {
    try {
        const docRef = await addDoc(collection(db, "books"), {
            ...data,
            createdAt: new Date(),
        });
        console.log("Document written with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
}

// Get data from Firestore
export async function getBooksFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "books"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error getting documents:", error);
        throw error;
    }
}

// Register user with email and password
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

// Login user with email and password
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

// Login with Google
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const users = await getUsersFromFirestore();
        const user = users.find((user) => user.email === result.user.email);
        if (user) {
            return user;
        } else {
            await addUserToFirestore({
                fullName: result.user.displayName || "",
                email: result.user.email,
                password: "123456",
                role: "User",
            });
            return user;
        }
    } catch (error) {
        console.error("Error logging in with Google:", error);
        throw error;
    }
}

// Logout user
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

// Monitor Auth State
export function onAuthChange(callback) {
    onAuthStateChanged(auth, callback);
}


export function uploadFile(file) {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.error("Error uploading file:", error);
            throw error;
        },
        async () => {
            try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                return downloadURL;
            } catch (error) {
                console.error("Error uploading file:", error);
                throw error;
            }
        }
    );
}

// Delete file from Firebase Storage
export async function deleteFileByUrl(imageUrl) {
    try {
        const urlObj = new URL(imageUrl);
        const path = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
        console.log("File deleted successfully!");
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}