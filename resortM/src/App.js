import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Games from "./components/Games";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ResortTable from "./components/ResortTable";
import UserTable from "./components/UserTable";
import LoginPage from "./pages/LoginPage";
import UserPanel from "./pages/UserPanel";
import {useState, useEffect } from 'react';
import NotFound from "./pages/NotFound";
import GameListing from "./components/GameListing";


function App() {
  const [profile, setProfile] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const adminInfo = JSON.parse(localStorage.getItem("admin"));

  // useEffect(() => {
  //   if(adminInfo) {
  //     setProfile(adminInfo)
  //    }
  //    else {
  //      setProfile(userInfo)
  //    }
  //  },[adminInfo, userInfo])
  return (
    <>
      
     
      <Routes>
      {/* <Route path="/" element={<LoginPage/>} />         */}
      
      <Route path="/" element={!profile ? <LoginPage /> : <Navigate to="home"/>}/>
      <Route path="home" element={<Home/>} >
        <Route path="games" element = {<Games/>}/>
        <Route path="resorttable" element={<ResortTable />} />
        <Route path="usertable" element={<UserTable />} />
      </Route>
      <Route path="userpanel" element={<UserPanel/>} />
      <Route path="gamelist" element={<GameListing/>} />
      <Route path="*" element={<NotFound/>} />
      </Routes>  
        
        


        
       
        
      
       

          
      
     
    </>
  );
}

export default App;
