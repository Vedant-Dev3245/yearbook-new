import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import New from '../Components/newDevs';
import Devs from '../Components/Devs';
import { Box, Text, VStack, useMediaQuery, Flex } from '@chakra-ui/react';

import ScaleLoader from "react-spinners/ScaleLoader";



export default function Devleopers() {
  const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, [])


  return (
    <Box overflowX="hidden"
      bg="#141414"
      className="noselect landing">
      <Flex
        justifyContent={"center"}
        alignItems="center"
        position="fixed"
        zIndex="26"
        w="100%"
        h="100vh"
        display={loading ? "flex" : "none"}
        bg='blackAlpha.400'
        backdropFilter='blur(10px)'
      >
        <ScaleLoader
          color="#D4D4D4"
          loading={loading}
          size={60}
          speedMultiplier={0.7}
        />
      </Flex>
      <Navbar />
      <Box w={isSmallerThan800 ? "" : "90%"} marginInline="auto" pb="4rem" mt="7rem" mb="5rem">
        <VStack spacing="1rem" marginInline="auto" mx={isSmallerThan800 ? "" : "2rem"}>
          <Text fontWeight={800} fontSize={isSmallerThan800 ? "1.8rem" : "4rem"} color="white">
            meet the team 🌱</Text>
          <New />
          <Text fontWeight={800} fontSize={isSmallerThan800 ? "1.8rem" : "4rem"} color="white">
            legacy developers🌱</Text>
          <Devs />
        </VStack>
      </Box>
      <Footer />
    </Box>

  )
}