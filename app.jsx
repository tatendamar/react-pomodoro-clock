function Header(props) {
  return (
    <div className="stopwatch__info">
      <h3 className="stopwatch__info--header">{props.title}</h3>
    </div>
  );
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      count: this.props.time
    };

    console.log("time", this.state.count);
  }

  /*
  *TODO: convert clock to minutes and seconds
  *
  */

  componentDidMount = () => {
    setInterval(this.timer, 1000);
  };

  timer = () => {
    if (this.state.running) {
      this.setState(prevState => ({
        count: prevState.count - 1
      }));
    }
  };

  handleClick = count => {
    this.setState({ count: count });
  };

  onStart = () => {
    this.setState({ running: true });
  };
  onStop = () => {
    this.setState({ running: false });
  };
  onReset = () => {
    this.setState({
      count: this.props.time
    });
  };

  render() {
    let startStop;
    if (!this.state.running) {
      startStop = (
        <button className="btn btn-start" onClick={this.onStart}>
          start
        </button>
      );
    } else {
      startStop = (
        <button className="btn btn-stop" onClick={this.onStop}>
          stop
        </button>
      );
    }

    return (
      <div>
        <div className="stopwatch__controls">
          {startStop}
          <button className="btn btn-reset" onClick={this.onReset}>
            reset
          </button>
        </div>
        <div className="stopwatch__display">
          <span className="stopwatch__display--minutes">
            {this.state.count}
          </span>
          <span className="stopwatch__display--seconds">00</span>
          <span className="stopwatch__display--centiseconds">00</span>
        </div>
      </div>
    );
  }
}

const Adjust = props => {
  /*
  * TODO:
  *  add a toggleable functionality when a session
  * get to 0 mins
  * toggle the heading onlyy
  */

  return (
    <div>
      <p className="stopwatch__info--1">
        {props.heading}
        <span className="stopwatch__info--break">
          <button className="btn btn-plus--1" onClick={props.onVotePlus}>
            {props.plus}
          </button>
          <a className="stopwatch__info--figures">{props.time}</a>
          <button className="btn btn-minus--1" onClick={props.onVoteMinus}>
            {props.minus}
          </button>
        </span>
      </p>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "session",
      time: 1500
    };
  }

  handleIncrement = () => {
    const time = this.state.time + 1;
    if (time <= 60) return this.setState({ time: time });
  };

  handleDecrement = () => {
    const time = this.state.time - 1;
    if (time > 0) return this.setState({ time: time });
  };
  render() {
    return (
      <div className="stopwatch">
        <Controls time={this.state.time} />

        <Header title="Pomodoro Clock" />
        <Adjust
          heading={this.state.heading}
          time={this.state.time}
          onVotePlus={this.handleIncrement.bind(this)}
          onVoteMinus={this.handleDecrement.bind(this)}
          plus="&#43;"
          minus="&#8722;"
        />
        <h4>Designed & coded by TATENDA MARUFU</h4>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
