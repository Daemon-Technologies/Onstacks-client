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

  #labelOverlay {
    width: 90px;
    height: 45px;
    position: absolute;
    top: 42%;
    left: 30%;
    text-align: center;
    cursor: default;
  }

  #labelOverlay p {
    line-height: 0.3;
    padding:0;
    margin: 8px;
  }

  #labelOverlay p.used-size {
    line-height: 0.5;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }: any) => theme.text};
  }

  #labelOverlay p.total-size {
    line-height: 0.5;
    font-size: 12px;
    margin-top: 14px;
    color: ${({ theme }: any) => theme.text};
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

  .logo {
    width: 200px;
    height: 36px;
  }
  .headerLogo {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      font-size: 12px;
      font-weight: bolder;
      color: ${({ theme }: any) => theme.text};
    }
  }
  .pro-sidebar .pro-menu .pro-menu-item.active {
    border-radius: 4px;
    background: ${({ theme }: any) => theme.hoverColor} !important;
    .pro-item-content {
      color: ${({ theme }: any) => theme.primaryColor} !important;
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
    max-height: 60%;
    height: 100%;
    flex-direction: column;
    -webkit-justify-content: space-between !important;
    justify-content: space-between !important;
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
    #btc {
      margin-right: 16px;
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

  #pie {
    path {
      stroke: ${({ theme }: any) => theme.background} !important;;
  }
  text {
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    margin-bottom: 8px;
  }
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
    max-width: 200px;
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
    margin: 16px 0px;
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

  #main {
    grid-area: main;
    .data {
      font-size: 13px;
      color: ${({ theme }: any) => theme.greyText} !important;
      text-align: right;
    }
  }

  #nav {
    grid-area: nav;
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
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
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
    .title {
      font-size: 14px;
      font-weight: 500;
      /* margin-bottom: 12px; */
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
      width: 100%;
    }
  #content2 {
    padding: 24px;
    width: 100%;
    background: ${({ theme }: any) => theme.background} !important;
    grid-area: content2;
    border-radius: var(--main-radius);
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
    .title {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }

  #content3 {
    grid-area: content3;
    padding: 16px;
    border-radius: var(--main-radius);
    background: ${({ theme }: any) => theme.background} !important;
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
    max-height: 300px;
    .title {
      font-size: 14px;
      font-weight: 500;
      /* margin-bottom: 12px; */
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }

  td {
    font-weight: 600;
  }

  #content4 {
    padding: 24px 29px 24px 24px;
    grid-area: content4;
    background: ${({ theme }: any) => theme.background} !important;
    border-radius: var(--main-radius);
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
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
    margin-bottom: 10px;
  }

  .info-card {
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
    border-radius: 4px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    div {
      padding: 16px;
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

  @media only screen and (max-width: 1580px) { 
    .pro-item-content {
      font-size: 14px;
    }
    .logo {
      width: 150px
    }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
      padding: 8px;
    }
    .menu-content {
      padding: 0px;
      max-height: 55%;
    }
    #labelOverlay {
      left: 29%;
    }
  }
  @media only screen and (max-width: 1200px) {
    #labelOverlay {
      left: 28%;
    }
  }
  @media only screen and (max-width: 1100px) {
    #labelOverlay {
      left: 26%;
    }
  }
  @media only screen and (max-height: 828px) { 
    @media only screen and (max-height: 700px) { 
      .info-card div{
        padding: 8px !important;
      }
      #nav {
        padding: 0 14px;
        height: auto;
      }
    }
    .pro-item-content {
      font-size: 14px;
    }
    .info-card div{
      padding: 16px;
    }
    .menu-content {
      padding: 0px;
      max-height: 55%;
    }
    #content1, #content2, #content3, #content4 {
      padding: 16px;
      max-height: 275px;
    }
    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
      padding: 8px;
    }
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout {
      overflow-y: hidden;
    }
    .crypto {
      margin: 8px 0px;
    }
    .download {
      margin: 16px 0 16px 0;
    }
  }

  @media only screen and (max-width: 1024px) {
  #nav {
    padding: 0px;
  }
  .mobile-header {
    margin: 8px;
  }
  .pro-sidebar.md {
    position: fixed;
    left: 100%;
    height: 100%;
  }
  #labelOverlay {
      left: 30.5%;
  }
  .toggled {
    left: 0 !important;
  }
  #content4, #content3, #content2, #content1 {
    max-height: 600px;
    min-height: 275px;
  }
  .info-card div .sub-title {
    font-size: 16px;
  }
  :root {
    overflow-y: auto;
  }
  .container {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr ;
    grid-template-areas:
    "nav"
    "main"
    "content1"
    "content2"
    "content3"
    "content4";
    grid-gap: 16px;
    width: 100%;
    padding: 32px;
    padding-top: 0;
  }
  .info-card div {
    padding: 16px
  }
  #content4 {
    padding: 16px !important;
  }
  th {
    font-size: 12px;
  }
  td {
    font-size: 12px;
  }
  }
  .TransformComponent-module_container__3NwNd, .TransformComponent-module_content__TZU5O, .fkhEhr {
    width: 100% !important;
    height: 100% !important;
  }
  @media only screen and (max-width: 768px) {
    #labelOverlay {
      left: 43%;
    }
  }
  @media only screen and (max-width: 550px) {
  :root {
    overflow-y: auto;
  }
  th {
      font-size: 12px;
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
  #labelOverlay {
      left: 37%;
  }
  #content1, #content2, #content3, #content4, .info-card {
    width: 98%;
  }
  #content3 {
    height: 400px;
    max-height: 400px;
  }
  
  #content4 {
    height: 300px;
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
