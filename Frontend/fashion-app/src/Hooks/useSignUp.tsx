import { useState, useEffect, useRef } from "react";
import axios from "axios";
//Regex for the sign up
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// pwd required at least 1 lowercase char or uppercase char can also have digit  special char all of len 8-24
const PWD_REGEX = /^(?=.*[a-zA-Z\d])[a-zA-Z\d!@#$%]{4,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// custom hooks for user signup styling and state management
const useUserValidation = () => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  return { user, setUser, validName, userFocus, setUserFocus, userRef };
};

const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  return { email, setEmail, validEmail, emailFocus, setEmailFocus };
};

const usePasswordValidation = () => {
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    console.log(`pwd use effect start with pwd: ${pwd}`);
    const result = PWD_REGEX.test(pwd);
    console.log(`pwd use effect regex resutl is: ${result}`);

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  return {
    pwd,
    setPwd,
    validPwd,
    pwdFocus,
    setPwdFocus,
    matchPwd,
    setMatchPwd,
    validMatch,
    matchFocus,
    setMatchFocus,
  };
};

type PostNewUser = {
  user: string;
  email: string;
  pwd: string;
};

const useRegistration = () => {
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [registerErrMsg, setRegisterErrMsg] = useState<string>("");

  const REGISTER_URL =
    "http://localhost:8123/auth/avivohayon/fashionai/sign-up/";

  const registerUser = async ({ user, email, pwd }: PostNewUser) => {
    const newUser: PostNewUser = { user, email, pwd };
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setRegisterSuccess(true);
      setRegisterErrMsg("");
      console.log(`post register user response: ${JSON.stringify(response)}`);
      return response.data;
    } catch (err) {
      const error = err as { response: { status: number } };
      if (!error.response) {
        console.log("No Server Response");
        setRegisterErrMsg("No Server Response");
      } else if (error.response.status === 409) {
        console.log("------------");
        console.log(error.response.status);
        setRegisterErrMsg("Username Taken");
      } else if (error.response.status === 500) {
        console.log("Internal Server Error");
        setRegisterErrMsg("Internal Server Error"); // Customize this message
      } else if (error.response.status === 400) {
        console.log("User, Email, and Password are required");
        setRegisterErrMsg("User, Email, and Password are required"); // Customize this message
      } else {
        console.log("Registration Failed");
        setRegisterErrMsg("Registration Failed");
      }
      throw err;
    }
  };
  return { registerSuccess, registerErrMsg, registerUser };
};

export {
  useUserValidation,
  useEmailValidation,
  usePasswordValidation,
  USER_REGEX,
  PWD_REGEX,
  EMAIL_REGEX,
  useRegistration,
};
