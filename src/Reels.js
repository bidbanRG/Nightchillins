import React,{useRef,useEffect,useContext,useState} from 'react';
import './App.css'
import Ticker from 'react-ticker'
import {db,app_storage} from './firebase';
import {storage} from './firebase'
import {collection,getDocs,addDoc,updateDoc,doc,query,where,onSnapshot,add,orderBy} from 'firebase/firestore';
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";
import {UserContext,UserPost} from './UserContext'
import { useInView,InView } from 'react-intersection-observer';
import './reels.css'
import './App.css'
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from  'react-icons/fa';
import {MdThumbDown,MdThumbUp} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';
function Reels({storynumber}){
   const {Person,plqx178} = useContext(UserContext);
   const {setstorynumber} = useContext(UserPost);
   
   const reelRef = useRef();
   const descriptionRef = useRef("");
   const [REELS,setREELS] = useState([]);
   const [clickREELS,setclickREELS] = useState([]);
   const [filename,setfilename] = useState('__');
   const [swipe,setswipe] = useState(true); 
   const [correct,setcorrect] = useState(false);
   const [onUpload,setonUpload] = useState(false);          
    useEffect(()=>{
       const USERS_REELS = collection(db,"reels"); 
       const q = query(USERS_REELS,orderBy('when','desc'));
       
            onSnapshot(q,(snap)=>{
           setREELS(snap.docs.map((doc)=>({...doc.data(), id:doc.id})))
          
       });

          
     },[REELS.length])   

   const upload_REEL_DATA = async (url)=>{
     const USERS_REELS = collection(db,"reels"); 
    await addDoc(USERS_REELS,
          {when:Date.now(),
           Name:Person.Name,
           ImgUrl:Person.ImgUrl,
           Description:descriptionRef.current.value,
           ReelUrl:url  
         })
   }  
   const upload_REEL = async ()=>{

          if(!correct){
             alert('Nothing is Added');
             return;
          }
             
            const file = reelRef.current.files[0];
            setcorrect(true);
             const imgRef = ref(storage,`reels/${Date.now()}`);
            setonUpload(true);
            let upload = await uploadBytes(imgRef,file);
            let url = await getDownloadURL(imgRef);
           upload_REEL_DATA(url);   
         setfilename('__');
         setonUpload(false);       
         navigate(-1);
      

    }
 let navigate = useNavigate();
 const onClose = ()=>{
    navigate(-1);
 }
  let head = 'ADD+'

  const onStoryClose = ()=>{ 
      setstorynumber(-1);
      onClose();
  }
 
  const [onFirst,setonFirst] = useState(1);

const onVideoSelection = (e)=>{
    const file = e.target.files[0];
    
        if(file.size > 5000000) {
            alert('Oops file size must be less than 5mb!!');
           setcorrect(false);
            return;
        }
    if(file.type.includes("video")){
        setfilename(e.target.files[0].name);
        console.log(file.duration);
        setcorrect(true);
        return;
    }
   
   
     alert('file must a Video')
     setcorrect(false);
        return;
}  
   



   function Loader(){
      return (
         <div className = 'loading'>  

                    <div className = "spin_in"><div className = 'spin'> </div>   

             </div> </div>
      )
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
                REELS.slice(storynumber,REELS.length).concat(REELS.slice(0,storynumber)).map((data)=>(
                   
                    <Video key = {data.id} src = {data.ReelUrl} Data = {data} Close = {onStoryClose}/>
                  ))
                }

           </div>
         </div>
    )
 }
        


        return (
           <div className = 'back'>

          

              <div className = 'reels'>
            {onUpload && <Loader/>}  
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
                         { (filename === '__') ?
                              head :
                              <div className = 'reel-text'>
                                
                                 <div className = 'opiloka'>
                                <Ticker mode = 'smooth'>
                                      {({ index }) => (
                                 filename
                                 )}
                                 </Ticker>
                                </div>
                              </div>   
                         }
                       </h1>
                     </div>
                    <input ref = {reelRef} className = 'addfile' type = 'file' onChange = {onVideoSelection}/>
                    <input ref = {descriptionRef} onChange = {(e)=>{descriptionRef.current.value = e.target.value}} className = 'adddesc' type = 'text' placeholder = ' add description...' autoFocus/>
                    <div className = 'reel-send-btn' onClick = {upload_REEL} > <h1> SEND </h1> </div>
                 </div>
                {
                  REELS.map((data)=>(
                   
                    <Video key = {data.id} src = {data.ReelUrl} Data = {data} Close = {onClose}/>
                  ))
                }
                  
           
              </div>

           </div>
        )
   
    

   
}

function Video({src,Data,Close}){

     
  
    
   const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });
  
	
	const videoRef = useRef();
    const handleReels = (e)=>{
    	
      if(e.target.paused) e.target.play();
      else e.target.pause();
    }
  
    useEffect(()=>{
        if(videoRef){
        
        	if(inView) 
               videoRef.current.play();   
            else 
              videoRef.current.pause();   
            
        videoRef.current.currentTime = 0;
        }  

},[inView])
      const {Name,ImgUrl,Description} = Data;

	return( 
    
   
         
      <div ref = {ref} onChange = {(inView, entry) => console.log('Inview:', inView)} className = 'reel_parent'> 
          <button onClick = {Close}> X </button>  
       <video ref = {videoRef} src={src} type="video/mp4" className = 'reel'  autoPlay loop 
          onClick = {handleReels}> 
      </video>
          <div className = 'auro'> 
              <div className = 'avtar-content'>
                <div className = 'avtar-reel' style = {{backgroundImage : `url(${ImgUrl})`}} ></div>
                <h3> {Name} </h3>
              </div>  
              <div className = 'reel-description'> 
              <div className = 'reel-text'>
        
                 <Ticker mode = 'smooth'>
        {({ index }) => (
               <h4> {Description} </h4>
        )}
    </Ticker>
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