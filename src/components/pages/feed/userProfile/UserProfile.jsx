import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
/** Style */
import "./userprofile.css"
import logout from "./logout.svg"
import back from "./back.svg"
import { UserContext } from "../../../../user/UserProvider";
import { auth } from "../../../../firebaseService/firebase"
import { signOut } from 'firebase/auth';
import TweetCard from '../TweetCard';

/** Components */

import { getUserTweets, getFavoritesTweet } from "../../../../functionalities/funcionalities"
export default function UserProfile() {

    const { user, setUser } = React.useContext(UserContext)
    const navigate = useNavigate();
    const [myTweets, setMyTweets] = useState([])
    const [favoritesTweet, setFavoritesTweet] = useState([])
    const [post, setPost] = useState(false)
    const [favorites, setFavorites] = useState(false)
    function logoutSession() {
        signOut(auth).then(() => {
            navigate("/")
            setUser({
                uid: null,
                photoURL:
                    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",

            })
        })
    }

    function handlerPost() {
        console.log("Se muestran post mios");
        setPost(true)
        setFavorites(false)
    }
    function handlerFavorites() {
        console.log("Se muestran post favoritos :D");
        setPost(false)
        setFavorites(true)
    }

    /** Consulta a firebase */
    useEffect(() => {
        getUserTweets(setMyTweets, user.uid)
        getFavoritesTweet(user.uid, setFavoritesTweet)


    }, [myTweets, user, favoritesTweet])


    return (

        <>
            <div className="header-userProfile">
                <div className="nav-container-userProfile">
                    <div className='userName-container'>
                        <img id="back" src={back} alt="<" onClick={() => navigate("/feed")} />
                        <span>{user.displayName}</span>
                    </div>

                    <button type='button' className='btn-logout' onClick={logoutSession}>
                        <p>logout</p>
                        <img id="logout-icon" src={logout} alt="logout" />
                    </button>
                </div>
            </div>
            <div className='info-userPerfil'>
                <img id="photo-perfil-profile" src={user.photoURL} alt="photo perfil" />
                <p id='userName-profile'>{user.displayName}</p>
                <p id="email-profile">{user.email}</p>
                <div className='post-container'>
                    <div id='posttweet-container' onClick={handlerPost}>Post</div>
                    <div id='favoritestweet-container' onClick={handlerFavorites}>favorites</div>
                </div>
            </div>
            <section className='seccion-tweets'>
                <div className='seccionTweets-container'> {post ? myTweets.map((tweet) => { return <TweetCard tweet={tweet} key={tweet.id} />; }) : ""}
                    {favorites ? favoritesTweet.map((tweet) => { return <TweetCard tweet={tweet} key={tweet.id} /> }) : ""}
                </div>

            </section>
        </>
    )
}

