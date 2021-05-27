import React from "react";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      sessionOrBreak: "session",
      stopped: true
    };
    this.modify = this.modify.bind(this);
    this.reset = this.reset.bind(this);
    this.pauseplay = this.pauseplay.bind(this);
    this.setLength = this.setLength.bind(this);
  }
  componentDidUpdate() {
    if (!this.state.stopped) {
      setTimeout(() => {
        if (!this.state.stopped) {
          let nameLength = this.state.sessionOrBreak + "Length";
          let nameStatus = this.state.sessionOrBreak + "Status";
          this.setState(function (prevState) {
            if (prevState[nameStatus] > 0) {
              return { [nameStatus]: prevState[nameStatus] - 1 };
            } else {
              document.getElementById("beep").play();
              if (prevState.sessionOrBreak === "session") {
                return {
                  [nameStatus]: prevState[nameLength],
                  sessionOrBreak: "break"
                };
              } else {
                return {
                  [nameStatus]: prevState[nameLength],
                  sessionOrBreak: "session"
                };
              }
            }
          });
        }
      }, 1000);
    }
  }
  setLength(event, name) {
    let value = event.target.value;
    let nameLength = name + "Length";
    let nameStatus = name + "Status";
    if (value === "") {
      this.setState({
        [nameLength]: 0,
        [nameStatus]: 0
      });
    } else {
      let intValue = parseInt(value, 10);
      if (intValue >= 1 && intValue <= 60) {
        this.setState({
          [nameLength]: intValue * 60,
          [nameStatus]: intValue * 60
        });
      }
    }
  }
  detectScrollDir(event) {
    let direction = false;
    if (event.deltaY < 0) direction = "plus";
    else if (event.deltaY > 0) direction = "minus";
    return direction;
  }
  timeArray(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    let minutesString, secondsString;
    if (minutes < 10) minutesString = "0" + minutes.toString();
    else minutesString = minutes.toString();
    if (seconds < 10) secondsString = "0" + seconds.toString();
    else secondsString = seconds.toString();
    return [minutes, seconds, minutesString, secondsString];
  }
  modify(name, sign) {
    if (this.state.stopped) {
      let nameLength = name + "Length";
      let nameStatus = name + "Status";
      if (sign === "plus") {
        this.setState(function (prevState) {
          if (prevState[nameLength] + 60 <= 3600)
            return {
              [nameLength]: prevState[nameLength] + 60,
              [nameStatus]: prevState[nameLength] + 60
            };
          else return prevState;
        });
      } else {
        this.setState(function (prevState) {
          if (prevState[nameLength] - 60 >= 60)
            return {
              [nameLength]: prevState[nameLength] - 60,
              [nameStatus]: prevState[nameLength] - 60
            };
          else return prevState;
        });
      }
    }
  }
  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      sessionOrBreak: "session",
      stopped: true
    });
  }
  pauseplay() {
    this.setState((prevState) => ({
      stopped: !prevState.stopped
    }));
  }
  render() {
    return (
      <div className="App container-fluid">
        <div
          id="clock"
          className="jumbotron shadow-lg"
          style={
            this.state.sessionOrBreak === "session"
              ? { backgroundColor: "#2e2157" }
              : { backgroundColor: "#574221" }
          }
        >
          <h1>Pomodoro Clock</h1>
          <div
            id="display"
            className={
              this.state.sessionOrBreak === "session"
                ? "alert alert-primary"
                : "alert alert-warning"
            }
          >
            <div id="reset" onClick={() => this.reset()}>
              <i className="fa fa-undo"></i>
            </div>
            <div>
              <h3 id="timer-label">
                {this.state.sessionOrBreak === "session"
                  ? "Session"
                  : this.state.sessionOrBreak === "break"
                  ? "Break"
                  : ""}
              </h3>
              <div id="time-left">
                {this.state.sessionOrBreak === "session" ? (
                  <span>
                    {this.timeArray(this.state.sessionStatus)[2]}:
                    {this.timeArray(this.state.sessionStatus)[3]}
                  </span>
                ) : (
                  <span>
                    {this.timeArray(this.state.breakStatus)[2]}:
                    {this.timeArray(this.state.breakStatus)[3]}
                  </span>
                )}
              </div>
            </div>
            <div id="start_stop" onClick={() => this.pauseplay()}>
              {this.state.stopped ? (
                <i className="fa fa-play"></i>
              ) : (
                <i className="fa fa-pause"></i>
              )}
            </div>
          </div>
          <div
            id="setup"
            style={this.state.stopped ? { color: "#EEE" } : { color: "#999" }}
          >
            <div
              className="m-3"
              id="session-setup"
              onWheel={(event) =>
                this.modify("session", this.detectScrollDir(event))
              }
            >
              <div id="session-label">Session Length</div>
              <div
                className="setupModifier"
                id="session-increment"
                onClick={() => this.modify("session", "plus")}
              >
                <i className="fa fa-arrow-up"></i>
              </div>
              <div>
                <input
                  className={
                    !this.state.stopped
                      ? "lengthInput alert alert-dark"
                      : this.state.sessionOrBreak === "session"
                      ? "lengthInput alert alert-primary"
                      : "lengthInput alert alert-warning"
                  }
                  id="session-length"
                  type="text"
                  value={this.timeArray(this.state.sessionLength)[0]}
                  onChange={(event) => this.setLength(event, "session")}
                  disabled={!this.state.stopped ? true : false}
                ></input>
              </div>
              <div
                className="setupModifier"
                id="session-decrement"
                onClick={() => this.modify("session", "minus")}
              >
                <i className="fa fa-arrow-down"></i>
              </div>
            </div>
            <div
              className="m-3"
              id="break-setup"
              onWheel={(event) =>
                this.modify("break", this.detectScrollDir(event))
              }
            >
              <div id="break-label">Break Length</div>
              <div
                className="setupModifier"
                id="break-increment"
                onClick={() => this.modify("break", "plus")}
              >
                <i className="fa fa-arrow-up"></i>
              </div>
              <input
                className={
                  !this.state.stopped
                    ? "lengthInput alert alert-dark"
                    : this.state.sessionOrBreak === "session"
                    ? "lengthInput alert alert-primary"
                    : "lengthInput alert alert-warning"
                }
                id="break-length"
                type="text"
                value={this.timeArray(this.state.breakLength)[0]}
                onChange={(event) => this.setLength(event, "break")}
                disabled={!this.state.stopped ? true : false}
              ></input>
              <div
                className="setupModifier"
                id="break-decrement"
                onClick={() => this.modify("break", "minus")}
              >
                <i className="fa fa-arrow-down"></i>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Pomodoro;
