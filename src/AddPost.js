import React,{useContext,useState} from 'react';
import {UserContext,UserPost} from './UserContext';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import './Addpost.css'
import ShowProfileOnClick from './ShowProfileOnClick'

function AddPost(person){

    const {Person,plqx178} = useContext(UserContext);
   
   const GetUser = ()=>{
      for(var i = 0; i < plqx178.length; i++){
         if(plqx178[i].id === person.Userid)
            {    
                return plqx178[i];
            }  
      }
      return {Name:'NOT_FOUND'}
   }
 
 const {setgetPost} = useContext(UserPost);
   const WHO = GetUser();
 
  
  const {Name,ImgUrl} = WHO;
  const {Text,Posturl} = person;
   const [showReels,setshowReels] = useState(false);
   const [showprofile,Setshowprofile] = useState(false);
   const [showpost,Setshowpost] = useState(false);
   const [Color,setColor] = useState(0);
   let arr = ['black','#ff4081'];
    const date = new Date();
  const DATE = date.toString().split(" ");
  if(Name === 'NOT_FOUND') return (<div> </div>);
	return(
        <div className = 'addpost' > 
         {showprofile && <ShowProfileOnClick onClose = {()=>Setshowprofile(false)} url = {ImgUrl}/>}
           { person.Type !== 'text' && showpost && <ShowProfileOnClick onClose = {()=>Setshowpost(false)} url = {Posturl}/>}
             <header onClick = {()=>{Setshowprofile(true)}}> 
              <div  className = "who" style = {{backgroundImage:`url(${ImgUrl})`,backgroundPosition :'center'}}></div>
              <div className = "who_details">
              <h4> {Name} </h4>
               <h5 className = "date">  { DATE[0] + " " + DATE[1] + " " + DATE[2] + " " + DATE[3] } </h5>
              </div>
             </header>
             {   (person.Type === 'text') ?
                <p>{Text}</p> :
                 <div onClick = {()=>{Setshowpost(true)}} className = "PostImage" style = {{backgroundImage: `url(${Posturl})` }}>  </div> 
            }
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

        
       </div>
      )
}


export default AddPost;