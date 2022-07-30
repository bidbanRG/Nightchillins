import { useEffect,useState,Suspense } from "react";
import React from 'react'
import axios from "axios";
import { createImageResource  } from './api/ImageApi';
import {URL} from './uri';
import owl from './owl-huh.gif';
import './news.css'
const imageResource = createImageResource();
const News = () => {
	 let newsdata = null;
   
   const Data = useGetNews();
    newsdata = Data.articles;
  
   return(
        <div className = 'news_content'>
          
        
            {(newsdata == null) ? <>
             <div className="loaderp"> <div className="loader-photop"></div> </div>
             <div className="loaderp"> <div className="loader-photop"></div> </div>
             <div className="loaderp"> <div className="loader-photop"></div> </div>
             <div className="loaderp"> <div className="loader-photop"></div> </div>
             <div className="loaderp"> <div className="loader-photop"></div> </div>
        </> :
         
             newsdata.map((obj,index)=>(
                 <Articles key = {index} url = {obj.url} urlToImage = {obj.urlToImage} title = {obj.title}/> 
                  
            ))
          
        }
           
        
        </div>
   )
}
function Articles({url,urlToImage,title}){
    return (
        <div className = 'news_card'>
          <a href = {url} target = '_blank'> 
          <Suspense fallback = {<img src = {urlToImage} className = "news_image_loader"/> }> 
            <Image imgurl = {urlToImage} alt = 'Img' />
           </Suspense>
            <h5> {title} </h5>
          </a>  
        </div>
    )
}
function Image({imgurl}){
    imageResource.image.read(imgurl);
   return(
      <img src = {imgurl} className = 'Img1p' /> 
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
export default News;