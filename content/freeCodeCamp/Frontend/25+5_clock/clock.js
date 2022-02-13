import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useEffect, useReducer } from "https://cdn.skypack.dev/react";

const defaultState = {
  sessionOn: false,
  sessionDefault: 25,
  sessionTimer: { min: 25, sec: 0 },
  breakOn: false,
  breakDefault: 5,
  breakTimer: { min: 0, sec: 0 },
};

const timerStr = ({ min, sec }) => {
  let m = min;
  let s = sec;
  if (min < 10) m = `0${min}`;
  if (sec < 10) s = `0${sec}`;
  if (sec === 60) {
    s = `00`;
    m = min + 1;
  }
  return `${m}:${s}`;
};

const clockReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return defaultState;
    case "INCREMENT_SESSION":
      if (state.sessionDefault === 60) return state;
      return { ...state, sessionDefault: state.sessionDefault + 1 };
    case "DECREMENT_SESSION":
      if (state.sessionDefault === 0) return state;
      return { ...state, sessionDefault: state.sessionDefault - 1 };
    case "INCREMENT_BREAK":
      if (state.breakDefault === 60) return state;
      return { ...state, breakDefault: state.breakDefault + 1 };
    case "DECREMENT_BREAK":
      if (state.breakDefault === 0) return state;
      return { ...state, breakDefault: state.breakDefault - 1 };
    case "INIT_BREAK":
      return {
        ...state,
        breakOn: true,
        sessionOn: false,
        breakTimer: { min: state.breakDefault, sec: 0 },
      };
    case "INIT_SESSION":
      return {
        ...state,
        breakOn: false,
        sessionOn: true,
        sessionTimer: { min: state.sessionDefault, sec: 0 },
      };
    case "RUN_SESSION":
      let s = state.sessionTimer.sec;
      let m = state.sessionTimer.min;

      if (s > 0) return { ...state, sessionTimer: { min: m, sec: s - 1 } };
      if (s === 0) return { ...state, sessionTimer: { min: m - 1, sec: 60 } };

    default:
      throw new Error("Something went wrong");
  }
};

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);

  useEffect(() => {
    if (state.sessionOn === true) {
      let interval = setInterval(() => {
        dispatch({ type: "RUN_SESSION" });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.sessionOn]);

  const resetHandler = () => dispatch({ type: "RESET" });
  const incrementSessionHandler = () => dispatch({ type: "INCREMENT_SESSION" });
  const decrementSessionHandler = () => dispatch({ type: "DECREMENT_SESSION" });
  const incrementBreakHandler = () => dispatch({ type: "INCREMENT_BREAK" });
  const decrementBreakHandler = () => dispatch({ type: "DECREMENT_BREAK" });
  const toggleStartStopHandler = () => dispatch({ type: "INIT_SESSION" });

  const timeLeft = timerStr(state.sessionTimer);

  return (
    <div className="container">
      <div id="timer">
        <div id="timer-label"> Session / Break </div>
        <div id="time-left">{timeLeft}</div>
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
          {state.sessionDefault}{" "}
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
          {state.breakDefault}{" "}
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
        <button id="star_stop" onClick={toggleStartStopHandler}>
          {" "}
          {state.start ? "Stop" : "Start"}{" "}
        </button>
        <button id="reset" onClick={resetHandler}>
          {" "}
          Reset{" "}
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Clock />, document.getElementById("root"));
