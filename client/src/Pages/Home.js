import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Working from "../Components/Working";
import Walkthrough from "../Components/Walkthrough";
import FAQ from "../Components/FAQ";
import Navbar from "../Components/Navbar";
import ScaleLoader from "react-spinners/ScaleLoader";
import OptIn from "../Components/OptIn";
import Spotify from "../Components/Spotify";
export default function Home() {
  function handleCallbackResponse(response) {
      console.log("📩 Got Google token:", response.credential); 
    var userObject = jwtDecode(response.credential);
    var token = response.credential;
    localStorage.setItem("token", token);
    console.log("📤 Sending token to backend..."); 
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
      data: { token: token },
    }).then(function (response) {
      // checkUser(userObject)
      if (!response.data.authorised) {
        isAuth(false);
        setLoading(false);
        setTimeout(() => {
          isAuth(true);
        }, 5000);
      } else {
        if (response.data.exists) {
          localStorage.setItem("user", response.data.user);
          localStorage.setItem("token", response.data.token);
          setLoading(false);
          navigate(`/profile/${response.data.user}`);  /* ORIGINAL */
          // navigate("/form", { state: userObject });
          // navigate("/junior", { state: userObject });
        } else {
          navigate("/form", { state: userObject });
          // navigate("/junior", { state: userObject });
        }
      }
    });
  }
  React.useEffect(() => {
    /* global google */

    if (localStorage.getItem("user") === null) {
      google.accounts.id.initialize({
        client_id:
          "82672622767-auemisd62etgdqec278abeb9gubq6lt2.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "medium",
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv2"), {
        theme: "outline",
        size: "medium",
      });
    }
  }, []);

  const [auth, isAuth] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // const [user, setUser] = React.useState({})
  const navigate = useNavigate();

  return (
    <Box overflowX="hidden" bg="#141414" className="noselect landing">
      <Flex
        justifyContent={"center"}
        alignItems="center"
        position="fixed"
        zIndex="26"
        w="100%"
        h="100vh"
        display={loading ? "flex" : "none"}
        bg="blackAlpha.400"
        backdropFilter="blur(10px)"
      >
        <ScaleLoader
          color="#D4D4D4"
          loading={loading}
          size={60}
          speedMultiplier={0.7}
        />
      </Flex>
      <Alert
        bg="#242323"
        color="white"
        status="error"
        display={auth ? "none" : "flex"}
        position="absolute"
        w="40%"
        top="12rem"
        right="0"
      >
        <AlertIcon />
        Sorry, you are not authorised to log-in.
      </Alert>
      <Navbar />
      <Hero />      
      <Working />
      <OptIn />
      <Spotify />
      <Walkthrough />
      <FAQ />
      <Footer />
    </Box>
  );
}
