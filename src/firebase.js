
import * as firebase from 'firebase';
 
//insert config from firebase
const config = {
    apiKey: "AIzaSyC07VKS495ZHm0CUsZ9a46LVTTh_v8-zmQ",
    authDomain: "regispromma.firebaseapp.com",
    projectId: "regispromma",
    storageBucket: "regispromma.appspot.com",
    messagingSenderId: "58229178125",
    databaseURL: "https://regispromma.firebaseio.com"
};
firebase.initializeApp(config);

export default firebase;