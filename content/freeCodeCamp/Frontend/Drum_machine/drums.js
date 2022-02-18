import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState, useEffect } from "https://cdn.skypack.dev/react";

const notesList = {
  Q: {
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  W: {
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  E: {
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  A: {
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  S: {
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  D: {
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  Z: {
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  X: {
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  C: {
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
};

const Pad = (props) => {
  return (
    <button
      type="button"
      id={`btn-${props.noteKey}`}
      className="drum-pad"
      onClick={props.playAudio}
    >
      {props.noteKey}

      <audio id={props.noteKey} className="clip" src={props.src} />
    </button>
  );
};

const Drums = () => {
  const [display, setDisplay] = useState("x");

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    return () => window.removeEventListener("keydown", playNote);
  }, []);

  const allKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const playNote = (e) => {
    const keyPressed = e.key ? e.key.toUpperCase() : e.target.childNodes[1].id;
    console.log(keyPressed);
    if (e.key && !allKeys.includes(keyPressed)) return;
    setDisplay(notesList[keyPressed].id);
    const audio = document.getElementById(keyPressed);
    audio.play();
  };

  const clickHandler = () => {};

  const padBtns = allKeys.map((key, i) => (
    <Pad noteKey={key} src={notesList[key].url} playAudio={playNote} />
  ));

  return (
    <div id="drum-machine">
      <div id="container">
        <div id="left-side">
          <div id="drum-pad">{padBtns}</div>
        </div>

        <div id="right-side">
          <div id="display">{display}</div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Drums />, document.querySelector("#root"));
