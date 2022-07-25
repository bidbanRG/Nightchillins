import React,{useState,useEffect,useContext,Suspense} from 'react'
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom';
import './Addpost.css'
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
import Profile from './Profile';

import {app} from './firebase';
import {UserContext,UserPost} from './UserContext';
function Body() {

   
 
  
  
   
  return(
    
    
          <div  className = "Body">
              <Leftside/>
                 <Feed/>
             <Rightside/>
           </div>
     
     
    ) 
    
}


const Feed = () => {
  
  const [Width,Height] = useGetWindowDimensions();
  let nHeight = Height + 'px';
  let nWidth = parseInt(Width);
   let phoneView = (nWidth <= 800) 
  
         
    let feedForLargeScreens = {width:"52%",height:nHeight}
    let feedForPhone = {width :'100%',marginTop :'2rem'}
   
  
   

     
  


  
  


   const [storynumber,setstorynumber] = useState(-1);
   let navigate = useNavigate();
  useEffect(()=>{
       if(storynumber >= 0) navigate('/reels');
     },[storynumber])  

    return(
        
    <UserPost.Provider value = {{ setstorynumber, storynumber }}>
           
           <div style = { phoneView ? feedForPhone : feedForLargeScreens } className = 'feed'> 
           

           {  (phoneView) ?
              <>   
                   <Mind/> 
                   <Stories/>
                   
              </> 
               : 
              <>
                 <Stories/> 
                 <Mind/> 
              </>
           }

             
             <AddPost/>
               
              
          </div>     
      </UserPost.Provider>
       
    )
}



function Mind(){
 
      
   
     const {storynumber} = useContext(UserPost);
     
    
    
  
  
    
     
 
   
    return(
        <div className = "Mind">
            
            <Routes>
             <Route path = '/post' element = {<Createpost/>}/>
             <Route path = '/post-photo' element = {<CreatePhotoVideo/>}/>
             <Route path = '/reels' element = {<Reels storynumber = {storynumber}/>}/>
           </Routes> 

        
          <div className = "top">
              <Suspense fallback = {<Preview/>}>
                <Profile/>
              </Suspense>  
                <ShareViews/>
          </div>
        
          <div className = "bottom">
              <Live/>  
              <Photos/>
              <Story/>
          </div>  
       

     </div>
   );
    
}
 
const ShareViews = () => {
     let navigate = useNavigate();
     const { Person } = useContext(UserContext);
     const { name } = Person; 
    return(
     <div className = "input" onClick = {()=>navigate('/post')}>  
          <h4> How's your day {name} ?</h4> 
     </div>
    )
} 

const Live = () => {
     let navigate = useNavigate();
    return (
       <div className = "display">
             <RiLiveFill color = "crimson"  size = "1.5rem"/>
            <h6>Live</h6>
        </div>

    )
}

const Photos = () => {
     let navigate = useNavigate();
    return (
      <div className = "display" onClick = {()=>navigate('/post-photo')}>  
          <FaPhotoVideo color = "green" size = "1.5rem"/> 
            <h6>Photos</h6>
      </div>
   )
}

const Story = () => {
     let navigate = useNavigate();
    const { setstorynumber } = useContext(UserPost);
     const onReelsClick = ()=>{
       setstorynumber(-1)
       navigate('/reels');

   }
    return (
       <div className = "display" onClick = {onReelsClick}>   
              <MdVideoLibrary color = "goldenrod"  size = "1.5rem" /> 
               <h6> Stories </h6>
        </div>
    )
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

const Preview  = () => {
    return(
     <header>
        <div className = 'who-preview'/>
    </header>
  
  )
}
export default Body