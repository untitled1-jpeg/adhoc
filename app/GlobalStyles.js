'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    background-color: #000; /* Fix overscroll white bar */
    width: 100%;
    height: auto;
    overflow-x: hidden;
    scroll-behavior: smooth; /* Universal smooth scroll */
  }

  body {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
    scroll-behavior: smooth;
    font-family: "sofia-pro", sans-serif;
    color: #fff;
    background-color: transparent; /* Transparent to show FixedBackground video */
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
