import { Box, Flex, Text, useMediaQuery, Image } from "@chakra-ui/react";
import React from "react";
import { thumb } from "../cloudinary";
import html2canvas from "html2canvas";
import Template from "./Template";
import { FiInstagram } from "react-icons/fi";
import LikeButton from "./LikeButton";
export default function Cards(props) {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [ownProfile, setOwnProfile] = React.useState("");
  const handleShareInsta = async () => {
    const templateElement =
      document.getElementsByClassName("template")[props.index];
    templateElement.style.display = "block";
    if (templateElement) {
      try {
        const canvas = await html2canvas(templateElement, {
          useCORS: true,
          allowTaint: true,
        });

        canvas.toBlob(async (blob) => {
          if (blob) {
            const filesArray = [
              new File([blob], "insta-story.png", { type: "image/png" }),
            ];

            const shareData = {
              files: filesArray,
            };

            if (navigator.canShare && navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
                console.log("Shared successfully!");
              } catch (error) {
                console.error("Error sharing:", error);
              }
            } else {
              // desktop can't open Instagram, so save the image instead
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "yearbook-quote.png";
              link.click();
              URL.revokeObjectURL(link.href);
            }
            templateElement.style.display = "none";
          } else {
            console.log("Failed to convert HTML to image.");
            templateElement.style.display = "none";
          }
        });
      } catch (error) {
        console.error("Error converting HTML to image:", error);
      }
    } else {
      console.error("Template element not found.");
    }
  };

  // // sharing in insta story

  React.useEffect(() => {
    if (window.location.href.includes(localStorage.getItem("user"))) {
      setOwnProfile(true);
    } else {
      setOwnProfile(false);
    }
  }, []);

  return (
    <Box
      bg="#151515"
      p="1rem"
      className="card"
      color="#DCEDFB"
      margin="1rem"
      opacity="0.8"
      backdropFilter="blur(40px)"
      w="100%"
      borderRadius="20px"
      marginInline="auto"
      border="1px solid rgba(255, 255, 255, 0.5)"
      fontWeight="700"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <Flex
        align="center"
        bgColor={"rgba(255, 255, 255, 0.05)"}
        border="1px solid rgba(255, 255, 255, 0.25)"
        borderRadius="3rem"
        w="fit-content"
        p="0.3rem 0.6rem 0.3rem 0.3rem"
      >
        <Image
          borderRadius="full"
          h="1.5rem"
          w="1.5rem"
          src={thumb(props.img, 100)}
          mr="0.4rem"
        />
        <Text fontWeight="600" fontSize="0.9rem">
          {props.name.toLowerCase()}
        </Text>
      </Flex>

      {/* template for insta story */}
      {/* <Box w="0" h="0" overflow={"hidden"}> */}
      {ownProfile && (
        <Template
          caption={props.caption}
          name={props.name}
          img={props.img}
          bitsId={props.bitsId}
        />
      )}
      {/* </Box> */}
      {/* template for insta story */}

      <Flex mt="1rem">
        <Box w="90%" lineHeight="1.3rem" fontSize="1rem">
          {props.caption}
        </Box>
        {/* insta share Button */}
        {ownProfile && (
          <FiInstagram
            onClick={handleShareInsta}
            fontSize={"1.5rem"}
            cursor="pointer"
            title={isSmallerThan800 ? "share to Instagram" : "download as image"}
          />
        )}
        {/* insta share Button */}
      </Flex>

      {/* likes (left out of the PDF export) */}
      {props.captionID && (
        <Flex id="hide-for-pdf" mt="0.9rem" justify="flex-end">
          <LikeButton
            captionID={props.captionID}
            initialCount={props.likeCount || 0}
            initialLiked={!!props.likedByMe}
            canLike={props.canLike !== false}
          />
        </Flex>
      )}
    </Box>
  );
}