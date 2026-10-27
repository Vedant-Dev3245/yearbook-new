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
  VStack,
  Wrap,
  WrapItem,
  Image,
  FormLabel,
  Textarea,
  FormHelperText,
  Button,
  Input,
  FormControl,
  Checkbox,
  useMediaQuery,
  Link,
  Alert,
  AlertIcon,
  useDisclosure,
  useToast,
  HStack,
  Hide,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
import { Icon, Spinner } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary, thumb } from "../cloudinary";
import Tags from "./Tags"



export default function ProfileInfo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isWriteOpen, onOpen: onWriteOpen, onClose: onWriteClose } = useDisclosure();
  const toast = useToast();
  const [ownProfile, setOwnProfile] = React.useState();
  const [showEdit, setShowEdit] = React.useState();
  const [spin, setSpin] = React.useState(false);
  const [spin2, setSpin2] = React.useState(false);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [msg, setMsg] = React.useState("");
  const [res, setRes] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [imgExist, setImgExist] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    quote: "",
    imgUrl: props.imageUrl,
    commitments: [],
  });
  const [img, setImg] = React.useState();
  const [submitToggle, setSubmitToggle] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token);

  React.useEffect(() => {
    if (window.location.href.includes(localStorage.getItem("user"))) {
      setShowEdit(true);
      setOwnProfile(true);
    } else {
      setShowEdit(false);
      setOwnProfile(false);
    }
  }, [window.location.href]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo((prevFormInfo) => {
      return {
        ...prevFormInfo,
        [name]: value,
      };
    });
  }

  function onImageChange(e) {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    setImg(URL.createObjectURL(imageFile));
    setImgExist(true);
    setSpin2(true);
    setIsDisabled(true);
    uploadToCloudinary(imageFile)
      .then((url) => {
        setFormInfo((prevFormInfo) => ({ ...prevFormInfo, imgUrl: url }));
      })
      .catch((err) => {
        setImgExist(false);
        alert(err.message || "Photo upload failed. Please try again.");
      })
      .finally(() => {
        setIsDisabled(false);
        setSpin2(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let currentUser = localStorage.getItem("user");
    setTimeout(() => {
      axios({
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        url: `${process.env.REACT_APP_BACKEND_URL}/profiles/edit`,
        data: formInfo,
      })
        .then(function (response) {
          if (response.data.msg === "Successfully Updated") {
            let user = localStorage.getItem("user");
            document.location.reload();
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          onClose();
        });
    }, 5000);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
    document.location.reload();
  }

  function nominate() {
    let nominateData = {
      senderId: localStorage.getItem("user"),
      senderName: localStorage.getItem("userName"),
      receiverId: props.userid,
    }
    setSpin(true);
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/nominate`,
      data: nominateData,
    })
      .then(function (res) {
        console.log(nominateData);
        console.log(res.data.message);
        setMsg(res.data.message);
        setRes(true);
        setSpin(false);
        setTimeout(() => {
          setRes(false);
        }, 3000);
      })
      .catch(function (err) {
        setMsg(
          (err.response && err.response.data && err.response.data.message) ||
            "couldn't nominate, try again"
        );
        setRes(true)
        console.log(err);
        setSpin(false)
        setTimeout(() => {
          setRes(false)
        }, 3000);
      });
  }

  function handleChangeRequest(event) {
    const { name, value } = event.target;
    // console.log("name", name, "value", value)
    setCaptionData(value);
  }

  const [captionData, setCaptionData] = React.useState("");

  function sendRequest() {
    if (!captionData || !captionData.trim()) {
      toast({
        description: "write something first",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // if this person already nominated you, your caption goes straight to their wall;
    // otherwise it goes to them as a request for approval.
    const direct = (localStorage.getItem("nominatedBy") || "").includes(props.userid);

    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: direct
        ? `${process.env.REACT_APP_BACKEND_URL}/profiles/${props.userid}/caption`
        : `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`,
      data: {
        caption: captionData,
        targetId: props.userid,
      },
    })
      .then(function (res) {
        console.log(res);
        writeModalClose();
        setCaptionData("");
        toast({
          title: direct ? "posted on their wall ✓" : "sent for approval ✓",
          description: direct
            ? undefined
            : "they'll see it in their notifications and can approve it",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
        if (direct) {
          if (props.onRefresh) props.onRefresh();
          else window.location.reload();
        }
      })
      .catch(function (err) {
        console.log(err);
        const d = err.response && err.response.data;
        toast({
          description:
            (d && (d.message || d.error || d.msg)) ||
            "couldn't send, try again",
          status: "error",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  const toggleSubmit = (e) => {
    setSubmitToggle(e.target.checked);
  };

  const tagsData = props.commitments.map((commitment) => ({
    commitment: commitment.commitment_name,
  }));

  function writeModalClose() {
    setSubmitToggle(false);
    onWriteClose();
  };

  return (

    
    <div>
    <Flex
      className="infoFlex"
      alignItems="center"
      marginInline="auto"
      w="90%"
      mt="-4rem"
      p="1.2rem 0rem"
      justifyContent="space-between"
      
    >
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" w="80%">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          color="white"
          p="0.6rem"
          backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')"
          backgroundSize={"cover"}
          borderRadius="20px"
          maxH={isSmallerThan800 ? "420px" : "500px"} maxW={isSmallerThan800 ? "400px" : "550px"}
          overflow="visible"
        >
          <Box
            border="3px solid #FFFFFF"
            borderRadius="20px"
            backdropFilter="blur(47.5676px)"
            bgColor="#1D1E22"
            maxH={isSmallerThan800 ? "400px" : "480px"} maxW={isSmallerThan800 ? "400px" : "550px"}
            overflow="visible"
          >
            <ModalHeader
              fontSize={isSmallerThan800 ? "1.8rem" : "2rem"}
              textAlign="center"
              fontWeight={1100} 
            >
              update your profile
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              mt="-0.5rem"
              fontSize={isSmallerThan800 ? "0.6rem" : "0.8rem"}
              textAlign="center"
              color="#B3B3B3"
              mb="1rem"
              maxH="500px" maxW="550px"
            >
              <Text fontWeight="600" color="#B3B3B3">
                note: please refer to this{" "}
                <Link
                  fontWeight={800}
                  textDecor="underline"
                  color="#FFF"
                  href="https://shreyakhubber.notion.site/shreyakhubber/Yearbook-Portal-a40d3dfec7714184b04812205daf62e6"
                >
                  document
                </Link>{" "}
                before submitting your photo and quote for the yearbook portal.
              </Text>
              <FormControl mt={isSmallerThan800 ? "1rem" : "2rem"}>
                {props.senior ?
                  <Flex justifyContent="space-between" mx={isSmallerThan800 ? "-0.8rem" : "2rem"} alignItems="center">
                    <Box>
                      <Input
                        cursor="pointer"
                        id="file"
                        type="file"
                        onChange={onImageChange}
                        accept="image/*"
                        position="absolute"
                        right="100vw"
                        overflow="hidden"
                      />
                      <FormLabel
                        htmlFor="file"
                        textAlign={"center"}
                        fontWeight="700"
                        fontSize={isSmallerThan800 ? "0.5rem" : "0.8rem"}
                        pb={2}
                      >
                        <Text pb="2">please upload a 1080*1080 <br /> image to avoid cuts</Text>
                        <Image
                          src={imgExist ? img : thumb(props.imgUrl, 400)}
                          margin="auto"
                          cursor="pointer"
                          w="6rem"
                          h="6rem"
                        />
                        <Spinner
                          size="lg"
                          mt="1rem"
                          position="absolute"
                          display={spin2 ? "block" : "none"}
                        />
                      </FormLabel>
                    </Box>
                    <Box>
                      <FormLabel
                        cursor="pointer"
                        htmlFor="quote"
                        fontSize={isSmallerThan800 ? "0.8rem" : "1rem"}
                        fontWeight="600"
                        textAlign="center"
                      >
                        yearbook quote
                      </FormLabel>
                      <Textarea
                        w="90%"
                        maxLength="140"
                        borderColor="#444"
                        size="md"
                        resize="none"
                        id="quote"
                        onChange={handleChange}
                        p="0.8rem"
                        placeholder="enter your yearbook quote"
                        name="quote"
                        value={formInfo.quote}
                      />
                      <FormHelperText
                        mt="0.4rem"
                        mb={isSmallerThan800 ? "1rem" : "2rem"}
                      >
                        {formInfo.quote.length}/140 characters used
                      </FormHelperText>
                    </Box>
                  </Flex>
                  :
                  <Box>
                    <Input
                      cursor="pointer"
                      id="file"
                      type="file"
                      onChange={onImageChange}
                      accept="image/*"
                      position="absolute"
                      right="100vw"
                      overflow="hidden"
                    />
                    <FormLabel
                      htmlFor="file"
                      textAlign={"center"}
                      fontWeight="700"
                      fontSize={isSmallerThan800 ? "0.6rem" : "0.8rem"}
                      pb={2}
                    >
                      <Text pb="2">please upload a 1080*1080 <br /> image to avoid cuts</Text>
                      <Image
                        src={imgExist ? img : thumb(props.imgUrl, 400)}
                        margin="auto"
                        cursor="pointer"
                        w="8rem"
                        h="8rem"
                      />
                      <Spinner
                        size="lg"
                        mt="1rem"
                        position="absolute"
                        display={spin2 ? "block" : "none"}
                      />
                    </FormLabel>

                  </Box>
                }
                <Flex justifyContent={"center"}>
                  <Button
                    disabled={isDisabled}
                    onClick={handleSubmit}
                    _hover={{
                      transform: "translate(-2px, -2px)",
                      bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
                    }}
                    bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
                    fontWeight="700"
                    p="1.6rem 2rem"
                    fontSize="1.2rem"
                    colorScheme="blackAlpha"
                  >
                    submit
                  </Button>
                </Flex>
              </FormControl>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
      
     <Flex
  alignItems={isSmallerThan800 ? "center" : "center"}
  flexDirection={isSmallerThan800 ? "column" : "row"}
  justifyContent={isSmallerThan800 ? "left" : "center"}
  ml={isSmallerThan800 ? "" : "3rem"}
  mt="3rem"
  position="relative"
>
  <Box
    className="imageCont"
    bg={`url("${thumb(props.imgUrl, 900)}")`}
    backgroundPosition={"center"}
    backgroundSize={"cover"}
    minWidth={isSmallerThan800 ? "10rem" : "15rem"}
    minHeight={isSmallerThan800 ? "10rem" : "15rem"}
    maxW={isSmallerThan800 ? "10rem" : ""}
    maxH={isSmallerThan800 ? "10rem" : ""}
    position="relative"
    bgColor="grey"
    borderRadius="50%"
    border="2px solid #E1D4D4;"
    zIndex="1"
  >
    <Box
      cursor="pointer"
      onClick={onOpen}
      position="absolute"
      display={showEdit ? "block" : "none"}
      top="0"
      right="0px"
      p={isSmallerThan800 ? "0.5rem" : "1rem"}
      h={isSmallerThan800 ? "2.5rem" : "4rem"}
      w={isSmallerThan800 ? "2.5rem" : "4rem"}
      id="hide-for-pdf"
      className="pencil"
      zIndex="2"
    >
      <Icon w={isSmallerThan800 ? "1.4rem" : "2rem"} h={isSmallerThan800 ? "1.5rem" : "2rem"} as={TbPencil} />
    </Box>
  </Box>

  <VStack
  alignItems={isSmallerThan800 ? "center" : "baseline"}
  mt={isSmallerThan800 ? "1rem" : "0rem"}  
  ml={isSmallerThan800 ? "" : "3rem"}
  spacing="0.5rem"
>

    <Text
      color="white"
      fontWeight={700}
      letterSpacing="0.08rem"
      fontSize="2.2rem"
      textAlign="center"
    >
      {props.name.toLowerCase()}
    </Text>
    <Text
      color="#B3B3B3"
      fontWeight={300}
      opacity="0.75"
      fontSize="1.2rem"
    >
      {props.id} | {props.discipline}
    </Text>
    {props.senior && (
      <>
        <Box w="80%">
          <Text
            textAlign={isSmallerThan800 ? "center" : "left"}
            mt={isSmallerThan800 ? "0.4rem" : "1rem"}
            color="#DAE6FF"
            fontWeight="700"
            fontSize="1.2rem"
          >
            {props.quote}
          </Text>
        </Box>
        <Wrap spacing={1} justify="center">
          {tagsData
            .sort((a, b) => a.commitment.length - b.commitment.length)
            .map((tagData, index) => (
              <WrapItem key={index}>
                <Tags commitment={tagData.commitment} />
              </WrapItem>
            ))}
        </Wrap>
      </>
    )}
  </VStack>
</Flex>

      {decodedToken.senior ? <>
      {/* <div style={{marginTop:"6rem"}}> */}
         <Box
          className=""
          mr={isSmallerThan800 ? "0" : "2rem"}
          w="max-content"
          whiteSpace={"nowrap"}
          textAlign="center"
          position="relative"
          mt={isSmallerThan800 ? "2rem" : "0"}
          cursor={"pointer"}
          bgColor="rgba(255, 255, 255, 0.1)"
          fontSize="1rem"
          border="0.6px solid #C9C9C9"
          padding="0.6rem 1rem"
          borderRadius="20px"
          fontWeight="700"
          id="hide-for-pdf"
          onClick={() => ownProfile ? window.open('https://docs.google.com/forms/d/e/1FAIpQLScfkUTeHTClFclCfLU50CPvcwfwiss7cfJD8f_UxMfAqS5J3Q/viewform?usp=publish-editor', '_blank') : onWriteOpen()}
        >
          {ownProfile ? "opt-in for the yearbook!" : "write on their wall"}
        </Box> 
        {ownProfile && <Box
          mr={isSmallerThan800 ? "0" : "2rem"}
          w="max-content"
          whiteSpace={"nowrap"}
          textAlign="center"
          position="relative"
          mt={isSmallerThan800 ? "2rem" : "0"}
          cursor={"pointer"}
          bgColor="rgba(255, 255, 255, 0.1)"
          fontSize="1rem"
          border="0.6px solid #C9C9C9"
          padding="0.6rem 1rem"
          borderRadius="20px"
          fontWeight="700"
          margin="2rem"
          onClick={()=>{props.setPdf(true)}}
           id="hide-for-pdf"
        >
           save profile
        </Box>
}
        {/* </div> */}
        <Box
          w="max-content"
          whiteSpace={"nowrap"}
          textAlign="center"
          position="relative"
          mt={isSmallerThan800 ? "2rem" : "0"}
          cursor={"pointer"}
          bgColor="rgba(255, 255, 255, 0.1)"
          fontSize="1rem"
          border="0.6px solid #C9C9C9"
          padding="0.6rem 1rem"
          borderRadius="20px"
          fontWeight="700"
          onClick={ownProfile ? handleLogout : nominate}
         id="hide-for-pdf">
          {ownProfile ? "logout" : "nominate this user"}
          <Spinner
            size="lg"
            mt="1rem"
            position="absolute"
            display={spin ? "block" : "none"}
          />
        </Box>
      </> : <>
        <Box
          w="max-content"
          whiteSpace={"nowrap"}
          textAlign="center"
          position="relative"
          mt={isSmallerThan800 ? "2rem" : "0"}
          cursor={"pointer"}
          bgColor="rgba(255, 255, 255, 0.1)"
          fontSize="1rem"
          border="0.6px solid #C9C9C9"
          padding="0.6rem 1rem"
          borderRadius="20px"
          fontWeight="700"
          onClick={ownProfile ? handleLogout : onWriteOpen}
        >
          {ownProfile ? "logout" : "write on their wall"}
          <Spinner
            size="lg"
            mt="1rem"
            position="absolute"
            display={spin ? "block" : "none"}
          />
        </Box>
      </>}

      {/* Requesting people to write on their wall-Modal open for that */}
      <Modal isOpen={isWriteOpen} onClose={writeModalClose}>
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
          <ModalCloseButton />
          <ModalBody mt="0.5rem" fontSize="1rem" w="100%">
            <Textarea
              type="text"
              name="caption"
              maxLength="1000"
              placeholder="enter your caption!"
              onChange={handleChangeRequest}
              value={captionData}
            />
            <Text mt="0.4rem" mb="0rem">
              {captionData?.length || 0}/1000 characters used
            </Text>
            <Text fontWeight="600" color="#B3B3B3" mt="1rem">
              You must accept these guidelines before writing a caption<br /><br />
              1. The quote must only be written in English. Refrain from using any other script or emojis.<br />
              2. Offensive quotes will not be accepted. Your quote must not defame or criticize any individual.<br />
              3. Please refrain from using any expletives.<br />
            </Text>
            <br />
            <Checkbox onChange={toggleSubmit}>
              I accept these terms.
            </Checkbox>
            <Flex justifyContent="center">
              <Button
                onClick={sendRequest}
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
                isDisabled={!submitToggle}
              >
                request
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Requesting people to write on their wall-Modal open for that */}
      <Alert
        bg="#242323"
        color="white"
        display={!isSmallerThan800 && res ? "flex" : "none"}
        position="absolute"
        w="20%"
        whiteSpace={"normal"}
        top="14rem"
        right="6rem"
        borderRadius="20px"
      >
        <AlertIcon />
        {msg}
      </Alert>
      <Alert
        bg="#242323"
        color="white"
        display={isSmallerThan800 && res ? "flex" : "none"}
        position="fixed"
        w="60%"
        top="8rem"
        left="20%"
        borderRadius="20px"
      >
        <AlertIcon />
        {msg}
      </Alert>
    </Flex >
</div>    
  );
}