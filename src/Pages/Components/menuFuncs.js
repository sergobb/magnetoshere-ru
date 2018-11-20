/*jshint esversion: 6 */
import React from "react";
import {
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

function makeLinkItem(menu, lang, key) {
    let lg = menu.lang === undefined ? "/" + lang : "/" + menu.lang;

    if (menu.link !== undefined) {
        return (
            <Link
                {...{ disabled: menu.disabled, to: lg + menu.link, key: key }}
                className="nav-link"
            >
                {menu.item}
            </Link>
        );
    } else if (menu.href !== undefined) {
        return (
            <NavLink {...{ disabled: menu.disabled, href: lg + menu.href }}>
                {menu.item}
            </NavLink>
        );
    } else if (menu.external !== undefined) {
        return (
            <NavLink {...{ disabled: menu.disabled, href: menu.external }}>
                {menu.item}
            </NavLink>
        );
    } else {
        return <NavLink {...{ disabled: menu.disabled }}>{menu.item}</NavLink>;
    }
}

function makeMenuList(menu, lang, context) {
    let m,
        list = [];

    for (m in menu) {
        if (menu.hasOwnProperty(m)) {
            list.push(makeLinkItem(menu[m], lang, context + m));
        }
    }
    return list;
}

function makeSideMenu(menu, lang, place) {
    return (
        <Nav className={place} navbar>
            {makeMenuList(menu, lang, "SideMenu")}
        </Nav>
    );
}

function makeDropdownList(menu, lang, context = "Menubar") {
    let m,
        list = [];

    for (m in menu) {
        if (menu.hasOwnProperty(m)) {
            if (menu[m].menu === undefined) {
                list.push(
                    <DropdownItem tag="span" key={"Dropdown" + context + m}>
                        {makeLinkItem(menu[m], lang, context + m)}
                    </DropdownItem>
                );
            } else {
                list.push(
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {menu[m].item}
                        </DropdownToggle>
                        <DropdownMenu left="true">
                            {makeDropdownList(menu[m].menu, lang, context)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            }
        }
    }
    return list;
}

function makeMenuBarList(menu, lang, context = "Menubar") {
    let m,
        list = [];

    for (m in menu) {
        if (menu.hasOwnProperty(m)) {
            if (menu[m].menu === undefined) {
                list.push(
                    <NavItem key={"NavItem" + context + m}>
                        {makeLinkItem(menu[m], lang, context + m)}
                    </NavItem>
                );
            } else {
                list.push(
                    <UncontrolledDropdown
                        nav
                        inNavbar
                        key={"UncontrolledDropdown" + context}
                    >
                        <DropdownToggle nav caret>
                            {menu[m].item}
                        </DropdownToggle>
                        <DropdownMenu left="true">
                            {makeDropdownList(menu[m].menu, lang, context)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            }
        }
    }
    return list;
}

function makeMenuBar(menu, lang, place) {
    return (
        <Nav className={place} navbar key={"MenuBar" + place}>
            {makeMenuBarList(menu, lang, "MenuBar")}
        </Nav>
    );
}

export {
    makeLinkItem,
    makeMenuList,
    makeSideMenu,
    makeDropdownList,
    makeMenuBarList,
    makeMenuBar
};
