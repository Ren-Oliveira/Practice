import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useEffect, useReducer, useState } from "https://cdn.skypack.dev/react";

const defaultState = {
  running: false,
  sessionDefault: 25,
  breakDefault: 5,
  title: "session",
  timeLeft: {min: 25, sec: 0},
}

  const timerStr = ({min, sec}) => {
    let m = min;
    let s = sec;
    if(min <10) m=`0${min}`;
    if(sec <10) s=`0${sec}`;
    return `${m}:${s}`
  }
  
const clockReducer = (state, action) => {
  switch(action.type){
      
    case "RESET": return defaultState;
      
    case "INCREMENT_SESSION":
      if(state.sessionDefault === 60 || state.running) return state;
      return {...state,sessionDefault: state.sessionDefault + 1, timeLeft: {min: state.sessionDefault +1, sec: 0 }};
      
    case "DECREMENT_SESSION":
      if(state.sessionDefault === 0 || state.running) return state;
      return {...state, sessionDefault: state.sessionDefault - 1, timeLeft: {min: state.sessionDefault -1, sec: 0}};
      
    case "INCREMENT_BREAK":
      if(state.breakDefault === 60 || state.running) return state;
      return {...state, breakDefault: state.breakDefault + 1};
      
    case "DECREMENT_BREAK":
      if(state.breakDefault === 0 || state.running) return state;
      return {...state, breakDefault: state.breakDefault - 1};

    case "INIT_CLOCK":
      let m = state.timeLeft.min;
      let s = state.timeLeft.sec;

      if (s > 0) return {...state, timeLeft: {min: m, sec: s - 1} };
      if (s === 0 && m > 0) return {...state, timeLeft: {min: m-1, sec: 59} };
      
      if (s === 0 && m === 0) {
        if(state.title === "session") return {...state, title: "break", timeLeft: {min: state.breakDefault, sec: 0} };
        
        if(state.title === "break") return {...state, title: "session", timeLeft: {min: state.sessionDefault, sec: 0} };
      }
      
    case "START_STOP": 
        return {...state, running: !state.running}
      
    default: throw new Error("Something went wrong");

  }
}

const Clock = () => {
  const [state, dispatch] = useReducer(clockReducer, defaultState);


  useEffect(()=>{
    let interval;

        if(state.running) {
          interval = setInterval(() => {dispatch({type: "INIT_CLOCK"});
      }, 1000);}


    return () => clearInterval(interval);
  }, [state.running])
  
    
  const resetHandler = () => dispatch({type: "RESET"});
  const incrementSessionHandler = () => dispatch({type: "INCREMENT_SESSION"});
  const decrementSessionHandler = () => dispatch({type: "DECREMENT_SESSION"});
  const incrementBreakHandler = () => dispatch({type: "INCREMENT_BREAK"});
  const decrementBreakHandler = () => dispatch({type: "DECREMENT_BREAK"});
  const toggleStartStopHandler = () => dispatch({type: "START_STOP"});
    
   return(
    <div className="container">
      <div id="timer">
        <div id="timer-label"> { state.title }</div>
        <div id="time-left"> { timerStr(state.timeLeft) } </div>
      </div>  

      <div id="session" className="box">
        <div id="session-label" className="label"> Session Length </div>
        <button id="session-decrement" className="btn" onClick={decrementSessionHandler} > - </button>
        <span id="session-length" className="value"> { state.sessionDefault } </span>
        <button id="session-increment" className="btn" onClick={incrementSessionHandler}> + </button>
      </div>  

      <div id="break" className="box">
        <div id="break-label" className="label"> Break Length </div>
        <button id="break-decrement" className="btn" onClick={decrementBreakHandler}> - </button> 
        <span id="break-length" className="value"> { state.breakDefault } </span>
        <button id="break-increment" className="btn" onClick={incrementBreakHandler}> + </button>  
      </div>

      <div className="init_btns">
        <button id="start_stop" onClick={toggleStartStopHandler}> {state.sessionOn ? "Stop" : "Start" } </button>
        <button id="reset" onClick={resetHandler}> Reset </button>
      </div>
    </div>
  )};

ReactDOM.render(<Clock />, document.getElementById("root"))