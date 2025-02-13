import { createContext, useContext } from "react"
import { db } from "@/config/Config"

const DBContext = createContext(db)

// wrapping our app with db provider
export let DBProvider = ({children}: {children: React.ReactNode}) => {
    return <DBContext.Provider value={db}>{children}</DBContext.Provider>
}

// function to get db instance
export let useDB = () => {
    return useContext(DBContext)
}
