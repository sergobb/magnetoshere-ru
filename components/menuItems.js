"use client";

import React from "react";
import { Trans } from "@lingui/react";

const menu = [
  {
    menuAbout: {
      link: "/about/",
      context: ["/:lang/about"],
      item: <Trans id="menuAbout">About</Trans>,
    },
    menuMercury: {
      item: <Trans id="menuMercury">Mercury</Trans>,
      icon: "/images/Mercury.png",
      iconSize: "40px",
      context: ["/:lang/mercurydesc"],
      menu: {
        menuMercuryDescription: {
          link: "/mercurydesc",
          context: ["/:lang/mercurydesc"],
          item: <Trans id="menuEarthDescription">Model description</Trans>,
        },
      },
    },
    menuEarth: {
      item: <Trans id="menuEarth">Earth</Trans>,
      icon: "/images/Earth.png",
      iconSize: "48px",
      context: ["/:lang/earthdesc", "/:lang/earth2d", "/:lang/earth3d"],
      menu: {
        menuEarthDescription: {
          link: "/earthdesc/",
          context: ["/:lang/earthdesc"],
          item: <Trans id="menuEarthDescription">Model description</Trans>,
        },
        menuEarth2D: {
          link: "/earth2d/",
          context: ["/:lang/earth2d"],
          item: <Trans id="menuEarth2D">2D Magnetic Field Lines</Trans>,
        },
        menuEarth3D: {
          link: "/earth3d/",
          context: ["/:lang/earth3d"],
          item: <Trans id="menuEarth3D">3D Magnetic Field Lines</Trans>,
        },
        menuEarthAlertService: {
          link: "/earthalert/",
          disabled: true,
          context: ["/:lang/earthalert"],
          item: <Trans id="menuEarthAlertService">Alert Service</Trans>,
        },
      },
    },
    menuJupiter: {
      item: <Trans id="menuJupiter">Jupiter</Trans>,
      icon: "/images/Jupiter.png",
      iconSize: "96px",
      context: ["/:lang/jupiterdesc"],
      menu: {
        menuJupiterDescription: {
          link: "/jupiterdesc",
          context: ["/:lang/jupiterdesc"],
          item: <Trans id="menuEarthDescription">Model description</Trans>,
        },
      },
    },
    menuSaturn: {
      item: <Trans id="menuSaturn">Saturn</Trans>,
      icon: "/images/Saturn.png",
      iconSize: "96px",
      context: ["/:lang/saturn2d", "/:lang/saturndesc"],
      menu: {
        menuSaturnDescription: {
          link: "/saturndesc",
          context: ["/:lang/saturndesc"],
          item: <Trans id="menuEarthDescription">Model description</Trans>,
        },
        menuSaturn2D: {
          link: "/saturn2d/",
          context: ["/:lang/saturn2d"],
          item: <Trans id="menuSaturn2D">2D Magnetic Field Lines</Trans>,
        },
      },
    },
  },
  {
    menuContacts: {
      disabled: true,
      item: <Trans id="menuContacts">Contacts</Trans>,
    },
    menuLangRu: {
      item: <Trans id="menuLangRu">Ru</Trans>,
      lang: "ru",
    },
    menuLangEn: {
      item: <Trans id="menuLangEn">En</Trans>,
      lang: "en",
    },
    menuOldSite: {
      external: "/old/",
      item: <Trans id="menuOldSite">Old Site</Trans>,
    },
  },
];

export { menu };
