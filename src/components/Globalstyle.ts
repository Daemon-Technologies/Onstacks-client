import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-radius: 0px;
    --main-padding: 16px;
    overflow-x: hidden;
    /* overflow-y: hidden; */
  }
  ::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
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
  .recharts-tooltip-wrapper {
    z-index: 1000000;
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

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .fillerStyles {
    height: '100%';
    background-color: ${({ theme }: any) => theme.primaryHoverColor};
      border-radius: 'inherit';
      text-align: 'right'
  }
  .footer-p {
    color: white;
    margin-bottom: 15px;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
  }

  .card-img {
    width: 290px;
    height: 380px;
    margin-right: 12px;
    margin-bottom: 16px;
    background-color: ${({ theme }: any) => theme.background};
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    p {
      margin: 8px 16px;
      color: ${({ theme }: any) => theme.text};
      font-size: 16px;
      font-weight: 700;
      text-transform: capitalize;
    }
  }
  .nft-image {
    width: 290px;
    height: 290px;
    object-fit: contain;
    border-bottom: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border}; 
  }

  #labelOverlay p.total-size {
    line-height: 0.5;
    font-size: 12px;
    margin-top: 14px;
    color: ${({ theme }: any) => theme.text};
  }

  .transaction-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};    width: 100%;
    .title {
      color: ${({ theme }: any) => theme.greyText};
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
    }
    .subtitle {
      color: ${({ theme }: any) => theme.text};
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: right;
    }
    .copy {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .YAKVp {
    width: 69.5%;
    position: relative;
  }
  .function-call {
    border-top: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border}; 
    .color {
      color: #5546FF !important;
      font-weight: 800 !important;
    }
    .transaction-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
     width: 100%;
     border-top: ${({ theme }: any) =>
       theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};    width: 100%;
    .title {
      color: ${({ theme }: any) => theme.greyText};
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0px;
      text-align: left;
    }
    .subtitle {
      color: ${({ theme }: any) => theme.text};
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: 0px;
      text-align: right;
    }
  }
  }
  //SIDEBAR
  .recharts-legend-item  {
    font-size: 14px;
  }
  .terms-container {
    width: 100%;
    padding: 100px;
    .terms {

    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A;
    display: flex;
    flex-direction: column;
    padding: 100px 64px;
    background: ${({ theme }: any) => theme.background} !important;
    .title {
      //styleName: Headline 6 / 28px / Semibold;
      font-family: Manrope;
      font-size: 28px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0px;
      color: ${({ theme }: any) => theme.text} !important;
      text-align: left;
      margin-bottom: 32px;
    }
    .sub-title {
      font-family: Manrope;
      font-size: 21px;
      color: ${({ theme }: any) => theme.text} !important;
      opacity: 0.8;
      font-style: normal;
      font-weight: 400;
      line-height: 60px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
  }

  .table-headers {
    display: flex;
    flex: 1;
    padding: 24px 26px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-bottom: 1px solid  ${({ theme }: any) => theme.border} !important;;
    cursor: pointer;
  }

  .table-headers p {
    width: 20%;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: left;

  }

  .custom-tooltip {
    background-color:  ${({ theme }: any) => theme.background};
    padding: 16px;
    display: flex ;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .custom-tooltip div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .custom-tooltip .label {
    margin-right: 30px;
    //styleName: Regular/Text/12px/Regular;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    margin-left: 8px;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
  }

  .custom-tooltip .desc {
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: right;
  }
  .table-headers:hover {
    background-color:  ${({ theme }: any) => theme.primaryHoverColor};
    border-left: 5px solid #5546FF;
  }
  .table-heads {
    padding: 12px 26px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    background-color: #F9FAFB;
    border: 1px solid ${({ theme }: any) => theme.border};;
    cursor: none;
  }
  .table-heads:hover {
    background-color:  transparent;
    border-left: 0px solid #5546FF;
  }
  .header {
    /* background: linear-gradient(#6616fc, #f394d3); */
    background: ${({ theme }: any) => theme.stacksColor} !important;
    padding: 14px 32px;
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    /* height: 80px; */
    position: fixed;
    width: 100%;
    z-index: 100;
    height: 66px;
    }
    .header-inner {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 4px;
      border-bottom: 1px solid #374151;
      align-items: flex-start;
    }
    .header-wrapper {
      position: absolute;
      width: 100%;
      height: 157px;
      background: ${({ theme }: any) => theme.stacksColor} !important;
      left: 0;
      z-index: -10;
      top: 66px;
    }
  .logo-nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .logo-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    width: 45px;
    height: 45px;
  }
  .nav-options {
    /* background: ${({ theme }: any) => theme.background} !important; */
    padding-left: 25px;
    color: white !important;;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 24px;
    font-size: 14px;
    font-weight: 800;
    list-style-type: none;
    cursor: pointer;
  }
  .mobile-option {
    display: none;
  }
  .logo-nav {
    .option {
    padding: 8px 12px;
   }
  }
  

  .option:hover {
    background-color: ${({ theme }: any) => theme.linkColor} !important;
    color: white !important;
    border-radius: 8px ;
  }
  .option.active {
    background-color: ${({ theme }: any) => theme.linkColor} !important;
    color: white !important;
    border-radius: 8px ;
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
    a {
      color: white;
    }
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
  .dropdown-cont {
    background-color: white;
    border: 0 !important;
    //styleName: Regular/Text/14px/Regular;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: black;
    border-radius: 23px;

    line-height: 20px;
    letter-spacing: 0px;
    text-align: right;

  }
  .Dropdown-root {
    border: 1px solid #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;

    border-radius: 5px;
  }
  .footer {
    display: 'flex'; justify-content: 'center'; align-items: 'center'; width: '100%'; //styleName: Regular/Text/14px/Regular;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    margin-bottom: 30px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
}
  .web-logo {
    display: block;
    width: 34px !important;
    height: 34px !important;
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
  .screen-title {
    font-size: 30px !important;
  }
  .dropdown-cont {
    font-size: 14px;
    padding: 8px 28px 8px 10px
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


  .nav-options-active {
    display: flex;
    width: 100%;
    /* height: 350px; */
    position: absolute;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);;
    top: 60px;
    left: 0%;
    height: 800px;
    background-color:${({ theme }: any) => theme.background}; 
    transition: all 0.5s ease;
    flex-direction: column;
    list-style-type: none;
    grid-gap: 0px;
  }
  .miningData {
    #main {
    margin-top: 65px;
  }
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

  .explorer {
    display: grid;
    overflow-y: hidden;
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat( 10, 1fr ); */
    grid-template-areas:
        "main main main main main main main main main main main main"
        "transactionContainer transactionContainer transactionContainer transactionContainer transactionContainer transactionContainer transactionContainer  transactionContainer transactionContainer transactionContainer transactionContainer transactionContainer";
        /* "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4"; */
    grid-gap: 16px;
    width: 100%;
    max-width: 1600px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }
  .rtt-table {
    height: auto !important;
  }
  .abb-table {
    height: auto !important;
  }
  .block-details {
    width: 100%;
    max-width: 1280px;
    padding: 92px 32px 32px 32px;
    margin: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .tokens-container {
    padding: 24px;
    width: 100%;
    position: relative;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 12%);
    background-color:${({ theme }: any) => theme.background}; ;
    border-radius: var(--main-radius);
    border: 1px solid ${({ theme }: any) => theme.border};;
    th {
      width: 85%;
    }
  }
  #transactionContainer {
    grid-area: transactionContainer;
  }
  .search-bar {
    width: 100%;
    border-radius: 10px;
    height: 40px;
    color: ${({ theme }: any) => theme.text} !important;
    background-color:${({ theme }: any) => theme.background}; 
    border: 2px solid ${({ theme }: any) => theme.border};
    /* border: 1px solid #D1D5DB; */
/* shadow/sm */

box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
border-radius: 6px;
    padding: 16px 11px;
    margin-bottom: 25px;
  }
  .transaction-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      flex: 1;
      width: 100%;
  }
  .recent-transactions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 16px; 
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A;
    flex: 0.60;
    h3 {
      //styleName: Regular / Text / 20px / Bold;
      font-family: Manrope;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: left;

    }
  }
  .pop-over-container {
    background-color: #fff;
    border-radius: 14px;
    color: #000;
    padding: 14px;
    box-shadow: 0px 4px 6px -2px #0000000D;
    width: 376px;
    margin-right: 300px;
    box-shadow: 0px 10px 15px -3px #0000001A;
    .row-space {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      margin-bottom: 20px;
      justify-content: space-between;
      .title {
        //styleName: text-sm/leading-5/font-medium/tracking-wide/uppercase;
        font-family: Manrope;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.025em;
        text-align: left;
        color: #6B7280
      }
    }
    .Dropdown-root {
      width: 100%;
      text-align: left !important;
    }
    .dropdown-ss {
      text-align: left;
    }
    input {
      margin: 14px 0;
    width: 100%;
    padding: 8px;
    border: 1px solid #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000d;
    border-radius: 5px;
    }
    .row {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      align-items: center;
      .sub-title {
        margin-left: 14px;
        font-family: Manrope;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        color: #1F222C;
        text-align: left;
      }
    }
  }
  .Dropdown-menu {
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A;
    border-radius: 10px;
    background-color:${({ theme }: any) => theme.background}; 
  }
  .Dropdown-option {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }: any) => theme.greyText};
  }
  .dropdown-cont {
    color: ${({ theme }: any) => theme.black};

  }
  .Dropdown-option.is-selected {
    background-color: ${({ theme }: any) => theme.primaryHoverColor}; 
    color: ${({ theme }: any) => theme.text};
  }
  .table-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 16px;
    margin-top: 16px;
    img {
      margin-right: 10px;
    }
    p {
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
      color: ${({ theme }: any) => theme.text};
    }
  }
  .transaction-title-p {
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0px;
    margin-right: 3px;
    color: ${({ theme }: any) => theme.text};
    text-align: left;
  }
  .optionContainer .option {
    color: black !important;
  }
  .transaction-title-span {
    font-family: Manrope;
    font-size: 12px;
    color: ${({ theme }: any) => theme.greyText};
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
}

  .table-item:hover {
    background-color:  ${({ theme }: any) => theme.primaryHoverColor};
    border-left: 3px solid #5546FF;
  }
  .tr-card:hover {
    background-color: transparent;
    border-left: 0px;
  }
  .table-item {
    padding: 20px;
    border-top: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};    display: flex;
        cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .left-content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .right-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .transaction-image {
      width: 48px;
      height: 48px;
      margin-right: 12px;
    }
    .title {
      //styleName: Regular / Text / 14px / Semibold;
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      cursor: pointer;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
      color: ${({ theme }: any) => theme.text};
    }
    .subtitle {
      //styleName: Regular/Text/12px/Regular;
      font-family: Manrope;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      margin-top: 4px;
      letter-spacing: 0px;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }
  .rt-table {
    background-color: ${({ theme }: any) => theme.background};
    height: 100vh;
    margin-top: 16px;
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    overflow-y: scroll;
    padding-bottom: 16px;
    border: 1px solid ${({ theme }: any) => theme.border};
  }
  .load-more {
    border-top: 1px solid ${({ theme }: any) => theme.border};
    color: "#84818A";
    font-size: 12px;
    padding-top: 15px;
    cursor: "pointer";
  }
  .ab-table {
    margin-top: 16px;
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 16px;
    border: 1px solid ${({ theme }: any) => theme.border};
    margin-bottom: 16px;
    background-color: ${({ theme }: any) => theme.background};
  }
  .anchor-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 0.4;
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A;
  }
  .address-blocks {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 0.4;
    .address-card {
      background-color: ${({ theme }: any) => theme.background};
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 10px 20px 7x hsla(0, 0%, 0%, 0.04);
      .address-card-header  {
        margin-bottom: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        img {
          cursor: pointer;
        }
        p {
          //styleName: Regular / Text / 14px / Semibold;
          font-family: Manrope;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0px;
          text-align: left;
          color: ${({ theme }: any) => theme.greyText};
        }
      }
      .address-card-item  {
        padding: 12px;
        border: 1px solid  ${({ theme }: any) => theme.border};
        margin-bottom: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width:  48px;
          height:  48px;
          margin-right: 10px;
        }
        .title {
          font-family: Manrope;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: 0px;
          color: ${({ theme }: any) => theme.greyText};
          text-align: left;
        }
        .sub-title {
          font-family: Manrope;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0px;
          color: ${({ theme }: any) => theme.text};
          text-align: left;
        }
      }
    }
  }
  .option {
    color: ${({ theme }: any) => theme.headerColor} !important;
    a {
      color: ${({ theme }: any) => theme.headerColor} !important;
      text-decoration: none;
      display: flex;
      align-items: center;
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

  .no-miner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 300px;
    p {
      font-family: Manrope;
      color: ${({ theme }: any) => theme.greyText};

      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0px;
      text-align: center;
      margin-top: 14px;
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
  .connect {
    background: rgba(250, 250, 250, 0.15);
    border-radius: 40px;
    color: white !important;
    padding: 2px 10px;
    margin-left: 10px;
    cursor: pointer;
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
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
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
  /* .miningData {
    #content1 {
      max-height: 300px !important;
    }
  } */
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
        "content3 content3 content3 content3 content3 content3 content4 content4 content4 content4 content4 content4"
        "content5 content5 content5 content5 content5 content5 content5 content5 content5 content5 content5 content5";
    grid-gap: 16px;
    width: 100%;
    max-width: 1600px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }

  #content5 {
    grid-area: content5
  }

  .blocks-legend {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 8px;
    div {
      display: flex;
      align-items: center;
      .block {
        width: 15px;
        border-radius: 2px;
        height: 15px;
        cursor: pointer;
        margin-right: 4px;
        background-color: #20C9AC;
      }
      p {
        margin-right: 10px;
        //styleName: Regular Text / 12px / Medium;
        font-family: Manrope;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0px;
        text-align: left;
        color: ${({ theme }: any) => theme.greyText} !important;

      }
    }
  }
  .addressDetails {
    display: grid;
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat(3, 1fr ); */
    grid-template-areas:
        "main main main main main main main main main main main main"
        "content1 content1 content1 content1 content1 content1 content2 content2 content2 content2 content2 content2"
        "content1 content1 content1 content1 content1 content1 content4 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    max-width: 1280px;
    padding: 92px 32px 32px 32px;
    margin: auto;
  }
  .circle-data {
      width:  8px;
      height: 8px;
      margin-right: 5px;
      border-radius: 2.5px;
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
  .upgrading {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 24px;
    height: 100vh;
    img {
      width: 300px;
      /* height: 200px; */
      object-fit: contain;
      margin-bottom: 25px;
    }
  }
  input:-internal-autofill-selected {
    background-color: ${({ theme }: any) => theme.background} !important;
    color: red !important;
  }
  .search-item {
    background-color: ${({ theme }: any) => theme.background} !important;
    margin-bottom: 25px;
    border-radius: 6px;
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
    box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    padding: 16px;
    font-size: 14px;
    .results-header {
      font-size: 14px;
      border-bottom: 1px solid  ${({ theme }: any) => theme.border} !important;;
      color:  ${({ theme }: any) => theme.greyText} !important;
      margin-bottom: 10px;
      padding-bottom: 5px;
    }
    .item {
      display: flex;
      flex-direction: row;
      font-weight: 800;
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
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
        color: ${({ theme }: any) => theme.linkColor};
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
  .bubble-chart-container { 
    height: 85%;
    width: 100%;
    max-height: 400px;
   div {
      max-height: 400px;
    }
  }
  .Winner {
    //styleName: Regular Text / 12px / Semibold;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;

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
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 7x 10px 20px 0px hsla(0, 0%, 0%, 0.04);


    path {
      stroke-width: 3;
      /* stroke: #FFA043; */
    }
    background: ${({ theme }: any) => theme.background};
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
      font-family: Manrope;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: left;

      color: ${({ theme }: any) => theme.text} !important;
    }
  }
  .containerContent {
    box-shadow: none !important;
    background: transparent  !important;
    border: 0 solid transparent !important;
    display: flex;
    padding: 0px  !important;
    flex-direction: row;
  }
  .containerOne {
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
    width: 100%;
    background: ${({ theme }: any) => theme.background};
    border-radius: var(--main-radius);
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
  margin-right: 16px;
  grid-area: content1;
    padding: 24px;
    width: 100%;
    position: relative;

    path {
      stroke-width: 3;
      /* stroke: #FFA043; */
    }
    background: ${({ theme }: any) => theme.background};
    border-radius: var(--main-radius);
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
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
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 7x 10px 20px 0px hsla(0, 0%, 0%, 0.04);

    .title {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
  }
  .mob-address {
    display: none;
  }
  #content3 {
    grid-area: content3;
    padding: 24px;
    border-radius: var(--main-radius);
    background: ${({ theme }: any) => theme.background} !important;
    max-height: 444px;
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
      box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 7x 10px 20px 0px hsla(0, 0%, 0%, 0.04);

    .title {
      font-size: 14px;
      font-weight: 500;
      /* margin-bottom: 12px; */
      text-align: left;
      color: ${({ theme }: any) => theme.greyText} !important;
    }
    .sub-title {
      font-family: Manrope;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: left;

      color: ${({ theme }: any) => theme.text} !important;
    }
  }

  td {
    font-weight: 600;
  }
  
  table th {
    color: ${({ theme }: any) => theme.text} !important;
    //styleName: Regular Text / 14px / Semibold;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;

  }
  .table-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }: any) => theme.border};
    padding: 6px;
    margin-bottom: 10px;
    background-color: ${({ theme }: any) => theme.background} !important;
  }
  #content4 {
    padding: 24px 29px 24px 24px;
    grid-area: content4;
    background: ${({ theme }: any) => theme.background};
    border-radius: var(--main-radius);
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
  position: relative;
  box-shadow: 0px 0px 1px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.04);
