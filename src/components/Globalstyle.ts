import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-radius: 5px;
    --main-padding: 16px;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Manrope', sans-serif;
  }
  body {
    background: ${({ theme }: any) => theme.body};
    color: ${({ theme }: any) => theme.text};
    font-family: 'Manrope', sans-serif;
    transition: all 0.50s linear;
    height: 100vh;
  }
  //SIDEBAR
  .pro-sidebar {
    min-width: 100% !important;
    width: 100% !important;
    height: 92vh;
   
  }
  .pro-sidebar .pro-menu a {
    color: ${({ theme }: any) => theme.text};
  }
  .hr {
      background:  ${({ theme }: any) => theme.border} !important;
      margin: 24px 10px;
      height: 1px;
    }
  .pro-sidebar > .pro-sidebar-inner {
    background: ${({ theme }: any) => theme.body} !important;
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

  .pro-inner-item {
    padding: 8px 16px;
  }
  .pro-item-content {
    font-weight: 600;
  }

  .pro-sidebar .pro-menu {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .menu-content {
    padding: 0 16px;
    display: flex !important;
    height: 65%;
    flex-direction: column;
    justify-content: space-between;
    span {
      color: ${({ theme }: any) => theme.primaryColor};
    }
    p {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 14px;
      color: ${({ theme }: any) => theme.greyText} !important;    
    }
    .download > p {
      margin-left: 12px !important;
      margin-bottom: 0px;
      color: ${({ theme }: any) => theme.text} !important;
    }
  }

  .crypto {
    flex-direction: row;
    display: flex;
    margin-top: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    align-items: center;
    flex-wrap: wrap;
    line-height: 2;
    #stacks {
      margin-left: 16px;
    }
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
    background: ${({ theme }: any) => theme.background} !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 12px 16px;
    margin: 40px 0 16px 0;
    width: 80%;
  }

  h3 {
    margin-bottom: 12px;
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
    border-bottom: 0px;
    margin-bottom: 32px;
  }
  .pro-sidebar-inner {
    padding: 0px 12px;
  }
  .container {
    display: grid;
    height: 100vh;
    grid-template-columns: repeat( 12, 1fr );
    grid-template-rows: repeat( 10, 1fr );
    grid-template-areas:
        "nav nav nav nav nav nav nav nav nav nav nav nav"
        "sidebar sidebar main main main main main main main main main main"
        "sidebar sidebar main main main main main main main main main main"
        "sidebar sidebar content1 content1 content1 content1 content1 content2 content2 content2 content2 content2"
        "sidebar sidebar content1 content1 content1 content1 content1 content2 content2 content2 content2 content2"
        "sidebar sidebar content1 content1 content1 content1 content1 content2 content2 content2 content2 content2"
        "sidebar sidebar content3 content3 content3 content3 content3 content4 content4 content4 content4 content4"
        "sidebar sidebar content3 content3 content3 content3 content3 content4 content4 content4 content4 content4"
        "sidebar sidebar content3 content3 content3 content3 content3 content4 content4 content4 content4 content4"
        "sidebar sidebar content3 content3 content3 content3 content3 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    padding-right: 32px;
  }

  .not-found {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    img {
      width: 200px;
      height: 200px;
      object-fit: contain;
      margin-bottom: 25px;
    }
    .button {
      background: ${({ theme }: any) => theme.primaryColor} !important;
      padding: 8px 60px;
      border-radius: 4px;
      margin-top: 33px;
      cursor: pointer;
      p {
        color: white;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0px;
      }
    }
  }

  #main {
    grid-area: main;
  }

  #nav {
    grid-area: nav;
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    .logo {
      width: 160px;
      height: 36px;
    }
    .notification {
      width: 28px;
      height: 28px;
    }
  }

  #sidebar {
    grid-area: sidebar;
    border-radius: var(--main-radius);
  }

  #content1 {
    grid-area: content1;
    padding: 24px;
    width: 100%;
    background: ${({ theme }: any) => theme.background} !important;
    border-radius: var(--main-radius);
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    .title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 12px;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
    .sub-title {
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      color: ${({ theme }: any) => theme.text} !important;
    }
  }
  .seprator {
      margin-left: 12px;
      width: 100%;
    }
  #content2 {
    padding: 24px;
    width: 100%;
    background: ${({ theme }: any) => theme.background} !important;
    grid-area: content2;
    border-radius: var(--main-radius);
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    .title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 12px;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }

  #content3 {
    grid-area: content3;
    padding: 16px;
    border-radius: var(--main-radius);
    background: ${({ theme }: any) => theme.background} !important;
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    max-height: 300px;
  }

  td {
    font-weight: 600;
  }

  #content4 {
    padding: 24px 29px 24px 24px;
    grid-area: content4;
    background: ${({ theme }: any) => theme.background} !important;
    border-radius: var(--main-radius);
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    max-height: 300px;
    p {
      font-size: 14px;
      color: ${({ theme }: any) => theme.greyText} !important;
      font-weight: 500;
      margin-bottom: 8px;
    }
  } 

  .screen-title {
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 20px;
  }

  .info-card {
    box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
    border-radius: 4px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    div {
      padding: 31px 68px 31px 16px;
      .title {
        font-weight: 500;
        font-size: 14px;
        color: ${({ theme }: any) => theme.greyText} !important;    
        line-height: 20px;
      }
      .sub-title {
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
      }
    }
  }

  table {
    td:first-child {
      color: ${({ theme }: any) => theme.primaryColor} !important;    
    }
    td {
      padding: 8px;
      padding-left: 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }
    th {
      padding: 4px;
      padding-left: 0;
    }
    width: 100%;
    border-collapse: collapse;
    color: ${({ theme }: any) => theme.greyText} !important;    
    thead {
      text-align: left;
      padding: 8px;
      tr {
        border-top: 1pt solid ${({ theme }: any) => theme.border};
        border-bottom: 1pt solid ${({ theme }: any) => theme.border};
      }
    }
    tbody {
      vertical-align: top;
    }
  }

  @media only screen and (max-width: 550px) {
  :root {
    overflow-y: auto;
  }
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr ;
    grid-template-areas:
      "nav"
      "main"
      "content1"
      "content2"
      "content3"
      "content4";
      padding: 16px;
    }
    #nav {
    padding: 0;
  }
  #content1, #content2, #content3, #content4, .info-card {
    width: 98%;
  }
  #content3, #content4 {
    height: 400px;
  }
  .pro-sidebar.sm {
    left: 100%;
  }
  .info-card {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    div {
      width: 100%;
      border-bottom: 1px solid  #EBEAED;
    }
  }
  #content4 {
    max-height: 600px;
  }
  #sidebar {
    height: 100%;
    background: ${({ theme }: any) => theme.body} !important;
    top: 0;
  }
  }

 
  `;
