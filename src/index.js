import React from 'react';
import ReactDOM from 'react-dom';
import StoryProvider from './Context/StoriesContext';
import PostsProvider from './Context/PostsContext';
import UserProvider from './Context/UserContext';
import AddPostProvider from './Context/AddPostContext';
import AddPostProvider2 from './Context/AddPostContext2';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <UserProvider>
      <PostsProvider>
        <StoryProvider>
         <AddPostProvider>
          <AddPostProvider2>
            <App />
          </AddPostProvider2> 
         </AddPostProvider> 
        </StoryProvider>
      </PostsProvider>
     </UserProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
