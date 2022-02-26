import { initializeApp } from 'firebase/app'
import {
  //initializes the service of the firestore
  getFirestore, // takes 0 args

  // gets the reference to a collection 
  collection,  //2 args (database, collection_name)

  //gets a snapshot of the database and is ran once every time the page is loaded
  getDocs, // takes 1 arg  (collection_Ref)

  //gets the reference of a single document
  doc, //takes 3 args (db, collection_name, doc_Id)

  //adds a document to the collection
  addDoc, //takes 2 args (collection_Ref, Doc_Object)

  //deletes a document from a collection
  deleteDoc, //takes 1 arg (doc_ref)

  //acts as a watch() by listeniing to any change
  onSnapshot, //takes 2 args
  
  query, where
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
/* 
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

*/

//add a user

const addForm = document.querySelector('.add')
addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addForm.title.value,
    author: addForm.author.value
  })
    .then(() => {
      addForm.reset()
    })
})

//deleting a user

const deleteForm = document.querySelector('.delete')
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // doc reference
  const docRef = doc(colRef, deleteForm.id.value)
  deleteDoc(docRef)
    .then(() => {
      deleteForm.reset()
    })
})

//real time subscription on database
onSnapshot(colRef, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})
