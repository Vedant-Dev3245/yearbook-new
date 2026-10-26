import React, { useState } from "react";
import "./Stats.css";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import StatsCards from "./StatsCards";

export default function Stats() {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [leaders, setLeaders] = useState([]);
  // To enable Leaderboard uncomment the following
  /* React.useEffect(() => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/polls/leaderboard`,
    })
      .then(function (response) {
        setLeaders(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); */
  const statCards = leaders.map((leader, index) => {
    return <StatsCards key={index} user={leader} />;
  });

  return (
    <div className="statspg">
      <Box
        ml={isSmallerThan800 ? "1rem" : "5rem"}
        fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
        fontWeight="800"
      >
        welcome to the{" "}
        <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
          yearbook{" "}
        </Text>
        awards!
      </Box>

      <div className="statsContent">{statCards}</div>
    </div>
  );
}
