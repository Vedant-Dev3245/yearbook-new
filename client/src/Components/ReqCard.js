import React from "react";
import {
  Box,
  Flex,
  Text,
  useMediaQuery,
  Alert,
  AlertIcon,
  Spacer,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function ReqCard(props) {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [showRequest, setShowRequest] = React.useState(true);
  const [msg, setMsg] = React.useState("");
  const [res, setRes] = React.useState(false);
  // const[reqestsUser,setRequestsUser]=React.useState([])
  // const navigate = useNavigate()
  // console.log(props)
  const [captionData, setCaptionData] = React.useState({
    caption: "",
    receiverId: props.id,
  });
  let acceptData = {
    receiverId: props.id,
    // targetId: localStorage.getItem("userdId")
  };
  function handleAcceptReq() {
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/nominate`,
      data: acceptData,
    })
      .then(function (response) {
        console.log(response);
        setShowRequest(false);
        setMsg(response.data.success);
        // navigate(`/profile/${props.id}`)
        setRes(true);
        setTimeout(() => {
          setRes(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(captionData);
  }

  const handleDeclineReq = () => {
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/decline`,
      data: acceptData,
    })
      .then(function (response) {
        console.log(response);
        setShowRequest(false);
        setMsg(response.data.success);
        // navigate(`/profile/${props.id}`)
        setRes(true);
        setTimeout(() => {
          setRes(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(captionData);
  };

  //   React.useEffect(() =>{
  //     axios({
  //         method:'GET',
  //         headers: {
  //             Authorization : `Bearer ${localStorage.token}`,
  //         },
  //         url: `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`
  //     })
  //     .then(function(response){
  //         setRequestsUser(response.data)
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //       });
  //   })

  return (
    <>
      {showRequest && (
        <Flex
          bg="#151515"
          p="1.3rem 1rem"
          className="card"
          color="#DCEDFB"
          marginRight="1rem"
          marginBottom="1rem"
          opacity="0.8"
          w={isSmallerThan800 ? "100%" : "max-width"}
          alignItems={"center"}
          backdropFilter="blur(40px)"
          borderRadius="20px"
          justifyContent="space-between"
          flexWrap="wrap"
          border="1px solid rgba(255, 255, 255, 0.5)"
          fontWeight="700"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
          <Alert
            bg="#242323"
            color="white"
            status="success"
            display={res ? "block" : "none"}
            position="absolute"
            w="100%"
            bottom="8rem"
            left="0"
            borderRadius="20px"
          >
            <AlertIcon />
            {msg}
          </Alert>
          <Flex
            bgColor={"rgba(255, 255, 255, 0.05)"}
            border="1px solid rgba(255, 255, 255, 0.25)"
            borderRadius="3rem"
            w="fit-content"
            p="0.3rem 0.8rem"
          >
            <Text fontWeight={"600"} fontSize="0.9rem">
              {props.name}
            </Text>
          </Flex>
          <Box
            lineHeight="1.3rem"
            fontSize="1rem"
            color="#FFFFFF"
            fontWeight="400"
            marginBlock={isSmallerThan800 ? "0.6rem" : "0"}
            marginInline={isSmallerThan800 ? "0" : "1rem"}
          >
            wrote on your wall: {props.caption}
          </Box>

          <Flex gap={2}>
            <Flex
              onClick={handleAcceptReq}
              borderRadius="50%"
              bgColor="white"
              border="1.17225px solid #FFC62D"
              h="2rem"
              w="2rem"
              boxShadow="0px 0px 17.5838px rgba(255, 255, 255, 0.5)"
              alignItems={"center"}
              justifyContent="center"
            >
              <CheckIcon fontSize="1.2rem" cursor="pointer" color="black" />
            </Flex>
            <Spacer />
            <Flex
              onClick={handleDeclineReq}
              borderRadius="50%"
              bgColor="white"
              border="1.17225px solid #FFC62D"
              h="2rem"
              w="2rem"
              boxShadow="0px 0px 17.5838px rgba(255, 255, 255, 0.5)"
              alignItems={"center"}
              justifyContent="center"
            >
              <CloseIcon fontSize="1.0rem" cursor="pointer" color="black" />
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
