import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  Image,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [loggedIn, setLoggedIn] = React.useState(false);

  if (localStorage.getItem("user") !== null && !loggedIn) {
    setLoggedIn(true);
  }

  function gotoprofile() {
    // console.log(localStorage.getItem("user"))
    navigate(`/profile/${localStorage.getItem("user")}`);
  }

  const navigate = useNavigate();

  function gotodevelopers() {
    navigate("/developers");
  }

  return (
    <>
      <Image
        pointerEvents={"none"}
        position={"absolute"}
        x={0}
        y={0}
        src="../images/Ellipse 7.png"
      />
      <Box className="pad">
        <Flex
          borderRadius={10}
          backdropFilter={"blur(30px)"}
          border="0.01rem solid #FFFFFF"
          boxShadow="0px 0px 10px rgba(255, 255, 255, 0.6)"
          justifyContent="space-between"
          paddingBlock={1}
          alignItems="center"
          className="navbar"
          marginInline={"auto"}
          background="linear-gradient(90deg, rgba(251, 251, 251, 0.1) 0%, rgba(251, 251, 251, 0.1) 100%);"
          position="fixed"
          w={isSmallerThan800 ? "88%" : "95%"}
          zIndex={10}
        >
          <Link fontWeight="800" fontSize="2rem" color="white" p={3} pl={6} href="https://yearbook.bits-sarc.in">
            SARC
          </Link>
          <Box
            display={isSmallerThan800 ? "none" : "flex"}
            justifyContent="space-between"
            width="100%"
            maxW="500px"
            align={"center"}
          >
            <Link
              fontSize="s"
              fontWeight="600"
              color="white"
              p={4}
              href="https://yearbook.bits-sarc.in"
            >
              home
            </Link>
            <Link
              fontSize="s"
              fontWeight="600"
              color="white"
              p={4}
              href="https://fierce-jeep-1d2.notion.site/Student-Alumni-Relations-Cell-Who-are-we-9fb9470c4ec14d59978ed9c98a440711"
              target="_blank"
            >
              about
            </Link>
            <Link
              fontSize="s"
              fontWeight="600"
              color="white"
              p={4}
              href="#contact"
            >
              contact
            </Link>
            <Link
              fontSize="s"
              fontWeight="600"
              color="white"
              p={4}
              onClick={gotodevelopers}
            >
              developers
            </Link>
          </Box>
          <Box mr={10} display={isSmallerThan800 ? "block" : "none"}>
            <Menu>
              <MenuButton
                as={IconButton}
                color="white"
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="none"
                width={"2rem"}
              />
              <MenuList color="white" bgColor="#141414">
                <MenuItem bgColor="#141414">
                  <Link
                    fontSize="s"
                    width="100%"
                    fontWeight="600"
                    href="https://yearbook.bits-sarc.in"
                  >
                    home
                  </Link>
                </MenuItem>
                <MenuItem color="white" bgColor="#141414">
                  <Link
                    fontSize="s"
                    fontWeight="600"
                    width="100%"
                    href="https://fierce-jeep-1d2.notion.site/Student-Alumni-Relations-Cell-Who-are-we-9fb9470c4ec14d59978ed9c98a440711"
                    target="_blank"
                  >
                    about
                  </Link>
                </MenuItem>
                <MenuItem color="white" bgColor="#141414">
                  <Link fontSize="s" fontWeight="600" href="#contact" width="100%">
                    contact
                  </Link>
                </MenuItem>
                <MenuItem color="white" bgColor="#141414">
                  <Link fontSize="s" fontWeight="600" onClick={gotodevelopers} width="100%">
                    developers
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          {loggedIn && !isSmallerThan800 ? (
            <Button
              onClick={gotoprofile}
              mr={10}
              bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);"
              _hover={{
                transform: "translate(-2px, -2px)",
                bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
              }}
            >
              <Text fontSize="s" fontWeight="700" color="white" p={4}>
                Profile
              </Text>
            </Button>
          ) : (
            <Box
              id="signInDiv"
              display={isSmallerThan800 ? "none" : "block"}
              p={2}
              mr={2}
            ></Box>
          )}
        </Flex>
      </Box>
    </>
  );
}
