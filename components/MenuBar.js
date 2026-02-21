"use client";

import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { menu } from "./menuItems";
import { makeMenuBar } from "./menuFuncs";
import { usePathname } from "next/navigation";
import "./css/MenuBar.css";

export default function MenuBar({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "";

  return (
    <Navbar className="MenuBar" sticky="top" light expand="lg">
      <NavbarBrand href="/">PSWS</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        {makeMenuBar(menu[0], lang, "ml-left", pathname)}
        {makeMenuBar(menu[1], lang, "ml-auto", pathname)}
      </Collapse>
    </Navbar>
  );
}
