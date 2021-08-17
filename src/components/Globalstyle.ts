import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-radius: 5px;
    --main-padding: 16px;
    overflow-x: hidden;
    /* overflow-y: hidden; */
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

  text {
    fill: ${({ theme }: any) => theme.text};
  }

  #labelOverlay {
    width: 90px;
    height: 45px;
    position: absolute;
    top: 42%;
    left: 31%;
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

  .header {
    display: flex;
    /* background: linear-gradient(#6616fc, #f394d3); */
    background: ${({ theme }: any) => theme.background} !important;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    align-items: center;
    height: 60px;
    padding: 14px 32px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    /* height: 80px; */
  }
  .logo-nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    width: 45px;
    height: 45px;
  }
  .nav-options {
    background: ${({ theme }: any) => theme.background} !important;
    padding-left: 25px;
    color: ${({ theme }: any) => theme.text} !important;;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 24px;
    font-size: 14px;
    font-weight: 600;
    list-style-type: none;
    cursor: pointer;
  }
  .mobile-option {
    display: none;
  }

  .option:hover {
    color: ${({ theme }: any) => theme.primaryColor} !important;;
  }
  .option.active {
    color: ${({ theme }: any) => theme.primaryColor} !important;;
  }
  .crypto {
    display: flex;
    padding: 0px 5px;
    list-style-type: none;
  }
  .aligning {
    padding-right: 30px;
    align-items: center;
    display: flex !important;
    img {
      margin-right: 5px;
    }
  }
  .mobile-menu {
    display: none;
  }
  .placeholder {
    display: none;
  }
  .head-colors {
    margin-top: 8px;
  }
  #content2 {
    path {
      stroke-width: 2px;
    }
  }
  .mobile-logo {
    display: none;
  }
  .web-logo {
    display: block;
    width: 32px !important;
    height: 32px !important;
  }
@media (max-width: 768px) {
  /*Mobile View */
  .mobile-logo {
    display: block;
  }
  .web-logo {
    display: none;
  }
  .header {
    padding: 0px 16px;
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .placeholder {
    display: block;
  }
  .logo {
    width: 45px;
    height: 45px;
  }
  .nav-options {
    display: flex;
    width: 100%;
    /* height: 350px; */
    position: absolute;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);;
    top: 60px;
    left: -100%;
    height: 800px;
    opacity: 0;
    transition: all 0.5s ease;
    flex-direction: column;
    list-style-type: none;
    grid-gap: 0px;
  }
  #main {
    margin-top: 24px;
  }
  .nav-options.active {
    background: white;
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
    align-content: center;
    padding-left: 0px;
  }

  .menu-icon {
    width: 45px;
    height: 45px;
  }
  .option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vw;
    padding: 30px 0px;
    img {
      margin-right: 10px;
    }
  }
  .sign-up {
    background: rgb(222, 9, 241);
    border-radius: 3px;
    color: white;
    padding: 20px 0px;
    width: 80%;
    align-self: center;
    border-radius: 3px;
  }

  .crypto {
    display: none !important;
  }
  .mobile-menu {
    display: block;
  }
}

  .pro-sidebar {
    min-width: 100% !important;
    width: 100% !important;
    height: 92vh;
   
  }
  a {
    color: ${({ theme }: any) => theme.text};
    text-decoration: none;
    display: flex;
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

  .google-visualization-tooltip {
    path {
      fill: ${({ theme }: any) => theme.body} !important;
    }
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
    font-weight: 600;
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
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat( 10, 1fr ); */
    grid-template-areas:
        "main main main main main main main main main main main main"
        "main main main main main main main main main main main main"
        "main main main main main main main main main main main main"
        "content1 content1 content1 content1 content1 content1 content2 content2 content2 content2 content2 content2"
        "content1 content1 content1 content1 content1 content1 content2 content2 content2 content2 content2 content2"
        "content1 content1 content1 content1 content1 content1 content2 content2 content2 content2 content2 content2"
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4"
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4"
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4"
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    max-width: 1800px;
    padding: 92px 32px 32px 32px;
    margin: auto;
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
      font-size: 14px;
      margin: 14px 0;
      display: flex;
      color: ${({ theme }: any) => theme.greyText} !important;
      text-align: right;
      span {
        color: ${({ theme }: any) => theme.primaryColor};
      }
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
    display: none;
  }

  #content1 {
    grid-area: content1;
    padding: 24px;
    width: 100%;
    path {
      stroke-width: 3;
      /* stroke: #FFA043; */
    }
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
      font-size: 25px;
      font-weight: 600;
      line-height: 40px;
      color: ${({ theme }: any) => theme.text} !important;
    }
  }
  .seprator {
      width: 100%;
      height: 90%;
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
    margin-bottom: 12px;
  }

  .info-card {
    box-shadow: ${({ theme }: any) =>
      theme.background === "#FFFFFF"
        ? "0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%)"
        : "0px"};
    height: 110px;
    border-radius: 4px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    div {
      padding: 31px 16px;
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
      left: 30%;
    }
  }
  @media only screen and (max-width: 1200px) {
    #labelOverlay {
      left: 30%;
    }
  }
  @media only screen and (max-width: 1100px) {
    #labelOverlay {
      left: 26%;
    }
  }
  @media only screen and (max-height: 828px) { 
    @media only screen and (max-height: 700px) { 
      #nav {
        padding: 0 14px;
        height: auto;
      }
    }
    .pro-item-content {
      font-size: 14px;
    }
    .menu-content {
      padding: 0px;
      max-height: 55%;
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
      left: 36%;
  }
  .info-card {
    height: auto;
  }
  #main {
    margin-top: 34px;
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);;
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
  #content1, #content2 {
    height: 240px !important;
  }
  #content3, #content4 {
    height: 340px !important;
  }
  `;
