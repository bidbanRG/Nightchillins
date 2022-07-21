import React,{useContext,useState,useEffect,Suspense} from 'react';
import {UserContext} from './UserContext';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Addpost.css'
import Loader from './Loader';
import { createResource } from './api/PersonApi';
import { createImageResource } from './api/ImageApi'

import ShowProfileOnClick from './ShowProfileOnClick'


function AddPost(){

    const [POST,setPOST] = useState([]);
    const { URL } = useContext(UserContext);
    const [loading,setLoading] = useState(false); 
    
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


    
return <> {POST.map( (obj) =>  <PostView key = {obj._id}  {...obj} /> )} </> 
       
}



const PostView = (obj) => {
  
  // console.log(longAgo(obj.When));
 
    
    const personResource = createResource();
     

   return (
         <div className = 'addpost' > 
    
          <Suspense fallback = { <Preview/> }>
             <Profile resource = {personResource} id = {obj.Userid} when = {obj.When} />
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

const Profile = ({resource,id,when}) => {
 
  const person = resource.person.read({_id:id});
  console.log(person);
  const { name, imgUrl } = person;
   const ImageResource = createImageResource();
   
   
   return( 
    
      <header> 
        <Suspense fallback = {<img src = {imgUrl} className = "who preview"/> }>
          <Image imgResource = {ImageResource} src = {imgUrl} className = "who"/>
        </Suspense>
         <div className = "who_details">
            <h4> {name} </h4>
         <h5 className = "date">  { longAgo(when) } </h5>
       </div>
     </header>
    
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
const Image = ({src,imgResource,className}) => {
   
   imgResource.image.read(src);
   return (
      <img src = {src} className = {className}/> 
    )
}



export default AddPost;