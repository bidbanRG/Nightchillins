import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {URL} from '../uri';

export const UserContext = React.createContext();


const UserProvider = ({children}) => {

    const [islogin,setLogin] = useState(false);
    const [Person,setPerson] = useState({name:"",password:"",imgUrl:""}); 
    const [loading,setLoading] = useState(false);
    
    
     
    useEffect(() => {
        
      const IsLoggedIn = async () => {
        try{ 

         const name =  localStorage.getItem(`NightchilinsName`);
         const password = localStorage.getItem(`NightchilinsPassword`);
         const id = localStorage.getItem(`NightchilinsId`);
         if(!name && !password) return;
          setLoading(true);
         const url = URL + '/users/login'; 
        const { data } = await axios.post(url,{name,password,id});
        
         setPerson(data[0]);
         setLogin(true);
         setLoading(false);
        }catch(error){
            return alert(error.message);
        }
      }
         IsLoggedIn(); 

    },[])
   






    return(
      <UserContext.Provider value = {{islogin,setLogin,Person,setPerson,loading,setLoading}}>
       {children}
      </UserContext.Provider>
    )

}

export default UserProvider;