import React from 'react'
import { UserContext } from "../../../../user/UserProvider";

export default function UserProfile() {
    const { user } = React.useContext(UserContext)
    console.log(user)
    return (
        <div>
            <h1>perfil del usuario {user.displayName} </h1>
        </div>
    )
}
