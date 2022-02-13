import React,{useContext} from 'react'
import {UserContext,UserPost} from './UserContext';
import './divPost.css'
function Post({onClose}){

const {Person} = useContext(UserContext);
const {Name,ImgUrl} = Person;
const {setaddPhotoVideo} = useContext(UserPost);

   return (

     <div className = "divPost"> 
        <div className = "divPostsize">
           <div className = "divPosthead" > 
             <h2> Add Photos/Videos </h2>
             <button onClick = {()=>setaddPhotoVideo(false)} > X </button>
           </div>
          <div className = "divPosthead1">
                 <div className="profile-pic2" 
                  style = {{backgroundImage : `url(${ImgUrl})`}}
                 ></div>
                 <h4>{Name}</h4>
           </div> 
           <div className = "divPostinput"> 
              <div className = "divPostinputbtn">
                  <h5>  Choose files
                     <input type = 'file' />
                  </h5>
               
              </div> 
           </div>
               <button className = "post-btn1" > ADD </button> 
          

        </div>
     </div>

  );

}


export default Post;