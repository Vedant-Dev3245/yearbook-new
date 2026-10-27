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
  useToast,
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
  const toast = useToast();
  const [done, setDone] = React.useState(false);
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
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`,
      data: { caption: captionData.caption, targetId: props.id },
    })
      .then(function () {
        setIsOpen(false);
        // this invitation is answered, so the card goes away
        setDone(true);
        toast({
          title: "sent for approval ✓",
          description: "they'll see it in their notifications and can approve it",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
        const d = error.response && error.response.data;
        toast({
          description: (d && (d.message || d.error)) || "couldn't send, try again",
          status: "error",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      });
    // console.log(captionData);
  }

  const [isOpen, setIsOpen] = React.useState(false);
  if (done) return null;
  return (
    <Flex
      bg="#151515"
      p="1.3rem 1rem"
      className="card"
      color="#DCEDFB"
      opacity="0.8"
      w="100%"
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
      <Flex alignItems="center" gap="0.6rem" flexWrap="wrap">
        {props.unread && (
          <Box flexShrink={0} h="0.6rem" w="0.6rem" borderRadius="50%" bg="#FF6187" />
        )}
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
        <Text
          fontSize="0.7rem"
          fontWeight="600"
          color="#B3B3B3"
          border="1px solid rgba(255, 255, 255, 0.25)"
          borderRadius="3rem"
          p="0.15rem 0.6rem"
          whiteSpace="nowrap"
        >
          wants you to write a quote
        </Text>
      </Flex>
      <Box
        lineHeight="1.3rem"
        fontSize="1rem"
        color="#FFFFFF"
        fontWeight="400"
        marginBlock={isSmallerThan800 ? "0.6rem" : "0"}
        marginInline={isSmallerThan800 ? "0" : "1rem"}
        flex={isSmallerThan800 ? "none" : "1"}
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
            write quote for {props.name}
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody mt="0.5rem" fontSize="1rem" w="100%">
            <Textarea
              type="text"
              name="caption"
              placeholder="enter your quote!"
              onChange={handleChange}
            />
            <Text fontWeight="600" color="#B3B3B3" mt="1rem">
              You must accept these guidelines before writing a quote
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
