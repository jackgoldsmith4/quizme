import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCeIqhsxuHUgUKmLgtj3GQCVZc0MWlUSx4",
    authDomain: "quizme-a7af7.firebaseapp.com",
    databaseURL: "https://quizme-a7af7.firebaseio.com",
    projectId: "quizme-a7af7",
    storageBucket: "quizme-a7af7.appspot.com",
};

var app: firebase.app.App = firebase.initializeApp(config);
var db: firebase.firestore.Firestore = app.firestore();

export default db;