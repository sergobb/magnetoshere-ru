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

function makeMenuList(menu, lang, context, activeItem) {
    let m,
        list = [], 
        active;

    for (m in menu) {
        if (menu.hasOwnProperty(m)) {
            if (menu[m].context !== undefined) {
                active = menu[m].context.find(function(item) {
                    if (item === activeItem) {
                        return true;
                    } else {
                        return false;
                    }
                });
                active = active !== undefined ? true : false;
            } else {
                active = false;
            }
            list.push(
                <NavItem
                    key={"NavItem" + context + m}
                    className={active ? "active" : ""}
                >
                    {makeLinkItem(menu[m], lang, context + m)}
                </NavItem>
            );
        }
    }
    return list;
}

function makeSideMenu(menu, lang, place, activeItem) {
    return (
        <Nav className={place} navbar>
            {makeMenuList(menu, lang, "SideMenu", activeItem)}
        </Nav>
    );
}

function makeDropdownList(menu, lang, context = "Menubar", activeItem) {
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

function makeMenuBarList(menu, lang, context = "Menubar", activeItem) {
    let m,
        list = [],
        active;

    for (m in menu) {
        if (menu.hasOwnProperty(m)) {
            if (menu[m].context !== undefined) {
                active = menu[m].context.find(function(item) {
                    if (item === activeItem) {
                        return true;
                    } else {
                        return false;
                    }
                });
                active = active !== undefined ? true : false;
            } else {
                active = false;
            }

            if (menu[m].menu === undefined) {
                list.push(
                    <NavItem
                        key={"NavItem" + context + m}
                        className={active ? "active" : ""}
                    >
                        {makeLinkItem(menu[m], lang, context + m)}
                    </NavItem>
                );
            } else {
                list.push(
                    <UncontrolledDropdown
                        nav
                        inNavbar
                        key={"UncontrolledDropdown" + context}
                        className={active ? "active" : ""}
                    >
                        <DropdownToggle nav caret>
                            {menu[m].item}
                        </DropdownToggle>
                        <DropdownMenu left="true">
                            {makeDropdownList(
                                menu[m].menu,
                                lang,
                                context,
                                activeItem
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            }
        }
    }
    return list;
}

function makeMenuBar(menu, lang, place, activeItem) {
    return (
        <Nav className={place} navbar key={"MenuBar" + place}>
            {makeMenuBarList(menu, lang, "MenuBar", activeItem)}
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
