import React, { useState, useCallback, memo } from "react";
import { css } from '@emotion/react';
import { Box, Heading, FormLabel, FormControl, Button, Textarea, HStack, VStack, Select, useMediaQuery } from "@chakra-ui/react";

const customSelectStyles = css`
option {
  background-color: #242323;
  color: white;
}
`;

const Message = memo(({ id, message, handleMessageChange }) => {
    const maxLength = 140;

    const handleChange = useCallback((e) => {
        const value = e.target.value.slice(0, maxLength);
        handleMessageChange(id, value);
    }, [id, handleMessageChange]);

    const charactersLeft = maxLength /* - message.length */; // can't figure it out
    return (
        <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
                value={message}
                onChange={handleChange}
                placeholder='Enter your message here'
                maxLength={maxLength}
            />
            <Box color={charactersLeft < 0 ? 'red' : 'inherit'} fontSize="sm" mt={1}>
                {charactersLeft >= 0 ? `${charactersLeft} characters left` : `Exceeded by ${Math.abs(charactersLeft)} characters`}
            </Box>
        </FormControl>
    );
});

const SeniorSelect = memo(({ id, selectedSenior, handleSeniorChange }) => {
    const handleChange = useCallback((e) => {
        handleSeniorChange(id, e.target.value);
    }, [id, handleSeniorChange]);

    return (
        <FormControl>
            <FormLabel>Senior</FormLabel>
            <Select placeholder='Select' value={selectedSenior} onChange={handleChange} css={customSelectStyles}>
                <option value="shwetabh">Shwetabh</option>
                <option value="niket">Niket</option>
            </Select>
        </FormControl>
    );
});

const ClubSelect = memo(({ id, selectedClub, handleClubChange }) => {
    const handleChange = useCallback((e) => {
        handleClubChange(id, e.target.value);
    }, [id, handleClubChange]);

    return (
        <FormControl>
            <FormLabel>club/ department</FormLabel>
            <Select placeholder='Select' value={selectedClub} onChange={handleChange} css={customSelectStyles}>
                <option value="SARC">SARC</option>
                <option value="WSC">WSC</option>
            </Select>
        </FormControl>
    );
});

export default function SeniorCards() {

    const [isSmallerThan1100] = useMediaQuery("(max-width: 1100px)");
    const [cards, setCards] = useState([{ id: 1, size: 'lg' }]);
    const handleClick = () => {
        setCards(cards => {
            // Minimize all cards
            const minimizedCards = cards.map(card => ({ ...card, size: 'sm' }));
            // Add a new card
            return [{ id: cards.length + 1, size: 'lg' }, ...minimizedCards];
        });
    };

    const handleMessageChange = useCallback((id, newMessage) => {
        setCards(cards => cards.map(card =>
            card.id === id ? { ...card, message: newMessage } : card
        ));
    }, []);

    const handleSeniorChange = useCallback((id, newSenior) => {
        setCards(cards => cards.map(card =>
            card.id === id ? { ...card, selectedSenior: newSenior } : card
        ));
    }, []);

    const handleClubChange = useCallback((id, newClub) => {
        setCards(cards => cards.map(card =>
            card.id === id ? { ...card, selectedClub: newClub } : card
        ));
    }, []);

    return (
        <VStack spacing={3} alignItems="left" mt="1.5rem" mb="1rem">
            <Button onClick={handleClick} w={isSmallerThan1100 ? "25%" : "20%"} mr="2rem">
                + Add Senior
            </Button>
            {cards.map(card => (
                <VStack
                    key={card.id}
                    w="100%"
                    h={card.size === 'lg' ? '360px' : '250px'}
                    bg="#242323"
                    color="white"
                    display="flex"
                    alignItems="left"
                    justifyContent="top"
                    borderRadius="md"
                    border="1px"
                    borderStyle="solid"
                    borderColor="white.300"
                >
                    <Box m="2rem">
                        <Heading> {card.size === 'lg' ? "Senior's Details" : ''} </Heading>
                        {card.size === 'lg' ? <>
                            <ClubSelect id={card.id} selectedClub={card.selectedClub} handleClubChange={handleClubChange} />
                            <SeniorSelect id={card.id} selectedSenior={card.selectedSenior} handleSeniorChange={handleSeniorChange} />
                        </> : <>
                            <HStack>
                                <ClubSelect id={card.id} selectedClub={card.selectedClub} handleClubChange={handleClubChange} />
                                <SeniorSelect id={card.id} selectedSenior={card.selectedSenior} handleSeniorChange={handleSeniorChange} />
                            </HStack> </>}
                        <Message id={card.id} message={card.message} handleMessageChange={handleMessageChange} />
                    </Box>
                </VStack>
            ))}
        </VStack>
    )
}