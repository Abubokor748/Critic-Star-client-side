import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    
  // Email-password authentication
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Login for existing accounts
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("Google Login Successful:", result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        setLoading(false);
      });
  };

    // update profile
    const updateUserProfile = async (updatedData) => {
      if (!auth.currentUser) {
        throw new Error("No user is currently logged in.");
      }
  
      try {      
        await updateProfile(auth.currentUser, updatedData);
  
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedData,
        }));
  
        console.log("Profile updated successfully:", updatedData);
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    };
    


  
  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    updateUserProfile,
    loginWithGoogle,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
