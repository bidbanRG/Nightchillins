import React, {useState,useRef,useContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import axios from 'axios';
import {URL} from './uri';
import { AddPostContext2 } from './Context/AddPostContext2';
import { UserContext } from './Context/UserContext'
import { PostsContext } from './Context/PostsContext'; 
import "./post.css"

import {useNavigate} from 'react-router-dom';
function Createpost() {
    
    
   const {Person} = useContext(UserContext);
   const { name,imgUrl } = Person;
   const [loading,setLoading] = useState(false);
   const {POST,setPOST} = useContext(PostsContext);
   const { setPostBody } = useContext(AddPostContext2);
  
const text = useRef("");
let navigate = useNavigate();
   
 const sendPost = async ()=>{
    if(text.current.value.length === 0) {return;}
        
       const postBody =  {
          Text:text.current.value,
          Type:'text',
          Userid:Person._id,
          When:Date.now(),          
       }; 
         
         
        setPostBody(postBody);
        
        navigate(-1);
   
     }

   
    return (
        <div className = 'post'>
            
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
                 <button className = "post-btn" onClick = {sendPost}>  
                     Post
                 </button>
            </div>
             
        </div>
    )
}

function Loader(){
    return(
       
         <div className = "spin_in"><div className = 'spin'> </div> </div>
        
    )
}

export default Createpost
