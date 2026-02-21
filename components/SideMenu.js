"use client";

import React from "react";
import { Card, CardTitle, CardBody, CardHeader, Navbar } from "reactstrap";
import { menu } from "./menuItems";
import { makeSideMenu } from "./menuFuncs";
import Sticky from "react-stickynode";
import { usePathname } from "next/navigation";

export default function SideMenu({ lang, context }) {
  const pathname = usePathname() || "";
  const sideMenu =
    context !== undefined &&
    menu[0][context] !== undefined &&
    menu[0][context].menu !== undefined
      ? menu[0][context].menu
      : null;

  if (sideMenu === null) return null;

  const section = menu[0][context];
  const icon = section.icon;
  const iconSize = section.iconSize || "32px";

  return (
    <Sticky innerZ={98} top={80}>
      <Card body>
        <CardHeader>
          <CardTitle>
            {icon ? (
              <>
                <img src={icon} alt="" style={{ width: iconSize, height: iconSize, marginRight: "8px", verticalAlign: "middle" }} onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }} />
                {section.item}
              </>
            ) : (
              section.item
            )}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Navbar light>
            {makeSideMenu(sideMenu, lang, "SideMenu", pathname)}
          </Navbar>
        </CardBody>
      </Card>
    </Sticky>
  );
}
