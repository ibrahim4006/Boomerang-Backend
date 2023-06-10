import React, { useState } from "react";
import "./SignUp.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { storage, firestore } from "../../FireBaseConfig";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    console.log(password);
    // Check if password contains at least one letter, one number, one special character, and minimum length of 8 characters
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/;
    console.log(regex.test(password));
    return regex.test(password);
  };

  const addNewUserHandler = async (event) => {
    event.preventDefault();

    try {
      if (validatePassword(password)) {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${userName + date}`);

        await uploadBytesResumable(storageRef, profilePic).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                userName,
                photoURL: downloadURL,
              });

              //create user on firestore
              await setDoc(doc(firestore, "users", res.user.uid), {
                uid: res.user.uid,
                userName,
                email,
                photoURL: downloadURL,
                dateOfBirth
              });

              //create empty user chats on firestore
              await setDoc(doc(firestore, "userChats", res.user.uid), {});
              setSuccessMsg("User added successfully.");
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            } catch (err) {
              setErrorMsg(err.message);
            }
          });
        });
      } else {
        setErrorMsg(
          "Weak password. Password must contain at least one letter, one number, and one special character. Also length must be greater than 7."
        );
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email. Please enter a valid email address.";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/weak-password":
          errorMessage = "Weak password. Please enter a stronger password.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
          break;
      }

      setErrorMsg(errorMessage);
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <>
      <form onSubmit={addNewUserHandler}>
        <input
          id="username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
          placeholder="Enter your username"
        />
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <input
          id="dateofbirth"
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          type="date"
          placeholder="Choose Your Birth Date"
        />
        <input
          id="profilephoto"
          onChange={(e) => setProfilePic(e.target.files[0])}
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          placeholder="Choose a Profile Pic"
        />
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        {errorMsg && <div className="error">{errorMsg}</div>}
        {successMsg && <div className="success">{successMsg}</div>}
      </form>
    </>
  );
}

export default SignUp;
