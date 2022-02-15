import React, {useState,useRef,useContext} from 'react'
import Axios from 'axios';
import {UserContext,UserPost} from './UserContext'
import "./post.css"
import {useNavigate} from 'react-router-dom';
function Createpost() {
    
    
   const {Person,setPerson,setgetPost} = useContext(UserContext);
  const {Name,ImgUrl} = Person;
 
 const text = useRef("");
let navigate = useNavigate();
 const sendPost = ()=>{
    if(text.current.value.length === 0) {return;}
    setgetPost(text.current.value);
 
 }

   
    return (
        <div className = "post">
            
            <div className="post-size">
               <header className = "head">
                 <h1> Add a Post</h1>
                 <button onClick = {()=>navigate(-1)}> X </button>
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
