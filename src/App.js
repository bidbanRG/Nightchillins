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

import Reels from './Reels'

import {UserContext} from './UserContext';
function App() {

    const [islogin,setLogin] = useState(false);
    const [Person,setPerson] = useState({Name:"",Password:"",ImgUrl:""}); 
    const [Post,setPostlist] = useState([]);    
    const [plqx178,setUsers] = useState([]);
    const [Loading,setLoading] = useState(false);
   const [getPost,setgetPost] = useState("") 
  const [getPhoto,setgetPhoto] = useState("");   
  const [postTime,setpostTime] = useState();

    const profileUpdate = async (id,url)=>{
           const userDoc = doc(db,"users",id);
           const NewImgUrl = {ImgUrl:url}
           await updateDoc(userDoc,NewImgUrl);
      }
    const UserPost = async (id,url)=>{
           const userDoc = doc(db,"posts",id);
           const NewImgUrl = {ImgUrl:url}
           await updateDoc(userDoc,NewImgUrl);
    }   
   

   

   const getPosts = async ()=>{
    const USERS_POSTS = collection(db,"posts"); 
    const q = query(USERS_POSTS,orderBy('when','desc'));
    
       let data = await getDocs(q);

    const AllPost = data;
    setPostlist(AllPost.docs.map((doc)=>({...doc.data(), id:doc.id})));
  
  }
  
    const getUsers =  ()=>{
              const USERS = collection(db,"users"); 
            onSnapshot(USERS,(snap)=>{
           setUsers(snap.docs.map((doc)=>({...doc.data(), id:doc.id})));

           
   })}
   

    const LOG_OUT = ()=>{
      setLogin(false);
      window.location.reload(true);
      setPerson(null);
    }
 const User_exist = (uname,upassword)=>{

    const user =  plqx178.filter((user)=>{
        return user.Name === uname && user.Password === upassword;
    })
    return user;

   }
   
   useEffect(()=>{
   if(Person.id !== undefined) 
       profileUpdate(Person.id,Person.ImgUrl);
       setLoading(false);
   },[Person.ImgUrl])
  useEffect(()=>{
   getPosts(); 
   setLoading(false);
 },[Post.length])
  useEffect(()=>{
   setLoading(false)
  },[Post])
 
  useEffect(()=>{
   getUsers(); 
    if(Person.id === undefined && Person.Name.length > 0){
        const newuser = User_exist(Person.Name,Person.Password);
           setPerson({...Person,id:newuser[0].id});
       }
 },[plqx178.length])
 
  function Profile(){

    
    return (
     
        <Router>    
        <div className = 'app'>  
        <Header Logout = {()=>LOG_OUT()}/>
       
        
            <Body/>
     
       </div>
       </Router>
    )
     
  }

    
  return (
    
   
 
    <UserContext.Provider value = {{getPost,setgetPost,getPhoto,setgetPhoto,Person,setPerson,islogin,setLogin,Post,plqx178,setPostlist,setUsers,setLoading,Loading,setpostTime,postTime}}>  
       { (!islogin) ?   <Login/> :  <Profile/> }
    </UserContext.Provider> 
    
   
  
  );
}




function Login() {
   const [New,setNew] = useState(false);
    
   const {Person,setPerson,islogin,setLogin,plqx178,setUsers} = useContext(UserContext);
  
   let name = useRef();
   let password = useRef();
     const USERS = collection(db,"users"); 

    
    
    const make_account = async ()=>{
        await addDoc(USERS,{Name: name.current.value,Password: password.current.value,
        ImgUrl:'https://firebasestorage.googleapis.com/v0/b/nightchilins.appspot.com/o/file?alt=media&token=5538cd4a-11dc-4392-9c67-b6c406d0e578'
      })   
    }
  
    const fun = async (NAME)=>{
    const USERS = collection(db,'users');
    const q = query(USERS, where('Name','==', NAME));
    const snap = await getDocs(q);
            console.log(snap.docs.map((doc)=>(doc.data())))
    }

  
   const User_exist = (uname,upassword)=>{

    const user =  plqx178.filter((user)=>{
        return user.Name === uname && user.Password === upassword;
    })
    return user;

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
          { !New &&  <button onClick = {()=>{
             

            if(name.current.value.length < 3 || password.current.value.length < 5){
             
             if(name.current.value.length < 3)  {alert("name must be atleast 3 words");
                     return;
         }
             if(password.current.value.length < 5)  {alert("password must be atleast 5 words");     
               return;}
          }
         
         else {
          name.current.value = name.current.value.trim()
          password.current.value = password.current.value.trim()
            const user = User_exist(name.current.value,password.current.value);
            if(user.length === 0) alert("User Not Found");
             else {
                 setPerson(user[0]);
              
              setLogin(true);
            }
         }     
        }}>Sign In </button> }  

        <button style = {{width:"180px"}} onClick = {()=>{
            if(!New){
                  setNew(!New); 
                  return;
            }
              if(name.current.value.length < 3 || password.current.value.length < 5 && New){
             
             if(name.current.value.length < 3)  {alert("name must be atleast 3 words");
                     return;
         }
             if(password.current.value.length < 5)  {alert("password must be atleast 3 words");     
               return;}
          }

             if(New){
                const New_user = User_exist(name.current.value,password.current.value);
                   
                if(New_user.length >= 1) {
                    alert("Change your password as it's matching with other users")
                    return;
                } 
          name.current.value = name.current.value.trim()
          password.current.value = password.current.value.trim()
               make_account();
    setPerson({Name:name.current.value,Password:password.current.value,ImgUrl:'https://firebasestorage.googleapis.com/v0/b/nightchilins.appspot.com/o/file?alt=media&token=5538cd4a-11dc-4392-9c67-b6c406d0e578'})
             
             fun(name.current.value); 
            
              setLogin(true);
       
        
            }
  
        }}> Create Account </button>        
        </section>

      </div>  
    )
}




export default App;
