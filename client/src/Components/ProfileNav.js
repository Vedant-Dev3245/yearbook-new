import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"

import Search from "./Search"
export default function ProfileNav() {
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
    const [ownProfile, setOwnProfile] = React.useState()

    React.useEffect(() => {
        if (window.location.href.includes(localStorage.getItem("user"))) {
            setOwnProfile(true)
        }
        else {
            setOwnProfile(false)
        }
    }, [window.location.href])

    // const reader = new FileReader();
    // reader.onload = function (event) {
    //     console.log(event.target.result); // the CSV content as string
    //   };
    // const file = readTextFile()
    //   reader.readAsText(file);


    // const options = props.options
    // console.log(options)
    const user = localStorage.getItem("user")
    const navigate = useNavigate()
    function backToProfile() {
        navigate(`/profile/${user}`)
    }
    function backHome() {
        navigate(`/`)
        document.location.reload()
    }

    return (
        <Box borderBottom="1px solid rgba(255, 255, 255, 0.25)" pb={isSmallerThan800 ? "6rem" : "10rem"} pt={isSmallerThan800 ? "2rem" : "3rem"} bg="url(../images/profBg.png)" bgSize="cover" bgPosition="center" position="relative">
            <Flex className="navProf" alignItems="center" w="90%" marginInline="auto" paddingBlock="0.6rem" h={isSmallerThan800 ? "4rem" : ""}
                paddingInline={isSmallerThan800 ? "0.8rem" : "1rem"} justifyContent="space-between" position="relative" zIndex="2" >
                <Flex alignItems={"center"}>
                    <Button _hover={{"color": "black", "background-color": "#B3B3B3"}} color= "white" display={ownProfile ? "none" : "flex"} ml={isSmallerThan800 ? "-0.6rem" : "0rem"} onClick={backToProfile} bg="transparent" fontSize={isSmallerThan800 ? "1.6rem" : "2rem"} p="0.2rem"> <ChevronLeftIcon /></Button>
                    <Text fontSize={isSmallerThan800 ? "1.6rem" : "2rem"} ml={isSmallerThan800 ? "0rem" : "1.6rem"} fontWeight="700" onClick={backHome} cursor="pointer">SARC</Text>
                </Flex>
                <Flex className="searchIcon" borderRadius={"0.4rem"} w={isSmallerThan800 ? "40%" : "30%"} border="0.968254px solid #575757" p={isSmallerThan800 ? "0.4rem 0.8rem" : "0.4rem 1rem"} justifyContent={"flex-start"} alignItems="center" h={isSmallerThan800 ? "2.8rem" : ""}><Search2Icon color='#B3B3B3' fontSize="1rem" /> <Search />  </Flex>

            </Flex>
        </Box>
    )
}