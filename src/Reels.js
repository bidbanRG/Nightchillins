import React,{useRef,useEffect,useContext,useState} from 'react';
import axios from 'axios';
import Loader from './Loader';
import { URL ,preset, uploadVideoURL} from './uri';
import {UserContext,UserPost} from './UserContext'
import { useInView,InView } from 'react-intersection-observer';
import './reels.css'
import {StoryContext} from './Context/StoriesContext';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import {MdThumbDown,MdThumbUp} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';


function Reels({storynumber}){
   const { Person } = useContext(UserContext);
   const { REELS,setREELS} = useContext(StoryContext);
   const {setstorynumber} = useContext(UserPost);
   
 
   const descriptionRef = useRef("");
   

   const [swipe,setswipe] = useState(true); 
   const [videoChoosen,setVideoChoosen] = useState(false);          
   const [onFirst,setonFirst] = useState(1);
   const [loading,setLoading] = useState(false);
 let navigate = useNavigate();
 const onClose = ()=>{
    navigate(-1);
 }
  let ADD = 'ADD+'

  const onStoryClose = ()=>{ 
      setstorynumber(-1);
      onClose();
  }
 
  

   const upload_REEL = async ()=>{

         
         try{
            
            if(descriptionRef.current.value.length === 0)
                return alert('Add Description to your Story');
            
            const Data = new FormData();
            Data.append('file',videoChoosen);
            Data.append('upload_preset',preset);
            setLoading(true);
            const { data } = await axios.post(uploadVideoURL,Data);
            const { url } = data;
            console.log(url);
            if(!url){
               setLoading(false);
             return alert('Something went wrong');
           }

           const UploadReel = {
                Description:descriptionRef.current.value,
                PostUrl:url,
                Userid:Person._id,
                When:Date.now()
            }
            console.log(UploadReel);
            const response = await axios.post(URL + '/stories',UploadReel); 
               setLoading(false);
           console.log(response.data);
           setREELS([response.data, ...REELS]);
           navigate(-1);
         }catch(error){
            setLoading(false);
            return alert(error.message);
         }
         
             
         
      

    }
  

  const onVideoSelection = (e)=>{
       const file = e.target.files[0];
        if(!file) return;
        if(!file.type.includes("video")){
            videoChoosen(false);
            return alert('file must be a Video')     
        }
        
        if(file.size > 5000000){
            videoChoosen(false);
            return alert('Oops file size must be less than 5mb!!');
        } 
           
       setVideoChoosen(file);   
 }  
   



  

 if(storynumber > -1){


 

return (<div className = 'back'> 
          <div className = 'reels'> 
            { onFirst && 
                 <div className = 'swipe-up'> 
              
                <span> Swipe Up To Watch Next </span>
                  <div className = 'swipe-btn' onClick={()=>{setonFirst(false)}}> OK </div>             
                </div> 
            }
                  {
                REELS.slice(storynumber,REELS.length).concat(REELS.slice(0,storynumber)).map((obj)=>(
                   
                    <Video key = {obj._id}  {...obj} Close = {onClose} />
                  ))
                }

           </div>
         </div>
    )
 }
        


        return (
           <div className = 'back'>

          

              <div className = 'reels'>
            {loading && <Loader/>}  
        { swipe &&   <div className = 'swipe-up' onScroll = {()=>{setswipe(false)}}> 
              
                <span> Swipe Up To Watch Or Continue to Add </span>
                <div className = 'swipe-btn' onClick={()=>{setswipe(false)}}> Continue </div>             
           </div> }
                <div className = 'addreels'>
                     <button onClick = {onClose} style = {{backgroundColor:'black',color:'white',height:'40px',width: '40px'}}>  
                         X
                     </button>
                     <div className='uploadreels'> 
                      
                       <h1>  
                         { !videoChoosen ?
                              ADD :
                              <div className = 'reel-text'>
                                
                                 <div className = 'opiloka'>
                                  <marquee>
                                     {videoChoosen.name}
                                  </marquee>
                                </div>
                              </div>   
                         }
                       </h1>
                     </div>
                    <input  className = 'addfile' type = 'file' onChange = {onVideoSelection}/>
                    <input ref = {descriptionRef} onChange = {(e)=>{descriptionRef.current.value = e.target.value}} className = 'adddesc' type = 'text' placeholder = ' add description...' autoFocus/>
                    <div className = 'reel-send-btn' onClick = {upload_REEL} > <h1> SEND </h1> </div>
                 </div>
               <AllReels Close = {onClose}/>   
           
              </div>

           </div>
        )
   
    

   
}

