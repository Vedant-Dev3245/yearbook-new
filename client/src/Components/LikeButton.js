import React from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const pop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

const PINK = "#FF6187"; // same pink as the site's button gradient

/*
  Heart + count for one caption.

  - Tapping fills the heart immediately (optimistic), then tells the server.
  - The server calls are "make it liked" (PUT) / "make it not liked" (DELETE), so a
    retry or a fast double-tap can never end up in the wrong state.
  - Only one request is in flight at a time; if you tap again meanwhile, the final
    state you ended on is what gets saved.
  - If the server refuses, the heart goes back and a small message appears.
  - If you can't like it (it's your own caption), you just see the count.
*/
export default function LikeButton({
  captionID,
  initialCount = 0,
  initialLiked = false,
  canLike = true,
}) {
  const toast = useToast();

  // what the server last confirmed
  const serverRef = React.useRef({ liked: initialLiked, count: initialCount });
  const [server, setServer] = React.useState(serverRef.current);
  // what the person currently wants (may be ahead of the server for a moment)
  const wantRef = React.useRef(initialLiked);
  const [want, setWant] = React.useState(initialLiked);
  const [popKey, setPopKey] = React.useState(0);
  const busy = React.useRef(false);

  const shownCount =
    server.count + (want === server.liked ? 0 : want ? 1 : -1);

  async function flush() {
    if (busy.current) return;
    busy.current = true;
    try {
      while (serverRef.current.liked !== wantRef.current) {
        const target = wantRef.current;
        const res = await axios({
          method: target ? "PUT" : "DELETE",
          headers: { Authorization: `Bearer ${localStorage.token}` },
          url: `${process.env.REACT_APP_BACKEND_URL}/profiles/captions/${captionID}/like`,
        });
        serverRef.current = {
          liked: !!res.data.liked,
          count: res.data.likeCount,
        };
        setServer(serverRef.current);
      }
    } catch (err) {
      // put the heart back to what the server really has
      wantRef.current = serverRef.current.liked;
      setWant(serverRef.current.liked);
      const status = err.response && err.response.status;
      toast({
        description:
          status === 401 || status === 403
            ? "please log in again to like captions"
            : "couldn't update your like, try again",
        status: "error",
        duration: 2500,
        position: "bottom",
        isClosable: true,
      });
    } finally {
      busy.current = false;
    }
  }

  function toggle() {
    if (!canLike) return;
    const next = !wantRef.current;
    wantRef.current = next;
    setWant(next);
    if (next) setPopKey((k) => k + 1);
    flush();
  }

  // Your own caption: nothing to press, just show the count (if any).
  if (!canLike) {
    if (shownCount <= 0) return null;
    return (
      <Flex
        align="center"
        gap="0.4rem"
        p="0.3rem 0.7rem"
        borderRadius="3rem"
        bgColor="rgba(255, 255, 255, 0.05)"
        border="1px solid rgba(255, 255, 255, 0.25)"
        color={PINK}
        aria-label={`${shownCount} like${shownCount === 1 ? "" : "s"}`}
      >
        <FaHeart size="0.95rem" />
        <Text fontSize="0.9rem" fontWeight="600" lineHeight="1" color="#DCEDFB">
          {shownCount}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      as="button"
      type="button"
      onClick={toggle}
      aria-pressed={want}
      aria-label={want ? "unlike this caption" : "like this caption"}
      align="center"
      gap="0.4rem"
      p="0.3rem 0.7rem"
      borderRadius="3rem"
      bgColor={want ? "rgba(255, 97, 135, 0.12)" : "rgba(255, 255, 255, 0.05)"}
      border="1px solid"
      borderColor={want ? "rgba(255, 97, 135, 0.6)" : "rgba(255, 255, 255, 0.25)"}
      color={want ? PINK : "#DCEDFB"}
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        bgColor: want ? "rgba(255, 97, 135, 0.2)" : "rgba(255, 255, 255, 0.12)",
        borderColor: want ? PINK : "rgba(255, 255, 255, 0.5)",
      }}
      _active={{ transform: "scale(0.96)" }}
      _focusVisible={{ outline: "none", boxShadow: "0 0 0 2px rgba(32, 148, 255, 0.6)" }}
    >
      <Flex
        key={popKey}
        animation={popKey > 0 && want ? `${pop} 0.35s ease` : undefined}
      >
        {want ? <FaHeart size="0.95rem" /> : <FaRegHeart size="0.95rem" />}
      </Flex>
      {shownCount > 0 && (
        <Text fontSize="0.9rem" fontWeight="600" lineHeight="1" color="#DCEDFB">
          {shownCount}
        </Text>
      )}
    </Flex>
  );
}
