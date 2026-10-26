import {
  Box,
  Text,
  Flex,
  Image,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

export default function Working() {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  return (
    <Box mt={isSmallerThan800 ? "10rem" : "2rem"} id="working">
      <Box
        className="heading"
        fontSize="4rem"
        marginTop={"4rem"}
        color="#fff"
        fontWeight={800}
        align={"center"}
      >
        how does it{" "}
        <Text fontStyle="italic" display="inline" fontFamily="EB Garamond">
          work?
        </Text>{" "}
      </Box>
      <VStack>
        <Box
          mt="2rem"
          border="2px solid #A7D5FF;"
          boxShadow="0px 0px 10px #2094FF;"
          borderRadius="1rem"
          w={isSmallerThan800 ? "89%" : "80%"}
          color="white"
          bgColor="rgba(32, 148, 255, 0.15)"
        >
          <Box
            ml={isSmallerThan800 ? "2rem !important" : "3rem"}
            mt={isSmallerThan800 ? "2rem" : "4rem"}
            bgColor="#2094FF"
            color="white"
            width="3.5rem"
            h="3.5rem"
            borderRadius="50%"
            textAlign="center"
          >
            <Text
              fontWeight={700}
              fontSize="1.2rem"
              transform="translateY(44%)"
            >
              1
            </Text>
          </Box>
          <Flex
            justifyContent="space-between"
            flexDirection={isSmallerThan800 ? "column !important" : "row"}
          >
            <Box
              className="workLabel"
              w={isSmallerThan800 ? "80% !important" : "24%"}
              ml={isSmallerThan800 ? "2rem !important" : "3rem"}
              mt="1rem"
            >
              <Box
                className="workHeading"
                fontSize="2.4rem"
                lineHeight="2.8rem"
                fontWeight="800"
                mb="1rem"
              >
                upload your profile picture and yearbook quote ☀️{" "}
              </Box>
              <Box
                className="workInfo"
                fontSize="1.4rem"
                fontWeight={"600"}
                lineHeight="1.6rem"
                mt="2rem"
                mb={isSmallerThan800 ? "3rem" : "0rem"}
                color="#B3B3B3"
              >
                log in to the yearbook portal using your BITS email only. Fill
                out your yearbook quote and upload your picture.
              </Box>
            </Box>
            <Image
              pointerEvents={"none"}
              className="workImg"
              w="50%"
              h="100%"
              src="../images/Auth Form.png"
              borderTopLeftRadius="30px"
              borderBottomRightRadius="30px"
              mb={isSmallerThan800 ? "2rem" : 0}
            />
          </Flex>
        </Box>
        <Flex
          flexDirection={isSmallerThan800 ? "column !important" : "row"}
          w={isSmallerThan800 ? "89%" : "80%"}
          justifyContent="space-between"
          mt="2rem !important"
        >
          <Box
            w={isSmallerThan800 ? "100% !important" : "60%"}
            mr="2rem"
            border="2px solid #FFC62D"
            boxShadow="0px 0px 10px #FFC62D;"
            borderRadius="1rem"
            color="white"
            bgColor="rgba(255, 198, 45, 0.15);"
          >
            <Box
              ml={isSmallerThan800 ? "2rem !important" : "3rem"}
              mt="4rem"
              bgColor="#FFC62D"
              color="white"
              width="3.5rem"
              h="3.5rem"
              borderRadius="50%"
              textAlign="center"
            >
              <Text
                fontSize="1.2rem"
                transform="translateY(44%)"
                fontWeight={700}
              >
                2
              </Text>
            </Box>
            <VStack
              mt="1rem"
              ml={isSmallerThan800 ? "2rem !important" : "3rem"}
              alignItems="baseline"
            >
              <Box
                className="workHeading"
                fontSize="2.4rem"
                lineHeight="2.8rem"
                fontWeight="800"
                mb="1rem"
                w={isSmallerThan800 ? "89%" : "90%"}
              >
                visit your frens, write quotes on their wall & nominate them 🌱{" "}
              </Box>
              <Box
                className="workInfo"
                w={isSmallerThan800 ? "89%" : "90%"}
                fontSize="1.4rem"
                fontWeight={"600"}
                lineHeight="1.6rem"
                mb="6rem"
                color="#B3B3B3"
                textAlign="left"
              >
                on your profile, go to your wall and nominate your friends to
                write on your wall.
              </Box>
            </VStack>
            <Box
              w={isSmallerThan800 ? "80%" : "70%"}
              mt="2rem!important"
              bg={"url('../images/ss2.png')"}
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              h="20rem"
              mb="4rem !important"
              borderRadius="20px"
              margin="auto"
            ></Box>
          </Box>

          <Box
            w={isSmallerThan800 ? "100% !important" : "40%"}
            mt={isSmallerThan800 ? "1rem" : "0"}
            color="white"
            border="2px solid #D84222;"
            boxShadow="0px 0px 10px #D84222;"
            borderRadius="1rem"
            bgColor="rgba(216, 66, 34, 0.15);"
          >
            <Box
              w="80%"
              h="18rem"
              mb="4rem !important"
              bg={"url('../images/ss3.png')"}
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              borderRadius="20px"
              marginInline="auto"
              marginTop="2.4rem"
            ></Box>
            <Box
              ml={isSmallerThan800 ? "2rem !important" : "3rem"}
              mt="4rem"
              bgColor="#D84222"
              color="white"
              width="3.5rem"
              h="3.5rem"
              borderRadius="50%"
              textAlign="center"
            >
              <Text
                fontWeight={700}
                fontSize="1.2rem"
                transform="translateY(44%)"
              >
                3
              </Text>
            </Box>
            <VStack
              mb={isSmallerThan800 ? "2rem" : 0}
              mt="1rem"
              ml={isSmallerThan800 ? "2rem !important" : "3rem"}
              alignItems="baseline"
              w="80%"
            >
              <Box
                className="workHeading"
                fontSize="2.4rem"
                lineHeight="2.8rem"
                fontWeight="800"
                mb="1rem"
              >
                fill your friends' walls with memories ✨
              </Box>
              <Box
                className="workInfo"
                fontSize="1.4rem"
                fontWeight={"600"}
                lineHeight="1.6rem"
                mb="3rem !important"
                color="#B3B3B3"
                textAlign="left"
              >
                through the notifications section, you can see who all have
                nominated you to write on their wall. click on the notifications
                to write your quotes on their wall.
              </Box>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
