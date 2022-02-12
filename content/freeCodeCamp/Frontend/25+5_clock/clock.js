import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState, useReducer } from "https://cdn.skypack.dev/react";

const defaultState = {
  sessionValue: 25,
  breakValue: 5,
  seconds: "00",
  start: false,
};

const clockReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_SESSION":
      return { ...state, sessionValue: state.sessionValue + 1 };
    case "DECREMENT_SESSION":
      if (state.sessionValue === 0) return state;
      return { ...state, sessionValue: state.sessionValue - 1 };
    case "INCREMENT_BREAK":
      return { ...state, breakValue: state.breakValue + 1 };
    case "DECREMENT_BREAK":
      if (state.breakValue === 0) return state;
      return { ...state, breakValue: state.breakValue - 1 };
    case "START_STOP":
      return { ...state, start: !state.start };
    case "RESET":
      return defaultState;
    default:
      throw new Error("Something went wrong");
  }
};

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);

  const [started, setStarted] = useState(false);

  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };

  const incrementSessionHandler = () => {
    dispatch({ type: "INCREMENT_SESSION" });
  };

  const decrementSessionHandler = () => {
    dispatch({ type: "DECREMENT_SESSION" });
  };

  const incrementBreakHandler = () => {
    dispatch({ type: "INCREMENT_BREAK" });
  };

  const decrementBreakHandler = () => {
    dispatch({ type: "DECREMENT_BREAK" });
  };

  return (
    <div className="container">
      <div id="timer">
        <div id="timer-label"> Session </div>
        <div id="time-left">
          {" "}
          {state.sessionValue} : {state.seconds}{" "}
        </div>
      </div>

      <div id="session" className="box">
        <div id="session-label" className="label">
          {" "}
          Session Length{" "}
        </div>
        <button
          id="session-decrement"
          className="btn"
          onClick={decrementSessionHandler}
        >
          {" "}
          -{" "}
        </button>
        <span id="session-length" className="value">
          {" "}
          {state.sessionValue}{" "}
        </span>
        <button
          id="session-increment"
          className="btn"
          onClick={incrementSessionHandler}
        >
          {" "}
          +{" "}
        </button>
      </div>

      <div id="break" className="box">
        <div id="break-label" className="label">
          {" "}
          Break Length{" "}
        </div>
        <button
          id="break-decrement"
          className="btn"
          onClick={decrementBreakHandler}
        >
          {" "}
          -{" "}
        </button>
        <span id="break-length" className="value">
          {" "}
          {state.breakValue}{" "}
        </span>
        <button
          id="break-increment"
          className="btn"
          onClick={incrementBreakHandler}
        >
          {" "}
          +{" "}
        </button>
      </div>

      <div className="init_btns">
        <button id="star_stop"> {started ? "Stop" : "Start"} </button>
        <button id="reset" onClick={resetHandler}>
          {" "}
          Reset{" "}
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Clock />, document.getElementById("root"));
