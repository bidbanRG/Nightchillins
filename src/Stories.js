import React from 'react'
import   './stories.css';
import {collection,onSnapshot,query,orderBy} from 'firebase/firestore';
import {db,app_storage} from './firebase';
import {useRef,useEffect,useContext,useState} from 'react';
import {UserContext,UserPost} from './UserContext'
import { useInView,InView } from 'react-intersection-observer';
import './reels.css'
import './App.css'
import {useNavigate} from 'react-router-dom';


function Stories() {
   
   const [STORY,setSTORY] = useState([]);
   const {setstorynumber} = useContext(UserPost);
     useEffect(()=>{
       const USERS_REELS = collection(db,"reels"); 
       const q = query(USERS_REELS,orderBy('when','desc'));
       
            onSnapshot(q,(snap)=>{
           setSTORY(snap.docs.map((doc)=>({...doc.data(), id:doc.id})))});
     },[STORY.length])
     let navigate = useNavigate(); 
   return (
      <div className="slider">        
          
          <div className="stories">
              {
             (STORY.length === 0) ?
                 <>
               <div className = 'story-laoder'> 
                   <div className = 'story-loader'> 

                  </div>
               </div>
               <div className = 'story-laoder'> 
                   <div className = 'story-loader'> 

                  </div>
               </div>
               <div className = 'story-laoder'> 
                   <div className = 'story-loader'> 

                  </div>
               </div>
               <div className = 'story-laoder'> 
                   <div className = 'story-loader'> 

                  </div>
               </div>
               <div className = 'story-laoder'> 
                   <div className = 'story-loader'> 

                  </div>
               </div>
                </>
               :
                  
              
                 STORY.map((data,index)=>(
                     
                   <Video key = {data.id} d = {data.when}  src = {data.ReelUrl} Click = {()=>setstorynumber(index)} Show = {()=>navigate('/reels')}/>
                 ))
               

            }
          </div>
       
      </div>
  
   );
}
function Video({src,d,Click,Show}){

   const AllClickEvents = ()=>{
        Show();
        Click();
   }
  
    
   return( 
    
     <div className = 'story' onClick = {AllClickEvents}>
       <video  src={src} type="video/mp4" className = 'reel'  autoPlay loop muted> 
       </video>
    </div>   
    
   )

}
export default Stories
