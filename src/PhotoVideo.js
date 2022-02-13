import React,{useContext,useState} from 'react';
import {UserContext} from './UserContext'
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import './photovideo.css'

function PhotoVideo(obj){
	 const {Person} = useContext(UserContext);
   const {Name,ImgUrl} = Person;
   const date = new Date();
  const DATE = date.toString().split(" ");
    const [Color,setColor] = useState(0);
   let arr = ['black','#ff4081'];
     console.log(obj);
	return (
		<div className = 'Photovideo'>
          <header> 
              <div className = "who" style = {{backgroundImage:`url(${ImgUrl})`,backgroundPosition :'center center'}}></div>
              <div className = "who_details">
              <h4> {Name} </h4>
               <h5 className = "date">{
                     DATE[0] + " " + DATE[1] + " " + DATE[2] + " " + DATE[3] 
                } </h5>
              </div>
             </header>  
           <div className = "PostImage">  </div> 
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


		</div>);
}
// var day1 = new Date("08/25/2020"); 
// var day2 = new Date("08/25/2021");

// var difference= Math.abs(day2-day1);
// days = difference/(1000 * 3600 * 24)

// console.log(days)

export default PhotoVideo;