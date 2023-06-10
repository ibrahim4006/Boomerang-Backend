import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../FireBaseConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};










// import { createContext, useReducer, useEffect } from "react";


// export const AuthContext = createContext()

// export const authReducer = (state,action) => {
//     switch (action.type){
//         case "LOGIN":
//             return {user: action.payload}
//         case "LOGOUT":
//             return {user: null}
//         default :
//             return state
//     }
// }

// export const AuthContextProvider = ({children}) => {
//     const [state, dispatch] = useReducer(authReducer, {
//         user: null
//     })

//     useEffect(() =>{
//         const user = JSON.parse(localStorage.getItem("user"))

//         if(user) {
//             dispatch({ type: "LOGIN", payload: user})
//         }
//     },[])

//     console.log("AuthContext state:", state)

//     return (
//         <AuthContext.Provider value={{...state, dispatch}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
