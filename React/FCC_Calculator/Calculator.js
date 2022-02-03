///// NOT WORKING!

const defaultState = { result: "0", currValue: "", operator: "" };

const solve = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "x":
      return a * b;
    default:
      return;
  }
};

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.clearHandler = this.clearHandler.bind(this);
    this.inputNumberHandler = this.inputNumberHandler.bind(this);
    this.inputDecimalHandler = this.inputDecimalHandler.bind(this);
    this.outputResultHandler = this.outputResultHandler.bind(this);
  }

  ///// CLEAR EVERYTHING
  clearHandler() {
    this.setState(defaultState);
  }

  ///// ADD DECIMAL DOT
  inputDecimalHandler() {
    if (this.state.currValue.includes(".")) return;
    if (this.state.currValue == "")
      return this.setState({ ...this.state, currValue: "0.", result: `0` });
    return this.setState({
      ...this.state,
      currValue: this.state.currValue + ".",
    });
  }

  ///// ADD DIGIT
  inputNumberHandler(num, state = this.state) {
    if (state.currValue == "0" || state.currValue == "") {
      if (num == "0") return;
      return this.setState({ ...state, currValue: num, result: `${num}` });
    }
    this.setState({
      ...state,
      currValue: `${state.currValue}${num}`,
      result: `${state.currValue}${num}`,
    });
  }

  ///// ADD OPERATOR + - / *
  inputOperationHandler(op) {
    let cur = this.state.currValue;
    if (this.state.operator != "") {
      let updatedResult = solve(+this.state.result, +cur, this.state.operator);
      this.setState({ ...this.state, result: updatedResult, currValue: "" });
    }
    if (this.state.operator == "")
      return this.setState({ currValue: "", result: cur, operator: op });
  }

  ///// RESOLVE
  outputResultHandler() {
    console.log(this.state);
  }

  render() {
    return (
      <div id="calculator">
        <div id="display">
          <div id="display-curr">
            {this.state.currValue != "" ||
              (this.state.currValue != this.state.result && this.state.result)}
            {this.state.operator}
            {this.state.currValue}
          </div>

          <div id="display-total">
            {this.state.currValue != "" && "="}
            {this.state.result}
          </div>
        </div>

        <div id="calculator__btns">
          <button id="clear" onClick={this.clearHandler}>
            clear
          </button>
          <button id="divide" onClick={() => this.inputOperationHandler("/")}>
            /
          </button>
          <button id="one" onClick={() => this.inputNumberHandler("1")}>
            1
          </button>
          <button id="two" onClick={() => this.inputNumberHandler("2")}>
            2
          </button>
          <button id="three" onClick={() => this.inputNumberHandler("3")}>
            3
          </button>
          <button id="multiply" onClick={() => this.inputOperationHandler("x")}>
            x
          </button>
          <button id="four" onClick={() => this.inputNumberHandler("4")}>
            4
          </button>
          <button id="five" onClick={() => this.inputNumberHandler("5")}>
            5
          </button>
          <button id="six" onClick={() => this.inputNumberHandler("6")}>
            6
          </button>
          <button id="subtract" onClick={() => this.inputOperationHandler("-")}>
            -
          </button>
          <button id="seven" onClick={() => this.inputNumberHandler("7")}>
            7
          </button>
          <button id="eight" onClick={() => this.inputNumberHandler("8")}>
            8
          </button>
          <button id="nine" onClick={() => this.inputNumberHandler("9")}>
            9
          </button>
          <button id="add" onClick={() => this.inputOperationHandler("+")}>
            +
          </button>
          <button id="decimal" onClick={this.inputDecimalHandler}>
            .
          </button>
          <button id="zero" onClick={() => this.inputNumberHandler("0")}>
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
