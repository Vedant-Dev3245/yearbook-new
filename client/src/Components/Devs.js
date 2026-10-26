import React from "react";
import DevCards from "./DevCards";
import Masonry from "react-masonry-css"


export default function Devs() {
    // const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1
    };
    return (
        <>
            <Masonry width="100%" marginInline="auto" breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column2">
                <DevCards
                    img="../images/shwetabh.png"
                    name="shwetabh niket"
                    caption="frontend captain | 2021B5PS0923P"
                    twitter="https://twitter.com/shwetabhNiket"
                    github="https://github.com/nIMblEt06"
                    linkedin="https://www.linkedin.com/in/niketshwetabh/"
                    spotify="https://open.spotify.com/playlist/6mMuC8FzWIuEflOiTkGAUW?si=d4a6280cc03743da"
                    text="i just wanted to make you laugh :/"
                />
                <DevCards
                    img="../images/keshri.jpeg"
                    name="aryan keshri"
                    caption="my coord | 2021B3A71260P"
                    twitter="https://twitter.com/aryankeshri007?s=21"
                    github="https://github.com/DankMemes4President"
                    linkedin="https://www.linkedin.com/in/aryan-keshri-702a60222"
                    spotify="https://open.spotify.com/track/2DjpIAVeu7LKhnem3KY07Q?si=e7a8dbb3f03d4037"
                    text="retiring from cursing compres after this semester.."
                />
                <DevCards
                    img="../images/aryan.png"
                    name="aryan bakshi"
                    caption="multitasker | 2021A7PS0532P"
                    twitter="https://twitter.com/aryan_bakshii"
                    github="https://github.com/aryan-bakshii"
                    linkedin="https://www.linkedin.com/in/aryan-bakshi-005b27222/"
                    spotify="https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=12bf8c69f6954053"
                    text="if i was here, i'd know what to write."
                />
                <DevCards
                    img="../images/patil.png"
                    name="aditya patil"
                    caption="ninja designer | 2021AAPS2230P"
                    twitter="https://twitter.com/AnAvUser?t=4EO7NYn6HOZgBnhIfOCZSg&s=09"
                    github=""
                    linkedin="https://www.linkedin.com/in/aditya-patil-aa2431230"
                    spotify="https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8?si=WQhxVzHjR_KFNbH8I8O6IQ&utm_source=copy-link"
                    text="Doth mother know you weareth her drapes?"
                />
                <DevCards
                    img="../images/pratham.png"
                    name="pratham arya"
                    caption="one man army | 2020B4A81658P"
                    twitter="https://twitter.com/pentaquark16"
                    github="https://github.com/pentaquark1616"
                    linkedin="https://www.linkedin.com/in/pratham-arya/"
                    spotify="https://open.spotify.com/track/5PQV6JRuE9wSfPS49Zlrx7?si=4c22989f0a9a4f81"
                    text="I gave up my struggle with perfection a long time ago. That is a concept I don't find very interesting anymore. Be happy. Be yourself, the day is about a lot more."
                />
                <DevCards
                    img="../images/sarthak.jpeg"
                    name="sarthak arora"
                    caption="life sorter | 2020A7PS0060P"
                    twitter="https://twitter.com/thysarthak"
                    github="https://github.com/sarthakeash"
                    linkedin="https://linkedin.com/in/sarthak-arora-aa92b9201/"
                    spotify="https://open.spotify.com/track/6BU1RZexmvJcBjgagVVt3M?si=5r8zhFTYQbySAMPlA7cErQ"
                    text="Dont lose what you can’t replace."
                />
                <DevCards
                    img="../images/saksham.png"
                    name="saksham aggarwal"
                    caption="heavylifter | 2020A7PS1508P"
                    twitter="https://twitter.com/saksham_io"
                    github="http://github.com/sakshamdevelops"
                    linkedin="http://linkedin.com/in/sakshamagg27/"
                    spotify="https://open.spotify.com/track/3oVGjguICRU4UVS1ZPwH2D?si=12e226df30b947d7"
                    text="Sometimes you should take the first step."
                />
                <DevCards
                    img="../images/shreya.png"
                    name="shreya nag"
                    caption="wannabe magician | 2021A2PS2636P"
                    twitter="https://twitter.com/ShreyaNag01?t=_IJFL1zQb7DUNABcgtz-Bw&s=09"
                    github=""
                    linkedin="https://www.linkedin.com/in/shreya-nag-573976245"
                    spotify=""
                    text="Don’t let the Muggles get you down."
                />
                <DevCards
                    img="../images/harsh.png"
                    name="harsh singh"
                    caption="backing backend | 2021A3PS1725P"
                    twitter="https://twitter.com/harsh_singh58"
                    github="https://github.com/DankMemes4President"
                    linkedin="https://www.linkedin.com/in/harsh-singh-049838227/"
                    spotify="https://open.spotify.com/track/2DjpIAVeu7LKhnem3KY07Q?si=e7a8dbb3f03d4037"
                    text="retiring from cursing compres after this semester.."
                />
                <DevCards
                    img="../images/shreyaK.png"
                    name="shreya khubber"
                    caption="boss lady | 2020A8PS1807P"
                    twitter="https://twitter.com/shreyakhubber?lang=en"
                    github=""
                    linkedin="https://www.linkedin.com/in/shreya-khubber/"
                    spotify="https://open.spotify.com/album/0yMLTRxwcDN5XHjP5w8jAH?si=wrdfhONORHCp8gvSQ72CDQ&utm_source=copy-link"
                    text="i don't think i did anything.."
                />

            </Masonry>
        </>
    )
}
