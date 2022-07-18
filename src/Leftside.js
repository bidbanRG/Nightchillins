import {React,useRef,useContext} from 'react'
import {UserContext} from './UserContext'
import {FaUserFriends,FaClipboard} from 'react-icons/fa'
import { MdBookmark, MdGroups,  MdRestore,MdSubscriptions } from 'react-icons/md'
import {AiFillFlag, AiFillHome} from 'react-icons/ai'
import {BsFillBagDashFill,BsMessenger,BsFillCloudHaze2Fill,BsFillStarFill} from 'react-icons/bs'
import {SiFacebooklive} from 'react-icons/si'
import {HiSpeakerphone} from 'react-icons/hi'
import {ImStatsBars} from 'react-icons/im'
import './left.css'
function Leftside() {       
  
      const Left = useRef();
   
     const {Person} = useContext(UserContext);
     const {name,imgUrl } = Person;
     console.log(name,imgUrl);
    
         let SIZE = '1.5rem'
    return (   
              <div ref = {Left}  className = 'Left'  
             onMouseEnter = {()=>{Left.current.className = 'onMouseEnter'}} 
             onMouseLeave = {()=>{Left.current.className = 'onMouseLeave'}}
             >
                       
             
             <div className="profile">
                 <Image/>
                 <h3>{ name }</h3>                 
             </div>
           
           <div className="left-content">
             <FaUserFriends size = {SIZE} className = 'icon' color = "6666FF" />
               <h4>Friends</h4>
           </div>
           <div className="left-content">
                <MdBookmark size = {SIZE} className = 'icon' color = '#8B008B'/>
                <h4>Save</h4>
           </div>
           <div className="left-content">
               <MdGroups size = {SIZE} className = 'icon' />
               <h4>Groups</h4>
           </div>
           <div className="left-content">
                <AiFillHome size = {SIZE} className = 'icon' color = "0080FF"/>
                <h4>MarketPlace</h4>
           </div>
           <div className="left-content">
                <MdSubscriptions size = {SIZE} className = 'icon' color = '#8A2BE2'/>
                <h4>Watch</h4>
           </div>
           <div className="left-content">
               <MdRestore size = {SIZE} className = 'icon' color = '	#C71585'/>
               <h4>Memory</h4>
           </div>
           <div className="left-content">
               <AiFillFlag size = {SIZE} className = 'icon' color = '#90EE90' />
               <h4>Page</h4>
           </div>
           <div className="left-content">
               <FaClipboard  size = {SIZE} className = 'icon' color = '	#DC143C'/>
               <h4>Events</h4>
           </div>
           <div className="left-content">
               <BsFillBagDashFill size = {SIZE} className = 'icon' color = '#8B4513'/>
               <h4>Job</h4>

           </div>
           <div className="left-content">
               <SiFacebooklive size = '2.2rem' className = 'icon' color = '	#FF69B4'/>
               <h4>Live</h4>
           </div>
           <div className="left-content">
               <BsMessenger size = '1.3rem' className = 'icon' color = '#FF00FF'/>
               <h4>Message</h4>    
            </div>
            <div className="left-content">
                <BsFillCloudHaze2Fill size = {SIZE} className = 'icon' color = '#008B8B'/>
                <h4>Weather</h4>            
            </div>
            <div className="left-content">
               <BsFillStarFill size = {SIZE} className = 'icon' color = '#FFD700'/>
               <h4>Favourites</h4>
            </div>
            <div className="left-content">
               <HiSpeakerphone size = {SIZE} className = 'icon' color = 'blue'/>
               <h4>Adsvertisement</h4>    
            </div>
            <div className="left-content">
                <ImStatsBars size = {SIZE} className = 'icon' color = '#BC8F8F'/>
                <h4>Ads Maneger</h4>
            </div>           
        </div>
    )
}



function Image(){
 
     const {Person} = useContext(UserContext);
     const { imgUrl } = Person;
   return(
      <div className = "Img"   style = {{backgroundImage:`url(${imgUrl})`}} > 
           
      </div>
   )
}  
 


export default Leftside
