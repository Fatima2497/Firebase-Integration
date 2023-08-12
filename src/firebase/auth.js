"use client"
import { onAuthStateChanged, signOut as authSignOut }  from "firebase/auth";
import { useContext, useEffect, useState, createContext }  from "react";
import { auth }  from "./firebase";

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true
})

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    const clear = () => {
        setAuthUser(null)
        setisLoading(false)
    }
    const AuthStateChanged = async (user) => {
        setisLoading(true)
        if(!user){
            clear()
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName
        })
        setisLoading(false)
    }

    const signOut = () => {
        authSignOut(auth).then(()=> clear())
    }

    useEffect(()=>{
        const unsubscribe  = onAuthStateChanged(auth,AuthStateChanged)
        return () => unsubscribe
    },[])

    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut
    }
}

export const AuthUserProvider = ({ children }) => {

    const auth = useFirebaseAuth()
    return(
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    )
}

export const useAuth = () => useContext(AuthUserContext)