import React,{useState,useEffect,useContext} from 'react'
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom';
import {db} from './firebase';
import {collection,getDocs,addDoc,updateDoc,doc} from 'firebase/firestore';
import {storage} from './firebase'
import './body.css'
import './App.css'
import Stories from './Stories'
import Reels from './Reels';
import CreatePhotoVideo from './CreatePhotoVideo'
import ShowProfileOnClick from './ShowProfileOnClick'
import {RiLiveFill} from 'react-icons/ri';
import {FaPhotoVideo} from 'react-icons/fa';
import {CgSmileMouthOpen} from 'react-icons/cg';
import {MdVideoLibrary} from 'react-icons/md';
import {MdVideoCall} from 'react-icons/md';
import Createpost from './Createpost';
import Rightside from './Rightside';
import Leftside from './Leftside';
import AddStories from './AddStories';
import AddPost from './AddPost'
import PhotoVideo from './PhotoVideo'

import {app} from './firebase'
import {UserContext,UserPost} from './UserContext'
function Body() {

   
 
  const [Width,Height] = useGetWindowDimensions();
  let nHeight = Height + 'px';
  let nWidth = parseInt(Width);
   let phoneMode = (nWidth <= 800) 
  
         
    let feed = {width:"52%",height:nHeight}
    let feedForPhone = {width :'100%',marginTop :'2rem'}
   
  
   

     
  


  
  


   const [storynumber,setstorynumber] = useState(-1);
   let navigate = useNavigate();
  useEffect(()=>{
       if(storynumber >= 0) navigate('/reels');
     },[storynumber])  
  
   
  return(
    
    <UserPost.Provider value = {{ setstorynumber, storynumber }}>
      
        <div  className = "Body">
            
            <Routes>
             <Route path = '/post' element = {<Createpost/>}/>
             <Route path = '/post-photo' element = {<CreatePhotoVideo/>}/>
             <Route path = '/reels' element = {<Reels storynumber = {storynumber}/>}/>
           </Routes> 
           
              
            {/* {shorts && <AddStories/>}*/}
           
           
                {(!phoneMode) && <Leftside/>} 
        
          
          <div style = { phoneMode ? feedForPhone : feed} className = 'feed'> 
          {  (phoneMode) ?
              <div>   
             <Mind smallDevice = {nWidth < 400} /> 
             <Stories/> 
              </div> : 
             <div>
             <Stories/> 
             <Mind smallDevice = {nWidth < 400} /> 
             </div>
           }

             {/*  Adding Post Here */}
             <AddPost/>
               
              
          </div>     
        
         {(!phoneMode) && <Rightside/>} 
        
            </div>
      </UserPost.Provider>
     
        ) 
    
}

function Mind(smallDevice){
 
      const {Person,setPerson,setLoading} = useContext(UserContext);
   
     const {setstorynumber} = useContext(UserPost);
     const [showprofile,Setshowprofile] = useState(false);
    
     let navigate = useNavigate();
  
   const { name,imgUrl } = Person; 
    
     
 
   const onReelsClick = ()=>{
       setstorynumber(-1)
       navigate('/reels');

   }
    return(
        <div className = "Mind">
        
         {showprofile && <ShowProfileOnClick onClose = {()=>Setshowprofile(false)} url = {imgUrl}/>}
          <div className = "top">
              <div className = "profile-pic" style = {{backgroundImage:`url(${imgUrl})`}}
                  onClick = {()=>Setshowprofile(true)}
              > 
                    <div className = "inp"> 
                        <input type = "file"  onClick = {()=>Setshowprofile(false)}/>
                    </div>
              </div>
             <div className = "input" onClick = {()=>navigate('/post')}>  
                   <h4> How's your day {name} ?</h4> 
             </div>
             
          </div>
        
          <div className = "bottom">
           <div className = "display" onClick = {()=>navigate('/post')}> 
                    
                  <RiLiveFill color = "crimson"  size = "1.5rem"/>
                   {!smallDevice &&  <h6>Live Video</h6>}
                   {smallDevice &&  <h6>Live</h6>} 
            </div>
           <div className = "display" onClick = {()=>navigate('/post-photo')}>  
                    <FaPhotoVideo color = "green" size = "1.5rem"/> 
                      {!smallDevice  && <h6>Add Photos</h6>}
                      {smallDevice &&  <h6>Photos</h6>}
             </div>
           <div className = "display" onClick = {onReelsClick}>   
                   <MdVideoLibrary color = "goldenrod"  size = "1.5rem" /> 
                      {!smallDevice && <h6> Add Stories </h6>}
                      {smallDevice &&  <h6> Stories </h6>}
             </div>
          </div>  
       

     </div>
   );
    
}
  
function useGetWindowDimensions(){
  const [Width,setWidth] = useState(window.innerWidth);
  const [Height,setHeight] = useState(window.innerHeight);
  useEffect(() => {
   
    window.addEventListener('resize',()=>setHeight(window.innerHeight));
    window.addEventListener('resize',()=>setWidth(window.innerWidth));
    return ()=>{
      window.removeEventListener('resize',()=>setWidth(window.innerWidth));
      window.removeEventListener('resize',()=>setHeight(window.innerHeight));
    }
},[Width,Height])
  return [Width,Height];
}


export default Body