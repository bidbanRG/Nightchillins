import React from 'react'
import   './stories.css';
import { StoryContext } from './Context/StoriesContext';
import {useContext} from 'react';
import {UserContext,UserPost} from './UserContext'
import './reels.css'
import './App.css'
import {useNavigate} from 'react-router-dom';


function Stories() {
   
   
   const {setstorynumber} = useContext(UserPost);
   const { REELS,setREELS } = useContext(StoryContext);
   let navigate = useNavigate();

   
   return (
      <div className="slider">        
          
          <div className="stories">
              {
             (REELS.length === 0) ?
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
                  
              
                 REELS.map((data,index)=>(
                     
                   <Video key = {data._id}  src = {data.PostUrl} Click = {()=>setstorynumber(index)} Show = {()=>navigate('/reels')}/>
                 ))
               

            }
          </div>
       
      </div>
  
   );
}
function Video({src,Click,Show}){

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
