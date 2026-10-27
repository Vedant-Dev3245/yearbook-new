import { Box } from "@chakra-ui/react";
import React from "react";

// The little pink dot that marks a notification card as new.
export default function NewDot() {
  return (
    <Box
      role="img"
      aria-label="new"
      flexShrink={0}
      h="0.6rem"
      w="0.6rem"
      borderRadius="50%"
      bg="#FF6187"
    />
  );
}