box-shadow: 0px 10px 7px 0px hsla(0, 0%, 0%, 0.04);
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
    color: ${({ theme }: any) => theme.headerColor} !important;
    margin-bottom: 40px;
  }

  .transaction-card {
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
    height: 110px;
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A;
    border-radius: 4px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .info-card {
    border: ${({ theme }: any) =>
      theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
    height: 110px;
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 10px 20px 0px #0000000A;
    border-radius: 12px;
    display: flex;
    background: ${({ theme }: any) => theme.background} !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  
    div {
      flex: 1;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      border-left: 1px solid  ${({ theme }: any) => theme.border};
  max-height: 100%;
      .title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }
      .sub-title {
        color: ${({ theme }: any) => theme.linkColor} !important; 
        margin-top: 10px ;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        .sub-text {
          font-size: 14px;
          margin-left: 5px;
          font-weight: 500;
          color: ${({ theme }: any) => theme.greyText} !important; 

        }
      }
    }
  }
  .search-button {
    background-color: ${({ theme }: any) => theme.linkColor} !important;
    padding: 10px 17px;
    border-radius: 4px;
    color: white;
    /* margin-top: 33px; */
    width: 153px;
    height: 41px;
    margin-left: 14px;
    cursor: pointer;
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
      color: ${({ theme }: any) => theme.linkColor} !important;    
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
      color: ${({ theme }: any) => theme.linkColor} !important;    
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
      width: 20%
    }
  }

  

  @media only screen and (max-width: 1580px) { 

    .logo {
      width: 150px
    }
    .table-blocks {
      width: 100%
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

  .container {
    #content1 {
      min-height: 255px;
    }
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

  .addressDetails {
    display: grid;
    grid-template-columns: repeat( 12, 1fr );
    /* grid-template-rows: repeat( 10, 1fr ); */
    grid-template-areas:
    "main main main main main main main main main main main main"
        "content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1"
        "content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2"
        "content4 content4 content4 content4 content4 content4 content4 content4 content4 content4 content4 content4";
    grid-gap: 16px;
    width: 100%;
    max-width: 1800px;
    padding: 16px;
    padding-top: 32px;
    margin: auto;
    width: 100%;
    .screen-title {
      font-size: 13px;
    }
    .button-view {
      display: none 
    }
  }
 
  .info-card div {
    padding: 10px
  }
  #content4 {
    padding: 16px ;
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
    .not-found {
      padding: 35px;
      text-align: center;
      img {
        width: 200px !important;
      }
    }
    #content1 {
      flex-direction: column;
      .containerOne {
      width: 100% !important;
      margin-bottom: 16px;
    }
    #content2 {
      width: 100% !important;
    }
    }
    .explorer {
      .screen-title {
        font-size: 12px;
        overflow-wrap: anywhere;
      }
    }
    .tabs div {
      padding-bottom: 47px !important;
    }
    .anchor-block, .address-blocks {
      flex: 1;
      width: 100%;
      margin-top: 32px;
      .rt-table {
        padding: 24px 16px;
      }
      .table-item  {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .right-content {
          align-items: flex-start;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          margin-top: 16px;
        }
      }
    }
    .transaction-container {
      flex-direction: column;
      .recent-transactions {
        margin-right: 0px;
        flex: 1;
        width: 100%
      }
      .rt-table {
        padding: 0px;
      }
      .table-item  {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .right-content {
          align-items: flex-start;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          margin-top: 16px;
        }
      }
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
  .YAKVp {
    max-width: 375px;
    padding: 0px !important;
    width: 375px;
    }

  .explorer {
    padding: 40px 16px 16px 16px;
  }
  .miningData {
     .content1 {
      
     }
  }
  .transaction-card {
    flex-direction: column;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    box-shadow: 0px 0px 1px 0px #0000000A;
    box-shadow: 0px 2px 6px 0px #0000000A;
    box-shadow: 0px 1px 7px 0px #0000000A; 
    align-items: flex-start;
    height: auto;
  }
  .transaction-row {
    text-align: left;
    align-items: flex-start;
    flex-direction: column;
    overflow-wrap: anywhere;
  }
  .function-call .transaction-row {
    text-align: left;
    align-items: flex-start;
    overflow-wrap: anywhere;
    flex-direction: column;
  }
  .function-call .transaction-row .subtitle {
    text-align: left;
  }
  .transaction-row .subtitle {
    text-align: left;
  }
  .burn-address {
    display: none;
  }
  .addressDetails {
    #content2 {
      min-height: 255px;
      height: 255px;
    }
  }
  .button-view {
    position: absolute;
    bottom: 14px;
    width: 90%;
  }
  .miningData {
    #content4 {
      padding-bottom: 60px !important;
    }
  }
  .mob-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bubble-chart {
    height: 600px !important;
  }
  .lines div p {
    margin-top: 12px;
    text-align: center;
    font-size: 13px;
  }
  .data {
    font-size: 12px !important;
    text-align: center !important;
    display: none !important;
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
    margin-top: 65px;
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
  .collections-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .search-bar {
    width: 70%;
    border-radius: 10px;
    background-color:${({ theme }: any) => theme.background}; ;
    height: 40px;
    border: 2px solid ${({ theme }: any) => theme.border};
    box-sizing: border-box;
    border-radius: 28px;
    padding: 16px 11px;
    margin-bottom: 10px;
    }
    select {
      width: 20%;
    border-radius: 10px;
    height: 40px;
    border: 2px solid #EBEAED;
    box-sizing: border-box;
    border-radius: 28px;
    padding: 0px 11px;
    margin-bottom: 25px;
    }
  }
  .tabs {
    display: flex;
    flex-direction: row;
    margin: 24px 0;
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
      border-bottom: 2px solid #4338CA;
      transition: width 1s;
    }
  }
  .tooltip {
  position: relative;
}

