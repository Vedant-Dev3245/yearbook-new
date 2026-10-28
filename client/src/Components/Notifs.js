import { Box, Text, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NominateCard from "./NominateCard";
import ReqCard from "./ReqCard";
import { FaHeart } from "react-icons/fa";
import { FiFeather } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NewDot from "./NewDot";
import { thumb } from "../cloudinary";

// Identifies one notification card. Interact uses these to remember which cards
// already got their "new" dot, so the dot only shows on the first visit.
export const notifKeys = {
  act: (item) => `act:${item.notificationID}:${item.updatedAt}`,
  nom: (person) => `nom:${person.nominator.userID}`,
};

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
function ActivityCard({ item, unread, onClick }) {
  const isLike = item.type === "caption_like";
  const target = item.caption && item.caption.target ? item.caption.target.name.toLowerCase() : "a friend";
  const actor = item.actor ? item.actor.name.toLowerCase() : "someone";
  const photoOwner = isLike ? item.caption && item.caption.target : item.actor;
  const photo = photoOwner && photoOwner.imageUrl;

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
      {unread && <NewDot />}
      {/* photo with a small badge for what happened (heart = like, feather = wrote).
          likes are anonymous, so they show the photo of the person the quote was for */}
      <Box position="relative" flexShrink={0} h="2.6rem" w="2.6rem">
        {photo ? (
          <Image
            src={thumb(photo, 100)}
            alt={isLike ? target : actor}
            h="100%"
            w="100%"
            borderRadius="50%"
            objectFit="cover"
            border="1px solid rgba(255, 255, 255, 0.25)"
          />
        ) : (
          <Flex
            h="100%"
            w="100%"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            bgColor="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.25)"
          >
            {isLike ? <FaHeart color="#FF6187" fontSize="1rem" /> : <FiFeather color="#2094FF" fontSize="1.1rem" />}
          </Flex>
        )}
        {photo && (
          <Flex
            position="absolute"
            right="-4px"
            bottom="-4px"
            h="1.2rem"
            w="1.2rem"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            bgColor={isLike ? "#FF6187" : "#2094FF"}
            border="2px solid #151515"
          >
            {isLike ? <FaHeart color="#fff" fontSize="0.55rem" /> : <FiFeather color="#fff" fontSize="0.65rem" />}
          </Flex>
        )}
      </Box>
      <Box flex="1" lineHeight="1.3rem" fontSize="1rem" color="#FFFFFF" fontWeight="400">
        {isLike ? (
          <>
            your quote for{" "}
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
    </Flex>
  );
}

export default function Nominate(props) {
  const nominateArray = props.nominatedBy || [];
  const requests = props.requests || [];
  const activity = props.activity || [];
  // cards that get the "new" dot during this visit (cleared when you leave the tab)
  const newKeys = props.newKeys || new Set();
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const showNominations = props.senior !== false; // juniors only get the activity list
  const shownRequests = showNominations ? requests : [];
  const shownNominations = showNominations ? nominateArray : [];
  const nothingAtAll =
    shownNominations.length === 0 && shownRequests.length === 0 && activity.length === 0;

  const headingStyle = {
    fontSize: isSmallerThan800 ? "1.5rem" : "3rem",
    fontWeight: "800",
  };

  return (
    <Box width="90%" marginInline="auto" pb="4rem">
      {nothingAtAll ? (
        // only when there is genuinely nothing to show
        showNominations ? (
          <Box {...headingStyle}>
            do you want to write some{" "}
            <Text display="inline" fontFamily="EB Garamond" fontStyle="italic">
              quotes
            </Text>
            ?
          </Box>
        ) : (
          <Text color="#B3B3B3" fontSize="1.2rem" fontWeight="600">
            nothing here yet. when friends like the quotes you write, you'll see it here.
          </Text>
        )
      ) : (
        <>
          <Box {...headingStyle}>
            your{" "}
            <Text display="inline" fontFamily="EB Garamond" fontStyle="italic">
              notifications
            </Text>
          </Box>

          {/* one list: the cards that need you come first, then activity */}
          <Flex
            direction="column"
            gap="1rem"
            mt="2rem"
            w={isSmallerThan800 ? "100%" : "70%"}
          >
            {/* quotes waiting for your approval */}
            {shownRequests.map((person) => (
              <ReqCard
                key={person.captionID}
                captionID={person.captionID}
                name={person.writer.name.toLowerCase()}
                id={person.writerID}
                caption={person.caption}
                unread // a quote waiting for approval keeps its dot until you accept or decline it
                onDone={props.onRequestHandled}
              />
            ))}

            {/* friends who nominated you to write a quote for them */}
            {shownNominations.map((person) => (
              <NominateCard
                name={person.nominator.name.toLowerCase()}
                key={person.nominator.userID}
                id={person.nominator.userID}
                unread={newKeys.has(notifKeys.nom(person))}
              />
            ))}

            {/* new quotes and like milestones */}
            {activity.map((item) => (
              <ActivityCard
                key={item.notificationID}
                item={item}
                unread={newKeys.has(notifKeys.act(item))}
                onClick={() =>
                  item.type === "caption_like" && item.caption
                    ? navigate(`/profile/${item.caption.targetID}`)
                    : props.onOpenWall && props.onOpenWall()
                }
              />
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
}
