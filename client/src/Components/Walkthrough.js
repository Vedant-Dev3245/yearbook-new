import React from 'react'
import { Box, Image, Text, Button, useMediaQuery } from '@chakra-ui/react'
export default function Walkthrough() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')

    const [showVideo, setShowVideo] = React.useState(false)
    function toggleVideo() {
        setShowVideo(true)
    }
    return (
        <Box mt="10rem" id="walkthrough">
            <Box className="heading" fontSize="3.2rem" color="#fff" 
            fontWeight={800} align={'center'}>a 
            <Text fontStyle="italic" display="inline" 
            fontFamily="EB Garamond" > walkthrough</Text> of the platform</Box>

            <Box w="100%" bg="url(./images/textBg.png)" bgRepeat={"no-repeat"} backgroundSize="cover"> 
                <Box background="url(./images/walkBg.png)" backgroundSize="cover" w="72%" borderRadius={isSmallerThan800 ? "25px" : "50px"}
                    border="3px solid rgba(255, 255, 255, 0.75);" marginInline="auto" mt="2rem" h={isSmallerThan800?"16rem":"30rem"}>
                    <Box w='100%' >
                        <Box display={showVideo === true ? 'block' : 'none'} >
                            <iframe width="100%" className='video' src="https://www.youtube.com/embed/eGVCFS34zbY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </Box>
                        <Button display={showVideo === true ? "none" : "block"} cursor="pointer" onClick={toggleVideo} mt={isSmallerThan800?"10rem":"23rem"} w="fit-content" marginInline={isSmallerThan800 ? "auto" : "0"} ml={isSmallerThan800 ? "" : "3rem"} marginBottom={"1rem"} p={isSmallerThan800 ? "1rem 1.6rem" : "2rem 2.6rem"} borderRadius="200px"> <Image mt={isSmallerThan800?"0":"-0.5rem"} w={isSmallerThan800?"8%":"13%"} src="./images/playButton.png" /> <Text mt={isSmallerThan800?"-1rem":"-1.8rem"} fontWeight="800" fontSize={isSmallerThan800?"1rem":"1.6rem"} ml="2rem">play video</Text> </Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}