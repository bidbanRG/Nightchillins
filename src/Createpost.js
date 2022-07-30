import React, {useState,useRef,useContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import axios from 'axios';
import {URL} from './uri';
import {UserContext} from './Context/UserContext'
import { PostsContext } from './Context/PostsContext'; 
import "./post.css"
import Loader from './Loader'
import {useNavigate} from 'react-router-dom';
function Createpost() {
    
    
   const {Person} = useContext(UserContext);
const { name,imgUrl } = Person;
const [loading,setLoading] = useState(false);
  const {POST,setPOST} = useContext(PostsContext);
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
     
      setLoading(true);
      const response = await axios.post(URL + '/posts',postBody);
      setPOST([response.data, ...POST]);
      setLoading(false);
         navigate(-1)
      
      
      }catch(error){
        setLoading(false);
        return alert(error.message);
     }
     
 }

   if(loading) return <Loader/>
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
