import React, {useState,useRef,useContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import axios from 'axios';
import {URL} from './uri';
import {UserContext,UserPost} from './UserContext'
import "./post.css"
import {useNavigate} from 'react-router-dom';
function Createpost() {
    
    
   const {Person} = useContext(UserContext);
const { name,imgUrl } = Person;
const text = useRef("");
let navigate = useNavigate();
 
 const sendPost = async ()=>{
    if(text.current.value.length === 0) {return;}

     try{
      
      const postBody =  {
          Text:text.current.value,
          Type:'text',
          Userid:Person._id,
          When:Date.now(),          
       }
     
      await axios.post(URL + '/posts',postBody);
      console.log('send');
     

     }catch(error){
        return alert(error.message);
     }
     
     navigate(-1)
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
                  style = {{backgroundImage : `url(${imgUrl})`}}
                 ></div>
                 <h4>{name}</h4>
               </div>
                  <textarea ref = {text} type = "text" autoFocus  placeholder = "What are you thinking ?" 
                
                 />
                 <button className = "post-btn" onClick = {sendPost}> Post </button>
            </div>
             
        </div>
    )
}

export default Createpost
