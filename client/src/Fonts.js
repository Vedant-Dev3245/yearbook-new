import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Gilmer';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('../Fonts/gilmer/gilmer-medium/webfonts/gilmer-medium.woff2') format('woff2'), url('../public/gilmer/gilmer-medium/webfonts/gilmer-medium.woff2') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin  */
      @font-face {
        font-family: 'Gilmer';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src: url('../Fonts/gilmer/gilmer-bold/webfonts/gilmer-bold.woff2') format('woff2'), url('../public/gilmer/gilmer-bold/webfonts/gilmer-bold.woff2') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Gilmer';
        font-style: bold;
        font-weight: 800;
        font-display: swap;
        src: url('../Fonts/gilmer/gilmer-heavy/webfonts/gilmer-heavy.woff2') format('woff2'), url('../public/gilmer/gilmer-heavy/webfonts/gilmer-heavy.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Gilmer';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('../Fonts/gilmer/gilmer-regular/webfonts/gilmer-regular.woff2') format('woff2'), url('../public/gilmer/gilmer-regular/webfonts/gilmer-regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      @font-face {
        font-family: 'Gilmer';
        font-style: light;
        font-weight: 300;
        font-display: swap;
        src: url('../Fonts/gilmer/gilmer-light/webfonts/gilmer-light.woff2') format('woff2'), url('../public/gilmer/gilmer-light/webfonts/gilmer-light.woff2') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin  */
      @font-face {
        font-family: 'Gilroy';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('../Fonts/GilroyB/Gilroy.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
)

export default Fonts