.tooltip-trigger {
  display: inline-block;
  /* text-decoration: underline; */
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
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
      margin-top: 16px;
      .block {
        width: 15px;
        border-radius: 2px;
        height: 15px;
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
    background-color: ${({ theme }: any) => theme.primaryHoverColor};
    padding: 15px 20px;
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
    background-color: #5546fe;
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
  .option {
    color: ${({ theme }: any) => theme.text} !important;
    a {
      color: ${({ theme }: any) => theme.text} !important;
      text-decoration: none;
      display: flex;
      align-items: center;
   }
  }
  }
  .mobile-table {
   background-color: transparent !important;
   padding: 0px !important;
   border: 0px !important;
   .table-title {
     //styleName: Regular Text / 12px / Semibold;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    color: ${({ theme }: any) => theme.greyText};
   }
   .table-subtitle {
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: right;
    color: ${({ theme }: any) => theme.text};

   }
 }
 .table-card-container { 
  padding: 16px;
  background: ${({ theme }: any) => theme.background};
  margin-bottom: 16px;
  border: ${({ theme }: any) =>
    theme.border === "#423F4B" ? "0px" : "1px"} solid ${({ theme }: any) =>
  theme.border};
};
.left-content .title{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title .transaction-image {
  width: 19px;
  height: 19px;
  margin-right: 3px;
}
  `;
