/**Dependencies */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
/**Context */
import { UserContext } from "../../../../user/UserProvider";
/**Sources */
import logout from "./logout.svg"
import back from "./back.svg"
import { auth } from "../../../../firebaseService/firebase"
import { signOut } from 'firebase/auth';
import { getUserTweets, getFavoritesTweet } from "../../../../functionalities/funcionalities"
import { getUserData } from '../../../../user/UserDataSession';
/**Component */
import TweetCard from '../TweetCard';
/**Style */
import "./userprofile.css"

export default function UserProfile() {
    const { user, setUser } = React.useContext(UserContext)
    const navigate = useNavigate();
    const [myTweets, setMyTweets] = useState([])
    const [favoritesTweet, setFavoritesTweet] = useState([])
    const [post, setPost] = useState(true)
    const [favorites, setFavorites] = useState(false)
    const [userData, setUserData] = useState({
        color: "red"
    })
    const estiloBasebg = "bg-user-data-color";
    const estiloDinamicobg = userData.color ? userData.color : "";
    const borderbase = "border-base"
    const bordeDinamico = userData.color ? userData.color : ""

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
        setPost(true)
        setFavorites(false)
    }

    function handlerFavorites() {
        setPost(false)
        setFavorites(true)
    }
    useEffect(async () => {
        if (post) {
            await getUserTweets(setMyTweets, user.uid)
        } else if (favorites) {
            await getFavoritesTweet(user.uid, setFavoritesTweet)
        }
        await getUserData(user.uid, setUserData)

    }, [myTweets, user, favoritesTweet, post, favorites, userData])

    return (

        <>
            <div className="header-userProfile">
                <div className="nav-container-userProfile">
                    <div className='userName-container'>
                        <img id="back" src={back} alt="<" onClick={() => navigate("/feed")} />
                        <span>{userData.userName}</span>
                    </div>
                    <button type='button' className='btn-logout' onClick={logoutSession}>
                        <p>logout</p>
                        <img id="logout-icon" src={logout} alt="logout" />
                    </button>
                </div>
            </div>
            <div className='info-userPerfil'>
                <img className={borderbase + " " + bordeDinamico} src={user.photoURL} alt="photo perfil" />
                <p className={estiloBasebg + " " + estiloDinamicobg}>{user.displayName}</p>
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

