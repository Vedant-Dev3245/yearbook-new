import React from "react";
import {
  Box,
  Flex,
  Text,
  useMediaQuery,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import NewDot from "./NewDot";

export default function ReqCard(props) {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [busy, setBusy] = React.useState(false);
  const toast = useToast();

  // kind: "nominate" = approve the quote, "decline" = reject it
  function respond(kind) {
    if (busy) return;
    setBusy(true);
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/${kind}`,
      data: { receiverId: props.id },
    })
      .then(function () {
        toast({
          title: kind === "nominate" ? "quote approved ✓" : "quote declined",
          description: kind === "nominate" ? "it's now on your wall" : undefined,
          status: kind === "nominate" ? "success" : "info",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        // parent removes this card and refreshes the wall
        if (props.onDone) props.onDone(props.captionID, kind);
      })
      .catch(function (err) {
        setBusy(false);
        toast({
          description:
            (err.response && err.response.data && err.response.data.message) ||
            "something went wrong, try again",
          status: "error",
          position: "top",
          duration: 3500,
          isClosable: true,
        });
      });
  }

  const circleBtn = {
    borderRadius: "50%",
    bgColor: "white",
    border: "1.17225px solid #FFC62D",
    h: "2rem",
    w: "2rem",
    boxShadow: "0px 0px 17.5838px rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: busy ? 0.5 : 1,
  };

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
      <Flex alignItems="center" gap="0.6rem" flexWrap="wrap">
        {props.unread && <NewDot />}
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
          needs your approval
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
        wrote on your wall: {props.caption}
      </Box>

      <Flex gap={2}>
        <Flex {...circleBtn} onClick={() => respond("nominate")}>
          <CheckIcon fontSize="1.2rem" color="black" />
        </Flex>
        <Spacer />
        <Flex {...circleBtn} onClick={() => respond("decline")}>
          <CloseIcon fontSize="1.0rem" color="black" />
        </Flex>
      </Flex>
    </Flex>
  );
}