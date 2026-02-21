import React from "react";
import { Trans } from "@lingui/macro";
import Mercury from "../images/Mercury.png";
import Earth from "../images/Earth.png";
import Saturn from "../images/Saturn.png";
import Jupiter from "../images/Jupiter.png";

let menu = [
    {
        menuAbout: {
            link: "/about/",
            context: ["/:lang/about"],
            item: <Trans id="menuAbout">About</Trans>
        },
        menuMercury: {
            //disabled: true,
            item: <Trans id="menuMercury">Mercury</Trans>,
            icon: Mercury,
            iconSize: '40px',
            context: ["/:lang/mercurydesc"],
            menu: {
                menuMercuryDescription: {
                    link: "/mercurydesc",
                    context: ["/:lang/mercurydesc"],
                    item: (
                        <Trans id="menuMercuryDescription">
                            Model description
                        </Trans>
                    )
                }
            }
        },
        menuEarth: {
            item: <Trans id="menuEarth">Earth</Trans>,
            icon: Earth,
            iconSize: '48px',
            context: ["/:lang/earthdesc", "/:lang/earth2d", "/:lang/earth3d"],
            menu: {
                menuEarthDescription: {
                    link: "/earthdesc/",
                    context: ["/:lang/earthdesc"],
                    item: (
                        <Trans id="menuEarthDescription">
                            Model description
                        </Trans>
                    )
                },
                menuEarth2D: {
                    link: "/earth2d/",
                    context: ["/:lang/earth2d"],
                    item: (
                        <Trans id="menuEarth2D">2D Magnetic Field Lines</Trans>
                    )
                },
                menuEarth3D: {
                    link: "/earth3d/",
                    context: ["/:lang/earth3d"],
                    item: (
                        <Trans id="menuEarth3D">3D Magnetic Field Lines</Trans>
                    )
                },
                menuEarthAlertService: {
                    link: "/earthalert/",
                    disabled: true,
                    context: ["/:lang/earthalert"],
                    item: (
                        <Trans id="menuEarthAlertService">Alert Service</Trans>
                    )
                }
            }
        },
        menuJupiter: {
            // disabled: true,
            item: <Trans id="menuJupiter">Jupiter</Trans>,
            icon: Jupiter,
            iconSize: '96px',
            context: ["/:lang/jupiterdesc"],
            menu: {
                menuJupiterDescription: {
                    link: "/jupiterdesc",
                    context: ["/:lang/jupiterdesc"],
                    item: (
                        <Trans id="menuJupiterDescription">
                            Model description
                        </Trans>
                    )
                }
            }
        },
        menuSaturn: {
            // disabled: true,
            item: <Trans id="menuSaturn">Saturn</Trans>,
            icon: Saturn,
            iconSize: '96px',
            context: ["/:lang/saturn2d", "/:lang/saturndesc"],
            menu: {
                menuSaturnDescription: {
                    link: "/saturndesc",
                    context: ["/:lang/saturndesc"],
                    item: (
                        <Trans id="menuSaturnDescription">
                            Model description
                        </Trans>
                    )
                },
                menuSaturn2D: {
                    link: "/saturn2d/",
                    context: ["/:lang/saturn2d"],
                    item: (
                        <Trans id="menuSaturn2D">2D Magnetic Field Lines</Trans>
                    )
                }
            }
        }
    },
    {
        menuContacts: {
            disabled: true,
            item: <Trans id="menuContacts">Contacts</Trans>
        },
        menuLangRu: {
            item: <Trans id="menuLangRu">Ru</Trans>,
            lang: "ru"
        },
        menuLangEn: {
            item: <Trans id="menuLangEn">En</Trans>,
            lang: "en"
        },
        menuOldSite: {
            external: "http://www.magnetosphere.ru/old/",
            item: <Trans id="menuOldSite">Old Site</Trans>
        }
    }
];

export { menu };
