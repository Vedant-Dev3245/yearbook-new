import React from "react";
// import { Box, Flex, Text } from "@chakra-ui/react";
import Searchpolls from "./Searchpolls";
import "./Polls.css";

export default function PollsCards(props) {
  return (
    <div className="pollscardsprops">
      <div className="pollsnumber">{props.number}</div>
      <div className="pollsqns">{props.pollqn}</div>
      <div className="dropdownpolls">
        <Searchpolls id={props.id} />
      </div>
    </div>
  );
}
