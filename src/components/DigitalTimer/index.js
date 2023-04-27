import {Component} from 'react'
import './index.css'

const intialState = {timeinMinutes: 25, elapsedSeconds: 0, isRunning: false}

class DigitalTimer extends Component {
  state = intialState

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  decrementMinutes = () => {
    const {timeinMinutes} = this.state
    if (timeinMinutes > 1) {
      this.setState(prevState => ({
        timeinMinutes: prevState.timeinMinutes - 1,
      }))
    }
  }

  incrementMinutes = () => {
    this.setState(prevState => ({
      timeinMinutes: prevState.timeinMinutes + 1,
    }))
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState(intialState)
  }

  onlapaseseconds = () => {
    const {timeinMinutes, elapsedSeconds} = this.state
    const timeCompleted = elapsedSeconds === timeinMinutes * 60
    if (timeCompleted) {
      clearInterval(this.intervalId)
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
      }))
    }
  }

  onstartpause = () => {
    const {isRunning} = this.state

    if (isRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.onlapaseseconds, 1000)
    }
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  renderTimeLimitController() {
    const {timeinMinutes, elapsedSeconds} = this.state
    const isDisbaled = elapsedSeconds > 0
    return (
      <div className="setTimeContainer">
        <p className="setTime-heading">Set Timer Limit</p>
        <div className="limit-controller-container">
          <button
            disabled={isDisbaled}
            className="decrementMinutes"
            type="button"
            onClick={this.decrementMinutes}
          >
            -
          </button>
          <p className="timeSet">{timeinMinutes}</p>

          <button
            disabled={isDisbaled}
            className="incrementMinutes"
            type="button"
            onClick={this.incrementMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimecontrol() {
    const {isRunning} = this.state
    const startPauseImageUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPausetext = isRunning ? 'Pause' : 'Start'
    const altValue = isRunning ? 'pause icon' : 'play icon'

    return (
      <div className="time-controller">
        <button
          className="start-pause-button"
          type="button"
          onClick={this.onstartpause}
        >
          <img
            src={startPauseImageUrl}
            alt={altValue}
            className="start-pause-reset-image"
          />
          <p className="start-pause-reset-text">{startPausetext}</p>
        </button>
        <button
          className="start-pause-button"
          type="button"
          onClick={this.onReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="start-pause-reset-image"
          />
          <p className="start-pause-reset-text">Reset</p>
        </button>
      </div>
    )
  }

  render() {
    const {timeinMinutes, elapsedSeconds, isRunning} = this.state
    const totalSeconds = timeinMinutes * 60 - elapsedSeconds
    const minutesShow = Math.floor(totalSeconds / 60)
    const secondsShow = Math.floor(totalSeconds % 60)
    const minutes = minutesShow > 9 ? minutesShow : `0${minutesShow}`
    const seconds = secondsShow > 9 ? secondsShow : `0${secondsShow}`

    return (
      <div className="container">
        <div className="timer-container">
          <h1 className="main-heading">Digital Timer</h1>
          <div className="timer-controller-container">
            <div className="time-running-container">
              <div className="time-state-container">
                <h1 className="time">
                  {minutes}:{seconds}
                </h1>
                <p className="status">{isRunning ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="timer-contrller">
              {this.renderTimecontrol()}
              {this.renderTimeLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
