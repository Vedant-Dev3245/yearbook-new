import {
    Box,
    Text,
    Image,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

export default function Spotify() {
    const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
    return (
        <>
            <Box
                className="heading"
                fontSize="4rem"
                marginTop={"8rem"}
                marginBottom={"2rem"}
                color="#fff"
                fontWeight={800}
                align={"center"}
            >
                a toast to{" "}
                <Text fontStyle="italic" display="inline" fontFamily="EB Garamond">
                    new beginnings{" "}
                    <Image
                        src="../images/clinking-glasses.png"
                        display="inline"
                        height={12}
                    ></Image>
                </Text>{" "}
            </Box>
            <iframe
                style={{ borderRadius: "12px", marginInline: "auto" }}
                title="new beginnnings"
                src="https://open.spotify.com/embed/playlist/6TusuJOaRieMEUnc0XbVEX?utm_source=generator&theme=0"
                width="90%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </>
    )
}