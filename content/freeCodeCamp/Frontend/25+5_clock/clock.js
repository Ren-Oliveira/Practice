import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useEffect, useReducer, useRef } from "https://cdn.skypack.dev/react";

const defaultState = {
  running: false,
  sessionLength: 25,
  breakLength: 5,
  title: "Session",
  timeLeft: { min: 25, sec: 0 },
};

const timerStr = ({ min, sec }) => {
  let m = min;
  let s = sec;
  if (min < 10) m = `0${min}`;
  if (sec < 10) s = `0${sec}`;
  return `${m}:${s}`;
};

const clockReducer = (state, action) => {
  switch (action.type) {
    case "START_STOP":
      return { ...state, running: !state.running };
    case "RESET":
      return defaultState;
    case "INCREMENT_SESSION":
      if (state.sessionLength === 60 || state.running) return state;
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: { min: state.sessionLength + 1, sec: 0 },
      };
    case "DECREMENT_SESSION":
      if (state.sessionLength === 1 || state.running) return state;
      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        timeLeft: { min: state.sessionLength - 1, sec: 0 },
      };
    case "INCREMENT_BREAK":
      if (state.breakLength === 60 || state.running) return state;
      return { ...state, breakLength: state.breakLength + 1 };
    case "DECREMENT_BREAK":
      if (state.breakLength === 1 || state.running) return state;
      return { ...state, breakLength: state.breakLength - 1 };
    case "INIT_CLOCK":
      let m = state.timeLeft.min;
      let s = state.timeLeft.sec;
      if (s > 0) return { ...state, timeLeft: { min: m, sec: s - 1 } };
      if (s === 0) {
        if (m > 0) return { ...state, timeLeft: { min: m - 1, sec: 59 } };
        if (m === 0 && state.title === "Session")
          return {
            ...state,
            timeLeft: { min: state.breakLength, sec: 0 },
            title: "Break",
          };
        if (m === 0 && state.title === "Break")
          return {
            ...state,
            timeLeft: { min: state.sessionLength, sec: 0 },
            title: "Session",
          };
      }
    default:
      throw new Error("Something went very wrong");
  }
};

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);

  const audioRef = useRef();
  const audioSrc =
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

  const dispatchTimer = () => {
    if (state.timeLeft.min === 0 && state.timeLeft.sec - 1 === 0)
      audioRef.current.play();
    dispatch({ type: "INIT_CLOCK" });
  };

  useEffect(() => {
    let intervalID;
    let intervalTimer = 1000;
    if (state.running) intervalID = setInterval(dispatchTimer, intervalTimer);
    return () => clearInterval(intervalID);
  }, [state.running, state.timeLeft]);

  /// HANDLERS
  const resetHandler = () => {
    audioRef.current.load();
    dispatch({ type: "RESET" });
  };
  const toggleStartHandler = () => dispatch({ type: "START_STOP" });
  const incrementSessionHandler = () => dispatch({ type: "INCREMENT_SESSION" });
  const decrementSessionHandler = () => dispatch({ type: "DECREMENT_SESSION" });
  const incrementBreakHandler = () => dispatch({ type: "INCREMENT_BREAK" });
  const decrementBreakHandler = () => dispatch({ type: "DECREMENT_BREAK" });

  return (
    <div className="container">
      <audio id="beep" ref={audioRef} preload="auto" src={audioSrc} />
      <div id="timer">
        <div id="timer-label"> {state.title}</div>
        <div id="time-left"> {timerStr(state.timeLeft)} </div>
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
          {state.sessionLength}{" "}
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
          {state.breakLength}{" "}
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
        <button id="start_stop" onClick={toggleStartHandler}>
          {" "}
          {state.running ? "Stop" : "Start"}{" "}
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
