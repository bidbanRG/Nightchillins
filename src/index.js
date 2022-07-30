import React from 'react';
import ReactDOM from 'react-dom';
import StoryProvider from './Context/StoriesContext';
import PostsProvider from './Context/PostsContext';
import UserProvider from './Context/UserContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <UserProvider>
      <PostsProvider>
        <StoryProvider>
         <App />
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
