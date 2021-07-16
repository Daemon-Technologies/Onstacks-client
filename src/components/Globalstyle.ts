import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: any) => theme.body};
    color: ${({ theme }: any) => theme.text};
    font-family: 'Manrope', sans-serif;
    transition: all 0.50s linear;
    height: 100vh;
  }
  //SIDEBAR
  .pro-sidebar {
    height: 92vh;
  }
  .pro-sidebar > .pro-sidebar-inner {
    background: ${({ theme }: any) => theme.background} !important;
    color: ${({ theme }: any) => theme.text};
    transition: all 0.50s linear;
  }

  .pro-sidebar .pro-menu .pro-menu-item.active {
    border-radius: 4px;
    background: ${({ theme }: any) => theme.hoverColor} !important;
    .pro-item-content {
      color: ${({ theme }: any) => theme.text} !important;
    }
    /* padding: 12px; */
  }

  .menu-content {
    padding: 0 24px;
    display: flex !important;
    height: 60%;
    flex-direction: column;
    justify-content: space-between;
    span {
      color: ${({ theme }: any) => theme.primaryColor};
    }
    p {
      font-size: 14px;
      font-weight: 600;
      color: ${({ theme }: any) => theme.greyText} !important;    
    }
    .download > p {
      margin-left: 12px !important;
      color: ${({ theme }: any) => theme.text} !important;
    }
  }

  .crypto {
    flex-direction: row;
    display: flex;
    margin-top: 24px;
    margin-bottom: 16px;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }
  }
  
  .slash {
    width: 12px;
    height: 18px;
  }
  .download {
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #EBEAED;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 0 16px;
    border: 1px solid #EBEAED;
    margin: 16px 0;
  }

  .mobile-header {
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin: 16px;
  }

  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }
  .container {
    display: flex;
    flex: 1;
    align-items: flex-start;
    height: 100vh;
  }
  `;
