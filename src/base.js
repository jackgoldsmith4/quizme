import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCeIqhsxuHUgUKmLgtj3GQCVZc0MWlUSx4",
    authDomain: "quizme-a7af7.firebaseapp.com",
    databaseURL: "https://quizme-a7af7.firebaseio.com",
    projectId: "quizme-a7af7",
    storageBucket: "quizme-a7af7.appspot.com",
    messagingSenderId: "469647071088",
    appId: "1:469647071088:web:e9f0314e89250590a461b5",
    measurementId: "G-LCF4VGDWW4"
};

var base = firebase.initializeApp(config);
export default base;