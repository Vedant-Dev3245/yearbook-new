import React from "react";
import Masonry from "react-masonry-css";
import Cards from "./Cards";
import { Box, useMediaQuery, Text, SimpleGrid } from "@chakra-ui/react";
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
  const cards = Array.from(capt).map((person, index) => {
    return (
      <Cards
        name={person.writer.name}
        index={index}
        caption={person.caption}
        img={person.writer.imageUrl}
        bitsId={person.writer.bitsId}
        key={person.id}
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
          your friends to write a caption for you
        </Box>
        <Box
          fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
          display={!props.ownProfile && title ? "block" : "none"}
          fontWeight="800"
        >
          hey, you should write a{" "}
          <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
            caption
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
