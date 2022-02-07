import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { useState, useEffect } from "https://cdn.skypack.dev/react";

const QuoteMachine = () => {
  const [quote, setQuote] = useState({ autor: null, text: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const response = await fetch("https://api.quotable.io/random");
    if (response.ok) {
      const data = await response.json();
      setQuote({ autor: data.author, text: data.content });
      setIsLoading(false);
    } else {
      setQuote({
        autor: "Admin",
        text: "An error has occurred, please try again!",
      });
      setIsLoading(false);
    }
    setIsSearching(false);
  }, [isSearching]);

  const next = () => {
    return setIsSearching(true);
  };

  return (
    <div id="wrapper">
      <div id="quote-box">
        {isLoading && <div className="loading" />}
        {!isLoading && (
          <>
            <div id="text">{quote.text}</div>
            <div id="author">{quote.author}</div>
          </>
        )}

        <div className="btns">
          <button type="button" id="new-quote" onClick={next}>
            {" "}
            Next Quote{" "}
          </button>
          <a id="tweet-quote" target="_blank" href="twitter.com/intent/tweet">
            <button>Tweet</button>
          </a>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<QuoteMachine />, document.getElementById("root"));
