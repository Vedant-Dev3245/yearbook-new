import { Flex, Text, Box, Input, useMediaQuery, useToast } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"
import { Spinner } from '@chakra-ui/react'

export default function Search(props) {

    const [exists, setExists] = React.useState(false)
    const [spin, setSpin] = React.useState(false)
    const [label, setLabel] = React.useState("")
    const [bitsid, setBitsid] = React.useState("")
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const toast = useToast()

    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        }
        else {
            setTimeout(() => {
                axios({
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                    url: `${process.env.REACT_APP_BACKEND_URL}/profiles/search?name=${inputValue}`,
                })
                    .then(function (response) {
                        let tempArray = [];
                        response.data.forEach(element => {
                            tempArray.push({ label: `${element.name} ${element.bitsId} `, value: `${element.userID}` });
                        });
                        callback(tempArray);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }
    const onSearchChange = (option) => {
        if (option) {
            localStorage.setItem("friend", option.value)
            setBitsid(option.label.substring(option.label.length - 14))
            setLabel(option.label.substring(0, option.label.length - 14))
            setExists(true)
        }
    }

    function nominate() {
        const receiverId = localStorage.getItem("friend")

        if (!exists || !receiverId) {
            toast({
                description: "search and select a friend first",
                status: "warning",
                position: "top",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (receiverId === localStorage.getItem("user")) {
            toast({
                description: "you can't nominate yourself ;)",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setSpin(true)
        axios({
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            url: `${process.env.REACT_APP_BACKEND_URL}/nominations/nominate`,
            data: { receiverId },
        })
            .then(function (r) {
                toast({
                    title: "nominated ✓",
                    description: r.data.message,
                    status: "success",
                    position: "top",
                    duration: 3500,
                    isClosable: true,
                })
                setLabel("")
                setBitsid("")
                setExists(false)
                localStorage.removeItem("friend")
            })
            .catch(function (err) {
                console.log(err)
                toast({
                    description:
                        (err.response && err.response.data && err.response.data.message) ||
                        "couldn't nominate, try again",
                    status: "error",
                    position: "top",
                    duration: 3500,
                    isClosable: true,
                })
            })
            .finally(() => setSpin(false))
    }

    return (
        <Box position={"relative"}>
            <Text mt="3rem" mb="1rem" fontSize="1.5rem" fontWeight="800">name</Text>
            <Flex alignItems="center" w="100%">
                <Box w="100%"> <AsyncSelect
                    value={{ label }}
                    loadOptions={fetchData}
                    placeholder="search"
                    className="selectProfNom" classNamePrefix="selectOptNom"
                    onChange={(e) => {
                        onSearchChange(e)
                    }}
                    defaultOptions={false} /></Box>
            </Flex>
            <Text mt="2rem" fontSize="1.5rem" fontWeight="800">bitsid</Text>
            <Input disabled marginBlock="1rem" p="1.2rem" w={isSmallerThan800 ? "80%" : "40%"} border="1px solid #6C6C6C !important" color="white" value={exists ? bitsid : "check bits id here"} />
            <Flex alignItems={"center"} justifyContent="center" cursor="pointer" mt="2rem" border="1px solid #C9C9C9" bgColor="rgba(255, 255, 255, 0.1)" padding="0.5rem 1.5rem" borderRadius="2rem" w="130px" fontWeight={"700"} onClick={nominate}>nominate</Flex>
            <Spinner size="lg" mt="1rem" display={spin ? "block" : "none"} />
        </Box>
    )
}