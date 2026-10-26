import React from 'react'
import {Box, VStack, useMediaQuery, Button, Image, Link} from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'


export default function OptIn(){
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')

    React.useEffect(()=>{
        if(localStorage.getItem("user") === null){
            setIsDisabled(true)
        }
        else{
            setIsDisabled(false)
        }
    },[])
    return(
        <Box color="white" w="80%" h="auto" 
            marginInline="auto" 
            bg="url('../images/back.png')"
            bgRepeat="no-repeat"
            bgSize="cover"
            backgroundSize="cover" mt="7rem" className="physical" borderRadius={isSmallerThan800?"25px":"50px"}
            position="relative" border="2px #B3B3B3 solid"
            mb={"2rem"}>
                <VStack
                    w="80%"
                    marginInline="auto"
                    position="relative"
                    background="url()"
                    bgPosition="center"
                    bgSize="cover"
                    spacing={5}
                    box-shadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
                    backdrop-filter="blur(40px)"
                    z-index="2"
                    paddingBottom="2.5rem"
                     >
                    <Box fontSize={isSmallerThan800 ? "1.6rem" : "3rem"} fontWeight="700" mt={isSmallerThan800?"3rem":"4rem"}>opt-in for the <Box display="inline" fontStyle="italic" fontFamily="EB Garamond">physical</Box> yearbook <Image src="../images/clinking-glasses.png" display="inline" height={8}></Image></Box>
                    <Box color="#C9C8C8" mt={isSmallerThan800 ? "-1rem" : 0} fontSize={isSmallerThan800 ? "1rem" : "1.4rem"}>get physical copy. cherish it for the years to come.</Box>
                    <Link  href="https://docs.google.com/forms/d/e/1FAIpQLScWyCTQZ8Lh6ZqHO4Rn7RswBjjOn3kKiLFh9HDPgHmztsqIOA/viewform?usp=publish-editor" target="_blank"><Button disabled={isDisabled} className="phyButton" mt={"2rem !important"} marginBottom={isSmallerThan800?"2rem !important":"2rem !important"} fontSize="1.2rem" color="black" fontWeight="700"> {isDisabled ? "sign in to opt in" : "yes, i do need yearbook irl"} <ArrowForwardIcon /> </Button> </Link>
                    </VStack>
            </Box>
    )
}