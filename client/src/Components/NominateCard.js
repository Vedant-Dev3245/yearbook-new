import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Button,
  useMediaQuery,
  Alert,
  AlertIcon,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NominateCard(props) {
  // useEffect(() => {
  //     console.log(props.name)
  // })

  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [msg, setMsg] = React.useState("");
  const [res, setRes] = React.useState(false);
  const navigate = useNavigate();
  const [submitToggle, setSubmitToggle] = React.useState(true);
  const handleClose = () => {
    setIsOpen(false);
  };
  function toggleSubmit() {
    if (submitToggle) {
      setSubmitToggle(false);
    } else {
      setSubmitToggle(true);
    }
  }
  const handleOpen = () => {
    setIsOpen(true);
  };

  const [captionData, setCaptionData] = React.useState({
    caption: "",
    receiverId: props.id,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCaptionData((prevCaptionData) => {
      return {
        ...prevCaptionData,
        [name]: value,
      };
    });
  }

  function submitCaption() {
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/profiles/${captionData.receiverId}/caption`,
      data: captionData,
    })
      .then(function (response) {
        console.log(response);
        setIsOpen(false);
        setMsg(response.data.success);
        navigate(`/profile/${props.id}`);
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

  const [isOpen, setIsOpen] = React.useState(false);
  return (
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
        {/* <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src="./images/pic.png" /> */}
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
        nominated you to write on their wall
      </Box>
      <Flex
        onClick={handleOpen}
        borderRadius="50%"
        bgColor="white"
        border="1.17225px solid #FFC62D"
        h="2rem"
        w="2rem"
        boxShadow="0px 0px 17.5838px rgba(255, 255, 255, 0.5)"
        alignItems={"center"}
        justifyContent="center"
      >
        <ArrowForwardIcon fontSize="1.4rem" cursor="pointer" color="black" />
      </Flex>
      <Modal isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          backdropFilter="blur(47.5676px)"
          bgColor="#1D1E22"
          color="white"
          p="1.4rem"
        >
          <ModalHeader mt="2rem" fontSize="2rem">
            write caption for {props.name}
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody mt="0.5rem" fontSize="1rem" w="100%">
            <Textarea
              type="text"
              name="caption"
              placeholder="enter your caption!"
              onChange={handleChange}
            />
            <Text fontWeight="600" color="#B3B3B3" mt="1rem">
              You must accept these guidelines before writing a caption
              <br />
              <br />
              1. The quote must only be written in English. Refrain from using
              any other script or emojis.
              <br />
              2. Offensive quotes will not be accepted. Your quote must not
              defame or criticize any individual.
              <br />
              3. Please refrain from using any expletives.
              <br />
            </Text>
            <br />
            <Checkbox onChange={toggleSubmit}>I accept these terms.</Checkbox>
            <Flex justifyContent="center">
              <Button
                onClick={submitCaption}
                _hover={{
                  transform: "translate(-2px, -2px)",
                  bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
                }}
                bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
                fontWeight="700"
                mt="3rem"
                p="1.2rem 1.6rem"
                fontSize="1.4rem"
                colorScheme="blackAlpha"
                isDisabled={submitToggle}
              >
                submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
