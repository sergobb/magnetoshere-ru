"use client";

import React from "react";
import Link from "next/link";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function makeLinkItem(menu, lang, pathname, key) {
  const lg = menu.lang === undefined ? lang : menu.lang;

  if (menu.lang !== undefined && pathname) {
    const href = pathname.replace(/^\/[^/]+/, `/${menu.lang}`);
    return (
      <Link key={key} href={href} className="nav-link">
        {menu.item}
      </Link>
    );
  }
  if (menu.link !== undefined) {
    const href = `/${lg}${menu.link}`;
    return (
      <Link
        key={key}
        href={href}
        className="nav-link"
        style={menu.disabled ? { pointerEvents: "none", opacity: 0.6 } : {}}
      >
        {menu.item}
      </Link>
    );
  }
  if (menu.href !== undefined) {
    return (
      <NavLink
        key={key}
        href={`/${lg}${menu.href}`}
        disabled={menu.disabled}
      >
        {menu.item}
      </NavLink>
    );
  }
  if (menu.external !== undefined) {
    return (
      <NavLink key={key} href={menu.external} disabled={menu.disabled}>
        {menu.item}
      </NavLink>
    );
  }
  return (
    <NavLink key={key} disabled={menu.disabled}>
      {menu.item}
    </NavLink>
  );
}

function isActive(context, pathname, lang) {
  if (!context) return false;
  return context.some((item) => {
    const path = item.replace(":lang", lang);
    return pathname === path || pathname.startsWith(path.replace(/\/$/, "") + "/");
  });
}

function makeMenuList(menu, lang, context, pathname) {
  const list = [];
  for (const m of Object.keys(menu)) {
    if (!menu.hasOwnProperty(m)) continue;
    const active = isActive(menu[m].context, pathname, lang);
    list.push(
      <NavItem
        key={"NavItem" + context + m}
        className={active ? "active" : ""}
      >
        {makeLinkItem(menu[m], lang, pathname, context + m)}
      </NavItem>
    );
  }
  return list;
}

function makeSideMenu(menu, lang, place, pathname) {
  return (
    <Nav className={place} navbar>
      {makeMenuList(menu, lang, "SideMenu", pathname)}
    </Nav>
  );
}

function makeDropdownList(menu, lang, context, pathname) {
  const list = [];
  for (const m of Object.keys(menu)) {
    if (!menu.hasOwnProperty(m)) continue;
    if (menu[m].menu === undefined) {
      list.push(
        <DropdownItem tag="span" key={"Dropdown" + context + m}>
          {makeLinkItem(menu[m], lang, pathname, context + m)}
        </DropdownItem>
      );
    } else {
      const icon = menu[m].icon;
      const iconSize = menu[m].iconSize || "32px";
      list.push(
        <UncontrolledDropdown nav inNavbar key={"Dropdown" + context + m}>
          <DropdownToggle nav caret className="d-flex align-items-center">
            {icon ? (
              <>
                <img src={icon} alt="" style={{ width: iconSize, height: iconSize, marginRight: "6px", objectFit: "contain" }} onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }} />
                {menu[m].item}
              </>
            ) : (
              menu[m].item
            )}
          </DropdownToggle>
          <DropdownMenu left="true">
            {makeDropdownList(menu[m].menu, lang, context, pathname)}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  }
  return list;
}

function makeMenuBarList(menu, lang, context, pathname) {
  const list = [];
  for (const m of Object.keys(menu)) {
    if (!menu.hasOwnProperty(m)) continue;
    const active = isActive(menu[m].context, pathname, lang);
    if (menu[m].menu === undefined) {
      list.push(
        <NavItem
          key={"NavItem" + context + m}
          className={active ? "active" : ""}
        >
          {makeLinkItem(menu[m], lang, pathname, context + m)}
        </NavItem>
      );
    } else {
      const icon = menu[m].icon;
      const iconSize = menu[m].iconSize || "32px";
      list.push(
        <UncontrolledDropdown
          nav
          inNavbar
          key={"UncontrolledDropdown" + context + m}
          className={active ? "active" : ""}
        >
          <DropdownToggle nav caret className="d-flex align-items-center">
            {icon ? (
              <>
                <img src={icon} alt="" style={{ width: iconSize, height: iconSize, marginRight: "6px", objectFit: "contain" }} onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }} />
                {menu[m].item}
              </>
            ) : (
              menu[m].item
            )}
          </DropdownToggle>
          <DropdownMenu left="true">
            {makeDropdownList(menu[m].menu, lang, context, pathname)}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  }
  return list;
}

function makeMenuBar(menu, lang, place, pathname) {
  return (
    <Nav className={place} navbar key={"MenuBar" + place + pathname}>
      {makeMenuBarList(menu, lang, "MenuBar" + place, pathname)}
    </Nav>
  );
}

export {
  makeLinkItem,
  makeMenuList,
  makeSideMenu,
  makeDropdownList,
  makeMenuBarList,
  makeMenuBar,
};
