import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import style from "../SignUp/signup.module.css";
import useAuth from "../../Hooks/useAuth";
import axios from "../../Hooks/axios";
import {
  Link as reactDomLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const LOGIN_URL = "/auth/login";

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

function getCookies() {
  const cookies: Record<string, string> = document.cookie
    .split("; ")
    .reduce((acc: Record<string, string>, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});
  return cookies;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  const { setAuth = () => {} } = useAuth() || {};

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          ///When withCredentials is set to true, it allows the browser to include credentials
          // in the request when making a cross-origin request. (such as cookies, HTTP authentication, and client-side SSL certificates)
          withCredentials: true,
        }
      );

      // console.log("------------------------------------");
      const coockies = getCookies();
      // console.log(`coockie access token is: ${coockies.access_token}`);
      // console.log(`coockie refresh token is: ${coockies.refresh_token}`);
      // console.log(`coockie login status  is: ${coockies.logged_in}`);

      const accessToken = response?.data?.accessToken;

      const roles = response?.data?.roles;

      const authData = {
        username: user,
        password: pwd,
        accessToken: accessToken,
        refreshToken: "", // You can set this to an empty string or null if you don't have a refresh token yet
        roles: roles,
      };

      setAuth((prev) => {
        return { ...prev, ...authData };
      });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
      // setSuccess(true);
    } catch (err) {
      const error = err as { response: { status: number } };

      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status == 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
    errRef.current?.focus();

    // console.log({
    //   username: data.get("username"),
    //   password: data.get("password"),
    // });
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?fashion)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              ref={errRef}
              className={`${errMsg ? style.errmsg : style.offscreen}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                value={user}
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/avivohayon/fashionai/sign-up/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
