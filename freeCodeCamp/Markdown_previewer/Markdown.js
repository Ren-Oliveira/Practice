import ReactDOM from "https://cdn.skypack.dev/react-dom";

const MarkdownPreviewer = () => {
  return (
    <div>
      <div className="editor-box">
        <textarea id="editor" />
      </div>
      <div id="preview" />
    </div>
  );
};

ReactDOM.render(<MarkdownPreviewer />, document.getElementById("root"));
