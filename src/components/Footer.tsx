// eslint-disable-next-line
import React from "react";
import { useHistory } from "react-router";

export const Footer: React.FC = () => {
  const { push } = useHistory();
  return (
    <div
      style={{
        height: 400,
        background: "#190F3E",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "64px 140px",
      }}
      onClick={() => push("/terms")}
      className="footer"
    >
      {/* Terms of services • Privacy Policy • Daemon Technologies 2021 */}
      <div>
        <p className={"footer-p"}>Company</p>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Daemon Technologies</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Stacks.co</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Blogs</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Community</p>
        </a>
      </div>
      <div>
        <p className={"footer-p"}>Product</p>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Overview</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Mining Monitor</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Notifications</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Reporting</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Web App</p>
        </a>
      </div>
      <div>
        <p className={"footer-p"}>Support</p>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Documentation</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Contact</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Status</p>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Social</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Twitter</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Discord</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Facebook</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Linkedin</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Github</p>
        </a>
      </div>
      <div>
        <p className={"footer-p"}>Legal</p>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Legal Notice</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Privacy Policy</p>
        </a>
        <a
          target="_blank"
          href={"https://btc.com/btc/block/"}
          rel="noopener noreferrer"
        >
          <p className={"footer-p"}>Terms of Use</p>
        </a>
      </div>
    </div>
  );
};
