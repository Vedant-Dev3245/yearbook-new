import { Flex, Box, useMediaQuery, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

export default function Searchpolls(props) {
  const [res, setRes] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [label, setLabel] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          url: `${process.env.REACT_APP_BACKEND_URL}/profiles/search?name=${inputValue}`,
        })
          .then(function (response) {
            let tempArray = [];
            response.data.users.forEach((element) => {
              tempArray.push({
                label: `${element.name} ${element.bitsId} `,
                value: `${element.uId}`,
              });
            });
            callback(tempArray);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  };
  const onSearchChange = (option) => {
    if (option) {
      setSpin(true);
      axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        url: `${process.env.REACT_APP_BACKEND_URL}/polls/${props.id}/vote`, //updated the url here for choosing your friend
        data: { targetId: option.value },
      })
        .then(function (res) {
          console.log(res);
          setMsg(res.data.msg);
          setRes(true);
          setSpin(false);
          setLabel("");
          setTimeout(() => {
            setRes(false);
          }, 3000);
        })
        .catch(function (err) {
          setMsg(err.response.data.msg);
          console.log(err);
          setSpin(false);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        });
    }
  };

  return (
    <Box position={"relative"}>
      {/* <Text mt="3rem" mb="1rem" fontSize="1.5rem" fontWeight="800">name</Text> */}
      <Flex alignItems="center" w="100%">
        <Box w="100%">
          {" "}
          <AsyncSelect
            value={{ label }}
            loadOptions={fetchData}
            placeholder="choose your friend"
            className="voteFriend"
            classNamePrefix="selectOptNom"
            onChange={(e) => {
              onSearchChange(e);
            }}
            defaultOptions={true}
          />
        </Box>
      </Flex>
      {/* <Text mt="2rem" fontSize="1.5rem" fontWeight="800">bitsid</Text> */}
      {/* <Input disabled marginBlock="1rem" p="1.2rem" w={isSmallerThan800 ? "80%" : "40%"} border="1px solid #6C6C6C !important" color="white" value={exists ? bitsid : "check bits id here"}/> */}
      {/* <Flex alignItems={"center"} justifyContent="center" cursor="pointer" mt="2rem" border="1px solid #C9C9C9" bgColor="rgba(255, 255, 255, 0.1)" padding="0.5rem 1.5rem" borderRadius="1rem" w="216px" h="59px" fontWeight={"600"} onClick={chooseFriend}>Choose your friend</Flex> */}
      <Spinner size="lg" mt="1rem" display={spin ? "block" : "none"} />
      <Alert
        bg="#242323"
        color="white"
        status="error"
        display={alert ? "block" : "none"}
        position="absolute"
        w="80%"
        bottom="5rem"
        left="0"
      >
        <AlertIcon />
        {msg}
      </Alert>
      <Alert
        bg="#242323"
        color="white"
        status="success"
        display={res ? "block" : "none"}
        position="absolute"
        w="80%"
        bottom="-5rem"
        left="0"
      >
        <AlertIcon />
        {msg}
      </Alert>
    </Box>
  );
}
