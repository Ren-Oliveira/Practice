import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState } from "https://cdn.skypack.dev/react";

const Clock = () => {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  
  
  return(
    <div className="container">

            <div id="timer">
        <div id="timer-label"> Session </div>
        <div id="time-left"> {min}:{sec} </div>
      </div>  
      
      <div id="session" className="box">
        <div id="session-label" className="label"> Session Length </div>
        <button id="session-decrement" className="btn"> - </button>
        <span className="value"> {min} </span>
        <button id="session-increment" className="btn"> + </button>
      </div>  

      <div id="break" className="box">
        <div id="break-label" className="label"> Break Length </div>
        <button id="break-decrement" className="btn"> - </button> 
        <span className="value"> 5 </span>
        <button id="break-increment" className="btn"> + </button>  
      </div>

      <div className="btns">
        <button id="star_stop"> Start </button>
        <button id="reset"> Reset </button>
      </div>
    </div>
  )};

ReactDOM.render(<Clock />, document.getElementById("root"))