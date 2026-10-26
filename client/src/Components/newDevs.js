import React from "react";
import DevCards from "./DevCards";
import Masonry from "react-masonry-css"


export default function newDevs() {
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
                    img="../images/vedant.jpg"
                    name="vedant jain"
                    caption="full stack dreamer | 2024A7PS0555P"
                    twitter=""
                    github="https://github.com/Vedant-Dev3245"
                    linkedin="https://www.linkedin.com/in/vedant-jain-6b443a204/"
                    spotify="https://open.spotify.com/user/31qsmzpfzh6orcfs7oqnyxm4c2ye?si=4da85dfad26845c2"
                    text="its not zeroes and ones, its dreams and nightmares"
                />
                <DevCards
                    img="../images/ananya.jpg"
                    name="ananya shankar"
                    caption="design team | 2023B1A3PS0836P"
                    twitter="https://x.com/AnanyaS10355303"
                    github=""
                    linkedin="http://www.linkedin.com/in/ananya-shankar20"
                    spotify="https://open.spotify.com/user/yfc61ut0zdhh3vmpblix2q1gj?si=efe7d15ec71c4da1"
                    text="carrying design team"
                />
                <DevCards
                    img="../images/dev.jpg"
                    name="dev satish"
                    caption="tech guy | 2023B1A4PS0833P"
                    twitter="https://x.com/devtech08"
                    github="https://www.linkedin.com/in/dev-satish/"
                    linkedin="https://github.com/Dev-Satish-01"
                    spotify="https://open.spotify.com/user/1oziia7t09x2x1hqyuyktwo8w?si=531838d197504380"
                    text="its not gambling if you know you're gonna win"
                />
                <DevCards
                    img="../images/prithvi.jpg"
                    name="prithvi gowda c"
                    caption="database manager | 2023A3PS0327P"
                    twitter=""
                    github="https://github.com/prithvi05prism"
                    linkedin="https://www.linkedin.com/in/prithvi-gowda-c/"
                    spotify="https://open.spotify.com/user/8m5wwm07knxfm47geod9njb52?si=f8002970d7f64ba4"
                    text="we do things not because they are easy, but because we thought they would be easy"
                />
                <DevCards
                    img="../images/himanshu.jpeg"
                    name="himanshu kumar"
                    caption="frontend captain | 2022A8PS0557P"
                    twitter="https://twitter.com/whimahima"
                    github="https://github.com/Zendovo"
                    linkedin="https://www.linkedin.com/in/himanshu-kumar-679ab31b0/"
                    spotify="https://open.spotify.com/user/6n14xp26o4hzwdjjb60fdynee?si=53aa66381cb84e11"
                    text="meeting deadlines one at a time"
                />
                <DevCards
                    img="../images/rakshit.jpeg"
                    name="rakshit sakhuja"
                    caption="multitasker | 2022A8PS0471P"
                    twitter=""
                    github="https://github.com/Rakshit2622"
                    linkedin="https://www.linkedin.com/in/rakshit-sakhuja-61ab00138/"
                    spotify="https://open.spotify.com/user/dvpfwr821jtdbk0zqm9tmk1p6"
                    text="Damn bro took only two weeks to complete this project"
                />
                <DevCards
                    img="../images/nabisha.jpeg"
                    name="nabisha obaid"
                    caption="ninja designer | 2022B1PS1591P"
                    twitter="http://www.twitter.com/not_bishx"
                    github=""
                    linkedin="https://www.linkedin.com/in/nabisha-obaid-19175a264"
                    spotify="https://open.spotify.com/user/31cvstady2jbjicplfq3efd5rmoa?si=dSQ8_NqpSPWGoBdne3E98g"
                    text="Just give me some good music and a deadline"
                />
                <DevCards
                    img="../images/ishita.jpeg"
                    name="ishita agrawal"
                    caption="Everything you like🍁 | 2022A8PS1248P"
                    twitter="https://twitter.com/isthatishita?t=68oAisBkzqN_5uhadWlIyg&s=09"
                    github=""
                    linkedin="https://www.linkedin.com/in/ishita-agrawal-6a817b251"
                    spotify="https://open.spotify.com/playlist/6PaRU0RIuVDuSIBQoq2Yp8?si=PGMZpcDGRCuJOBikw2QYnw&utm_source=whatsapp"
                    text="You can. End of Story"
                />
                <DevCards
                    img="../images/prabhas.jpeg"
                    name="prabhas Kumar"
                    caption="sadboi | 2021A3PS1526P"
                    twitter="https://twitter.com/prabhas2702"
                    github="https://github.com/APRABHASKUMAR"
                    linkedin="https://open.spotify.com/track/6BU1RZexmvJcBjgagVVt3M?si=5r8zhFTYQbySAMPlA7cErQ"
                    spotify="https://open.spotify.com/track/5UXJzLFdBn6u9FJTCnoHrH?si=e59ef4fe79fc4fe6"
                    text="never touching web dev again"
                />
                <DevCards
                    img="../images/jai.jpeg"
                    name="jai vr"
                    caption="hustler | 2022A8PS1264"
                    twitter="https://twitter.com/shreyakhubber?lang=en"
                    github=""
                    linkedin="https://www.linkedin.com/in/shreya-khubber/"
                    spotify="https://open.spotify.com/album/0yMLTRxwcDN5XHjP5w8jAH?si=wrdfhONORHCp8gvSQ72CDQ&utm_source=copy-link"
                    text="I work for the sound from my keyboard :)"
                />

            </Masonry>
        </>
    )
}
