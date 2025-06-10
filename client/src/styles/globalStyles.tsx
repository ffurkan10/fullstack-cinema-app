import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Raleway, sans-serif;
}

body{
  min-height: 100vh;
  background: linear-gradient(180deg, #121212 0%, #383838 45.44%, #121212 100%);
}

.container {
    width: 90%;
    margin: 0 auto;
    padding: 0px 24px;
    @media (max-width: 1400px) {
      width: 95%;
    }
    @media (max-width: 1150px) {
      width: 100%;
    }
  }
 
 
 h1{
    font-size: 34px;
    font-weight: 700;
    color: var(--dark-gray);
    @media (max-width: 1000px){
      font-size: 26px;
    }
  }
  h2{
    font-size: 30px;
    font-weight: 600;
    color: var(--dark-gray);
    @media (max-width: 1000px){
      font-size: 22px;
    }
  }
  h3{
    font-size: 24px;
    font-weight: 600;
    color: var(--dark-gray);
    @media (max-width: 1000px){
      font-size: 20px;
    }
  }
  h4{
    font-size: 20px;
    font-weight: 600;
    color: var(--dark-gray);
    @media (max-width: 1000px){
      font-size: 18px;
    }
  }

  p{
    color: var(--dark-gray);
    line-height: 1.4;
  }
 
 
 //! colors and fonts
 :root {
    --color-main: #96a825;

    --dark-gray: #424242;

    --color-bg: linear-gradient(180deg, #121212 0%, #383838 45.44%, #121212 100%);
    --color-secondary-bg: #272727;
    --color-bg2: #4CAF50;
    --color-bg3: #A5D6A7;

    --color-white: #FFF;
    --color-blue: #4a90e2;

    --color-text: #BDBDBD;
    --color-border2: #E0E0E0;
    --color-border3: #e0e0e0;


    --font-weight-sm: 400;
    --font-weight-md: 500;
    --font-weight-lg: 600;
    --font-weight-xl: 700;

    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-xxl: 22px;
    --font-size-xxxl: 24px;
  }
`

export default GlobalStyles;

