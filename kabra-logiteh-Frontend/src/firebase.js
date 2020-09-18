import firebase from "firebase";

const config ={

    apiKey: "AIzaSyBBA1CCvUWjViUQcsGgU2HlQckKNdCPBOE",
    authDomain: "listnr-d69e6.firebaseapp.com",
    databaseURL: "https://listnr-d69e6.firebaseio.com",
    projectId: "listnr-d69e6",
    storageBucket: "listnr-d69e6.appspot.com",
    messagingSenderId: "326684995393",
    appId: "1:326684995393:web:ffb8fb67cb03b4c2897bc0",
    measurementId: "G-V8JC96P3B5"
}
 firebase.initializeApp(config)
 const storage = firebase.storage();

export {
    storage, firebase as default
}