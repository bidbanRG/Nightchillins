import React,{useState,useEffect,useContext} from 'react'
import './ShowProfileOnClick.css'
function ShowProfileOnClick({onClose,url}){
	return (
      <div className = 'show-profile-back'>
        <div className = 'show-profile' style = {{backgroundImage:`url(${url})`}}>
         <button onClick = {onClose} className = 'show-profile-btn'>
             X
         </button>  
                         
          
        </div>
      </div>
	)
}

export default ShowProfileOnClick;