import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { thumb } from "../cloudinary";
import html2canvas from "html2canvas";
import Template from "./Template";
import { FiDownload } from "react-icons/fi";
import LikeButton from "./LikeButton";

export default function Cards(props) {
  const [ownProfile, setOwnProfile] = React.useState(false);

  // download the quote card as a PNG image
  const handleDownloadImage = async () => {
    const templateElement =
      document.getElementsByClassName("template")[props.index];

    if (!templateElement) {
      console.error("Template element not found.");
      return;
    }

    templateElement.style.display = "block";
    try {
      const canvas = await html2canvas(templateElement, {
        useCORS: true,
        allowTaint: true,
        scale: 2, // sharper image
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        console.error("Failed to convert HTML to image.");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "yearbook-quote.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error converting HTML to image:", error);
    } finally {
      templateElement.style.display = "none";
    }
  };

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
      {ownProfile && (
        <Template
          caption={props.caption}
          name={props.name}
          img={props.img}
          bitsId={props.bitsId}
          recipient={props.recipient}
        />
      )}
      {/* template for insta story */}

      {/* caption */}
      <Flex mt="1rem">
        <Box w="100%" lineHeight="1.3rem" fontSize="1rem">
          {props.caption}
        </Box>
      </Flex>

      {/* bottom row: download icon on the left, like button on the right
          (left out of the PDF export) */}
      <Flex id="hide-for-pdf" mt="0.9rem" align="center" justify="space-between">
        {ownProfile ? (
          <FiDownload
            onClick={handleDownloadImage}
            fontSize="1.5rem"
            cursor="pointer"
            title="download as image"
          />
        ) : (
          <Box />
        )}

        {props.captionID && (
          <LikeButton
            captionID={props.captionID}
            initialCount={props.likeCount || 0}
            initialLiked={!!props.likedByMe}
            canLike={props.canLike !== false}
          />
        )}
      </Flex>
    </Box>
  );
}