import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-radius: 0px;
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
    left: 30%;
    text-align: center;
    cursor: default;
  }

  li {
    a {
      font-size: 14px;
    font-weight: 600;
    }
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
    z-index: 200;
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
  .miningData {
    #main {
    margin-top: 45px;
  }
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


  a {
    color: ${({ theme }: any) => theme.text};
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  .hr {
      background:  red;
      margin: 24px 10px;
      height: 1px;
    }

  .google-visualization-tooltip {
    path {
      fill: ${({ theme }: any) => theme.background} !important;
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
å

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
    max-width: 1280px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }

  .miningData {
    display: grid;
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat( 10, 1fr ); */
    grid-template-areas:
        "main main main main main main main main main main main main"
        "content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1"
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    max-width: 1280px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }

  .bubble-tooltip {
    background: ${({ theme }: any) => theme.background} !important;
    padding: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 20px 24px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    align-items: flex-start;
    div {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
    .circle {
      width:  8px;
      height: 8px;
      margin-right: 5px;
      border-radius: 2.5px;
    }
    p {
      //styleName: Regular Text / 12px / Semibold;
      font-family: Manrope;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0px;
      text-align: left;
    }
    .name {
      color: ${({ theme }: any) => theme.greyText} !important;
    }
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
      cursor: pointer;
      margin: 14px 0;
      font-weight: 600;
      display: flex;
      color: ${({ theme }: any) => theme.greyText} !important;
      text-align: right;
      span {
        color: ${({ theme }: any) => theme.primaryColor};
      }
    }
  }
  .based {
    display: block;
    color: ${({ theme }: any) => theme.greyText} !important;

  }
  .arrow {
    border: solid;
    border-width: 0px 5px 5px 0;
    display: inline-block;
    padding: 5px;
    margin-bottom: -19px;
    margin-left: -16px;
    }
    
    .right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
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

  
    .row-flow-p {
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: left;

    }
  .react-flow__pane, .react-flow__renderer, .react-flow__selectionpane {
    height: 100%;
  }
  #content1 {
    grid-area: content1;
    padding: 24px;
    width: 100%;
    position: relative;

    path {
      stroke-width: 3;
      /* stroke: #FFA043; */
    }
    background: ${({ theme }: any) => theme.background} !important;
    border-radius: var(--main-radius);
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
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
  .title-table {
    font-size: 14px;
      font-weight: 500;
      margin-bottom: 12px;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
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
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
    .title {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }

  #content3 {
    grid-area: content3;
    padding: 24px;
    border-radius: var(--main-radius);
    background: ${({ theme }: any) => theme.background} !important;
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
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

  td {
    font-weight: 600;
  }
  

  #content4 {
    padding: 24px 29px 24px 24px;
    grid-area: content4;
    background: ${({ theme }: any) => theme.background} !important;
    border-radius: var(--main-radius);
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
  position: relative;
  height: auto;
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

  .screen-title {
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 12px;
  }

  .info-card {
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
    height: 110px;
    border-radius: 4px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: center;
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
  .hr {
    border:none;
    border-top: 1pt dashed ${({ theme }: any) => theme.border};
    color:#fff;
    background-color:#fff;
    height:1px;
    width:100%;
    top: -5px;
    position: absolute;
  }
  .block-number {
    font-family: Manrope;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: left;
    span {
      color: ${({ theme }: any) => theme.greyText};
      font-size: 16px;
      font-weight: 500;
      font-family: Manrope;
    }
  }
  .block-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px 0;
    width: 100%;
    grid-area: content1;
    p {
      margin-right: 20px;
    }
    div {
      width: 25px;
      border-radius: 4px;
      cursor: pointer;
      height: 25px;
      background-color: rgba(255, 160, 67, 0.25);
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 12px;
        /* height: 10px; */
      }
    }
  }
  .row-content {
    display: flex;
    margin-top: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .black {
      color: ${({ theme }: any) => theme.text} !important;    

    }
    p {
      color: ${({ theme }: any) => theme.greyText} !important;    
      font-weight: 500;
      font-size: 14px;
    }
    .a-tag {
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      color: ${({ theme }: any) => theme.primaryColor} !important;    
    }
  }

  .lines {
    position: relative;
    display: flex;
    margin-top: 18px;
    margin-bottom: 24px;
    flex-direction: row;
    justify-content: space-between;
    div {
      z-index: 10;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-top: 24px;
      }
      margin-bottom: 24px;
    }
  }
  .google-visualization-tooltip {
     border:none !important;
  }
  .google-visualization-tooltip-square {
    width: 1em !important;
    height: 1em !important;
    border-radius: 50%;
  }
  .container {
    #content3 {
    .google-visualization-tooltip-square {
    width: 0.5em !important;
    height: 65% !important;
    position: absolute;
    left: 10px;
    border-radius: 0.25em;
    margin-right: 10px;
  }
  .google-visualization-tooltip-item {
    margin: 1em 0 1em 1em;
  }
  }
  }
  .google-visualization-tooltip-item-list .google-visualization-tooltip-item:first-child {
    text-align: center;
    span {
      color: ${({ theme }: any) => theme.greyText} !important;   
      font-family: Manrope;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
      letter-spacing: 0px;
      text-align: center;
    }
    span:before {
      content: '#'
    }
  }
  .tool-tip-chart {
    background: ${({ theme }: any) => theme.background} !important;
    padding: 12px;
    min-width: 100px;
    .header-text {
      text-align: center;
      color: ${({ theme }: any) => theme.greyText} !important;    
      font-family: Manrope;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
      margin-bottom: 10px;
      letter-spacing: 0px;
      text-align: center;
    }
  }
  table {
    margin-bottom: 30px;
    td:first-child {
      color: ${({ theme }: any) => theme.primaryColor} !important;    
    }
    td {
      padding: 8px;
      padding-left: 0;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      width: 25%;
      cursor: pointer;
      line-height: 20px;
    }
    th {
      padding: 4px;
      font-weight: 500;
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
  #long {
    td {
      width: 22%
    }
  }

  @media only screen and (max-width: 1580px) { 

    .logo {
      width: 150px
    }
   
  }
  @media only screen and (max-width: 1200px) {
    #labelOverlay {
      left: 29%;
    }
  }
  @media only screen and (max-width: 1100px) {
    #labelOverlay {
      left: 26%;
    }
    table {
    td {
      font-size: 12px;
      font-weight: 600;
      width: 20%;
      line-height: 10px;
    }
  }
  }
  @media only screen and (max-height: 828px) { 
   
    @media only screen and (max-height: 700px) { 
      #nav {
        padding: 0 14px;
        height: auto;
      }
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
  .block-analyzer {
      flex-wrap: wrap;
    }
  .mobile-header {
    margin: 8px;
  }
 
  #labelOverlay {
      left: 30.5%;
  }
  .toggled {
    left: 0 !important;
  }
  #content3, #content2, #content1 {
    /* max-height: 600px; */
    min-height: 275px;
  }
  .miningData {
    #content1 {
      height: auto !important;
    }
  }
  .flow-chart {
    height: auto !important;
    min-height: 500px !important;
    overscroll-behavior-y: none;
  }
  .info-card div .sub-title {
    font-size: 13px;
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

  .miningData {
    display: grid;
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat( 10, 1fr ); */
    grid-template-areas:
        "main main main main main main main main main main main main"
        "content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1"
        "content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3 content3"
        "content4 content4 content4 content4 content4 content4 content4 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    max-width: 1800px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }
 
  .info-card div {
    padding: 10px
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
    .miningData {
      padding: 16px !important;
    }
    #labelOverlay {
      left: 43%;
    }
    .react-flow {
       position: absolute ;
       z-index: 1;
       overflow-x: auto;
     }
     #content1 {
       overflow-x: hidden;
       position: relative;
     }
  }
  @media only screen and (max-width: 550px) {
  :root {
    overflow-y: auto;
  }
 
  .bubble-chart {
    height: 600px !important;
  }
  .lines div p {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
  }
  .data {
    font-size: 12px !important;
    text-align: center !important;
  }
  
  th {
      font-size: 12px;
  }
  .based {
    display: none;
  }
  table {
    td {
      font-size: 9px;
      font-weight: 600;
      width: 20%;
      line-height: 10px;
    }
  }
  .small-table {
    td {
      font-size: 12px !important;
    }
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
    margin-top: 45px;
  }
  .row-content {
    flex-direction: column;
    align-items: flex-start;
  }
  #content1, #content2, #content3, #content4, .info-card {
    width: 98%;
  }
  #content3 {
    height: 320px;
    max-height: 320px;
  }
  #content4 {
    width: 98% !important;
  }
  .miningData {
    #content1, #content2, #content3, #content4, .info-card {
    width: 100%;
  }
    #content4 {
    height: auto;
    width: 100% !important
  }
  
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

  }
  .container {
    #content1, #content2 {
      height: 240px !important;
    }
  #content3, #content4 {
      height: auto !important;
    }
  }
  .flow-chart {
    height: 504px !important;
  }
  .divider {
    border: 1px solid ${({ theme }: any) => theme.border};
  }
  .tabs {
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    border-bottom: 1px solid ${({ theme }: any) => theme.border};
    div {
      min-width: 100px;
      text-align: center;
      font-weight: 600;
      line-height: 20px;
      height: 20px;
      cursor: pointer;
      padding-bottom: 30px;
    }
    .active {
      border-bottom: 2px solid #FFA043;
      transition: width 1s;
    }
  }
  .tooltip {
  position: relative;
}

