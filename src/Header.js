import React,{useEffect,useState,useContext} from 'react'
import './header.css'
import {AiFillHome,AiOutlineShop,AiOutlineSearch} from 'react-icons/ai';
import{MdGroups,MdOutlineOndemandVideo,MdNightsStay} from 'react-icons/md';
import{BsMessenger,BsFillBellFill,BsPower} from 'react-icons/bs';
import{RiSunFoggyFill} from 'react-icons/ri';
import {GoTriangleDown} from 'react-icons/go';
import{GiHamburgerMenu} from 'react-icons/gi';
import{FaFacebook,FaUserFriends} from 'react-icons/fa';
import {UserContext} from './Context/UserContext'
import { useRef } from 'react';

function Header() {

  // const {isDark,setTheme} = useContext(UserContext);   
  let black = 'black';
  const {setLogin} = useContext(UserContext);
  const Home = useRef();
  const Watch = useRef();
  const Mp = useRef();
  const grp = useRef();
  const more = useRef();
  const theme = useRef();
  const msg = useRef();
  const noti = useRef();
  const logout = useRef();
  const Width = useGetwidth();

  const LogOut = () => {
        setLogin(false);
      localStorage.removeItem('NightchilinsName');
      localStorage.removeItem('NightchilinsPassword');
     
      
  }

  let Color = '#607d8b';
   const [isDark,setTheme] = useSetTheme();
   function useSetTheme(){
  const [isDark,setTheme] = useState(false); 
  useEffect(()=>{
       if(isDark){
          
          document.documentElement.style.setProperty('--white-smoke','#28282B');
          document.documentElement.style.setProperty('--white','#202020');
          document.documentElement.style.setProperty('--light-gray','#202020');
          document.documentElement.style.setProperty('--thumb','#28282B');
           document.documentElement.style.setProperty('--black','lightgray');
            document.documentElement.style.setProperty('--text','white');
       } 
       else{
        
        document.documentElement.style.setProperty('--white-smoke','whitesmoke');
        document.documentElement.style.setProperty('--white', 'white');
        document.documentElement.style.setProperty('--light-gray','lightgray');
        document.documentElement.style.setProperty('--thumb','lightgray');
        document.documentElement.style.setProperty('--black','black');
       document.documentElement.style.setProperty('--text','black');
    }
  },[isDark])
    return [isDark,()=>setTheme(!isDark)];  
}
  let DarkMode = false;
if(Width < 700) {
  return (
    <div className = 'header-phone'>
      <div className="menu-top">
         
           <h2> Nightchilins  </h2>
          <div className="header-icons1">
             <AiOutlineSearch  className = 'phone-icons'/>
             <MdGroups className = 'phone-icons' />
            { !isDark && <MdNightsStay className = 'phone-icons' onClick = {setTheme} />}
            {  isDark && <RiSunFoggyFill className = 'phone-icons' onClick = {setTheme} />}
                
              <BsPower className = 'phone-icons' onClick = {LogOut} />
          </div>
       </div>
     
    </div>
  )
  }
  return (
    <div className = "menu-bar">
        <div className = "search-logo">   
            <div className = "webname"> </div>
          <div className = "search">  <AiOutlineSearch color = "grey" size = "1rem"/> </div>
        </div>
        <div className = "menu-icons">   
            <div className = "icons1">
    <div ref = {Home} className = "icons1-icon"  onMouseLeave = {()=>{Home.current.className = "icons1-icon"}} onMouseEnter = {()=>{Home.current.className += " " + "icons1-icon-home"}}>  <AiFillHome size = "1.5rem" color = {Color}/>  </div>  
    <div ref = {Watch} className = "icons1-icon" onMouseLeave = {()=>{Watch.current.className = "icons1-icon"}} onMouseEnter = {()=>{Watch.current.className += " " + "icons1-icon-watch"}}>  <MdOutlineOndemandVideo size = "1.5rem" color = {Color}/> </div>
  <div ref = {Mp} className = "icons1-icon" onMouseLeave = {()=>{Mp.current.className = "icons1-icon"}} onMouseEnter = {()=>{Mp.current.className += " " + "icons1-icon-marketplace"}}>  <AiOutlineShop size = "1.5rem" color = {Color}/> </div>
<div ref = {grp} className = "icons1-icon" onMouseLeave = {()=>{grp.current.className = "icons1-icon"}} onMouseEnter = {()=>{grp.current.className += " " + "icons1-icon-group"}}>   <MdGroups size = "1.5rem" color = {Color}/>  </div> 
<div ref = {more} className = "icons1-icon" onMouseLeave = {()=>{more.current.className = "icons1-icon"}} onMouseEnter = {()=>{more.current.className += " " + "icons1-icon-more"}}>   <GiHamburgerMenu size = "1.5rem" color = {Color}/>  </div>   
            </div>
            <div className = "icons2">
                   <div className = "icons2-icon" onClick = {setTheme} 
ref = {theme} className = "icons2-icon" onMouseLeave = {()=>{theme.current.className = "icons2-icon"}} onMouseEnter = {()=>{theme.current.className += " " + "icons2-icon-theme"}}
                   > 
             { !isDark && <MdNightsStay className = 'phone-icons'/>}
            {  isDark && <RiSunFoggyFill className = 'phone-icons'/>}
                </div>
                  
                   <div ref = {noti} className = "icons2-icon" className = "icons2-icon" onMouseLeave = {()=>{noti.current.className = "icons2-icon"}} onMouseEnter = {()=>{noti.current.className += " " + "icons2-icon-noti"}}>  <BsFillBellFill color = {black}/> </div> 
                   <div ref = {logout} onClick = {LogOut} className = "icons2-icon" className = "icons2-icon" onMouseLeave = {()=>{logout.current.className = "icons2-icon"}} onMouseEnter = {()=>{logout.current.className += " " + "icons2-icon-logout"}}>  <BsPower color = {black}/> </div>
            </div>
        </div>
    </div>
  )
}
function useGetwidth(){
  const [Width,setWidth] = useState(window.innerWidth);
  useEffect(() => {
      window.addEventListener('resize',()=>setWidth(window.innerWidth));
      return ()=>window.removeEventListener('resize',()=>setWidth(window.innerWidth));
  },[Width])
  return parseInt(Width);
}  
export default Header

 // /* <div className="menu-bottom">
 //          <AiFillHome className = 'phone-icons-1'/>
 //          <FaUserFriends className = 'phone-icons-1'/>
        
 //          <MdOutlineOndemandVideo className = 'phone-icons-1' />
 //          <BsFillBellFill className = 'phone-icons-1'/>
 //          <MdGroups className  = 'phone-icons-1'/> 
 //       </div>*/