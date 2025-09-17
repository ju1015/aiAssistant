import React, { createContext } from 'react'
export const UserDataContext=createContext()

function UserContext({children}) {
    const serverUrl="http://localhost:3000"
    const val={
        serverUrl
    }
  return (
    <div>
        <UserDataContext.Provider value={val}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
