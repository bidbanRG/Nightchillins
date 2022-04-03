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
   
  
   const {Post,Person,setPostlist,plqx178,setPerson,Loading,getPhoto,setgetPhoto,getPost,setgetPost,postTime,setpostTime} = useContext(UserContext);
   

     
  


  
  
  // const dbSetPost = async()=>{
  //    const POST = collection(db,'posts');
  //    await addDoc(POST,{Userid:Person.id,Type:'text',Like:0,Text:getPost,when:Post.length + 1,PostTime:postTime});
  //    setPostlist([{Userid:Person.id,Type:'text',Like:0,Text:getPost,when:Post.length + 1},...Post]) 
  // }
 // const dbSetPhoto = async()=>{
 //     const POST = collection(db,'posts');
 //     await addDoc(POST,{Userid:Person.id,Type:'text',Like:0,Posturl:getPhoto,when:Date.now()});
 //     setPostlist([{Userid:Person.id,Type:'image',Like:0,Posturl:getPhoto,when:Date.now()},...Post])
 //  }   

// useEffect(()=>{
//   if(getPost.length > 0) {
//     dbSetPost();
//   }
// },[postTime])
// useEffect(()=>{
//     if(getPost.length > 0){
//         dbSetPhoto();
//     }
// },[getPost])
   
   const [dopost,setPost] = useState(false);
   const [addPhotoVideo,setaddPhotoVideo] = useState(false); 
   const [shorts,setshorts] = useState(false);
   const [storynumber,setstorynumber] = useState(-1);
   let navigate = useNavigate();
  useEffect(()=>{
       if(storynumber >= 0) navigate('/reels');
     },[storynumber])  
  
   
  return(
    
    <UserPost.Provider value = {{setaddPhotoVideo,getPhoto,setgetPhoto,setstorynumber,storynumber,dopost}} >
      
        <div  className = "Body">
            
            <Routes>
             <Route path = '/post' element = {<Createpost/>}/>
             <Route path = '/post-photo' element = {<CreatePhotoVideo/>}/>
             <Route path = '/reels' element = {<Reels storynumber = {storynumber}/>}/>
           </Routes> 
           
              
             {shorts && <AddStories/>}
             {Loading &&  <div className = 'loading'>  

                    <div className = "spin_in"><div className = 'spin'> </div>   

             </div> </div> }
           
                {(!phoneMode) && <Leftside/>} 
        
          
          <div style = { phoneMode ? feedForPhone : feed} className = 'feed'> 
          {  (phoneMode) ?
              <div>   
             <Mind onPost = {()=>setPost(true)}  
               
                Addshorts = {()=>{setshorts(true)}}
              
             smallDevice = {nWidth < 400} /> 
             <Stories/> 
              </div> : 
             <div>
             <Stories/> 
             <Mind onPost = {()=>setPost(true)} 
             

               Addshorts = {()=>{setshorts(true)}}
               
             smallDevice = {nWidth < 400} /> 
             </div>
           }

              {
                 Post.map((obj)=>{
                   return <AddPost key = {obj.id} {...obj} />
                 })
              }
             
               
              
          </div>     
        
         {(!phoneMode) && <Rightside/>} 
        
            </div>
      </UserPost.Provider>
     
        ) 
    
}

function Mind({Addshorts,smallDevice}){
 
      const {Person,setPerson,Post,setPost,setLoading} = useContext(UserContext);
      const {Name,ImgUrl,id} = Person;
     const {setaddPhotoVideo,setstorynumber} = useContext(UserPost);
     const [showprofile,Setshowprofile] = useState(false);
    
     let navigate = useNavigate();
  
   
    
     const profileChange = async (e)=>{

            const file = e.target.files[0];
            if(!file.type.includes('image')) {
                alert("Profile Picture must be an Image")
                return;
            }
              setLoading(true);
             
              const imgRef = ref(storage,`profile-pic/${id}`);
              await  uploadBytes(imgRef,file)
              const url =  await getDownloadURL(imgRef)
              setPerson({...Person,ImgUrl : url});
              const userDoc = doc(db,"users",id);
              const NewImgUrl = {ImgUrl:url}
              await updateDoc(userDoc,NewImgUrl);
             setLoading(false);
           
     }
 
   const onReelsClick = ()=>{
       setstorynumber(-1)
       navigate('/reels');

   }
    return(
        <div className = "Mind">
        
         {showprofile && <ShowProfileOnClick onClose = {()=>Setshowprofile(false)} url = {ImgUrl}/>}
          <div className = "top">
              <div className = "profile-pic" style = {{backgroundImage:`url(${ImgUrl})`}}
                  onClick = {()=>Setshowprofile(true)}
              > 
                    <div className = "inp"> 
                        <input type = "file" onChange = {profileChange} onClick = {()=>Setshowprofile(false)}/>
                    </div>
              </div>
             <div className = "input" onClick = {()=>navigate('/post')}>  
                   <h4> How's your day {Name} ?</h4> 
             </div>
             
          </div>
        
          <div className = "bottom">
           <div className = "display"> 
                    
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