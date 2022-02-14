import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useEffect, useReducer } from "https://cdn.skypack.dev/react";

const defaultState = {
  sessionOn: false,
  sessionDefault: 25,
  sessionTimer: { min: 25, sec: 0 },
  breakOn: false,
  breakDefault: 5,
  breakTimer: { min: 0, sec: 0 },
  timeLeft: "25:00",
  paused: "",
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
    case "RESET":
      return defaultState;
    case "INCREMENT_SESSION":
      if (state.sessionDefault === 60 || state.sessionOn || state.breakOn)
        return state;
      return {
        ...state,
        sessionDefault: state.sessionDefault + 1,
        sessionTimer: { min: state.sessionDefault + 1, sec: 0 },
      };
    case "DECREMENT_SESSION":
      if (state.sessionDefault === 0 || state.sessionOn || state.breakOn)
        return state;
      return {
        ...state,
        sessionDefault: state.sessionDefault - 1,
        sessionTimer: { min: state.sessionDefault - 1, sec: 0 },
      };
    case "INCREMENT_BREAK":
      if (state.breakDefault === 60 || state.sessionOn || state.breakOn)
        return state;
      return {
        ...state,
        breakDefault: state.breakDefault + 1,
        breakTimer: { min: state.breakDefault + 1, sec: 0 },
      };
    case "DECREMENT_BREAK":
      if (state.breakDefault === 0 || state.sessionOn || state.breakOn)
        return state;
      return {
        ...state,
        breakDefault: state.breakDefault - 1,
        breakTimer: { min: state.breakDefault - 1, sec: 0 },
      };
    case "INIT_BREAK":
      return dispatch(
        { ...state, breakOn: true, sessionOn: false },
        { type: "RUN_BREAK" }
      );
    case "INIT_SESSION":
      return dispatch(
        { ...state, breakOn: false, sessionOn: true },
        { type: "RUN_BREAK" }
      );

    case "RUN_SESSION":
      let sS = state.sessionTimer.sec;
      let mS = state.sessionTimer.min;
      if (sS > 0)
        return {
          ...state,
          sessionTimer: { min: mS, sec: sS - 1 },
          timeLeft: timerStr(state.sessionTimer),
        };
      if (sS === 0 && mS > 0)
        return {
          ...state,
          sessionTimer: { min: mS - 1, sec: 59 },
          timeLeft: timerStr(state.sessionTimer),
        };
      if (sS === 0 && mS === 0) dispatch({ type: "INIT_BREAK" });

    case "RUN_BREAK":
      let sB = state.breakTimer.sec;
      let mB = state.breakTimer.min;
      if (sB > 0)
        return {
          ...state,
          breakTimer: { min: mB, sec: sB - 1 },
          timeLeft: timerStr(state.sessionTimer),
        };
      if (sB === 0)
        return {
          ...state,
          breakTimer: { min: mB - 1, sec: 59 },
          timeLeft: timerStr(state.sessionTimer),
        };
      if (mB === 0 && sB === 0) return dispatch({ type: "INIT_SESSION" });

    case "START_STOP":
      if (!state.sessionOn && !state.breakOn)
        return { ...state, sessionOn: true };
      if (state.paused === "" && state.sessionOn)
        return { ...state, sessionOn: false, paused: "session" };
      if (state.paused === "session")
        return { ...state, sessionOn: true, paused: "" };
      if (state.paused === "" && state.breakOn)
        return { ...state, breakOn: false, paused: "break" };
      if (state.paused === "break")
        return { ...state, breakOn: true, paused: "" };

    default:
      throw new Error("Something went wrong");
  }
};

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      if (state.breakOn) dispatch({ type: "RUN_BREAK" });

      if (state.sessionOn) dispatch({ type: "RUN_SESSION" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.sessionOn, state.breakOn]);

  const resetHandler = () => dispatch({ type: "RESET" });
  const incrementSessionHandler = () => dispatch({ type: "INCREMENT_SESSION" });
  const decrementSessionHandler = () => dispatch({ type: "DECREMENT_SESSION" });
  const incrementBreakHandler = () => dispatch({ type: "INCREMENT_BREAK" });
  const decrementBreakHandler = () => dispatch({ type: "DECREMENT_BREAK" });
  const toggleStartStopHandler = () => dispatch({ type: "START_STOP" });

  return (
    <div className="container">
      <div id="timer">
        <div id="timer-label"> {!state.breakOn ? "Session" : "Break"}</div>
        <div id="time-left"> {state.timeLeft} </div>
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
          {state.sessionOn ? "Stop" : "Start"}{" "}
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
