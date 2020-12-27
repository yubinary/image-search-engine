import React from 'react';
import { FaGithub } from "react-icons/fa";

export default function Header() {

  return (
    <div className="header">
      <p>© Copyright Yubin Heo. All Rights Reserved.</p>
      <a href="https://github.com/yubinary/image-search-engine">
        <FaGithub className="icon" />
      </a>
    </div>
  )
}