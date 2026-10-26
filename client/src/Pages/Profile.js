import { Box, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import ProfileInfo from "../Components/ProfileInfo";
import ProfileNav from "../Components/ProfileNav";
import Interact from "../Components/Interact";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import ProfilePdfButton from "../Components/ProfilePdfButton";

export default function Profile(props) {
  const profileRef = useRef();
  const interactRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [pdf, setPdf] = useState(false);
  const [user, setUser] = useState({
    captions: [],
    discipline: "",
    email: "",
    imageUrl: "",
    name: "",
    nominatedby: [],
    quote: "",
    __v: 0,
    _id: "",
    bitsId: "",
    commitments: [],
    senior: false,
  });

  useEffect(() => {
    if (
      localStorage.token === undefined ||
      localStorage.token === "undefined"
    ) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
      alert("You have been logged out. Please log-in again!");
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/profiles/${params.id}`,
    })
      .then(function (response) {
        setUser(response.data);
        setLoading(false);
        if (params.id === window.localStorage.getItem("user")) {
          window.localStorage.setItem("userName", response.data.name);
          window.localStorage.setItem(
            "nominatedBy",
            JSON.stringify(response.data.nominatedby)
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
      window.location.reload();
    }
  }, [params.id, navigate]);

  return (
    <Box
      bg="linear-gradient(144deg, #050505 9%, #081018 32.99%, #110B1B 50.05%, #060508 82.44%, #020202 92.26%)"
      color="white"
      overflowX="hidden"
      overflowY="hidden"
    >
      <Flex
        justifyContent={"center"}
        alignItems="center"
        position="fixed"
        zIndex="6"
        w="100%"
        h="120vh"
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

      <ProfileNav />

      <div ref={profileRef}>
        <ProfileInfo
          name={user.name}
          quote={user.quote}
          userid={user.userID}
          id={user.bitsId}
          discipline={
            user.bitsId.indexOf("PS") === -1
              ? user.bitsId.slice(4, 8)
              : user.bitsId[4] + user.bitsId[5]
          }
          imgUrl={user.imageUrl}
          commitments={user.commitments}
          senior={user.senior}
          setPdf={setPdf}
        />

        <Interact
          ref={interactRef}
          captions={user.captions}
          nominatedby={user.nominatedby}
          name={user.name}
          bitsId={user.bitsId}
          id={params.id}
          commitments={user.commitments}
          senior={user.senior}
        />

        {pdf && (
          <ProfilePdfButton
            pdf={pdf}
            profileRef={profileRef}
            interactRef={interactRef} 
            onComplete={() => setPdf(false)}
          />
        )}
      </div>
    </Box>
  );
}
