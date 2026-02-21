"use client";

import React, { useState, useMemo } from "react";
import ReactMathJax from "react-mathjax2";
import ReactHtmlParser from "react-html-parser";
import "./css/screen.css";

const MATHJAX_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-AMS_SVG";

export default function GhostStory({ ghostText, ghostBaseUrl = "" }) {
  const html = useMemo(() => {
    const text = ghostText || { title: "", html: "" };
    let raw = "<h2>" + text.title + "</h2>" + (text.html || "");
    raw = raw
      .replace(/\\\(/g, '<span class="MathJax">')
      .replace(/\\\)/g, "</span>")
      .replace(/\$\$(.*?)\$\$/g, '<span class="MathJaxFormula">$&</span>')
      .replace(/\$\$/g, "")
      .replace(/\$(.*?)\$/g, '<span class="MathJax">$&</span>')
      .replace(/\$/g, "");
    return raw.replace(
      /<img src="\/content\/images/gi,
      `<img src="${ghostBaseUrl || ""}/content/images`
    );
  }, [ghostText, ghostBaseUrl]);

  let counter = 0;
  return (
    <div>
      {ReactHtmlParser(html, {
        transform: function (node) {
          if (
            node.type === "tag" &&
            node.attribs?.class === "MathJax"
          ) {
            return (
              <ReactMathJax.Context
                input="tex"
                key={node.children?.[0]?.data}
                delay={200 + (counter += 10)}
                script={MATHJAX_SCRIPT}
              >
                <ReactMathJax.Node inline>
                  {node.children?.[0]?.data}
                </ReactMathJax.Node>
              </ReactMathJax.Context>
            );
          }
          if (
            node.type === "tag" &&
            node.attribs?.class === "MathJaxFormula"
          ) {
            return (
              <span key={node.children?.[0]?.data}>
                <ReactMathJax.Context
                  input="tex"
                  delay={10 + (counter += 5)}
                  script={MATHJAX_SCRIPT}
                  options={{
                    SVG: {
                      linebreaks: { automatic: true, width: "90% container" },
                    },
                  }}
                >
                  <span>
                    <ReactMathJax.Node>
                      {node.children?.[0]?.data}
                    </ReactMathJax.Node>
                  </span>
                </ReactMathJax.Context>
              </span>
            );
          }
          if (
            node.type === "text" &&
            node.parent !== null &&
            (node.parent.attribs?.class === "MathJax" ||
              node.parent.attribs?.class === "MathJaxFormula")
          ) {
            return null;
          }
        },
      })}
    </div>
  );
}
