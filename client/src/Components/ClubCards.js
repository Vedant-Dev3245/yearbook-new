import React from 'react';
import {
    Box,
    Flex,
    Text,
    VStack,
    Select,
    useMediaQuery
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import { FaUsers } from "react-icons/fa";
export default function ClubCards(props) {
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
    const navigate = useNavigate()
    const onSearchChange = (event) => {
        const selectedBitsId = event.target.value;
        const selectedOption = props.seniorOptions.find(option => option.bitsId === selectedBitsId);
        if (selectedOption) {
            // console.log(selectedOption);
            localStorage.setItem('friend', selectedOption.userID);
            navigate(`/profile/${selectedOption.userID}`);
        }
    };

    return (
        <>
            {/* <Box
                mt="5rem"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25), 24px 27px 22.2px 0px rgba(0, 0, 0, 0.40)"
                mix-blend-mode="overlay"
                borderRadius="24px"
                border="solid 1px rgb(255, 255, 255, 0.1)"
                opacity="0.9"
                backgroundSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                align="center"
                justify="center"
            >
                <Box
                    position="relative"
                >
                    <Box
                        position="absolute"
                        top="-70px"
                        left={isSmallerThan800 ? "28%" : "24%"}
                        transform="translateX(-50%)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none">
                            <circle cx="65" cy="65" r="63" fill="#100B18" stroke="url(#paint0_linear_124_195)" stroke-width="4" />
                            <defs>
                                <linearGradient id="paint0_linear_124_195" x1="65" y1="4" x2="65" y2="126" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" />
                                    <stop offset="0.354" stop-color="#4D528C" />
                                    <stop offset="1" stop-color="#0C1117" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </Box>
                </Box> */}
                <Box
                    borderWidth="1px"
                    borderRadius="24px"
                    overflow="visible"
                    position="relative"
                    h={isSmallerThan800 ? "300" : "320"}
                    boxShadow="2px 2px 2px rgb(255, 255, 255, 0.2)"
                    border="solid 1px rgb(255, 255, 255, 0.1)"
                    fill="#100B18"
                    className="noselect"
                >
                    <VStack alignItems="flex-start" mx="2rem">
                        <Box
                            fontSize={isSmallerThan800 ? "24px" : "40px"}
                            fontWeight="bold"
                            mt={isSmallerThan800 ? "4rem" : "2.4rem"}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text textAlign="left">
                                {props.commitment}
                            </Text>
                        </Box>
                        {/* <Flex
                        position="absolute"
                        top="70%"
                        className="searchIcon"
                        backdropFilter="blur(20px)"
                        borderRadius={"0.6rem"}
                        w="80%"
                        border="1px solid #FFF"
                        p={isSmallerThan800 ? "0.4rem 0.8rem" : "0.4rem 1rem"}
                        justifyContent={"flex-start"}
                        alignItems="center"
                        boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)">
                        <Search2Icon color='#B3B3B3' fontSize="1rem" />
                        <ClubSearch />
                    </Flex> */}
                        <Select
                            placeholder="search your senior"
                            onChange={onSearchChange}
                            background="transparent"
                            position="absolute"
                            top="75%"
                            w="80%"
                            fontSize="16px"
                            borderRadius="10px"
                            border="1px solid #FFF"
                            boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
                            backdropFilter="blur(20px)"
                            sx={{
                                option: {
                                    color: 'white',
                                    background: 'rgba(20, 14, 30, 0.87)',
                                },
                            }}
                        >
                            {props.seniorOptions.map((option) => (
                                <option key={option.bitsId} value={option.bitsId}>
                                    {option.name} ({option.bitsId})
                                </option>
                            ))}
                        </Select>
                        <Flex
                            position="absolute"
                            top="20px"
                            right={isSmallerThan800 ? "30px" : "40px"}
                            display="flex"
                            gridGap="10px"
                            alignItems="center">
                            <FaUsers
                                filter="drop-shadow(0px 0px 15px #2094FF)"
                                color="#DAE6FF"
                                fontSize="1.2rem"
                            />
                            <Text fontWeight={700}>
                                {props.seniorOptions.length} member{props.seniorOptions.length > 1 ? "s" : ""}
                            </Text>
                        </Flex>
                    </VStack>
                </Box >
            </>
            );
};
