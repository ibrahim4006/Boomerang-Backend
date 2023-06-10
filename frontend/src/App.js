import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./App.css";
import Snake from "./pages/snake/Snake";
import Istila from "./pages/istila/Istila";
import Hangman from "./pages/hangman/Hangman";
import Iskambil from "./pages/iskambil/Iskambil";
import Meydan from "./pages/meydan/Meydan";
import MiniDeneme from "./pages/minideneme/MiniDeneme";
import GenelDeneme from "./pages/geneldeneme/GenelDeneme";
import { useContext, useEffect, useState } from "react";
import Quote from "./pages/quote/Quote";
import Panel from "./pages/panel/Panel";
import TytGenelAdder from "./questionadder/TytGenelAdder";
import NewDeneme from "./newdesign/NewDeneme";
import RectangleDrawer from "./newdesign/RectangleDrawer";
import ImageHover from "./newdesign/ImageHover";
import TestPartGenelDeneme from "./pages/geneldeneme/TestPartGenelDeneme";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./FireBaseConfig";
import { AuthContext } from "./context/AuthContext";
import Mesajlar from "./mesajlar/Mesajlar";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const webgazer = window.webgazer;
  //   webgazer.setGazeListener((data, clock) => {}).begin();
  // }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route path="/adder" element={user ? <TytGenelAdder /> : <Navigate to="/login" />} />           */}
          <Route
            path="/signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/login" />}
          />
          {/* <Route path="/quote" element={user ? <Quote />: undefined} /> */}
          <Route
            path="/"
            element={currentUser ? <Meydan /> : <Navigate to="/login" />}
          />
          <Route
            path="/panel"
            element={currentUser ? <Panel /> : <Navigate to="/login" />}
          />
          <Route
            path="/istila"
            element={currentUser ? <Istila /> : <Navigate to="/login" />}
          />
          <Route
            path="/snake"
            element={currentUser ? <Snake /> : <Navigate to="/login" />}
          />
          <Route
            path="/hangman"
            element={currentUser ? <Hangman /> : <Navigate to="/login" />}
          />
          <Route
            path="/iskambil"
            element={currentUser ? <Iskambil /> : <Navigate to="/login" />}
          />
          <Route
            path="/minideneme"
            element={currentUser ? <MiniDeneme /> : <Navigate to="/login" />}
          />
          <Route
            path="/geneldeneme"
            element={currentUser ? <GenelDeneme /> : <Navigate to="/login" />}
          />
          <Route
            path="/mesajlar"
            element={
              currentUser ? (
                <ChatContextProvider>
                  <Mesajlar />
                </ChatContextProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
