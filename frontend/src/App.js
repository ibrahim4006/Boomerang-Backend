import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./App.css"
import Snake from "./pages/snake/Snake";
import Istila from "./pages/istila/Istila";
import Hangman from "./pages/hangman/Hangman";
import Iskambil from "./pages/iskambil/Iskambil";
import Meydan from "./pages/meydan/Meydan";
import MiniDeneme from "./pages/minideneme/MiniDeneme";
import GenelDeneme from "./pages/geneldeneme/GenelDeneme";
import { useEffect } from "react";
import Quote from "./pages/quote/Quote";
import Panel from "./pages/panel/Panel";
import TytGenelAdder from "./questionadder/TytGenelAdder";
import NewDeneme from "./newdesign/NewDeneme";
import RectangleDrawer from "./newdesign/RectangleDrawer";
import ImageHover from "./newdesign/ImageHover";
import TestPartGenelDeneme from "./pages/geneldeneme/TestPartGenelDeneme";



function App() {
  const {user} = useAuthContext()

  useEffect(()=>{
    const webgazer = window.webgazer
    webgazer.setGazeListener((data,clock)=>{

    }).begin()
  },[])
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/meydan" />} />
          {/* <Route path="/adder" element={user ? <TytGenelAdder /> : <Navigate to="/login" />} />           */}
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/login" />} />
          {/* <Route path="/quote" element={user ? <Quote />: undefined} /> */}
          <Route path="/meydan" element={user ? <Meydan />: <Navigate to="/login"/>} />
          <Route path="/panel" element={user ? <Panel />: <Navigate to="/login"/>} />
          <Route path="meydan/istila" element={user ? <Istila />: <Navigate to="/login"/>} />
          <Route path="/meydan/snake" element={user ? <Snake />: <Navigate to="/login"/>} />
          <Route path="/meydan/hangman" element={user ? <Hangman />: <Navigate to="/login"/>} />
          <Route path="/meydan/iskambil" element={user ? <Iskambil />: <Navigate to="/login"/>} />
          <Route path="/meydan/minideneme" element={user ? <MiniDeneme />: <Navigate to="/login"/>} />
          <Route path="/meydan/geneldeneme" element={user ? <GenelDeneme />: <Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
