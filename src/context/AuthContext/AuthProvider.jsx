import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();                        //firebase provider for google login

    //register function
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword( auth, email, password);
    }

    //login with email and password function
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword( auth, email, password );
    }

    //google login function
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup( auth, googleProvider);
    }

    //user observer
    useEffect( () => {

        // mount
        const unSubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        //unmount
        return () => {
            unSubscribe();
        }
    }, [])

    //logout function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //profile updating function
    const updateUserProfile = (profile) => {
        return updateProfile( auth.currentUser, profile)
    }

    const authInfo = {
        registerUser,
        signInUser,
        signInGoogle,
        user,
        loading,
        setLoading,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;