import {
  Box,
  Flex,
  Text,
  VStack,
  Link,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  return (
    <Box mt="10rem">
      <Box
        bg={isSmallerThan800 ? "none" : "url('../images/Frame 47.png')"}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        overflowX={isSmallerThan800 ? "none" : "hidden"}
        mt={isSmallerThan800 ? "-5rem" : "2rem"}
        borderBlock={
          isSmallerThan800
            ? "2px solid rgba(255, 255, 255, 0.25)"
            : "2px solid rgba(255, 255, 255, 0.25)"
        }
      >
        <Flex
          flexDirection={isSmallerThan800 ? "column" : "row"}
          pb="2rem"
          justifyContent="space-between"
          backgroundSize="cover"
          mt="0rem"
          ml={isSmallerThan800 ? "2rem" : "8rem"}
          mb="2rem"
          mr={isSmallerThan800 ? "2rem" : "-18rem"}
        >
          <VStack
            w={isSmallerThan800 ? "58%" : "23%"}
            alignItems="baseline"
            justifyContent="center"
          >
            <Box
              fontSize="3rem"
              fontWeight="700"
              mt="4rem"
              color="white"
              display="flex"
              w="100%"
            >
              <Box w="50%">
                <Image
                  display="inline"
                  src="https://user-images.githubusercontent.com/69129797/182025563-7c048460-b502-4fb5-8072-c777747d2d5f.png"
                  w="4rem"
                />
              </Box>
              <Text ml={isSmallerThan800 ? "1rem" : "-8rem"}>SARC</Text>
            </Box>
            <Box
              fontSize="1rem"
              fontWeight="600"
              mt="0rem !important"
              color="#B3B3B3"
              w={isSmallerThan800 ? "180%" : "100%"}
            >
              Student Alumni Relations Cell, BITS Pilani, is a body that works
              under the aegis of the Dean of Alumni Relations, Prof. Arya Kumar,
              to establish a strong connection between the Alumni and the
              student community.
            </Box>
            <Flex
              justifyContent="space-between"
              w={isSmallerThan800 ? "150%" : "50%"}
              align={"center"}
              mt="1.5rem !important"
            >
              <Link
                href="https://www.facebook.com/sarcbitspilani"
                target="_blank"
              >
                <FaFacebook color="white" fontSize={"1.8rem"} />{" "}
              </Link>
              <Link
                href="https://www.twitter.com/sarcbitspilani"
                target="_blank"
              >
                <FaTwitter color="white" fontSize={"1.8rem"} />{" "}
              </Link>
              <Link
                href="https://www.linkedin.com/company/sarcbitspilani/"
                target="_blank"
              >
                <FaLinkedin color="white" fontSize={"1.8rem"} />{" "}
              </Link>
              <Link
                href="https://www.instagram.com/sarcbitspilani"
                target="_blank"
              >
                {" "}
                <FaInstagram color="white" fontSize={"1.8rem"} />{" "}
              </Link>
            </Flex>
          </VStack>
          <VStack alignItems="baseline" justifyContent="center">
            <Box
              fontSize="1.7rem"
              fontWeight="700"
              mt={isSmallerThan800 ? "2rem" : "5rem"}
              color="white"
            >
              about us
            </Box>
            <Box
              cursor="pointer"
              paddingTop="1rem"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://fierce-jeep-1d2.notion.site/Student-Alumni-Relations-Cell-Who-are-we-9fb9470c4ec14d59978ed9c98a440711" target="_blank">
                initiatives
              </Link>
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link
                href="https://open.spotify.com/show/3z8808lf1AB9NspMNufPqr?si=cd20f854d98a42b2"
                target="_blank"
              >
                {" "}
                the podcast
              </Link>
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://fierce-jeep-1d2.notion.site/Photo-Archive-cddd977931804e458b7eb0bb04a9288a" target="_blank">
                gallery
              </Link>
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link
                href="https://www.bitsaa.org/page/publications/bits-echo"
                target="_blank"
              >
                echo
              </Link>
            </Box>
          </VStack>
          <VStack alignItems="baseline" justifyContent="center">
            <Box
              fontSize="1.7rem"
              fontWeight="700"
              mt={isSmallerThan800 ? "2rem" : "5rem"}
              color="white"
            >
              quick links
            </Box>
            <Box
              cursor="pointer"
              paddingTop="1rem"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://yearbook.bits-sarc.in/#working">
                how does it work?
              </Link>{" "}
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://yearbook.bits-sarc.in/#walkthrough">
                walkthrough
              </Link>{" "}
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://yearbook.bits-sarc.in/developers">
                developers
              </Link>{" "}
            </Box>
            <Box
              cursor="pointer"
              fontSize="1rem"
              fontWeight="600"
              mt={isSmallerThan800 ? "1.2rem" : "2rem"}
              color="#B3B3B3"
            >
              <Link href="https://yearbook.bits-sarc.in/#faq">FAQ</Link>{" "}
            </Box>
          </VStack>
          <VStack alignItems="baseline" justifyContent="center">
            <Box
              id="contact"
              fontSize="1.7rem"
              fontWeight="700"
              mt={isSmallerThan800 ? "2rem" : "5rem"}
              color="white"
            >
              connect w/ us
            </Box>
            <Box
              fontSize="1rem"
              fontWeight="600"
              color="#B3B3B3"
              w={isSmallerThan800 ? "80%" : "40%"}
            >
              if you're facing any problems, or just wish to appreciate our
              work, feel free to..
            </Box>
            <Box
              cursor="pointer"
              pt="0.8rem"
              border="1px solid #C9C9C9"
              bgColor="rgba(255, 255, 255, 0.1)"
              padding="0.5rem 1.5rem"
              mt="1.5rem !important"
              borderRadius="0.6rem"
              w="fit-content"
              fontWeight={"600"}
              color="#B3B3B3"
              backdropFilter={"blur(10px)"}
            >
              {" "}
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLScccgluhNmWGLPJMHMEgGiDKqrmqVmxi1BctnZ3X4t7prP-sQ/viewform" target="_blank">
                ask for help
              </Link>
            </Box>
          </VStack>
        </Flex>
      </Box>
      <Box
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
  );
}
