import React from 'react';
import {NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

let menu = {
    menuAbout: {
        link: '/about/',
        item: (<Trans id='menuAbout'>About</Trans>)
    },
    menuMercury: {
        disabled: true,
        item: (<Trans id='menuMercury'>Mercury</Trans>)
    },
    menuEarth: {
        item: (<Trans id='menuEarth'>Earth</Trans>),
        menu: {
            menuEarthDescription: {
                link: '/earthdesc/',
                item: (<Trans id='menuEarthDescription'>Model description</Trans>)
            },
            menuEarth2D: {
                link: '/earth2d/',
                item: (<Trans id='menuEarth2D'>2D Magnetic Field Lines</Trans>)
            },
            menuEarth3D: {
                link: '/earth3d/',
                item: (<Trans id='menuEarth3D'>3D Magnetic Field Lines</Trans>)
            }
        }
    },
    menuJupiter: {
        disabled: true,
        item: (<Trans id='menuJupiter'>Jupiter</Trans>)
    },
    menuSaturn: {
        disabled: true,
        item: (<Trans id='menuSaturn'>Saturn</Trans>)
    },
    menuContacts: {
        disabled: true,
        item: (<Trans id='menuContacts'>Contacts</Trans>)
    },
    menuLangRu: {
        item: (<Trans id='menuLangRu'>Ru</Trans>)
    },
    menuLangEn: {
        item: (<Trans id='menuLangEn'>En</Trans>)
    },
    menuOldSite: {
        external: 'http://www.magnetosphere.ru/old.html',
        item: (<Trans id='menuOldSite'>Old Site</Trans>)
    }
};

function makeLinkItem(menu, lang, key) {
	let lg = '/'+lang;

    if (menu.link !== undefined) {
        return (
            <Link {...{disabled:menu.disabled,to:lg + menu.link, key: key}} className='nav-link'>
                {menu.item}
            </Link>
        );
    } else if (menu.href !== undefined) {
        return (
            <NavLink {...{disabled:menu.disabled, href:lg+menu.href}}>
                {menu.item}
            </NavLink>
        );
    } else if (menu.external !== undefined) {
        return (
            <NavLink {...{disabled:menu.disabled, href:menu.external}}>
                {menu.item}
            </NavLink>
        );
    } else {
        return (
            <NavLink {...{disabled:menu.disabled}}>
                {menu.item}
            </NavLink>
        );
    }
}

export {menu, makeLinkItem};