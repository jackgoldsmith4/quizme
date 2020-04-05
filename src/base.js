import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCeIqhsxuHUgUKmLgtj3GQCVZc0MWlUSx4",
    authDomain: "quizme-a7af7.firebaseapp.com",
    databaseURL: "https://quizme-a7af7.firebaseio.com",
    projectId: "quizme-a7af7",
    storageBucket: "quizme-a7af7.appspot.com",
};

var init = firebase.initializeApp(config);
var db = init.database();

export default db;