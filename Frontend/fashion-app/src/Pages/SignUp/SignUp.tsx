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
import {
  useUserValidation,
  usePasswordValidation,
  useEmailValidation,
  USER_REGEX,
  PWD_REGEX,
  EMAIL_REGEX,
  useRegistration,
} from "../../Hooks/useSignUp";

import style from "./signup.module.css";

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
type PostUser = {
  user: string;
  email: string;
  pwd: string;
};
export default function SignUp() {
  const errRef = useRef<HTMLInputElement>(null);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, setUser, validName, userFocus, setUserFocus, userRef } =
    useUserValidation();
  const { email, setEmail, validEmail, emailFocus, setEmailFocus } =
    useEmailValidation();
  const {
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
  } = usePasswordValidation();

  const { registerSuccess, registerErrMsg, registerUser } = useRegistration();

  //init the foucs on the user name
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  //msg use effect
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, matchPwd]);

  useEffect(() => {
    setErrMsg(registerErrMsg);
  }, [registerErrMsg]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await registerUser({ user, email, pwd });
      console.log(response);
      console.log(JSON.stringify(response));

      // Clear state and controlled inputs
      setSuccess(registerSuccess);
      setUser("");
      setPwd("");
      setEmail("");
      setMatchPwd("");
    } catch (err) {
      console.log("+++++++++++++++++++++++");
      console.log(`SignUp compoenet catch error: ${registerErrMsg}`);
      // setErrMsg(registerErrMsg);
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            {/* TODO need to add another link router to the sign in page */}
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <p
              ref={errRef}
              className={`${errMsg ? style.errmsg : style.offscreen}`}
              aria-live="assertive"
            >
              {errMsg}
            </p> */}

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
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                      value={user}
                      required
                      fullWidth
                      aria-describedby="userIdNote"
                      aria-invalid={validName ? "false" : "true"}
                      onChange={(e) => setUser(e.target.value)}
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
                    <label className={style.label} htmlFor="email">
                      {/* then based of the "action" in the username input field we render the needed Icon 
                    in this case a green V or red X */}
                      Email Address:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`${validEmail ? style.valid : style.hide}`}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={`${
                          validEmail || !email ? style.hide : style.invalid
                        }`}
                      />
                    </label>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      // label="Email Address"
                      type="text"
                      name="email"
                      autoComplete="email"
                      aria-describedby="emailNote"
                      aria-invalid={validName ? "false" : "true"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                    <p
                      id="emailNote"
                      className={`${
                        emailFocus && email && !validEmail
                          ? style.instructions
                          : style.offscreen
                      }`}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Enter a valid emaill address.
                    </p>
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
                    <TextField
                      required
                      fullWidth
                      id="password"
                      type="password"
                      value={pwd}
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onChange={(e) => setPwd(e.target.value)}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <p
                      id="pwdnote"
                      className={`${
                        pwdFocus && !validPwd
                          ? style.instructions
                          : style.offscreen
                      }`}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.
                      <br />
                      Can only include uppercase, lowercase letters, a number
                      and a special character.
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
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    !validName || !validEmail || !validPwd || !validMatch
                      ? true
                      : false
                  }
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  {/* TODO need to put router link in there */}

                  <Grid item>
                    <Link href="/avivohayon/fashionai/login/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
