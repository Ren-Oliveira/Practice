import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState } from "https://cdn.skypack.dev/react";
import { marked } from "https://cdn.skypack.dev/marked";


const MarkdownPreviewer = () => {
  const [input, setInput] = useState("");
  
  const changeHandler = (e) => {
    return setInput(e.target.value)
  }
  
const markdown = marked(input);
  
  return (
    <div>
      <div className="box">
        <h4 className="title">Editor</h4>
        <textarea id="editor" value={input} onChange={changeHandler}/>
      </div>
      
      <div className="box">
        <h4 className="title">Preview</h4>
      <div id="preview" dangerouslySetInnerHTML={{__html: markdown}}></div>
      </div>
      
    </div>
  )
};


ReactDOM.render(<MarkdownPreviewer />, document.getElementById("root"));