import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { URL } from '../uri';
export const StoryContext = React.createContext();



const StoryProvider = ({children}) => {
   
    const [REELS,setREELS] = useState([]);

    useEffect(() => {
       
       const getStories = async () => {
         
          const { data } = await axios.get(URL + '/stories');
          setREELS(data);

      }

      getStories();

   },[]);

  
   return(
       <StoryContext.Provider value = {{REELS,setREELS}}>
          {children}
       </StoryContext.Provider>
   	)



}

export default StoryProvider;