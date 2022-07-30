import { useEffect,useState } from "react";
import React from 'react'
import axios from "axios";
import {URL} from './uri';
import owl from './owl-huh.gif';
import './right.css'
function Rightside() {
     let News = null;
   
   const Data = useGetNews();
    News = Data.articles;
  
   
    
 
     
    
  
   
    return (
        
        <div className = 'Right_content'>
            <RightHeader/>
        <div className = 'Right' >
            {(News == null) ? <div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
        </div> :
             News.map((obj,index)=>(
                <Articles key = {index} url = {obj.url} urlToImage = {obj.urlToImage} title = {obj.title}/> 
           ))}

        </div>
        </div>
      )
}

function Articles({url,urlToImage,title}){
    return (
        <div className="new">
          <a href = {url} target = '_blank'>  
            <Image imgurl = {urlToImage} alt = 'Img' />
            <h5> {title} </h5>
          </a>  
        </div>
    )
}
function Image({imgurl}){
   return(
      <img src = {imgurl} className = 'Img1' /> 
   )
}

const RightHeader = () => {

return( <div className = 'right_header'>
            <h2> What's New </h2>
            <div className = 'right_header_img'> 
            <img src = {owl} height = '60px' width = '60px'/>
            </div>
          </div>  
        )
}


function useGetNews(){
    const [Data,setData] = useState({});
   
    useEffect(()=>{
        
          axios.get(URL + '/news').then(function (response) {
              
               setData(response.data);               
          }).catch(function (error) {
              console.error(error);
              
          });
    
                   
            },[])
         return Data;
}
// function useGetwidth(){
//     const [Width,setWidth] = useState(window.innerWidth);
//     useEffect(() => {
//         window.addEventListener('resize',()=>setWidth(window.innerWidth));
//         return ()=>window.removeEventListener('resize',()=>setWidth(window.innerWidth));
//     },[Width])
//     return parseInt(Width);
// }
export default Rightside