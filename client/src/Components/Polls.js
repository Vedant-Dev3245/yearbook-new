import React, { useState, useEffect } from "react";
import PollsCards from "./PollsCards";
import "./Polls.css";
import axios from "axios";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";

export default function Polls(props) {
  const [pollsData, setPollsData] = useState([]);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");

  // To enable Polls uncomment the following
  /* React.useEffect(() => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/polls`,
    })
      .then(function (response) {
        console.log(response);
        setPollsData(response?.data?.polls);
        console.log(response.data.polls);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); */

  const pollsCards = pollsData?.map((questions, index) => {
    const number = (index + 1).toString().padStart(2, "0");
    return (
      <PollsCards
        key={questions.poll_id}
        number={number}
        id={questions.poll_id}
        pollqn={questions.question}
      />
    );
  });

  return (
    <div className="polls">
      <Box
        ml={isSmallerThan800 ? "1rem" : "5rem"}
        fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
        fontWeight="800"
      >
        your turn now,{" "}
        <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
          tell us who
        </Text>
      </Box>

      <Box mt={"2rem"} className="pollscards">{pollsCards}</Box>
    </div>
  );
}