const AllReels = ({Close}) => {
     const { REELS,setREELS} = useContext(StoryContext);
  return <> {REELS.map((obj) =>  <Video key = {obj._id}  {...obj} Close = {Close}/>)} </> 
}



function Video(obj){

     
 

    
   const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });
  
	const { Userid,Description, PostUrl,Close} = obj;
    const [User,setUser] = useState(false);
	const videoRef = useRef();
    const handleReels = (e)=>{
    	
      if(e.target.paused) e.target.play();
      else e.target.pause();
    }
   const fun = async () => {
        try{
            
            const {data} = await axios.post(URL + '/users/getbyId',{ _id:Userid });
            setUser(data[0]);      
        }catch(error){
          console.log(error.message);
        }
}

useEffect(()=>{
        if(videoRef){
          
        	if(inView){
                videoRef.current.play();

            }
             else 
              videoRef.current.pause();   
            
           videoRef.current.currentTime = 0;
       }  

},[inView])


useEffect(() => {
    fun();
},[]);




	return( 
    
   
         
      <div ref = {ref} onChange = {(inView, entry) => console.log('Inview:', inView)} className = 'reel_parent'> 
          <button onClick = {Close}> X </button>
           
       <video ref = {videoRef} src={PostUrl} type="video/mp4" className = 'reel'  autoPlay loop 
          onClick = {handleReels}> 
      </video>
          <div className = 'auro'> 
              <div className = 'avtar-content'>
                <div className = 'avtar-reel' style = {{backgroundImage : `url(${User && User.imgUrl})`}} ></div>
                <h3> {User && User.name} </h3>
              </div>  
              <div className = 'reel-description'> 
              <div className = 'reel-text'>
        
             <marquee>
               <h4> {Description} </h4>
             </marquee>
                 </div>
              </div>
             <div className = 'like-comment'> 
                 <AiFillHeart size = '1.5rem' className = 'reels-icons'/>
               
                 <MdThumbDown size = '1.5rem' className = 'reels-icons'/>
                 <MdThumbUp size = '1.5rem' className = 'reels-icons'/>
             </div>

           </div>
      
       </div>
	 
      

    )

}

export default Reels


// /************************************************************

//     Following is the Binary Tree node structure

//     class BinaryTreeNode 
//     {
//         public : 
//         T data;
//         BinaryTreeNode<T> *left;
//         BinaryTreeNode<T> *right;

//         BinaryTreeNode(T data) 
//         {
//             this -> data = data;
//             left = NULL;
//             right = NULL;
//         }
//     };

// ************************************************************/
// int TIME = 0;
// int BurnTreeBelowStart(BinaryTreeNode<int>* root){
//     if(root == NULL) return -1;
//    return max(BurnTreeBelowStart(root->left),BurnTreeBelowStart(root->right)) + 1;  
// }
// int BurnTreeAboveStart(BinaryTreeNode<int>* root,BinaryTreeNode<int>* block){
//      if(root == NULL || root == block) return -1;
    
//      int time = max(BurnTreeAboveStart(root->left,block),BurnTreeAboveStart(root->right,block)) + 1;
//     TIME = max(time,TIME);
//     return time;
// }
// int maxTime(BinaryTreeNode<int>* root,int start){
//     if(start == root->data){
//         TIME = BurnTreeBelowStart(root);
//         return -1;
//     }
//    int FromLeft = maxTime(root->left,start);
//     if(FromLeft == -1) BurnTreeAboveStart(root,root->left);
//    int FromRight = maxTime(root->right,start);
//     if(FromRight == -1) BurnTreeAboveStart(root,root->right);
//     return 0;
// }  
// int timeToBurnTree(BinaryTreeNode<int>* root, int start)
// {
//        maxTime(root,start);
//      return TIME;
// }
//Veronica Havenna 
//Cassia Carvalho
//Danyelle Carvalho
//Monik Lorran