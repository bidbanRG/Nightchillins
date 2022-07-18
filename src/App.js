import { useState,useEffect,useRef,useContext } from 'react';
import './App.css';
import Body from './Body';
import Header from './Header';
import {db,app_storage} from './firebase';
import {collection,getDocs,addDoc,updateDoc,doc,query,where,onSnapshot,add,orderBy} from 'firebase/firestore';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Createpost from './Createpost';
import CreatePhotoVideo from './CreatePhotoVideo';
import Ticker from 'react-ticker'
import axios from 'axios';
import Reels from './Reels'
import {UserContext} from './UserContext';
const ImgUrl = 'https://firebasestorage.googleapis.com/v0/b/nightchilins.appspot.com/o/file?alt=media&token=5538cd4a-11dc-4392-9c67-b6c406d0e578'

function App() {

    const [islogin,setLogin] = useState(false);
    const [Person,setPerson] = useState({name:"",password:"",imgUrl:""}); 
    const URL = 'http://localhost:9000';
 
   
   

    const LOG_OUT = ()=>{
      setLogin(false);
      localStorage.removeItem('NightchilinsName');
      localStorage.removeItem('NightchilinsPassword');
      window.location.reload(true);
      setPerson(null);
    }
 
   
  
 
  function Profile(){

    //Put the Router tag <>
    return (
     
        <Router>   
        <div className = 'app'>  
         
         <Header/>

         <Body/>
        
           
        </div>
      </Router>
    )
     
  }
 
  
  return (
    
   
 
    <UserContext.Provider value = {{Person,setPerson,islogin,setLogin,URL}}>  
       {   !islogin ?   <Login/> :  <Profile/>  }
      
    </UserContext.Provider> 
    
   
  
  );
}




function Login() {
  
    
   const {Person,setPerson,islogin,setLogin,URL} = useContext(UserContext);
  
   let name = useRef();
   let password = useRef();
    
const LogIn = async () => {
   
   try{ 
     const id =  localStorage.getItem(`NightchilinsId`);
     if(!id) return alert('No User Found');
      console.log(id);
      name.current.value = name.current.value.trim();
      password.current.value = password.current.value.trim();
    
    if(name.current.value.length < 3)  return alert("name must be atleast 3 words")
    if(password.current.value.length < 5) return alert("password must be atleast 5 words");     

 
   const url = `${URL}/users/login`;
   const { data } = await axios.post(url,{name:name.current.value,password:password.current.value,id:id});
     
      const { imgUrl } = data[0];
     

     setPerson(data[0]);    

     setLogin(true);
   
   }catch(error){ 
       return alert(error.message); }  
          
}

const SignIn = async () => {
   
   try{ 
      name.current.value = name.current.value.trim()
      password.current.value = password.current.value.trim()
    
    if(name.current.value.length < 3)  return alert("name must be atleast 3 words")
    if(password.current.value.length < 5) return alert("password must be atleast 5 words");     

 
      const url = `${URL}/users`;
      const { data } = await axios.post(url,{name:name.current.value,password:password.current.value,imgUrl:ImgUrl});
      setPerson(data[0]);
      console.log(data[0]._id);
       
      localStorage.setItem(`NightchilinsId`, data._id);
      localStorage.setItem(`NightchilinsName`, data.name);
      localStorage.setItem(`NightchilinsPassword`, data.password);
      
      setLogin(true);

  }catch(error){
      
     return alert(error.message);

 }

          
}
     
   
    return(
      <div className = "parent">
        <section className = "login"> 
            <div className = 'app-title'>
            <div className = 'app-title2'>  
              <h1>Nightchilins</h1>
             </div>  
            </div> 
             
            <div className = 'spin_in' style = {{height:"70px",width:"70px",marginInline:'auto'}}   > </div>
             <input type = 'text' autoFocus  placeholder = "Full Name..." ref = {name}/>
                
             <input type = 'text' placeholder = "Password..." ref = {password}  />
             <button onClick = {LogIn}> Log In </button>  
             <button style = {{width:"180px"}} onClick = {SignIn}> Sign In </button>        
        </section>

      </div>  
    )
}





export default App;

// setPerson({Name:name.current.value,Password:password.current.value,ImgUrl:'https://firebasestorage.googleapis.com/v0/b/nightchilins.appspot.com/o/file?alt=media&token=5538cd4a-11dc-4392-9c67-b6c406d0e578'})
//     localStorage.setItem(`NightchilinsName` , name.current.value);
//     localStorage.setItem(`NightchilinsPassword` , password.current.value);   