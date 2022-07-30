import React,{useContext,useState,useEffect,Suspense} from 'react';
import {UserContext} from './UserContext';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import axios from 'axios';
import { PostsContext } from './Context/PostsContext'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Addpost.css'
import Loader from './Loader';
import { createResource } from './api/PersonApi';
import { createImageResource } from './api/ImageApi'




function AddPost(){

  
    
    const [loading,setLoading] = useState(false); 
    const {POST,setPOST} = useContext(PostsContext);  
  

    
return <> {POST.map( (obj) =>  <PostView key = {obj._id}  {...obj} /> )} </> 
       
}



const PostView = (obj) => {
  
  // console.log(longAgo(obj.When));
 
    
     const personResource = createResource();

   return (
         <div className = 'addpost' > 
    
          <Suspense  fallback = { <Preview/> }>
             <Profile personResource = {personResource} id = {obj.Userid} when = {obj.When} />
           </Suspense>   
            
        {      obj.Type === 'text' ? 
                  <p>  {obj.Text} </p>
                    :
                   
                    <LazyLoadImage  width = '100%' effect = "blur" src = {obj.PostUrl} />
                  
        } 
             
           <BottamTab/>
        
       </div>



    )


}

const Profile = ({personResource,id,when}) => {
 
  const person = personResource.person.read({_id:id});
 
  const { name, imgUrl } = person;
   const imageResource = createImageResource();
   
   
   return( 
    
      <header> 
        <Suspense fallback = {<img src = {imgUrl} className = "who preview"/> }>
          <Image imageResource = {imageResource} src = {imgUrl} className = "who"/>
        </Suspense>
         <div className = "who_details">
            <h4> {name} </h4>
         <h5 className = "date">  { longAgo(when) } </h5>
       </div>
     </header>
    
   )
}

const BottamTab = () => {
    
    const [Color,setColor] = useState(0);
    let arr = ['black','#ff4081'];
   
   return (

          <section>
              <div className = "secContain">  
               <AiFillHeart size = '1.5rem' className = 'heart' color = {arr[Color]}
                onClick = {()=>setColor((Color + 1) % 2)}
               />
              </div> 
               <div className = "secContain">  
                <FaComment size = '1.5rem' className = 'comment' />
               </div> 
             </section>


    )



}


//calculating time of posts

const longAgo = (time) => {
    
    let Time = (Date.now() - time) / 1000;
     
    const units = ['mins','hours','days','months','years'];
    const timeDivisor = [60,60,24,30,365];
    let unit = 'sec';
    let i = 0;
   
   while( i < 5 && (Time / timeDivisor[i]) > 1){ 
       Time = Time / timeDivisor[i];
       unit = units[i]; 
       i++;
   }
  
  Time = parseInt(Time);
  return (Time + " " + unit + " " + "ago"); 

}

//These are fallback loaders for suspense

const Preview  = () => {
    return(
     <header>
        <div className = 'who-preview'/>
         <div className = 'who-datails-preview'>
           <div className = 'preview-up' />
           <div className = 'preview-down' />
         </div>
     </header>
  
  )
}
const Image = ({src,imageResource,className}) => {
   
   imageResource.image.read(src);
   return (
      <img src = {src} className = {className}/> 
    )
}



export default AddPost;