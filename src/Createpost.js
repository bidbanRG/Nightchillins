import React, {useState,useRef,useContext} from 'react'
import Axios from 'axios';
import {UserContext,UserPost} from './UserContext'
import "./post.css"

function Createpost({onClose}) {
    
    const {setgetPost} = useContext(UserPost);
   const {Person,setPerson} = useContext(UserContext);
  const {Name,ImgUrl} = Person;
 
 const text = useRef("");

 const sendPost = ()=>{
    if(text.current.value.length === 0) {return;}
    setgetPost(text.current.value);
    onClose();
 }

   
    return (
        <div className = "post">
            
            <div className="post-size">
               <header className = "head">
                 <h1> Add a Post</h1>
                 <button onClick = {onClose}> X </button>
              </header> 
                <div className = "head1">
                 <div className="profile-pic1" 
                  style = {{backgroundImage : `url(${ImgUrl})`}}
                 ></div>
                 <h4>{Name}</h4>
               </div>
                  <textarea ref = {text} type = "text" autoFocus  placeholder = "What are you thinking ?" 
                
                 />
                 <button className = "post-btn" onClick = {sendPost}> Post </button>
            </div>
             
        </div>
    )
}

export default Createpost
