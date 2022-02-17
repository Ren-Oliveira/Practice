import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState } from "https://cdn.skypack.dev/react";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const Drums = () => {
  const [display, setDisplay] = useState("x");

  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const keyPressHandler = (e) => {
    console.log(e.key);
    for (let key of bankOne) {
      if (e.keyCode === key.keyTrigger) {
        setDisplay(key.id);
      }
    }
  };

  const btns = keys.map((key) => {
    return (
      <button id={key} className="drum-pad" onKeyPress={keyPressHandler}>
        {" "}
        {key}{" "}
      </button>
    );
  });

  return (
    <div id="drum-machine">
      <div id="container">
        <div id="left-side">
          <div id="drum-pad">{btns}</div>
        </div>

        <div id="right-side">
          <div id="display"> {display} </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Drums />, document.querySelector("#root"));
