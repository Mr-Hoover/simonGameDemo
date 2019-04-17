import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

const sound1 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
const sound2 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
const sound3 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
const sound4 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

//generate Simons first move
const first = Math.floor(Math.random() * 4 + 1);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blinkGreen: [],
      blinkRed: [],
      blinkYellow: [],
      blinkBlue: [],
      simonSequence: [first],
      userSequence: []
    };
  }

  //Start the Game (play Simons First Sequence)
  startGame = async () => {
    await this.setState({ simonSequence: [first] });
    this.blinkEach();
  };

  //generate Sions next move
  nextLevel = () => {
    const addSequence = this.state.simonSequence.slice();
    const newEntry = Math.floor(Math.random() * 4 + 1);
    addSequence.push(newEntry);
    this.setState({
      simonSequence: addSequence
    });
  };

  //Run each number of the sequence
  blinkEach = () => {
    this.state.simonSequence.map((item, index) => {
      setTimeout(() => {
        this.blinkCheck(item);
      }, index * 1000);
    });
  };
  //Make the Color Blink / play sound
  blinkCheck = item => {
    const blinkValue = 0.75;
    const blinkLength = 500;

    if (item == 1) {
      this.setState({
        blinkGreen: [blinkValue]
      });
      sound1.play();
      setTimeout(() => {
        this.setState({
          blinkGreen: []
        });
      }, blinkLength);
    } else if (item == 2) {
      this.setState({
        blinkRed: [blinkValue]
      });
      sound2.play();
      setTimeout(() => {
        this.setState({
          blinkRed: []
        });
      }, blinkLength);
    } else if (item == 3) {
      this.setState({
        blinkYellow: [blinkValue]
      });
      sound3.play();
      setTimeout(() => {
        this.setState({
          blinkYellow: []
        });
      }, blinkLength);
    } else if (item == 4) {
      this.setState({
        blinkBlue: [blinkValue]
      });
      sound4.play();
      setTimeout(() => {
        this.setState({
          blinkBlue: []
        });
      }, blinkLength);
    }
  };

  //User Click
  userClick = colorNum => {
    const addSequence = this.state.userSequence.slice();
    addSequence.push(colorNum);
    this.setState({
      userSequence: addSequence
    });
    this.blinkCheck(colorNum);
    setTimeout(() => {
      this.sequenceCheck();
    }, 500);
  };

  //Checking simonsSequence vs userSequence
  sequenceCheck = () => {
    const simon = this.state.simonSequence;
    const user = this.state.userSequence;
    //Sequence Wrong
    user.map((item, index) => {
      if (item !== simon[index]) {
        this.setState({
          userSequence: []
        });
        sound1.play();
        sound2.play();
        sound3.play();
      }
    });
    //Sequence Right
    if (simon.length === user.length) {
      this.setState({ userSequence: [] });
      setTimeout(() => {
        this.nextLevel();
        this.blinkEach();
      }, 500);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="Simon">
          <div className="Colors">
            <div
              className="Green"
              style={{ opacity: `${this.state.blinkGreen}` }}
              onClick={() => this.userClick(1)}
            />
            <div
              className="Red"
              style={{ opacity: `${this.state.blinkRed}` }}
              onClick={() => this.userClick(2)}
            />
            <div
              className="Yellow"
              style={{ opacity: `${this.state.blinkYellow}` }}
              onClick={() => this.userClick(3)}
            />
            <div
              className="Blue"
              style={{ opacity: `${this.state.blinkBlue}` }}
              onClick={() => this.userClick(4)}
            />
          </div>
          <div className="ControlPanel">
            <img
              className="Logo"
              src="https://static-asset-delivery.hasbroapps.com/5d395fc4f350191038d25e68a836a9422da9cde8/f5157f9173a103e2d3cb7747f3080681.png"
              height="50"
            />
            <div className="Display">
              <div className="Counter">{this.state.simonSequence.length}</div>
              <div className="Buttons">
                <div className="top">
                  <button onClick={() => this.startGame()} />
                  <p> START</p>
                </div>
                <div className="bottom">
                  <button onClick={() => this.blinkEach()} />
                  <p>REPLAY</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>Simon's Sequence :{this.state.simonSequence}</div>
        <div>User Sequence :{this.state.userSequence}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
