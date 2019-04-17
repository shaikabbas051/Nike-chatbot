
import * as firebase from "firebase";
import { ApiAiClient } from './api-ai-javascript/es6/ApiAiClient';
const accessToken = 'dc77b3336b9d473a90bd5152c51d3c80';
const dialogFlowClient = new ApiAiClient({ accessToken });

const config = {
    apiKey: "AIzaSyB426Tma13KH0QUeVHu7DN-ilwrFhUxmkk",
    authDomain: "nike-15d85.firebaseapp.com",
    databaseURL: "https://nike-15d85.firebaseio.com",
    projectId: "nike-15d85",
    storageBucket: "nike-15d85.appspot.com",
    messagingSenderId: "914099486540"
};

firebase.initializeApp(config);
const myDB = firebase.firestore();
export { dialogFlowClient, myDB };