import React, {useState,useRef,useContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Axios from 'axios';
import {db} from './firebase';
import {collection,getDocs,addDoc,updateDoc,doc} from 'firebase/firestore';
import {UserContext,UserPost} from './UserContext'
import "./post.css"
import {useNavigate} from 'react-router-dom';
function Createpost() {
    
    
   const {Person,setPerson,setgetPost,setpostTime,setLoading,Post,setPostlist} = useContext(UserContext);
  const {Name,ImgUrl} = Person;
 
 const text = useRef("");
let navigate = useNavigate();
 const sendPost = async ()=>{
    if(text.current.value.length === 0) {return;}
    // setgetPost(text.current.value);
    // setpostTime(Date.now());
      
      console.log(1);
      const POST = collection(db,'posts');
      await addDoc(POST,{Userid:Person.id,Type:'text',Like:0,Text:text.current.value,when:Date.now()});
      console.log(2);
      setPostlist([{Userid:Person.id,Type:'text',Like:0,Text:text.current.value,when:Date.now()},...Post])   
   
      console.log(3);
    
      navigate(-1);
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
