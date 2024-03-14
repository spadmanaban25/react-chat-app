import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
    apiKey: "AIzaSyBZrYLTqa2SCezonJFNcWryeQ4Y_w2yhPQ",
    authDomain: "reactchatproject2024.firebaseapp.com",
    databaseURL: "https://reactchatproject2024-default-rtdb.firebaseio.com",
    projectId: "reactchatproject2024",
    storageBucket: "reactchatproject2024.appspot.com",
    messagingSenderId: "196917599617",
    appId: "1:196917599617:web:ddcd1bec7046f647bd9c80"
};

firebase.initializeApp(config);
// export const auth = getAuth(app);
// export const database = getDatabase(app);

export {firebase};