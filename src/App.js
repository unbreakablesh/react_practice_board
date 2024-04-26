import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Board from './Board'
import Login from "./login";
import {useState,useEffect} from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import DetailPost from "./detailPost";

import CreatePost from './Create'


// Axios 글로벌 설정
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;


function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginId, setLoginId] = useState('');
    const [userName, setUserName] = useState('');
    const [userRealName, setUserRealName] = useState('');






  return (
      <div className="App">

          <Routes>
              <Route path="/" element={

                  <>
                      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginId={loginId} setLoginId={setLoginId}
                             setUserName={setUserName} userName={userName} userRealName={userRealName} setUserRealName={setUserRealName} />
                      <Board isLoggedIn={isLoggedIn} loginId={loginId} userName={userName} userRealName={userRealName} />
                  </>

              }/>

              <Route path="/boardMain/:page" element={

                  <>
                      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginId={loginId} setLoginId={setLoginId}
                             setUserName={setUserName} userName={userName} userRealName={userRealName} setUserRealName={setUserRealName} />
                      <Board />
                  </>


              } />

              <Route  path="/detailPost/:id" element={<DetailPost isLoggedIn={isLoggedIn} loginId={loginId} userName={userName} userRealName={userRealName}/>}/>
              <Route  path="/create" element={<CreatePost/>}/>

          </Routes>






          {/*<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginId={loginId} setLoginId={setLoginId}*/}
          {/*       setUserName={setUserName} userName={userName} userRealName={userRealName} setUserRealName={setUserRealName}/>*/}
          {/*<Board isLoggedIn={isLoggedIn} loginId={loginId} userName={userName} userRealName={userRealName} />*/}
      </div>
  );
}

export default App;
