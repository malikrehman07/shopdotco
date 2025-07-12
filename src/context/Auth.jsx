import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    // ✅ Fetch user using stored token
    const readProfile = useCallback(async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setIsAppLoading(false)
            return
        }
        try {
            const res = await axios.post("https://shop-co-nbni.vercel.app/auth/user", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // login/register success
            // localStorage.setItem("token", res.data.token);

            // ✅ Immediately update AuthContext
            dispatch(s=>({...s, isAuth: true, user: res.data.user,}));

        } catch (error) {
            console.error("Auth failed:", error)
            localStorage.removeItem("token")
        } finally {
            setIsAppLoading(false)
        }
    }, [])

    useEffect(() => {
        readProfile()
    }, [readProfile])

    // ✅ Logout method
    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(initialState)
        window.notify("User Logged Out Successfully", "success")
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout, isAppLoading, readProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
