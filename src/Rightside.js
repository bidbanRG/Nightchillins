import { useEffect,useState } from "react";
import React from 'react'
import axios from "axios";
import './right.css'
function Rightside() {
     let News = null;
   
   const Data = useGetNews();
    News = Data.articles;
  
   
    
 
     
    
  
   
    return (
        (News == null) ? <div className = "Right">
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
             <div className="loader"> <div className="loader-photo"></div> </div>
        </div> :
        <div className = 'Right' >
             {News.map((obj,index)=>(
                <Articles key = {index} url = {obj.url} urlToImage = {obj.urlToImage} title = {obj.title}/> 
           ))}
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



function useGetNews(){
    const [Data,setData] = useState({});
    const url = 'https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=93b229fa7bac49d3b0742bac0399e20a'       
    useEffect(()=>{
        
          axios.get(url).then(function (response) {
              
               setData(response.data);               
          }).catch(function (error) {
              console.error(error);
              
          });
    
                   
            },[url])
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