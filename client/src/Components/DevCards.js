import React from 'react'
import {
    Box,
    Image,
    Text,
    Flex,
    useMediaQuery,
    VStack,
    Link,
    Button
} from "@chakra-ui/react";
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'
import { FaSpotify } from 'react-icons/fa'

const DevCards = (props) => {
    console.log(props.twitter)
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box boxSizing="border-box" bgColor="#151515"
            pt={3} pl={3} pr={3} pb={5} borderRadius="15px"
            border="0.414982px solid rgba(255, 255, 255, 0.5);"
            m={5} w="90%" className="devColumn" >
            <Image src={props.img} w="100%" borderRadius="15px" h="14rem" />
            <VStack alignItems="baseline" pl={2}>
                <Text color="#DCEDFB" fontWeight={700} fontSize="2.2rem" mt="0.5rem !important" className='devName'>{props.name}</Text>
                <Text color="#B3B3B3" className='devCaption' fontWeight={300} fontSize="1rem" mt="-0.2rem !important" mb="0.5rem !important">{props.caption}</Text>
                <Text color="#FAFAFA" className="devText" fontWeight={500} fontSize="0.9rem" h={isSmallerThan800 ? "4rem" : "2rem"} w="90%" lineHeight={"1rem"} mb="1rem !important">{props.text}</Text>
                <Flex justifyContent="space-between" w="100%">
                    <Flex className='icons' justifyContent="space-between" alignItems="center" w={isSmallerThan800 ? "50%" : "7rem"}>
                        {props.twitter !== "" && <Link href={props.twitter} target="_blank"><FiTwitter color='white' fontSize={"1.5rem"} strokeWidth="1" /> </Link>}
                        {props.github !== "" && <Link href={props.github} target="_blank">  <FiGithub color='white' fontSize={"1.5rem"} strokeWidth="1" /> </Link>}
                        {props.linkedin !== "" && <Link href={props.linkedin} target="_blank"><FiLinkedin color='white' fontSize={"1.5rem"} strokeWidth="1" /> </Link>}
                    </Flex>
                    <Flex>
                        <Link href={props.spotify} target="_blank" background="rgba(255, 255, 255, 0.1)" border="0.5px solid rgba(255, 255, 255, 0.25)" borderRadius={"5px"} p="0.8rem"><FaSpotify color='white' fontSize={"1.5rem"} strokeWidth="1" /> </Link>
                    </Flex>
                </Flex>

            </VStack>
        </Box >
    )
}

export default DevCards