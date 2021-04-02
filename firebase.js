import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBvgZ4JY0yOsfWagnFkOlD0-syrKwipfac',
  authDomain: 'chat-application-ab9a3.firebaseapp.com',
  projectId: 'chat-application-ab9a3',
  storageBucket: 'chat-application-ab9a3.appspot.com',
  messagingSenderId: '273739255814',
  appId: '1:273739255814:web:587a2eee4eab5cd3497387',
};

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
