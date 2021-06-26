import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";

function MarkDownPanel({ todoContent }) {
  const Component = ({ children, className }) => {
    return (
      <>
        {children[0].includes("\n") ? (
          <SyntaxHighlighter
            language={className === undefined ? "" : className.substring(9)}
            style={materialLight}
            children={children}
          />
        ) : (
          <SyntaxHighlighter
            customStyle={{
              height: "auto",
              padding: 0,
            }}
            style={materialLight}
            PreTag="span"
            language={className === undefined ? "" : className.substring(9)}
            children={children}
          />
        )}
      </>
    );
  };

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      children={todoContent}
      components={{
        code: Component,
      }}
    />
  );
}

export default MarkDownPanel;
