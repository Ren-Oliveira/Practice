import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useEffect, useReducer } from "https://cdn.skypack.dev/react";

const defaultState = {
  sessionValue: 25,
  breakValue: 5,
  sessionSeconds: 60,
  breakSeconds: 60,
  start: false,
  break: false,
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

    case "SESSION_ON":
      if (state.sessionSeconds === 0 && state.sessionValue === 0)
        return { ...state, break: true, session: false };
      if (state.sessionSeconds === 0)
        return {
          ...state,
          sessionSeconds: 60,
          sessionValue: state.sessionValue - 1,
        };

      return { ...state, sessionSeconds: state.sessionSeconds - 1 };

    case "ON_BREAK":

    default:
      throw new Error("Something went wrong");
  }
};

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);

  //   useEffect(()=>{
  //     if(state.start === true){
  //       setInterval(()=>{
  //         dispatch({type: "SESSION_ON"})
  //       }, 1000)
  //     }
  //   }, [state.start])

  const resetHandler = () => dispatch({ type: "RESET" });
  const incrementSessionHandler = () => dispatch({ type: "INCREMENT_SESSION" });
  const decrementSessionHandler = () => dispatch({ type: "DECREMENT_SESSION" });
  const incrementBreakHandler = () => dispatch({ type: "INCREMENT_BREAK" });
  const decrementBreakHandler = () => dispatch({ type: "DECREMENT_BREAK" });
  const toggleStartStopHandler = () => dispatch({ type: "START_STOP" });

  const timeLeft = `${
    state.sessionSeconds === 60
      ? state.sessionValue + ":00"
      : state.sessionValue + ":" + state.sessionSeconds
  }`;

  return (
    <div className="container">
      <div id="timer">
        <div id="timer-label"> Session / Break </div>
        <div id="time-left"> {timeLeft} </div>
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
