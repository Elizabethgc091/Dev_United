import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
/** Style */
import "./userprofile.css"
import { UserContext } from "../../../../user/UserProvider";
import { auth } from "../../../../firebaseService/firebase"
import { signOut } from 'firebase/auth';

/** Components */
import TweetCardPost from './TweetCardPost';
import TweetCardFavorites from './TweetCardFavorite';

export default function UserProfile() {

    const { user } = React.useContext(UserContext)
    const navigate = useNavigate();
    const [post, setPost] = useState("false")
    const [favorites, setFavorites] = useState("false")

    function logoutSession() {
        signOut(auth).then(() => {
            console.log("Cerrando sesion");
            navigate("/")

        }).catch((error) => {
            console.log(error, "Ocurrio un error");
        })
    }


    return (
        <>
            <div className="header-profile-user">
                <div className="nav-profile-user">
                    <div>{`< ${user.displayName}`}</div>
                    <button type="button" onClick={logoutSession}>logout</button>
                </div>
                <div className='info-perfil'>
                    <div>
                        <img id="photo-perfil-user" src={user.photoURL} alt="" />
                    </div>
                    <span id="userName-perfil">{user.displayName}</span>
                    <span id="email-perfil">{user.email}</span>
                    <div className="container-tweets">
                        <div id='post' onClick={() => setPost(!post)}>post</div>
                        <div id='favorites' onClick={() => setFavorites(!favorites)}>favorites</div>
                    </div>
                </div>

            </div>
            {post && favorites === false ? (

                < div className='post-container'>
                    <TweetCardPost />
                </div>
            ) : ""
            }
            {
                favorites && post === false ? (
                    <div className='post-container'>
                        <TweetCardFavorites />
                    </div>
                ) : ""
            }

        </>
    )
}
