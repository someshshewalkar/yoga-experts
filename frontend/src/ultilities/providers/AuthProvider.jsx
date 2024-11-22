import React, { createContext, useEffect, useState } from "react";
import { app } from "../../config/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
// import app from '../../config/firebase.init'


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loder, setLoder] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth(app);

  //signup new user
  const signUp = async (email, password) => {
    try {
      setLoder(true);
      return await createUserWithEmailAndPassword(auth, email, password)
    //   .then(
    //     (userCredential) => {
    //       // Signed up
    //       const user = userCredential.user;
    //       // ...
    //     }
    //   );
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //login user
const login =async (email,password)=>{
    try{
        setLoder(true);
        return signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   const user = userCredential.user;
        //   // ...
        // })

    }catch (error) {
        setError(error.code);
        throw error;
      }
}

//logout user
const logout = async ()=>{
    try{
        return await signOut(auth)

    }catch (error) {
        setError(error.code);
        throw error;
      }
}

//update user profile
 const updateUser = async(name,photo)=>{
    try{
        return await updateProfile(auth.currentUser, {
              displayName: name , photoURL: photo
        })
        setUser(auth.currentUser)
    }catch (error) {
        setError(error.code);
        throw error;
      }
    
 }

 // using google login 
 const googleProvider = new GoogleAuthProvider();
 const googleLogin = async()=>{
    try{
        setLoder(true)
        return await signInWithPopup(auth,googleProvider)
        

    }catch (error) {
        setError(error.code);
        throw error;
      }

 }

 //observer for user
 useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
        setUser(user)

        if(user){
            axios.post('http://localhost:5000/api/set-token',{email:user.email, name:user.displayName})
            .then((data) => {
                if(data.data.token){
                    localStorage.setItem('token', data.data.token);
                    setLoder(false)

                }
            }  )
        } else{
            localStorage.removeItem('token')
            setLoder(false)

        }
    })
    return ()=> unsubscribe()
 },[])



  const contextValu = { user, signUp, login, logout, updateUser,googleLogin, error ,setError,loder,setLoder };
  return (
    <AuthContext.Provider value={contextValu}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
