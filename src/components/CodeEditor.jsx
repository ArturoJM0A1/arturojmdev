import { useState } from "react";
import "./CodeEditor.css";

const files = [
  { id: "about", name: "about.js", icon: "js" },
  { id: "skills", name: "skills.json", icon: "json" },
  { id: "info", name: "info.ts", icon: "ts" },
];

const fileContents = {
  about: {
    language: "javascript",
    content: [
      { type: "keyword", content: "const" },
      { type: "space", content: " " },
      { type: "variable", content: "developer" },
      { type: "space", content: " " },
      { type: "operator", content: "=" },
      { type: "space", content: " " },
      { type: "bracket", content: "{" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "name" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "string", content: "\"Arturo\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "age" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "string", content: "\"24\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "country" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "string", content: "\"Mexico\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "role" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "string", content: "\"Full Stack Developer\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "passion" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "string", content: "\"Creative coding\"" },
      { type: "newline", content: "\n" },
      { type: "bracket", content: "}" },
    ],
  },
  skills: {
    language: "json",
    content: [
      { type: "bracket", content: "{" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "\"skills\"" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "bracket", content: "[" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"React\"" },
      { type: "punctuation", content: "," },
      { type: "space", content: " " },
      { type: "string", content: "\"Node.js\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"TypeScript\"" },
      { type: "punctuation", content: "," },
      { type: "space", content: " " },
      { type: "string", content: "\"Python\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"Next.js\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"Tailwind CSS\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"PostgreSQL\"" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "string", content: "\"MongoDB\"" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "bracket", content: "]" },
      { type: "punctuation", content: "," },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "property", content: "\"level\"" },
      { type: "punctuation", content: ":" },
      { type: "space", content: " " },
      { type: "number", content: "84" },
      { type: "punctuation", content: "%" },
      { type: "newline", content: "\n" },
      { type: "bracket", content: "}" },
    ],
  },
  info: {
    language: "typescript",
    content: [
      { type: "keyword", content: "interface" },
      { type: "space", content: " " },
      { type: "class", content: "Developer" },
      { type: "space", content: " " },
      { type: "bracket", content: "{" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "method", content: "getInfo()" },
      { type: "space", content: " " },
      { type: "operator", content: "=>" },
      { type: "space", content: " " },
      { type: "bracket", content: "{" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "    " },
      { type: "keyword", content: "return" },
      { type: "space", content: " " },
      { type: "string", content: "\"Building the web\"" },
      { type: "newline", content: "\n" },
      { type: "indent", content: "  " },
      { type: "bracket", content: "}" },
      { type: "newline", content: "\n" },
      { type: "bracket", content: "}" },
    ],
  },
};

const iconSvgs = {
  js: (
    <svg viewBox="0 0 24 24" className="file-icon file-icon--js">
      <path fill="currentColor" d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.086.567.325.734.616.579.957.593 2.242.128 3.183-.28.563-.715.991-1.462 1.198-.755.204-1.341.027-1.535-.432-.107-.261-.063-.687.163-1.302.091-.261.198-.529.349-.79l1.701.973c-.236.437-.459.863-.659 1.277-.837 1.694-1.466 2.169-2.861 2.169-.578 0-1.161-.152-1.646-.42-.497-.276-.816-.642-.952-1.135-.185-.628.035-1.219.693-1.813.54-.501 1.132-.783 1.837-.848 1.185-.108 2.223.515 2.553 1.627.132.431.153 1.023.041 1.567l-.001-.001zM13.962 12.21c.403-.754 1.274-1.149 2.268-1.149.906 0 1.63.336 1.913.941.177.381.188.791.097 1.164-.188.762-.889 1.249-1.652 1.249-.969 0-1.722-.713-1.722-1.644 0-.17.021-.4.096-.561z"/>
    </svg>
  ),
  json: (
    <svg viewBox="0 0 24 24" className="file-icon file-icon--json">
      <path fill="currentColor" d="M5.759 3.975h1.783V5.76H5.759v4.458A1.783 1.783 0 0 1 3.975 12a1.783 1.783 0 0 1-1.783-1.783v-4.459H0V12a3.585 3.585 0 0 0 3.582 3.582 3.585 3.585 0 0 0 3.582-3.582V5.759h1.783V3.975h1.782v1.784H11.33v4.459a3.585 3.585 0 0 0 3.582 3.582 3.585 3.585 0 0 0 3.582-3.582V12H11.33v4.459a3.585 3.585 0 0 1-3.582 3.582 3.585 3.585 0 0 1-3.582-3.582V12H2.177a1.783 1.783 0 0 1-1.783-1.783v-4.46H0v4.459A3.585 3.585 0 0 0 3.582 20.14 3.585 3.585 0 0 0 7.165 16.56v-4.46H5.76v1.783H3.976v-6.236h1.783V5.76H3.976V3.976h1.783z"/>
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" className="file-icon file-icon--ts">
      <path fill="currentColor" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.677.453.91.694.232.24.404.487.514.743.11.255.165.523.165.803 0 .735-.263 1.311-.79 1.727-.526.416-1.235.624-2.126.624-.61 0-1.168-.086-1.674-.257a4.065 4.065 0 0 1-1.258-.723v-2.63a3.033 3.033 0 0 0 1.426.723c.16.047.337.08.529.1.191.02.374.029.547.029.514 0 .889-.088 1.124-.267.235-.178.353-.44.353-.783a.968.968 0 0 0-.427-.78c-.284-.231-.676-.454-1.176-.67-.5-.215-.98-.439-1.44-.67-.459-.232-.833-.467-1.12-.704a2.556 2.556 0 0 1-.579-.752 1.958 1.958 0 0 1-.17-.976c0-.896.314-1.611.94-2.146.627-.535 1.503-.803 2.628-.803z"/>
      <path fill="currentColor" d="M0 1.125C0 .502.502 0 1.125 0h4.572v6.573H6.69V24H4.572v-6.573H0V1.125z"/>
      <path fill="currentColor" d="M24 1.125c0-.623-.502-1.125-1.125-1.125h-4.572v6.573h1.908V24h2.117v-6.573H24V1.125z"/>
    </svg>
  ),
};

