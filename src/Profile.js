import React,{Suspense,useContext} from 'react';
import './Addpost.css';
import { createImageResource  } from './api/ImageApi';
import {UserContext} from './UserContext'


 const imageResource = createImageResource();

const Profile = () => {

	const { Person } = useContext(UserContext);

   const { imgUrl } = Person;
  
    return (
    	<Suspense fallback = {<img src = {imgUrl} className = "who preview"/> }>
            <Image src = {imgUrl} />
        </Suspense>
      )
}

const Image = ({src}) => {
     
     imageResource.image.read(src);
   
   return (
      <img src = {src} className = 'who'/> 
    )
}


export default Profile;