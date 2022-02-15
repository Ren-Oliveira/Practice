const Drums = () => {
  return (
    <div id="drum-machine">
      <div id="display"> HERE COME THE DRUMS! </div>
      <div id="drum-pad">
        <button id="q" className="drum-pad">
          Q
        </button>
        <button id="w" className="drum-pad">
          W
        </button>
        <button id="e" className="drum-pad">
          E
        </button>
        <button id="a" className="drum-pad">
          A
        </button>
        <button id="s" className="drum-pad">
          S
        </button>
        <button id="d" className="drum-pad">
          D
        </button>
        <button id="z" className="drum-pad">
          Z
        </button>
        <button id="x" className="drum-pad">
          X
        </button>
        <button id="c" className="drum-pad">
          C
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Drums />, document.querySelector("#root"));
