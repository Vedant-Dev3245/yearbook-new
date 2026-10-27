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
import axios from "axios";

import Wall from "./Wall";
import Nominate from "./Nominate";
import Notifs, { notifKeys } from "./Notifs";
import Stats from "./Stats";
import Polls from "./Polls";

// ---- "new" dots on the notification cards ----
// A card gets its dot the first time the notifications tab is open after the card
// arrived, and the dot is gone as soon as you leave the tab. Cards that already had
// their dot are remembered in this browser, so a reload does not bring them back.
// (Quotes waiting for approval are different: they keep their dot until accepted or declined.)
const seenStorageKey = () => `notifSeen:${localStorage.getItem("user")}`;

function readSeen() {
  try {
    return new Set(JSON.parse(localStorage.getItem(seenStorageKey()) || "[]"));
  } catch (e) {
    return new Set();
  }
}

function writeSeen(seen) {
  try {
    localStorage.setItem(seenStorageKey(), JSON.stringify(Array.from(seen).slice(-300)));
  } catch (e) {}
}

const Interact = forwardRef((props, ref) => {
  const [wallActive, setWallActive] = React.useState(true);
  const [nominateActive, setNominateActive] = React.useState(false);
  const [notifActive, setNotifActive] = React.useState(false);
  const [pollsActive, setPollsActive] = React.useState(false);
  const [statsActive, setStatsActive] = React.useState(false);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [ownProfile, setOwnProfile] = React.useState();
  // recent activity (new captions on your wall, like milestones on captions you wrote)
  const [notifs, setNotifs] = React.useState({ items: [], unreadCount: 0, nominationUnread: 0 });
  // quotes other people wrote for you that are waiting for your approval
  const [requests, setRequests] = React.useState([]);
  // number shown on the bell: unread activity + unread nominations + quotes waiting for approval
  const badgeCount = notifs.unreadCount + notifs.nominationUnread + requests.length;
  // cards that show the "new" dot right now (only while the notifications tab is open)
  const [visitKeys, setVisitKeys] = React.useState(() => new Set());
  const notifActiveRef = React.useRef(false);
  React.useEffect(() => {
    notifActiveRef.current = notifActive;
  }, [notifActive]);

  // While the notifications tab is open, give a dot to every card that is new
  // (also covers cards that arrive after the tab was opened).
  React.useEffect(() => {
    if (!notifActive || !ownProfile) return;
    const seen = readSeen();
    const fresh = [];
    notifs.items.forEach((item) => {
      const key = notifKeys.act(item);
      if (!item.readAt && !seen.has(key)) fresh.push(key);
    });
    (props.nominatedby || []).forEach((person) => {
      const key = notifKeys.nom(person);
      if (!person.readAt && !seen.has(key)) fresh.push(key);
    });
    if (fresh.length === 0) return;
    fresh.forEach((key) => seen.add(key));
    writeSeen(seen);
    setVisitKeys((prev) => new Set([...prev, ...fresh]));
  }, [notifActive, ownProfile, notifs.items, props.nominatedby]);

  // Leaving the notifications tab removes all the dots.
  React.useEffect(() => {
    if (!notifActive) setVisitKeys((prev) => (prev.size ? new Set() : prev));
  }, [notifActive]);

  // Tell the server everything has been seen. The dots on the items stay for this visit.
  function markNotifsRead() {
    axios({
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      url: `${process.env.REACT_APP_BACKEND_URL}/notifications/read`,
    }).catch(() => {});
    setNotifs((n) => ({ ...n, unreadCount: 0, nominationUnread: 0 }));
  }

  // Called by a request card after approve / decline.
  const handleRequestHandled = (captionID, kind) => {
    setRequests((r) => r.filter((x) => x.captionID !== captionID));
    // an approved caption must show up on the wall right away
    if (kind === "nominate" && props.onRefresh) props.onRefresh();
  };
  
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

    React.useEffect(() => {
      if (!ownProfile) return;
      let cancelled = false;
      axios({
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        url: `${process.env.REACT_APP_BACKEND_URL}/notifications`,
      })
        .then((response) => {
          if (!cancelled && response.data && response.data.items) {
            const unread = (response.data.unreadCount || 0) + (response.data.nominationUnread || 0);
            setNotifs({
              items: response.data.items,
              unreadCount: response.data.unreadCount || 0,
              nominationUnread: response.data.nominationUnread || 0,
            });
            // the tab is already open (opened before this arrived): it counts as seen
            if (notifActiveRef.current && unread > 0) markNotifsRead();
          }
        })
        .catch(() => {});
      return () => {
        cancelled = true;
      };
    }, [ownProfile, props.id]);

    // captions waiting for approval
    React.useEffect(() => {
      if (!ownProfile) return;
      let cancelled = false;
      axios({
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        url: `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`,
      })
        .then((response) => {
          if (!cancelled) setRequests(response.data.requests || []);
        })
        .catch(() => {});
      return () => {
        cancelled = true;
      };
    }, [ownProfile, props.id]);

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

    // opening the tab counts as reading
    if (notifs.unreadCount + notifs.nominationUnread > 0) markNotifsRead();
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
              {badgeCount > 0 && (
                <Flex
                  ml="0.6rem"
                  minW="1.3rem"
                  h="1.3rem"
                  px="0.35rem"
                  borderRadius="full"
                  bg="#FF6187"
                  color="white"
                  fontSize="0.75rem"
                  fontWeight="700"
                  alignItems="center"
                  justifyContent="center"
                >
                  {badgeCount > 9 ? "9+" : badgeCount}
                </Flex>
              )}
            </Flex>
          </>
        ) : (
          <>
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
              {badgeCount > 0 && (
                <Flex
                  ml="0.6rem"
                  minW="1.3rem"
                  h="1.3rem"
                  px="0.35rem"
                  borderRadius="full"
                  bg="#FF6187"
                  color="white"
                  fontSize="0.75rem"
                  fontWeight="700"
                  alignItems="center"
                  justifyContent="center"
                >
                  {badgeCount > 9 ? "9+" : badgeCount}
                </Flex>
              )}
            </Flex>
          </>
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
        <Notifs
          nominatedBy={props.nominatedby}
          senior={props.senior}
          activity={notifs.items}
          newKeys={visitKeys}
          requests={requests}
          onRequestHandled={handleRequestHandled}
          onOpenWall={makeWallActive}
        />
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