.tooltip-trigger {
  display: inline-block;
  text-decoration: underline;
}

.tooltip-bubble {
  min-width: 120px;
  max-width: 210px;
  position: absolute;
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
  }
}

.tooltip-top {
  bottom: 100%;
  left: 50%;
  padding-bottom: 9px;
  transform: translateX(-50%);
  
  &::after {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid $tooltip-color;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.tooltip-top {
  bottom: 100%;
  left: 50%;
  padding-bottom: 9px;
  transform: translateX(-50%);
  
  &::after {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid $tooltip-color;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.tooltip-message {
  background: rgba(0,0,0,.7);
  border-radius: 3px;
  color: #fff;
  font-size: .75rem;
  line-height: 1.4;
  padding: .75em;
  text-align: center;
}
.tooltip-bottom {
  top: 100%;
  left: 50%;
  padding-top: 9px;
  transform: translateX(-50%);
  
  &::after {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid $tooltip-color;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
  .block-analyzer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      margin-top: 16px;
      flex-wrap: wrap;
      .block {
        width: 24px;
        border-radius: 4px;
        height: 24px;
        cursor: pointer;
        margin-right: 4px;
        background-color: #20C9AC;
      }
    }
  .pagination {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 160, 67, 0.1);
    padding: 15px 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${({ theme }: any) => theme.text};
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0px;
      text-align: justified;
      p {
        color: ${({ theme }: any) => theme.greyText};
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0px;
        text-align: justified;
      }
      select {
        margin: 0 16px;
      }
      button {
        margin: 0 8px;
        //styleName: Regular Text / 12px / Medium;
        font-family: Manrope;
        font-size: 12px;
        color: ${({ theme }: any) => theme.text};
        font-style: normal;
        font-weight: 600;
        background: transparent;
        border: 0;
        cursor: pointer;
        line-height: 18px;
        letter-spacing: 0px;
        text-align: left;

      }
      button[disabled]{
        color: ${({ theme }: any) => theme.greyText};
      }
    }
  }
  .button-view {
    background-color: #FFA043;
    padding: 8px 16px;
    border-radius: 4px;
    color: white  ;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    display: flex;
    cursor: pointer;
  }
  @media only screen and (max-width: 400px) {
    #content1, #content2, #content3, #content4, .info-card {
    width: 98% !important;
  }
  }
 
  `;
