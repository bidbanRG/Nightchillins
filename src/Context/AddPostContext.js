import React, { useEffect, useState, useContext } from 'react';
import AddPost from '../AddPost';
import { preset, uploadURL, URL } from '../uri';
import axios from 'axios';
import { PostsContext } from './PostsContext';
export const AddPostContext = React.createContext();



export default function AddPostProvider({children}){
  
  const { POST, setPOST } = useContext(PostsContext);
  const [progress,setProgress] = useState({
      value:0,
      error:false
  });
  const [PostBody,setPostBody] = useState(null);
  
    
    async function AddPost(){
       
       
      const Total = 100; 
     

      try{
        

    const config = {
         onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round((progressEvent.loaded * Total) / progressEvent.total)
           setProgress({value:percentCompleted,
            error:false});
       }
     }
          

          const response = await axios.post(URL + '/posts',PostBody,config);
          setPOST([PostBody,...POST]);
          setPostBody(null);
        
      }catch(err){
           setPostBody(null);
      
             return alert('Something Went Wrong');
         }

         
    }
   

   useEffect(() => {
     if(PostBody && PostBody.PostUrl){
     	AddPost();
     }
   },[PostBody]);

   return(
      <AddPostContext.Provider value = {{setPostBody,PostBody,progress}}>
           {children}
      </AddPostContext.Provider>
 
   	)

} 
