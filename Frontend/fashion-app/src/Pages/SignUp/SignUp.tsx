import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

import style from "./signup.module.css";
//Regex for the sign up
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// pwd required at least 1 lowercase char, uppercase char one digit and one special char all of len 8-24
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z0-9!@#$%]).{4,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() = > {
  //   userRef.current.focus();

  // }, [])
  //init the foucs on the user name
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  //user name use effect
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //email  use effect
  useEffect(() => {
    const result = EMAIL_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidEmail(result);
  }, [email]);

  // pwd and match pwd use effect
  useEffect(() => {
    const result = USER_REGEX.test(pwd);
    console.log(result);
    console.log(user);
    setValidPwd(result);
    const match = pwd == matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //msg use effect
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <p
          ref={errRef}
          className={`${errMsg ? style.errmsg : style.offscreen}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <p
              ref={errRef}
              className={`${errMsg ? style.errmsg : style.offscreen}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label className={style.label} htmlFor="username">
                  {/* then based of the "action" in the username input field we render the needed Icon 
                    in this case a green V or red X */}
                  User name:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${validName ? style.valid : style.hide}`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validName || !user ? style.hide : style.invalid
                    }`}
                  />
                </label>
                <TextField
                  type="text"
                  id="username"
                  //   label="User name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  fullWidth
                  aria-describedby="userIdNote"
                  aria-invalid={validName ? "false" : "true"}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="userIdNote"
                  className={`${
                    userFocus && user && !validName
                      ? style.instructions
                      : style.offscreen
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <label className={style.label} htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${validPwd ? style.valid : style.hide}`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validPwd || !pwd ? style.hide : style.invalid
                    }`}
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  //   name="password"
                  label="Password"
                  type="password"
                  value={pwd}
                  //   ref={userRef}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={`${
                    pwdFocus && !validPwd ? style.instructions : style.offscreen
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Can only include uppercase, lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <label className={style.label} htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${
                      validMatch && matchPwd ? style.valid : style.hide
                    }`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validMatch || !matchPwd ? style.hide : style.invalid
                    }`}
                  />
                </label>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="confirm_pwd"
                  //   label="Confirm Password"
                  name="Confirm Password"
                  value={matchPwd}
                  //   ref={userRef}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={`${
                    matchFocus && !validMatch
                      ? style.instructions
                      : style.offscreen
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>

                {/* <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button> */}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
