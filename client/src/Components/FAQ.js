import React from "react";
import {
    Box, Text, VStack, useMediaQuery, Image
} from "@chakra-ui/react";
import { useState } from "react";
import FAQItems from "./FAQItems";

export default function FAQ() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const [faq1, setFaq1] = useState(false);
    const [faq2, setFaq2] = useState(true);
    const [faq3, setFaq3] = useState(false);
    const [faq4, setFaq4] = useState(false);
    const [faq5, setFaq5] = useState(false);
    const [faq6, setFaq6] = useState(false);
    const [faq7, setFaq7] = useState(false);
    const [faq8, setFaq8] = useState(false);
    const [faq9, setFaq9] = useState(false);
    return (
        <>
            <Box className="heading" fontSize="3.2rem"
            color="#fff" fontWeight={800} 
            textAlign='left' 
            ml={isSmallerThan800 ? '1.4rem !important' : '10rem'}
            mt="10rem">have a <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >question?</Text> </Box>
            <VStack mt="2rem" marginInline={isSmallerThan800 ? 0 : "5rem"} spacing={4} className="faqCont" id="faq">
                <FAQItems
                    marginBottom="0 !important"
                    faq="Would I be required to log in every time I access the yearbook portal?"
                    show={faq1}
                    setFaq={setFaq1}
                    text="No. Once you set up your profile on the first log in, you would not be required to log in again every time you access the portal. Just click on the ‘Profile’ button on the top of the dashboard, and you’re good to go."
                />
                <FAQItems
                    faq="Can I navigate through the profiles of my batchmates?"
                    show={faq2}
                    setFaq={setFaq2}
                    text="Yes, you can do that by typing their name on the search bar."
                />
                <FAQItems
                    faq="Would I be required to re-enter my details for the physical yearbook separately?"
                    show={faq3}
                    setFaq={setFaq3}
                    text="No, your entries from the yearbook portal will be used for printing in the yearbook. Please ensure you fill in the details accordingly. You can edit your profile, including your quote and picture, once you’ve signed up on the portal. However, after a particular date - of which you’ll be informed well in advance, your profile will be locked, and the same details would be used for the physical yearbook"
                />
                 <FAQItems
                    faq="Can I change my quote and picture after my first log-in?"
                    show={faq4}
                    setFaq={setFaq4}
                    text="You can edit your quote and picture multiple times but before the deadline, after which your profile will be locked"
                />
                
                <Image src="../images/text2816.png" zIndex='1' opacity="0.2" position="absolute" right="1.2rem" />                
                <FAQItems
                    faq="Is there a character limit for the quote?"
                    show={faq5}
                    setFaq={setFaq5}
                    text="Yes, the quote should not exceed 140 characters since it is challenging for us to accommodate a longer quote in the physical yearbook."
                />
                <FAQItems
                    faq="How can I nominate somebody to write on ‘my wall’?"
                    show={faq6}
                    setFaq={setFaq6}
                    text="Go to the ‘my wall’ section, click on nominate, and enter the person's name in the search box. A nomination request will be sent to them via mail, and a notification would be added to their profile."
                />
                <FAQItems
                    faq="Does using the portal de-facto imply that I am a recipient of a physical copy?"
                    show={faq7}
                    setFaq={setFaq7}
                    text="No, you must opt-in for the physical yearbook from the dashboard before a deadline which will be communicated well in advance."
                />
                <FAQItems
                    faq="How can I opt-out of receiving the yearbook?"
                    show={faq8}
                    setFaq={setFaq8}
                    text="If you do not fill out the ‘Opt-in form’ on the dashboard before the communicated deadline, that suffices for us to know that you wish to opt-out of receiving a physical copy of the yearbook."
                />                
                 <FAQItems
                    faq="Can I re-submit the form if I change my mind regarding opting for the yearbook?"
                    show={faq9}
                    setFaq={setFaq9}
                    text="No, you cannot change your choice for opting in for the physical yearbook once you have filled out the opt-in form. Please ensure that you fill out the form before the deadline. We will not accept any requests for either opting-in or opting-out for receiving the physical copy of the yearbook after the communicated deadline. "
                />
            </VStack>
        </>
    )
}
