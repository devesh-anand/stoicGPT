import React from "react";

const Footer = () => {
  return (
    <footer className="text-center lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        Made by{" "}
        <a
          className="text-neutral-800 dark:text-neutral-400 underline"
          href="https://deveshanand.com"
        >
          Devesh Anand
        </a>
      </div>
    </footer>
  );
};

export default Footer;
