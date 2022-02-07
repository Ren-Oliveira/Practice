const defaultState = { prevValue: null, currValue: "0", operator: null };

const solve = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "÷":
      return a / b;
    case "×":
      return a * b;
    default:
      return null;
  }
};

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.clearHandler = this.clearHandler.bind(this);
    this.inputDecimalHandler = this.inputDecimalHandler.bind(this);
    this.outputResultHandler = this.outputResultHandler.bind(this);
    this.inputNumHandler = this.inputNumHandler.bind(this);
  }

  inputNumHandler(e) {
    const n = e.target.value;
    if (this.state.currValue == "0") {
      if (n === "0") return;
      return this.setState({ ...this.state, currValue: `${n}` });
    }
    this.setState({ ...this.state, currValue: `${this.state.currValue}${n}` });
  }

  ///// CLEAR EVERYTHING
  clearHandler() {
    this.setState(defaultState);
  }

  ///// ADD DECIMAL DOT
  inputDecimalHandler() {
    if (this.state.currValue === "0" || this.state.currValue === "") {
      return this.setState({ ...this.state, currValue: "0." });
    } else {
      if (this.state.currValue.includes(".")) return;
      return this.setState({
        ...this.state,
        currValue: this.state.currValue + ".",
      });
    }
  }

  ///// ADD OPERATOR
  inputOperationHandler(op) {
    if (this.state.currValue === "-") {
      if (op == "-") return;
      if (this.state.operator)
        return this.setState({ ...this.state, currValue: "", operator: op });
      return this.setState({ ...this.state, currValue: "" });
    }

    if (this.state.currValue === "0" || this.state.currValue === "") {
      if (op === "-") return this.setState({ ...this.state, currValue: "-" });
      if (!this.state.prevValue) return;
    }

    if (this.state.operator) {
      if (this.state.currValue === "")
        return this.setState({ ...this.state, operator: op });

      let updatedResult = solve(
        +this.state.prevValue,
        +this.state.currValue,
        this.state.operator
      );
      return this.setState({
        operator: op,
        prevValue: updatedResult,
        currValue: "",
      });
    }

    if (!this.state.operator) {
      if (!this.state.prevValue)
        return this.setState({
          prevValue: this.state.currValue,
          currValue: "",
          operator: op,
        });

      return this.setState({ ...this.state, operator: op });
    }
  }

  ///// Result
  outputResultHandler(state = this.state) {
    if (!this.state.prevValue || !this.state.currValue) return;
    let updatedResult = solve(
      +this.state.prevValue,
      +this.state.currValue,
      this.state.operator
    );

    this.setState({
      prevValue: updatedResult + "",
      currValue: "",
      operator: null,
    });
  }

  render() {
    return (
      <div id="calculator">
        <div id="display">
          <div id="display_output">
            {this.state.prevValue && this.state.prevValue}
            {this.state.operator && this.state.operator}
          </div>
          <div id="display_input">{this.state.currValue}</div>
        </div>

        <div id="calculator__btns">
          <button id="clear" onClick={this.clearHandler}>
            clear
          </button>

          <button id="divide" onClick={() => this.inputOperationHandler("÷")}>
            ÷
          </button>

          <button id="one" value="1" onClick={this.inputNumHandler}>
            1
          </button>
          <button id="two" value="2" onClick={this.inputNumHandler}>
            2
          </button>
          <button id="three" value="3" onClick={this.inputNumHandler}>
            3
          </button>

          <button id="multiply" onClick={() => this.inputOperationHandler("×")}>
            ×
          </button>

          <button id="four" value="4" onClick={this.inputNumHandler}>
            4
          </button>
          <button id="five" value="5" onClick={this.inputNumHandler}>
            5
          </button>
          <button id="six" value="6" onClick={this.inputNumHandler}>
            6
          </button>

          <button id="subtract" onClick={() => this.inputOperationHandler("-")}>
            -
          </button>

          <button id="seven" value="7" onClick={this.inputNumHandler}>
            7
          </button>
          <button id="eight" value="8" onClick={this.inputNumHandler}>
            8
          </button>
          <button id="nine" value="9" onClick={this.inputNumHandler}>
            9
          </button>

          <button id="add" onClick={() => this.inputOperationHandler("+")}>
            +
          </button>

          <button id="decimal" onClick={this.inputDecimalHandler}>
            .
          </button>
          <button id="zero" value="0" onClick={this.inputNumHandler}>
            0
          </button>
          <button id="equals" onClick={this.outputResultHandler}>
            =
          </button>
        </div>
      </div>
    );
  }
}

React.render(<MyComponent />, document.querySelector("#app"));
