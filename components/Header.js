"use client";

import React from "react";
import TopLogo from "./TopLogo";
import MenuBar from "./MenuBar";
import Sticky from "react-stickynode";

export default function Header({ lang }) {
  return (
    <div>
      <TopLogo />
      <Sticky innerZ={99}>
        <MenuBar lang={lang} />
      </Sticky>
    </div>
  );
}
