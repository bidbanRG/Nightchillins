import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {URL, uploadURL, preset} from '../uri';


export const PostsContext = React.createContext();


const PostsProvider = ({children}) => {
   
     const [POST,setPOST] = useState([]);
 
     


     useEffect(() => {

     const url = URL + '/posts';
     const getPost = async () => {
        try{
        
         const { data } = await axios.get(url);
         setPOST(data);
        
     }catch(error){
         return alert(error.message);
     }
         
   }   

     getPost(); 

},[])


  



    return(
       <PostsContext.Provider value = {{POST,setPOST}}>
          {children}
      </PostsContext.Provider>
    )


}


export default PostsProvider;
