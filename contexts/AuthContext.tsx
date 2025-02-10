import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User, getAuth } from "firebase/auth";
import { auth } from "@/config/Config"

interface AuthContextType {
    user: User | null
    userEmail: string
    loading: boolean
    logout: () => Promise<void>
}

// all the shiz we need from auth
const AuthContext = createContext<AuthContextType>({
    user: null,
    userEmail: "Guest",
    loading: true,
    logout: async () => {},
})

// wrapping our app with auth provider
export let AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [userEmail, setUserEmail] = useState<string>("Guest")
    const [loading, setLoading] = useState(true)

    // handle auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)

            // get user email for welcome (I'll refactor this at some point)
            if (user && user.email) {
                // maybe stupid but slightly fancy (and probably temporary) code to make a nice username
                const username = user.email.split("@")[0]
                setUserEmail(username)
            } else {
                setUserEmail("Guest")
            }
        })
        return unsubscribe
    }, [])

    // logout function
    const logout = async () => {
        try {
            await signOut(auth)
            console.log("logged out")
        } catch (error) {
            console.error("error logging out: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, userEmail, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// function to get auth stuff
export function useAuth() {
    return useContext(AuthContext)
}
