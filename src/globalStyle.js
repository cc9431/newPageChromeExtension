import { createGlobalStyle } from 'styled-components';
import font from './fonts/SourceCodePro-ExtraLight.otf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SourceCodePro-ExtraLight';
    src: url(${font});
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'SourceCodePro-ExtraLight';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
