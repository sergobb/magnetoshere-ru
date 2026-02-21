"use client";

import { I18nProvider } from "@lingui/react";
import catalogRu from "../../src/locales/ru/messages.js";
import catalogEn from "../../src/locales/en/messages.js";
import "bootstrap/dist/css/bootstrap.css";

export default function LangLayoutClient({ lang, children }) {
  const catalogs = { en: catalogEn, ru: catalogRu };
  return (
    <I18nProvider language={lang} catalogs={catalogs}>
      {children}
    </I18nProvider>
  );
}
