import React,{useContext,useRef,useState} from 'react'
import {UserContext,UserPost} from './UserContext';
import {db} from './firebase';
import {collection,getDocs,addDoc,updateDoc,doc,query,where,deleteDoc} from 'firebase/firestore';
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {storage} from './firebase'
import './divPost.css'
function CreatePhotoVideo({onClose}){


  const {setaddPhotoVideo,getPhoto,setgetPhoto} = useContext(UserPost);
  const {Person,setPerson,Post,setPostlist,setLoading,plqx178} = useContext(UserContext);
  const {Name,ImgUrl,id} = Person;
  const photo = useRef(false);
  const [photoname,setphotoname] = useState(false);
  // const fun = async (id)=>{
  //   const USERS = collection(db,'posts');
  //   const q = query(USERS, where('Userid','==', id));
  //   const snap = await getDocs(q);
  //   const ans = []
  //       snap.docs.map((doc)=>(ans.push(doc.data())));
  //        const delPost = Post.filter((doc)=>{
  //           return doc.Type === 'image'; 
  //       })
  //       // const userDoc = doc(db,"posts",);
  //       // const NewPostUrl = {Posturl:url}
  //       // await updateDoc(userDoc,NewPostUrl)

  //   }

    const addPhotoPost = async (url)=>{
         const USERS = collection(db,'posts');
          await addDoc(USERS,{Userid:id,Type:'image',Posturl:url,when:Post.length + 1});
    }
    const onPhotoPost = async ()=>{
            const file = photo.current.files[0];
          
            
            
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

   return (

     <div className = "divPost"> 
        <div className = "divPostsize">
           <div className = "divPosthead"> 
             <h2> Add Photos </h2>
             <button onClick = {()=>setaddPhotoVideo(false)}> X </button>
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