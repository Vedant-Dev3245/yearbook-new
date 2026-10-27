import { Box, Text, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NominateCard from "./NominateCard";
import ReqCard from "./ReqCard";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiFeather } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// "5m ago", "3h ago", "2d ago"
function timeAgo(date) {
  const secs = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// One line in the "recent activity" list.
function ActivityCard({ item, onClick }) {
  const unread = !item.readAt;
  const isLike = item.type === "caption_like";
  const target = item.caption && item.caption.target ? item.caption.target.name.toLowerCase() : "a friend";
  const actor = item.actor ? item.actor.name.toLowerCase() : "someone";

  return (
    <Flex
      onClick={onClick}
      cursor="pointer"
      bg="#151515"
      p="1rem"
      color="#DCEDFB"
      w="100%"
      alignItems="center"
      gap="1rem"
      opacity="0.8"
      backdropFilter="blur(40px)"
      borderRadius="20px"
      border="1px solid"
      borderColor={unread ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.2)"}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      transition="all 0.2s ease"
      _hover={{ opacity: 1 }}
    >
      <Flex
        flexShrink={0}
        h="2.4rem"
        w="2.4rem"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.05)"
        border="1px solid rgba(255, 255, 255, 0.25)"
      >
        {isLike ? <FaHeart color="#FF6187" fontSize="1rem" /> : <FiFeather color="#2094FF" fontSize="1.1rem" />}
      </Flex>
      <Box flex="1" lineHeight="1.3rem" fontSize="1rem" color="#FFFFFF" fontWeight="400">
        {isLike ? (
          <>
            your caption for{" "}
            <Text as="span" fontWeight="700">{target}</Text>{" "}
            {item.count === 1 ? "got its first like" : `got ${item.count} likes`}
          </>
        ) : (
          <>
            <Text as="span" fontWeight="700">{actor}</Text> wrote on your wall
          </>
        )}
        <Text fontSize="0.85rem" color="#B3B3B3" fontWeight="600">
          {timeAgo(item.updatedAt || item.createdAt)}
        </Text>
      </Box>
      {unread && <Box flexShrink={0} h="0.6rem" w="0.6rem" borderRadius="50%" bg="#FF6187" />}
    </Flex>
  );
}

export default function Nominate(props) {
  const nominateArray = props.nominatedBy;
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const activity = props.activity || [];
  const showNominations = props.senior !== false; // juniors only get the activity list

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
      {activity.length > 0 && (
        <Box pb="4rem">
          <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} fontWeight="800">
            recent{" "}
            <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
              activity
            </Text>
          </Box>
          <Flex
            direction="column"
            gap="1rem"
            mt="2rem"
            w={isSmallerThan800 ? "100%" : "60%"}
          >
            {activity.map((item) => (
              <ActivityCard
                key={item.notificationID}
                item={item}
                onClick={() =>
                  item.type === "caption_like" && item.caption
                    ? navigate(`/profile/${item.caption.targetID}`)
                    : props.onOpenWall && props.onOpenWall()
                }
              />
            ))}
          </Flex>
        </Box>
      )}
      {!showNominations && activity.length === 0 && (
        <Text color="#B3B3B3" fontSize="1.2rem" fontWeight="600">
          nothing here yet. when friends like the captions you write, you'll see it here.
        </Text>
      )}
      {showNominations && (<>
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
      </>)}
    </Box>
  );
}
