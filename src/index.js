import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBEoLUt8FXMzhYLsbWjtPwOz3EhvGBkUQM",
  authDomain: "fir-9-c3738.firebaseapp.com",
  projectId: "fir-9-c3738",
  storageBucket: "fir-9-c3738.appspot.com",
  messagingSenderId: "996076587116",
  appId: "1:996076587116:web:60e295570537c14f4e3049"
};
initializeApp(firebaseConfig)


//init the services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

//get the collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id:doc.id})
    })
    console.log(books)
  })
  .catch((err) => {
      console.log(err.message)
  })
