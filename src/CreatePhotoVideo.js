import React,{useContext,useRef,useState} from 'react'
import {UserContext,UserPost} from './UserContext';
import {db} from './firebase';
import {collection,getDocs,addDoc,updateDoc,doc,query,where,deleteDoc} from 'firebase/firestore';
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {storage} from './firebase'
import './divPost.css'
import {useNavigate} from 'react-router-dom';
function CreatePhotoVideo(){


  const {setaddPhotoVideo,getPhoto,setgetPhoto} = useContext(UserPost);
  const {Person,setPerson,Post,setPostlist,setLoading,plqx178,postTime,setpostTime} = useContext(UserContext);
  const {Name,ImgUrl,id} = Person;
  const photo = useRef(false);
  const [photoname,setphotoname] = useState(false);
 
    const addPhotoPost = async (url)=>{
         
         const USERS = collection(db,'posts');
          await addDoc(USERS,{Userid:id,Type:'image',Posturl:url,when:Post.length + 1,PostTime:postTime});
    }
    const onPhotoPost = async ()=>{
            const file = photo.current.files[0];
          
            setpostTime(Date.now());
            
            if(!file.type.includes('image')) {
                alert("Profile Picture must be an Image")
                return;
            }
             
              setLoading(true);
             const imgRef = ref(storage,`profile-pic/${Date.now()}`);
             uploadBytes(imgRef,file).then(()=>{
                getDownloadURL(imgRef).then((url)=>{
                      const USERS = collection(db,'posts');
                       
                    
                        
                        setPostlist([{Userid:id,Type:'image',Posturl:url},...Post]);
                       addPhotoPost(url);

                    
                    
                }).catch((err)=>{console.log(err)});
             }).catch((err)=>{console.log(err)}); 
                
              setaddPhotoVideo(false);
     }
     const onPhotoSelection = (e)=>{
        const file = e.target.files[0];
          if(!file.type.includes('image')) {
                alert("File must be an Image")
                return;
            }
            setphotoname(true);

     }
 let navigate = useNavigate();
   return (

     <div className = "divPost"> 
        <div className = "divPostsize">
           <div className = "divPosthead"> 
             <h2> Add Photos </h2>
             <button onClick = {()=>navigate(-1)}> X </button>
           </div>
          <div className = "divPosthead1">
                 <div className="profile-pic2" 
                  style = {{backgroundImage : `url(${ImgUrl})`}}
                 ></div>
                 <h4>{Name}</h4>
           </div> 
           <div className = "divPostinput"> 
              <div className = "divPostinputbtn">
                  <h5>  
                    { (!photoname) && '.Add Photo.'}
                    { (photoname) && <marquee style = {{width:'100%'}}> 
                    {photo.current.files[0].name} </marquee>}
                
                     <input type = 'file' ref = {photo} onChange = {onPhotoSelection}/>
                  </h5>
               
              </div> 
           </div>
                <button className = "post-btn1" onClick = {onPhotoPost}> ADD </button> 
          

        </div>
     </div>

  );

}


export default CreatePhotoVideo;