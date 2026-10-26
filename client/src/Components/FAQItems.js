import React from 'react'
import {
    Box,
    Image,
    Text,
    Flex,
    useMediaQuery,
    useDisclosure,
    Collapse
} from "@chakra-ui/react";

function CollapseEx() {
    const { isOpen, onToggle } = useDisclosure();
}  

const FAQItems = (props) => {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box zIndex={"2"} justifyContent="space-between" pt={5} pl={10} pr={10} pb={5} borderRadius={8} border="3px solid rgba(240, 248, 255, 0.25);" width='90%' onClick={() => props.setFaq(!props.show)} cursor="pointer">
            
            <Flex justifyContent="space-between">
                <Image src="../images/bullet.png" mt="0.6rem" w="1rem" h="1rem" ml={isSmallerThan800 ? "-1.2rem" : 0} />
                <Flex justifyContent="space-between" w="95%">
                    <Text fontWeight={500} opacity={1} fontSize={isSmallerThan800 ? "1rem" : "1.2rem"} fontStyle="Poppins" color="#fff" position='relative'>{props.faq}</Text>
                    {props.show ? <Image mt="0.4rem" w={isSmallerThan800 ? "1rem" : "1.2rem"} h={isSmallerThan800 ? "1rem" : "1.2rem"} src="../images/arrowDown.png" transform='rotate(180deg)' /> : <Image mt="0.4rem" w={isSmallerThan800 ? "1rem" : "1.2rem"} h={isSmallerThan800 ? "1rem" : "1.2rem"} src="../images/arrowDown.png" />}
                </Flex>
            </Flex>
            <Collapse in={props.show} animateOpacity>
                <Text ml={isSmallerThan800 ? "1rem" : "4.6rem"} 
                className=".faqAns" mr={isSmallerThan800 ? "1rem" : "4rem"} 
                mt="1.6rem" fontWeight={400} fontSize="1rem" 
                fontStyle="Poppins" 
                color="#B3B3B3">{props.text}
                </Text>
            </Collapse>
        </Box >
    )
}

export default FAQItems