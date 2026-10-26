import React, { forwardRef, useImperativeHandle } from "react";
import {
 Box,
  Flex,
  VStack,
  Text,
  useMediaQuery,
  IconButton,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure
} from "@chakra-ui/react";
import { FiFeather, FiAnchor, FiBell, FiActivity, FiBarChart2 } from "react-icons/fi";

import Wall from "./Wall";
import Nominate from "./Nominate";
import Notifs from "./Notifs";
import Stats from "./Stats";
import Polls from "./Polls";

const Interact = forwardRef((props, ref) => {
  const [wallActive, setWallActive] = React.useState(true);
  const [nominateActive, setNominateActive] = React.useState(false);
  const [notifActive, setNotifActive] = React.useState(false);
  const [pollsActive, setPollsActive] = React.useState(false);
  const [statsActive, setStatsActive] = React.useState(false);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [ownProfile, setOwnProfile] = React.useState();
  
  const barItems = document.querySelectorAll(".barItems");
  
  function removeActive() {
    for (let i = 0; i < barItems.length; i++) {
      if (
        document.querySelectorAll(".barItems")[i].classList.contains("active")
      ) {
        document.querySelectorAll(".barItems")[i].classList.remove("active");
      }
    }
  }  
  
    React.useEffect(() => {
      if (window.location.href.includes(window.localStorage.getItem("user"))) {
        setOwnProfile(true);
      } else {
        setOwnProfile(false);
      }
    });
  
    React.useEffect(() => {
      makeWallActive();
    }, [props.id]);

  const makeWallActive = () => {
    setWallActive(true);
    setNominateActive(false);
    setNotifActive(false);
    setPollsActive(false);
    setStatsActive(false);
    removeActive();
    document.querySelector(".wall").classList.add("active");
  };

  function makeNominActive() {
    setWallActive(false);
    setNominateActive(true);
    setNotifActive(false);
    setPollsActive(false);
    setStatsActive(false);
    removeActive();
    document.querySelector(".nomin").classList.add("active");
  }

  function makeNotifActive() {
    setWallActive(false);
    setNominateActive(false);
    setNotifActive(true);
    setPollsActive(false);
    setStatsActive(false);
    removeActive();
    document.querySelector(".notif").classList.add("active");
  }

  function makePollsActive() {
    setWallActive(false);
    setNominateActive(false);
    setNotifActive(false);
    setPollsActive(true);
    setStatsActive(false);
    removeActive();
    document.querySelector(".polls").classList.add("active");
  }

  function makeStatsActive() {
    setWallActive(false);
    setNominateActive(false);
    setNotifActive(false);
    setStatsActive(true);
    setPollsActive(false);
    removeActive();
    document.querySelector(".stats").classList.add("active");
  }

  useImperativeHandle(ref, () => ({
    makeWallActive
  }));

  return (
    <Box>
      <Flex
        mb="4rem"
        mt={isSmallerThan800 ? "1rem" : "3rem"}
        w="90%"
        marginInline="auto"
        justifyContent={isSmallerThan800 ? "center" : "flex-start"}
        flexWrap="wrap"
        borderBottom="1px solid rgba(217, 217, 217, 0.1)"
      >
        {props.senior ? (
          <>
            <Flex
              onClick={makeWallActive}
              cursor="pointer"
              alignItems="center"
              p="1rem"
              className="wall active barItems"
              id="hide-for-pdf"
            >
              <FiFeather filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
              <Text ml="1rem" fontWeight="600" fontSize="1.1rem">
                {ownProfile ? "your wall" : "wall"}
              </Text>
            </Flex>

            <Flex
              display={ownProfile ? "flex" : "none"}
              onClick={makeNominActive}
              cursor="pointer"
              alignItems="center"
              p="1rem"
              className="nomin barItems"
              id="hide-for-pdf"
            >
              <FiAnchor filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
              <Text ml="1rem" fontWeight="600" fontSize="1.1rem">
                nominate your friends
              </Text>
            </Flex>

            <Flex
              display={ownProfile ? "flex" : "none"}
              onClick={makeNotifActive}
              cursor="pointer"
              alignItems="center"
              p="1rem"
              className="notif barItems"
              id="hide-for-pdf"
            >
              <FiBell filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
              <Text ml="1rem" fontWeight="600" fontSize="1.1rem">
                notifications
              </Text>
            </Flex>
          </>
        ) : (
          <Flex
            onClick={makeWallActive}
            cursor="pointer"
            alignItems="center"
            p="1rem"
            className="wall active barItems"
          >
            <FiFeather filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
            <Text ml="1rem" fontWeight="600" fontSize="1.1rem">
              {ownProfile ? "your wall" : "wall"}
            </Text>
          </Flex>
        )}
      </Flex>

      <Box display={wallActive ? "block" : "none"}>
        <Wall
          ownProfile={ownProfile}
          makeNominActive={makeNominActive}
          captions={props.captions}
          bitsId={props.bitsId}
          commitments={props.commitments}
          senior={props.senior}
        />
      </Box>
      <Box display={nominateActive && ownProfile ? "block" : "none"}>
        <Nominate name={props.name} />
      </Box>
      <Box display={notifActive && ownProfile ? "block" : "none"}>
        <Notifs nominatedBy={props.nominatedby} />
      </Box>
      <Box display={pollsActive && ownProfile ? "block" : "none"}>
        <Polls />
      </Box>
      <Box display={statsActive ? "block" : "none"}>
        <Stats />
      </Box>
      <Box mt="10rem" id="hide-for-pdf">
        <Box
          borderTop="1px solid #727174"
          paddingBlock="1rem"
          color="#B3B3B3"
          marginInline="auto"
          w="100%"
          textAlign="center"
        >
          © copyright{" "}
          <Text display="inline" fontWeight="800">
            SARC
          </Text>{" "}
          · all rights reserved
        </Box>
      </Box>
    </Box>
  );
});

export default Interact;
