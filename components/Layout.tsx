import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP",
          "Yu Gothic", YuGothic, Meiryo, sans-serif;
        background: #f5f5f5;
        color: #333333;
        line-height: 1.8;
        letter-spacing: 0.02em;
      }

      input,
      textarea {
        font-size: 16px;
        font-family: inherit;
      }

      button {
        cursor: pointer;
        font-family: inherit;
      }

      h1, h2, h3, h4, h5, h6 {
        color: #2c2c2c;
        font-weight: 500;
        letter-spacing: 0.03em;
      }

      a {
        color: #666666;
        transition: color 0.2s ease;
      }

      a:hover {
        color: #333333;
      }
    `}</style>
    <style jsx>{`
      .layout {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
      }
    `}</style>
  </div>
);

export default Layout;
