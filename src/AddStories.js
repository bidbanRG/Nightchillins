import React,{useContext} from 'react'
import {UserContext} from './UserContext';
import './addstories.css'

function AddStories(){

  const {Person} = useContext(UserContext);
const {Name,ImgUrl} = Person;


    return (
        <div className = "addstory"> 
          

        </div>
      )
}

export default AddStories;
 // <div className = "addstorysize">
            
 //           <div className = "addstoryhead" > 
 //             <h2> Add Reels </h2>
 //             <button onClick = {onClose} > X </button>
 //           </div>
 //          <div className = "addstoryhead2">
 //                 <div className="profile-pic3" 
 //                  style = {{backgroundImage : `url(${ImgUrl})`}}
 //                 ></div>
 //                 <h4>{Name}</h4>
 //           </div> 
 //           </div>