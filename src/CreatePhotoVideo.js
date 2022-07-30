import React,{useContext,useState} from 'react'

import {UserContext} from './Context/UserContext';
import {URL, uploadURL, preset} from './uri';
import axios from 'axios';
import { PostsContext } from './Context/PostsContext'; 
import Loader from './Loader';
import './divPost.css'
import {useNavigate} from 'react-router-dom';
function CreatePhotoVideo(){


  const {POST,setPOST} = useContext(PostsContext);
  const {Person} = useContext(UserContext);
  const { name,imgUrl } = Person;
  
  const [loading,setLoading] = useState(false);
  const [photoChoosen,setPhotoChoosen] = useState(false); 
    const onPhotoPost = async ()=>{
           
        if(!photoChoosen) return alert('No Photo Selected');
             
            const Data = new FormData();
            Data.append('file',photoChoosen);
            Data.append('upload_preset',preset);             
             
     
           try{
              
              setLoading(true);
             const { data } = await axios.post(uploadURL,Data);
             const { url } = data;                    
               
               if(!url){
                 setLoading(false);
                 return alert('something went wrong');
               } 
               
               const postBody =  {
                  PostUrl:url,
                  Type:'image',
                  Userid:Person._id,
                  When:Date.now(),          
               }
              
             const response = await axios.post(URL + '/posts',postBody);
                setPOST([response.data, ...POST]);
               setLoading(false);
               alert('photo posted');
               navigate(-1);
           
           }catch(error){
              setLoading(false);
            return alert()
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

  if(loading) return <Loader/>
   
   return (

     <div className = "divPost"> 
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
                <button className = "post-btn1" onClick = {onPhotoPost}> ADD </button> 
          

        </div>
     </div>

  );

}


export default CreatePhotoVideo;