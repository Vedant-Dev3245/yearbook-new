import { extendTheme } from '@chakra-ui/react'
import "@fontsource/eb-garamond"

const theme = extendTheme({
  fonts: {
    // heading: `'EB Garamond', serif`,
    body: "Gilmer"
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "white",
            borderColor: "black",
            color: "black",
            _hover: {
              bg: "white",
              borderColor: "black",
            },
            _disabled: {
              bg: "gray.300",
              borderColor: "gray.300",
            },
          },
        },
      },
    },
  },
})

export default theme;