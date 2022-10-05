import React,{useContext,useState} from 'react'

import {UserContext} from './Context/UserContext';
import { PostsContext } from './Context/PostsContext'; 

import './divPost.css'
import {useNavigate} from 'react-router-dom';
import { AddPostContext } from './Context/AddPostContext';
import { preset, uploadURL } from './uri';
import axios from 'axios';
function CreatePhotoVideo(){


  const {POST,setPOST} = useContext(PostsContext);
  const {setImage,setPostBody,PostBody} = useContext(AddPostContext);
  const {Person} = useContext(UserContext);
  const { name,imgUrl } = Person;
  
  const [loading,setLoading] = useState(false);
  const [photoChoosen,setPhotoChoosen] = useState(false);

    const onPhotoPost = async ()=>{
           
        if(!photoChoosen) return alert('No Photo Selected');
             
                       
               

        const Data = new FormData();
         Data.append('file',photoChoosen);
         Data.append('upload_preset',preset);
           
              const postBody =  {
                  Type:'image',
                  Userid:Person._id,
                  When:Date.now(),          
               }      


         try{   
              setLoading(true);
            const { data } = await axios.post(uploadURL,Data);

              setPostBody({...postBody,PostUrl:data.url});
             setLoading(false); 
              navigate(-1);
            }catch(err){
             setPostBody(null);
         
             return alert('Something Went Wrong');
          }
               
              
              
        
     }
    
    const onPhotoSelection = (e)=> {
          
        const file = e.target.files[0];
           
           if(!file){
            setPhotoChoosen(false);
            return;
          }

          if(!file.type.includes('image')){ 
               setPhotoChoosen(false);
               return alert("File must be an Image") 
            }
          
         setPhotoChoosen(file);
        
       
          

   }
 


 let navigate = useNavigate();


   
   return (

     <div className = "divPost" style = { PostBody && {opacity:'0'}}> 
        <div className = "divPostsize">
           <div className = "divPosthead"> 
             <h2> Add Photos </h2>
             <button onClick = {()=>navigate(-1)}> X </button>
           </div>
          <div className = "divPosthead1">
                 <div className="profile-pic2" 
                  style = {{backgroundImage : `url(${imgUrl})`}}
                 ></div>
                 <h4>{ name }</h4>
           </div> 
           <div className = "divPostinput"> 
              <div className = "divPostinputbtn">
                  <h5>  
                    {  !photoChoosen ? 

                         ' Add Photo ' 
                            :
                    <marquee style = {{width:'100%'}}> 
                       { photoChoosen.name } 
                    </marquee>}
                
                     <input type = 'file'  onChange = {onPhotoSelection}/>
                  </h5>
               
              </div> 
           </div>
                <button className = "post-btn1" onClick = {onPhotoPost}> 
                   {
                       loading ? <Loader/> : "Post"
                   }
                </button> 
          

        </div>
     </div>

  );

}

function Loader(){
    return(
       
         <div className = "spin_in"><div className = 'spin'> </div> </div>
        
    )
}

export default CreatePhotoVideo;