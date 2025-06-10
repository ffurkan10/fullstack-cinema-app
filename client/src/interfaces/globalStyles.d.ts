declare module './styles/globalStyles' {
    import { createGlobalStyle } from 'styled-components';
    const GlobalStyles: ReturnType<typeof createGlobalStyle>;
    export default GlobalStyles;
  }
  