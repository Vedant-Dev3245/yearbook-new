import { Box, Text,useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import SearchNom from "./SearchNom"

export default function Nominate(props) {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box w="90%" marginInline="auto" pb="4rem">
            <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} fontWeight="800">invite your <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">friends</Text> to write a caption for you</Box>
            <Text color="#B3B3B3" fontSize="1.2rem" w={isSmallerThan800 ? "90%" : "50%"} mt="0.5rem">write captions to capture the eventful years you've spent on campus with your seniors, batchmates, and juniors. <br/><br/> you can nominate your friend by searching them up here.</Text>
            <SearchNom name = {props.name}/>
           
        </Box>
    )
}


