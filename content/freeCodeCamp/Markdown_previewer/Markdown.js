import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState } from "https://cdn.skypack.dev/react";
import { marked } from "https://cdn.skypack.dev/marked";

const placeholder = `
# h1
## h2
### h3

Code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code <- with comment!

function add(a, b) {
    return a + b;
}
\`\`\`

**Text bold**
_Text italic_
**_both!_**
~~Text crossed~~

[link](https://www.freecodecamp.org)

> Block Quote!

1st Header | 2nd Header | 3rd Header
------------ | ------------- | -------------
Hello | Dear | World!

- lists of items:
  - bulleted.
     - indentated.
        1. numbered.



![Pomegranate](https://cdn-icons-png.flaticon.com/512/6081/6081345.png)
`;

marked.setOptions({
  breaks: true,
});

const MarkdownPreviewer = () => {
  const [input, setInput] = useState(placeholder);

  const changeHandler = (e) => {
    return setInput(e.target.value);
  };

  const markdown = marked(input);

  return (
    <div>
      <div className="box">
        <h4 className="title">Editor</h4>
        <textarea id="editor" value={input} onChange={changeHandler} />
      </div>

      <div className="box">
        <h4 className="title">Preview</h4>
        <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }}></div>
      </div>
    </div>
  );
};

ReactDOM.render(<MarkdownPreviewer />, document.getElementById("root"));
