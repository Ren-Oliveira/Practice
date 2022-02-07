class MyComponent extends React.Component {
  quote = "a bcd";

  render() {
    return (
      <div id="wrapper">
        <div id="quote-box">
          <div id="text"> {this.quote} </div>
          <div id="author" />
          <button id="new-quote"> New Quote </button>

          <a id="tweet-quote" target="_top" href="twitter.com/intent/tweet">
            <button>Tweet</button>
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.querySelector("#app"));
