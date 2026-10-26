import { Box, Text, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NominateCard from "./NominateCard";
import ReqCard from "./ReqCard";
import axios from "axios";

export default function Nominate(props) {
  const nominateArray = props.nominatedBy;
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");

  const cardsNom = Array.from(nominateArray).map((person) => {
    return (
      <NominateCard
        name={person.nominator.name.toLowerCase()}
        key={person.nominator.userID}
        id={person.nominator.userID}
      />
    );
  });

  const [reqestsUser, setRequestsUser] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`,
    })
      .then(function (response) {
        setRequestsUser(response.data.requests);
        // console.log(response.data.requests);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const cardsReq = reqestsUser.map((person) => {
    return (
      <ReqCard
        name={person.writer.name.toLowerCase()}
        key={person.writer}
        id={person.writerID}
        caption={person.caption}
      />
    );
  });

  return (
    <Box width="90%" marginInline="auto">
      <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} fontWeight="800">
        {nominateArray.length === 0
          ? "do you want to write some"
          : nominateArray.length === 1
            ? `a friend wants you to write them a `
            : `damnn... ${nominateArray.length - 1}+ `}{" "}
        <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
           nomination{nominateArray.length === 1 ? "" : "s"}
        </Text>
      </Box>
      {/* <Text color="#B3B3B3" fontSize="1.2rem" w={isSmallerThan800 ? "100%" : "50%"} mt="0.5rem">the credit score checker allows you to calculate your credit score report and cibil score. it is a three-digit numeric expression that represents your creditworthiness.</Text> */}
      <Flex
        width={isSmallerThan800 ? "100%" : "95%"}
        mt="4rem"
        pb="4rem"
        flexFlow={"wrap"}
        justifyContent="left"
      >
        {cardsNom}
      </Flex>
      <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} fontWeight="800">
        {reqestsUser.length === 0
          ? ""
          : reqestsUser.length === 1
            ? `here's a friend with a  `
            : `you're famous, ${reqestsUser.length - 1}+ new`}{" "}
        <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
          {reqestsUser.length > 0 ? reqestsUser.length === 1 ? "caption" : "captions" : ""}
        </Text>
      </Box>
      <Flex
        width={isSmallerThan800 ? "100%" : "95%"}
        mt="2rem"
        pb="4rem"
        flexFlow={"wrap"}
        justifyContent="left"
      >
        {cardsReq}
      </Flex>
    </Box>
  );
}
