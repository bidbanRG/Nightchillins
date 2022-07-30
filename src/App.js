import { useState,useEffect,useRef,useContext } from 'react';
import './App.css';
import Body from './Body';
import Header from './Header';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import Loader from './Loader'
import axios from 'axios';
import {URL} from './uri';
const ImgUrl = 'https://firebasestorage.googleapis.com/v0/b/nightchilins.appspot.com/o/file?alt=media&token=5538cd4a-11dc-4392-9c67-b6c406d0e578'

function App() {

    
    
    const {Person,setPerson,islogin,setLogin,loading,setLoading} = useContext(UserContext);
    

   if(loading) return <Loader/>
  
  
  return (<>
          {   !islogin ?   <Login/> :  <Profile/>  }
        </>)
}


function Profile(){
   
    
 
   
    return (
     
        <Router>   
        <div className = 'app'>  
         
         <Header/>

         <Body/>
        
           
        </div>
      </Router>
    )
     
  }
 


function Login() {
  
    
   const {Person,setPerson,islogin,setLogin} = useContext(UserContext);
  
   let name = useRef();
   let password = useRef();
   const [pressedKey,setPressedKey] = useState('NoKeyPressed');

  useEffect(() => {
        
      

     if(pressedKey === 'Enter') LogIn();
      
    
    document.addEventListener('keydown',(e) => {
        if(e.key === 'Enter') setPressedKey(e.key)
    });
     
     return () => document.removeEventListener('keydown',(e) => {
          if(e.key === 'Enter') setPressedKey(e.key)
    });
    
  },[pressedKey]);



const LogIn = async () => {
   

  

   try{ 
     const id =  localStorage.getItem(`NightchilinsId`);
     if(id === null || id === undefined) return alert('No User Found');
      console.log(id);
      name.current.value = name.current.value.trim();
      password.current.value = password.current.value.trim();
    
    if(name.current.value.length < 3)  return alert("name must be atleast 3 words")
    if(password.current.value.length < 5) return alert("password must be atleast 5 words");     

 
   const url = `${URL}/users/login`;
   const { data } = await axios.post(url,{name:name.current.value,password:password.current.value,id:id});
     
      if(data.length === 0) return alert('NO User Found');     
    
      localStorage.setItem(`NightchilinsName`, data[0].name);
      localStorage.setItem(`NightchilinsPassword`, data[0].password);

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