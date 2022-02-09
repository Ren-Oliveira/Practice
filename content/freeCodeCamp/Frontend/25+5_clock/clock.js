import ReactDOM from "https://cdn.skypack.dev/react-dom";

const Clock = () => {
  return(
    <div className="container">

            <div id="timer">
        <div id="timer-label"> Session </div>
        <div id="time-left"> 25:00 </div>
      </div>  
      
      <div id="session">
        <div id="session-label"> Session length </div>
        <button id="session-decrement"> - </button>  
        <span className="n-label"> 5 </span>
        <button id="session-increment"> + </button>
      </div>  

      <div id="break">
        <div id="break-label"> Break Length </div>
        <button id="break-decrement"> - </button> 
        <span className="n-label"> 5 </span> 
        <button id="break-increment"> + </button>  
      </div>

      <div className="btns">
        <button id="star_stop"> Start </button>
        <button id="reset"> Reset </button>
      </div>
    </div>
  )};

ReactDOM.render(<Clock />, document.getElementById("root"))