import LangLayoutClient from "./LangLayoutClient";

export default function LangLayout({ children, params }) {
  const lang = params.lang === "ru" ? "ru" : "en";
  return (
    <LangLayoutClient lang={lang}>
      {children}
    </LangLayoutClient>
  );
}
