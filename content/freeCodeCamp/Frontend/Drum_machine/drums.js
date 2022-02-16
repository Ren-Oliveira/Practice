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
  return (
    <div id="drum-machine">
      <div id="container">
        <div id="left-side">
          <div id="drum-pad">
            <button id="q" className="drum-pad">
              {" "}
              Q{" "}
            </button>
            <button id="w" className="drum-pad">
              {" "}
              W{" "}
            </button>
            <button id="e" className="drum-pad">
              {" "}
              E{" "}
            </button>
            <button id="a" className="drum-pad">
              {" "}
              A{" "}
            </button>
            <button id="s" className="drum-pad">
              {" "}
              S{" "}
            </button>
            <button id="d" className="drum-pad">
              {" "}
              D{" "}
            </button>
            <button id="z" className="drum-pad">
              {" "}
              Z{" "}
            </button>
            <button id="x" className="drum-pad">
              {" "}
              X{" "}
            </button>
            <button id="c" className="drum-pad">
              {" "}
              C{" "}
            </button>
          </div>
        </div>

        <div id="right-side">
          <div id="display"> name </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Drums />, document.querySelector("#root"));
