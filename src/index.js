import { initializeApp } from 'firebase/app'
import {
  //initializes the service of the firestore
  getFirestore, // takes 0 args

  // gets the reference to a collection 
  collection,  //2 args (database, collection_name)

  //gets a snapshot of the database and is ran once every time the page is loaded
  getDocs, // takes 1 arg  (collection_Ref)

  getDoc,// fetches a single document

  //gets the reference of a single document
  doc, //takes 3 args (db, collection_name, doc_Id)

  //adds a document to the collection
  addDoc, //takes 2 args (collection_Ref, Doc_Object)

  //deletes a document from a collection
  deleteDoc, //takes 1 arg (doc_ref)

  //acts as a watch() by listeniing to any change
  onSnapshot, //takes 2 args

  query,  //takes 2 args (colRef, where())
   where, //takes basiclly 3 args (prop, condition, value)

  orderBy, // takes 2 args (prop, order)
  serverTimestamp, 

  updateDoc //
} from 'firebase/firestore'
import {
  getAuth, //Authentification service
  createUserWithEmailAndPassword, //creating account with
  signInWithEmailAndPassword,
  deleteUser,
  signOut //logging out
}
from 'firebase/auth'

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
const auth = getAuth()

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
    author: addForm.author.value,
    createdAt: serverTimestamp()
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

//query and ordering 
const q = query(colRef, where('author','==', 'Fru Boris'), orderBy('title', 'desc'))

//real time subscription on database
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

//fetch single document
/*const docRef = doc(colRef, 'F9u2h1v02XRYiyUMv8')
getDoc(docRef)
.then((doc)=>{
  console.log(doc.data(), doc.id)
})
*/

//listener for a single document
{
  const docRef = doc(colRef, 'F9u2h1v02XRYiyUMv8')
getDoc(docRef)
onSnapshot(docRef,(doc)=>{
  console.log(doc.data(), doc.id)
})
}

//updating document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const docRef = doc(colRef, updateForm.id.value)
  updateDoc(docRef, { 
    title: 'Titan 3'
  })
  .then(()=>{
    updateForm.reset()
  })
  
})

//user query
const createUser = document.querySelector('.createUser')
createUser.addEventListener('submit', (e)=>{
  e.preventDefault()

 const email = createUser.email.value
 const password = createUser.password.value

  //Creating or signing users
  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log("User created:", cred.user)
    createUser.reset()
  })
  .catch((err) => {
    console.log(err.message) 
    
  })
})

//logout
const logout = document.querySelector('.logout')
logout.addEventListener('click', ()=>{


  signOut(auth)
  .then(()=>{
    console.log("user logged Out")
  }).catch(err => console.log(err.message))
})

//login user query
const login = document.querySelector('.login')
login.addEventListener('submit', (e)=>{
  e.preventDefault()
 let email = login.email.value
 let password = login.password.value

  //login
  signInWithEmailAndPassword(auth, email, password)
  .then((cred)=>{
    console.log("User Logged In:", cred.user)
    login.reset()
  })
  .catch((err)=>{
    console.log(err.message)
  })
})
