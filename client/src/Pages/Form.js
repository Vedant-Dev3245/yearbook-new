import React, { useEffect, useState } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import axios from "axios";
  import {
    Box,
    Input,
    Flex,
    Heading,
    Text,
    FormLabel,
    FormControl,
    FormHelperText,
    Button,
    Textarea,
    SimpleGrid,
    GridItem,
    Image,
    useMediaQuery,
    Alert,
    AlertIcon,
    Link,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    InputGroup,
    InputLeftElement,
    Checkbox,
    CheckboxGroup,
    VStack,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  import { ChevronDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
  import { uploadToCloudinary } from "../cloudinary";
  import jwtDecode from "jwt-decode";

  export default function Form() {
    // const validID = new RegExp(
    //   "[202][0-4][ABD][1-9AB]([AB][1-9AB]|PS|TS)[0-2][0-9][0-9][0-9]P|2023H1[0-9][0-9][0-2][0-9][0-9][0-9]P|2021D2PS[0-2][0-9][0-9][0-9]P"
    // );
    const validID = new RegExp(
      "[202][0-5][ABD][1-9AB]([AB][1-9AB]|PS|TS)[0-2][0-9][0-9][0-9]P|202[0-5]H[0-9]{7}P"
    );
    

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    useEffect(() => {
      if (data === undefined || data === null) {
        navigate("/");
      }
    }, [data, navigate]);
    const [clubsData, setClubsData] = useState([]);
    const [formInfo, setFormInfo] = React.useState({
      // firstName: 'shwetabh',
      firstName: data.given_name ? data.given_name : "",
      // lastName: 'niket',
      lastName: data.family_name ? data.family_name : "",
      quote: "",
      id: "",
      email: data ? data.email : "",
      // email: 'f20210923@pilani.bits-pilani.ac.in',
      pEmail: "",
      imgUrl: "",
      phone: "",
      commitments: [],
    });
    const [img, setImg] = React.useState();
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [imgExist, setImgExist] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [valid, setValid] = React.useState(false);
    const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
    const [isSmallerThan1100] = useMediaQuery("(max-width: 1100px)");
    const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

    const testSeniors = [
      "kumarh664@gmail.com",
      "devsatish08@gmail.com",
      "devtempacc08@gmail.com",
      "prithvi05prism@gmail.com",
      "alumnicell@pilani.bits-pilani.ac.in",
      "vedantjain250@gmail.com",
    ];
    function isSeniorEmail() {
      return (
        data.email.substring(0, 5) === "f2022" ||
        data.email.substring(0, 5) === "f2023" ||
        data.email.substring(0, 5) === "h2025" ||
        testSeniors.includes(data.email)
      );
    }

    function validate(e) {
      if (validID.test(formInfo.id)) {
        setValid(true);
        if (
          (isSeniorEmail())
            ? formInfo.id !== "" &&
            formInfo.quote !== "" &&
            formInfo.phone !== "" &&
            formInfo.pEmail !== "" &&
            formInfo.imgUrl !== "" &&
            imgExist
            : formInfo.id !== "" &&
            formInfo.phone !== "" &&
            formInfo.email !== "" &&
            formInfo.imgUrl !== "" &&
            imgExist
        ) {
          // ) {
          e.target.disabled = true;
          axios({
            method: "POST",
            // url: 'some/api',
            url: `${process.env.REACT_APP_BACKEND_URL}/auth/add`,
            data: { ...formInfo, token: localStorage.token },
          })
            .then(function (response) {
              if (response.status === 200) {
                const decodedToken = jwtDecode(response.data.token);
                // localStorage.setItem("user", response.data.id);
                // console.log("This is the UUID of the created user: ", decodedToken.id);
                localStorage.setItem("user", decodedToken.id);
                localStorage.setItem("token", response.data.token);
                // navigate(`/profile/${response.data.id}`);
                navigate(`/profile/${decodedToken.id}`);
              }
              // console.log(response);
            })
            .catch(function (error) {
              // console.log(error);
            });
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
      } else {
        setValid(false);
        alert("Please enter a valid BITS ID (eg. 2020A7PS0923P");
      }
    }

    function handleChange(event) {
      const { name, value } = event.target;
      setFormInfo((prevFormInfo) => {
        if (name === "id") {
          return {
            ...prevFormInfo,
            [name]: value.toUpperCase(),
          };
        } else {
          return {
            ...prevFormInfo,
            [name]: value,
          };
        }
      });
    }
    function onImageChange(e) {
      const imageFile = e.target.files[0];
      if (!imageFile) return;
      setImg(URL.createObjectURL(imageFile));
      setImgExist(true);
      setIsDisabled(true);
      uploadToCloudinary(imageFile)
        .then((url) => {
          setFormInfo((prevFormInfo) => ({ ...prevFormInfo, imgUrl: url }));
        })
        .catch((err) => {
          setImgExist(false);
          alert(err.message || "Photo upload failed. Please try again.");
        })
        .finally(() => setIsDisabled(false));
    }
    function handleSubmit(e) {
      e.preventDefault();
      if (!correctId(formInfo)) {
        alert("BITS ID and email do not match!");
        return;
      }
      validate(e);
    }

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect(() => {
      axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        url: `${process.env.REACT_APP_BACKEND_URL}/commitments`,
      })
        .then(function (response) {
          // console.log(response.data)
          const commitmentNames = response.data.map(item => item.commitment_name);
          setClubsData(commitmentNames);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }, []);

    const handleSelect = (values) => {
      setSelectedOptions(values);
      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        commitments: values,
      }));
    };

    const CustomCheckbox = ({ option, isChecked, onToggle }) => {
      return (
        <Box
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={() => onToggle(option)}
          border="2px solid"
          borderColor="white"
          width= {isSmallerThan900 ? "16px" : "20px"}
          height={isSmallerThan900 ? "16px" : "20px"}
          borderRadius="0.4rem"
          justifyContent="center"
          bg={isChecked ? "transparent" : "transparent"} 
          flexShrink={0}
        >
          {isChecked && (
            <Text fontSize="12px" color="white" lineHeight="20px">
              ✓
            </Text>
          )}
        </Box>
      );
    };

    const handleToggle = (option) => {
      let updatedValues;
      if (selectedOptions.includes(option)) {
        updatedValues = selectedOptions.filter((item) => item !== option);
      } else {
        updatedValues = [...selectedOptions, option];
      }
      handleSelect(updatedValues);
    };

    const handleSearch = (event) => {
      setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredClubs = clubsData.filter((club) =>
      club.toLowerCase().includes(searchTerm)
    );

    const handleDeselect = (option) => {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((item) => item !== option)
      );
    };

    function correctId() {
      if (formInfo.id && data.email) {
        const yearId = formInfo.id.slice(0, 4);
        const digitsId = formInfo.id.slice(8, 12);
        const yearEmail = data.email.slice(1, 5);
        const digitsEmail = data.email.slice(5, 9);
        if (yearId === yearEmail && digitsId === digitsEmail) {
          return true;
        }
      }
       if (testSeniors.includes(data.email)) {
      return true;
    }
    
    return false;
  }

  return (
    <Flex
      flexDirection={isSmallerThan900 ? "column" : "row"}
      minHeight="100vh"
      bg="black"
      className="noselect"
    >
      <Flex
        w={isSmallerThan900 ? "100%" : "60%"}
        backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        align="center"
        justify="center"
      >
        <Box
          boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
          bg="#242323"
          w={isSmallerThan900 ? "100%" : "80%"}
          color="white"
          border="3px"
          borderStyle="solid"
          borderColor="white.300"
          borderRadius="20px"
          marginBlock={isSmallerThan900 ? "2rem" : 0}
        >
          <Box pl={isSmallerThan500 ? "1.2rem" : "3rem"}>
            <Heading mt="2rem" fontSize={isSmallerThan1100 ? "3rem" : "3.6rem"}>
              join your{" "}
              <Box fontStyle="italic" display="inline" fontFamily="EB Garamond">
                batchies
              </Box>{" "}
            </Heading>
            <Text fontWeight="600" color="#B3B3B3" mt="1rem">
              note: please refer to this{" "}
              <Link
                fontWeight={800}
                textDecor="underline"
                href="https://shreyakhubber.notion.site/shreyakhubber/Yearbook-Portal-a40d3dfec7714184b04812205daf62e6"
              >
                document
              </Link>{" "}
              before submitting your photo and quote for the yearbook portal. yearbook quote and picture can be edited later
            </Text>
            <Box mt="2rem">
              <FormControl>
                <SimpleGrid columns={2} columnGap={2} rowGap={4} w="full">
                  <GridItem colSpan={1}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="firstName"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      first name
                    </FormLabel>
                    <Input
                      disabled={true}
                      opacity="1 !important"
                      id="firstName"
                      onChange={handleChange}
                      p="1.2rem 0.8rem"
                      w="80%"
                      placeholder="enter your first name here"
                      name="firstName"
                      type="text"
                      value={formInfo.firstName}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="lastName"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      last name
                    </FormLabel>
                    <Input
                      disabled={true}
                      opacity="1 !important"
                      id="lastName"
                      onChange={handleChange}
                      p="1.2rem 0.8rem"
                      w="80%"
                      placeholder="enter your last name here"
                      name="lastName"
                      type="text"
                      value={formInfo.lastName}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="email"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      personal email
                    </FormLabel>
                    <Input
                      pattern="f20[1-2]\d\d\d\d\d@pilani\.bits-pilani\.ac\.in"
                      opacity="1 !important"
                      w="90%"
                      id="email"
                      onChange={handleChange}
                      p="1.2rem 0.8rem"
                      placeholder="enter your personal mail here"
                      name="pEmail"
                      type="text"
                      value={formInfo.pEmail}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="id"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      bits id
                    </FormLabel>
                    <Input
                      w="90%"
                      id="id"
                      pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP"
                      onChange={handleChange}
                      p="1.2rem 0.8rem"
                      placeholder="enter your id number here"
                      name="id"
                      type="text"
                      value={formInfo.id}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="phone"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      phone
                    </FormLabel>
                    <Input
                      w="90%"
                      id="phone"
                      pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP"
                      onChange={handleChange}
                      p="1.2rem 0.8rem"
                      placeholder="enter your 10 digit phone number here"
                      name="phone"
                      type="number"
                      value={formInfo.phone}
                    />
                  </GridItem>
                  <GridItem colSpan={2} display={isSeniorEmail() ? "block" : "none"} pb={data.email.charAt(0) === 'h' ? "1rem" : ""}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="quote"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      yearbook quote
                    </FormLabel>
                    <Textarea
                      w="90%"
                      maxLength="140"
                      borderColor="#444"
                      size="sm"
                      resize="none"
                      id="quote"
                      onChange={handleChange}
                      p="0.8rem"
                      placeholder="enter your yearbook quote here"
                      name="quote"
                      value={formInfo.quote}
                    />
                    <FormHelperText mt="0.4rem" mb="0rem">
                      {formInfo.quote.length}/140 characters used
                    </FormHelperText>
                  </GridItem>
                  <GridItem colSpan={2} mb="2rem" display={data.email.charAt(0) === 'h' ? "none" : "block"}>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="commitments"
                      fontSize="20px"
                      fontWeight="600"
                    >
                      campus commitments
                    </FormLabel>
                    <Button
                      w="90%"
                      justifyContent="flex-start"
                      onClick={onOpen}
                      bg="#242323"
                      color="gray.400"
                      fontWeight="400"
                      borderWidth="1px"
                      borderColor="gray"
                      p="1.2rem 0.8rem"
                      _hover={{ borderColor: 'gray.300', bg: "#242323" }}
                    >
                      choose club/ department
                      <Box ml="auto">
                        <ChevronDownIcon />
                      </Box>
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                      <ModalOverlay
                        bg="rgba(0, 0, 0, 0.6)"
                        backdropFilter="blur(20px)"
                        zIndex="modal"
                      />
                      <ModalContent
                        bg="#242323"
                        maxW="56rem"
                        h={isSmallerThan900 ? "100%" : "90%"}
                        color="white"
                        p="0.6rem"
                        borderRadius="20px"
                        borderColor="#4B4B4B" borderWidth="3px"
                        className="noselect"
                      >
                        <ModalHeader fontSize="24px" fontWeight="700">campus commitments</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody overflowY="auto" width="100%" height="90%">
                          <Text mt="-0.96rem" mb="0.5rem" fontSize="16px" fontWeight="600" color="#B3B3B3">note: once submitted commitments can't be changed.</Text>
                          <InputGroup mb={1}>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<SearchIcon color="gray.300" />}
                            />
                            <Input
                              placeholder="search club/ department"
                              value={searchTerm}
                              onChange={handleSearch}
                            />
                          </InputGroup>
                          <Box mt="2rem">
                            <CheckboxGroup value={selectedOptions} onChange={handleSelect}>
                              <HStack align="start" spacing={4} justify="space-between">
                                {[0, 1, 2].slice(0, isSmallerThan900 ? 2 : 3).map((colIdx) => (
                                  <VStack
                                    key={colIdx}
                                    align="start"
                                    spacing={2}
                                    width={isSmallerThan900 ? "45%" : "30%"}
                                  >
                                    {filteredClubs
                                      .sort((a, b) => a.localeCompare(b))
                                      .filter((_, idx) => idx % (isSmallerThan900 ? 2 : 3) === colIdx)
                                      .map((option, idx) => (
                                        <HStack key={idx} spacing={2} alignItems="center">
                                          <CustomCheckbox
                                            option={option}
                                            isChecked={selectedOptions.includes(option)}
                                            onToggle={handleToggle}
                                          />
                                          <Text fontSize="14px">{option}</Text>
                                        </HStack>
                                      ))}
                                  </VStack>
                                ))}
                              </HStack>
                            </CheckboxGroup>
                          </Box>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Box pt={4} mr="1.2rem">
                      {selectedOptions.length > 0 ? (
                        <HStack align="start" mt={2} spacing={2} flexWrap="wrap" mb={2}> 
                          {selectedOptions.map((option, idx) => (
                            <HStack key={idx} spacing={1}>
                              <Box
                                bg="#edf2f7"
                                color="black"
                                p={isSmallerThan900 ? "1.4" : "2"}
                                spacing={2}
                                width="100%"
                                display="flex"
                                alignItems="center"
                                borderRadius="md"
                                fontSize={isSmallerThan900 ? "12px" : "12px"}
                                fontWeight="600"
                              ><Box flex="1" pl="1">{option}</Box>
                                <IconButton
                                  icon={<CloseIcon />}
                                  color="#242323"
                                  size="xs"
                                  onClick={() => handleDeselect(option)}
                                />
                              </Box>
                            </HStack>
                          ))}
                        </HStack>
                      ) : (
                        <Box mt={2}></Box>
                      )}
                    </Box>
                  </GridItem>
                </SimpleGrid>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Flex
        color="white"
        w={isSmallerThan900 ? "100%" : "40%"}
        bg="#242323"
        textAlign="center"
        justify="center"
      >
        <Box spacing={2}>
          <Box mt="8rem">
            {" "}
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
            <FormLabel htmlFor="file" position="relative">
              <Text
                display={imgExist ? "none" : "block"}
                textAlign="center"
                fontWeight="600"
              >
                insert picture here
              </Text>
              <Image
                src={imgExist ? img : "../images/pic.png"}
                margin="auto"
                cursor="pointer"
                w="300px"
                h="300px"
                borderRadius="48px"
              />
            </FormLabel>
          </Box>
          <Box
            fontFamily="Gilmer"
            fontSize="3rem"
            mt="2rem"
            fontWeight="800"
            lineHeight="2.8rem"
          >
            {formInfo.firstName.toUpperCase()} <br />
            {formInfo.lastName == undefined
              ? ""
              : formInfo.lastName.toUpperCase()}
          </Box>
          <Box fontSize="1.2rem" mt="1.6rem" color="#B3B3B3" fontWeight="600" pb={isSeniorEmail() ? "" : "1.8rem"}>
            {formInfo.email}
          </Box>
          <Box fontSize="1.2rem" color="#B3B3B3" fontWeight="600">
            {formInfo.id.toUpperCase()}
          </Box>
          <Box
            fontSize="1.8rem"
            color="#B3B3B3"
            letterSpacing="-0.1rem"
            fontFamily="Gilmer"
            fontWeight="700"
            w="60%"
            marginInline="auto"
            marginBlock="2rem"
            lineHeight="1.8rem"
            display={isSeniorEmail() ? "block" : "none"}
          >
            {' "' + formInfo.quote + '" '}
          </Box>
          <Button
            disabled={isDisabled}
            className="button"
            onClick={handleSubmit}
            mb={isSmallerThan900 ? "3rem" : "0"}
            _hover={{
              transform: "translate(-2px, -2px)",
              bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
            }}
            bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
            fontWeight="700"
            p="2.4rem 3.2rem"
            fontSize="2rem"
            colorScheme="blackAlpha"
          >
            submit
          </Button>
        </Box>
      </Flex>
      <Alert
        bg="#242323"
        color="white"
        status="error"
        display={error ? "block" : "none"}
        position="absolute"
        w="40%"
        bottom="0"
        right="0"
      >
        <AlertIcon />
        Please enter all the fields.
      </Alert>
    </Flex>
  );
}