function renderLine(content, lineIndex) {
  const lineContent = [];
  let currentLine = 0;
  let key = 0;

  for (const item of content) {
    if (item.type === "newline") {
      currentLine++;
      continue;
    }
    if (currentLine === lineIndex) {
      if (item.type === "indent") {
        lineContent.push(
          <span key={key++} className="code-indent">
            {item.content}
          </span>
        );
      } else {
        lineContent.push(
          <span key={key++} className={`code-${item.type}`}>
            {item.content}
          </span>
        );
      }
    }
  }
  return lineContent;
}

function getLineCount(content) {
  let count = 1;
  for (const item of content) {
    if (item.type === "newline") count++;
  }
  return count;
}

export default function CodeEditor({ className = "" }) {
  const [activeFile, setActiveFile] = useState("about");

  const file = fileContents[activeFile];
  const lineCount = getLineCount(file.content);
  const lines = Array.from({ length: lineCount }, (_, i) => i);

  return (
    <div className={`code-editor ${className}`}>
      <div className="code-editor__sidebar">
        <div className="code-editor__sidebar-header">
          <span className="code-editor__sidebar-title">Explorador</span>
        </div>
        <div className="code-editor__file-list">
          {files.map((f) => (
            <button
              key={f.id}
              className={`code-editor__file ${activeFile === f.id ? "active" : ""}`}
              onClick={() => setActiveFile(f.id)}
            >
              <span className="code-editor__file-icon">{iconSvgs[f.icon]}</span>
              <span className="code-editor__file-name">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="code-editor__main">
        <div className="code-editor__tabs">
          {files.map((f) => (
            <button
              key={f.id}
              className={`code-editor__tab ${activeFile === f.id ? "active" : ""}`}
              onClick={() => setActiveFile(f.id)}
            >
              <span className="code-editor__tab-icon">{iconSvgs[f.icon]}</span>
              <span>{f.name}</span>
              <span className="code-editor__tab-close">×</span>
            </button>
          ))}
        </div>

        <div className="code-editor__content">
          <div className="code-editor__line-numbers">
            {lines.map((i) => (
              <div key={i} className="code-editor__line-number">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="code-editor__code">
            {lines.map((i) => (
              <div key={i} className="code-editor__line">
                {renderLine(file.content, i)}
                {i === lines.length - 1 && (
                  <span className="code-editor__cursor">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="code-editor__statusbar">
          <div className="code-editor__status-left">
            <span className="code-editor__status-item">
              {activeFile === "about" ? "JavaScript" : activeFile === "skills" ? "JSON" : "TypeScript"}
            </span>
          </div>
          <div className="code-editor__status-right">
            <span className="code-editor__status-item">Ln {lineCount}, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
