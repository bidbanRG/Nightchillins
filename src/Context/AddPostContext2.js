import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { PostsContext } from "./PostsContext";
import { URL } from "../uri";
export const AddPostContext2 = React.createContext();


export default function AddPostProvider2({children}){
   
    const [PostBody,setPostBody] = useState(null);
    const [progress,setProgress] = useState(0);
    const { POST, setPOST } = useContext(PostsContext)
    async function AddPost(){
        
       const config = {
         onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
           setProgress(percentCompleted);
        }
      }

         
         try{
            
          const response = await axios.post(URL + '/posts',PostBody,config);
         
          setPOST([response.data,...POST]);
         }catch(err){
          return alert(err.message);
       }
     
       setPostBody(null);

    }




     return <AddPostContext2.Provider value={{PostBody,setPostBody,progress, AddPost}}>
         {children}
       </AddPostContext2.Provider>
     
}



