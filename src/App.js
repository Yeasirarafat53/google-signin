import './App.css';
// step -3
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

import { useState } from 'react';

// step-4
firebase.initializeApp(firebaseConfig);

function App() {
  // step-8
  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''

  })

// step-5
  const googleProvider = new firebase.auth.GoogleAuthProvider();
// step-7
  const handleSignin = ()=>{
    
    firebase.auth().signInWithPopup(googleProvider)
    .then(res =>{
      console.log(res);
      const {displayName,email,photoURL} = res.user;
      // step-9
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email: email,
        photo:photoURL
      }
      setUser(signedInUser)
      // ..........

      console.log(displayName,email,photoURL);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

// step-10
  const handleSignOut = () => {
    // console.log("sign out");
    firebase.auth().signOut()
    .then(res=>{
      const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      setUser(signedOutUser);
      
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }

  return (
    <div className="App">
      {/* step-6 */}

      { user.isSignedIn ? <button onClick={handleSignOut}>sign out</button> :
        <button onClick={handleSignin}>sign in</button>
      }



      {/* {
        user.isSignedIn && <div> 
        
        <p>Welcome, {user.name}</p>
        <p>Email: {user.email}</p>
        <img src={user.photo} alt="" />

        </div>
      } */}

    </div>
  );
}   

export default App;
