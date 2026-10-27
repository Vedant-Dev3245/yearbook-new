import React from "react";
import Masonry from "react-masonry-css";
import Cards from "./Cards";
import { Box, Flex, useMediaQuery, Text, SimpleGrid } from "@chakra-ui/react";
import ClubCards from "./ClubCards";

export default function Wall(props) {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  const [capt, setCapt] = React.useState([]);
  const [title, setTitle] = React.useState(false);
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };
  // "top" = most liked first (the order the server sends); "new" = newest first.
  // Likes tapped during a visit never reshuffle the cards, so nothing jumps under your finger.
  const [sortMode, setSortMode] = React.useState("top");
  const ordered = React.useMemo(() => {
    const list = Array.from(capt);
    if (sortMode === "new") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [capt, sortMode]);
  const cards = ordered.map((person, index) => {
    return (
      <Cards
        name={person.writer.name}
        index={index}
        caption={person.caption}
        img={person.writer.imageUrl}
        bitsId={person.writer.bitsId}
        captionID={person.captionID}
        likeCount={person.likeCount}
        likedByMe={person.likedByMe}
        canLike={person.canLike}
        key={person.captionID}
      />
    );
  });
  React.useEffect(() => {
    setCapt(props.captions);
    // console.log(props.captions)
  }, [props.captions]);
  React.useEffect(() => {
    if (capt.length === 0) {
      setTitle(true);
    } else {
      setTitle(false);
    }
  }, [capt]);

  const clubsData = props.commitments.map((commitment) => ({
    commitment: commitment.commitment_name,
    seniorOptions: commitment.members
  }));

  return (
    <Box w="90%" marginInline="auto" pb="4rem">
      {props.senior ? <>
        <Box
          fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
          display={props.ownProfile && title ? "block" : "none"}
          fontWeight="800"
        >
          <Text
            display={"inline"}
            fontFamily="EB Garamond"
            fontStyle="italic"
            textDecoration={"underline"}
            cursor="pointer"
            onClick={props.makeNominActive}
          >
            nominate
          </Text>{" "}
          your friends to write a quote for you
        </Box>
        <Box
          fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
          display={!props.ownProfile && title ? "block" : "none"}
          fontWeight="800"
        >
          hey, you should write a{" "}
          <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
            quote
          </Text>{" "}
          for your friend, <br /> ask them to{" "}
          <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
            nominate
          </Text>{" "}
          you!{" "}
        </Box>
        {capt.length !== 0 && (
          <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} fontWeight="800">
            your{" "}
            <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
              friends
            </Text>{" "}
            have something to say...
          </Box>
        )}

        {capt.length > 1 && (
          <Flex id="hide-for-pdf" mt="1.5rem" mb="-2rem" gap="0.6rem" flexWrap="wrap">
            {[
              ["top", "most liked"],
              ["new", "newest"],
            ].map(([mode, label]) => (
              <Box
                as="button"
                type="button"
                key={mode}
                onClick={() => setSortMode(mode)}
                aria-pressed={sortMode === mode}
                p="0.3rem 0.9rem"
                borderRadius="3rem"
                fontSize="0.9rem"
                fontWeight="600"
                border="1px solid"
                borderColor={sortMode === mode ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.25)"}
                bgColor={sortMode === mode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)"}
                color={sortMode === mode ? "white" : "#B3B3B3"}
                transition="all 0.2s ease"
                _hover={{ borderColor: "rgba(255, 255, 255, 0.5)", color: "white" }}
              >
                {label}
              </Box>
            ))}
          </Flex>
        )}

        <Masonry
          width="100%"
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {cards}
        </Masonry></> :
        <Box m={isSmallerThan800 ? "2rem" : "4rem"}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {clubsData.map((clubData, index) => (
              <ClubCards
                key={index}
                commitment={clubData.commitment}
                seniorOptions={clubData.seniorOptions}
              />
            ))}
          </SimpleGrid>
        </Box>}
    </Box>
  );
}
