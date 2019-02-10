import React, { Component } from "react";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";
import { Pillar } from "./Pillar";
import square from "./img/grampasquare.png";
import questionMark from "./img/questionman.png";
import paintbrush from "./img/Paintbrush.png";
import paintSquiggle from "./img/paintsquiggle.png";
import { Parameter } from "./Parameter";
import _ from "underscore";
import { randInt, newVarId, calcColour } from "./utils";
import { TextBox } from "./TextBox";
import flags from "./storyFlags";

// var colour = {
//   id: 99999,
//   type: "colour",
//   value: [9, 4, 2]
// };

class Room1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScene: -1,

      squareSize: 0,
      bgColour: "#ffffff"
    };
  }

  renderScene1() {
    return (
      <Scene key={1}>
        <Pillar
          text="Get Number"
          onClick={() => this.props.addItemToInv(randInt(1, 9))}
        />
        <Avatar img={questionMark} imgClassName={"question-mark"} />
        <TextBox>
          <h2>
            <em>Numbers!</em>
          </h2>
          <h3>
            Get your <em>Numbers</em> here!
          </h3>
        </TextBox>
      </Scene>
    );
  }

  renderScene2Dialog() {
    var d1Class = "d1 ";
    var d2Class = "d2 size" + this.state.squareSize + " ";
    if (!this.props.storyFlags[flags.scene3Visible]) {
      d2Class += " hidden ";
    } else {
      d1Class += " hidden ";
    }

    return (
      <div className="text-box-region">
        <TextBox className={d1Class}>
          <h2>HELP!!!</h2>
          <h3>...</h3>
          <h3>
            I'm <em>TINY!!!</em>
          </h3>
          <h3>Can you help me out?</h3>
        </TextBox>
        <TextBox className={d2Class}>
          <h2>Much better!</h2>
          <h3>You're getting the hang of this!</h3>
        </TextBox>
      </div>
    );
  }

  renderScene2() {
    if (!this.props.storyFlags[flags.scene2Visible]) {
      return null;
    }

    var squareWidth = 0;
    if (this.state.squareSize == 0) {
      squareWidth = 20;
    } else {
      squareWidth = 100 + 20 * this.state.squareSize;
    }

    var dialog = this.renderScene2Dialog();

    return (
      <Scene key={2}>
        <Pillar
          text="Set Size"
          onClick={params => {
            this.setState({ squareSize: params[0].value });
            this.props.setStoryFlag(flags.scene3Visible);
          }}
        >
          <Parameter
            type="number"
            label="Size"
            removeFromInv={v => this.props.removeItemFromInv(v)}
          />
        </Pillar>
        <Avatar img={square} width={squareWidth} imgClassName={"square"} />
        {dialog}
      </Scene>
    );
  }

  renderScene3Dialog() {
    var d1Class = "d1 ";
    var d2Class = "d2 ";
    var d3Class = "d3 ";
    if (this.state.bgColour == "#ffffff") {
      d2Class += "hidden";
      d3Class += "hidden";
    } else {
      if (this.colourIsMatch(this.state.bgColour)) {
        d1Class += "hidden";
        d3Class += "hidden";
      } else {
        d1Class += "hidden";
        d2Class += "hidden";
      }
    }
    return (
      <div className="text-box-region">
        <TextBox className={d1Class}>
          <h2>Hey! Want to help me paint?</h2>
          <h3>
            My favourite colour is <em>purple</em>
          </h3>
        </TextBox>
        <TextBox className={d2Class}>woo yeah</TextBox>
        <TextBox className={d3Class}>That's not purple!!</TextBox>
      </div>
    );
  }

  renderScene3() {
    if (!this.props.storyFlags[flags.scene3Visible]) {
      return null;
    }
    var dialog = this.renderScene3Dialog();
    return (
      <Scene key={3} bgColour={this.state.bgColour} bgImage={paintSquiggle}>
        <Pillar
          text="Make Colour"
          onClick={params =>
            this.props.addItemToInv(_.map(params, p => p.value), "colour")
          }
        >
          <Parameter
            type="number"
            label="Red"
            removeFromInv={v => this.props.removeItemFromInv(v)}
          />
          <Parameter
            type="number"
            label="Green"
            removeFromInv={v => this.props.removeItemFromInv(v)}
          />
          <Parameter
            type="number"
            label="Blue"
            removeFromInv={v => this.props.removeItemFromInv(v)}
          />
        </Pillar>
        <Pillar
          text="Paint"
          onClick={c => this.setState({ bgColour: calcColour(c[0].value) })}
        >
          <Parameter
            type="colour"
            label="Colour"
            removeFromInv={v => this.props.removeItemFromInv(v)}
          />
        </Pillar>
        <Avatar img={paintbrush} imgClassName={"paintbrush"} />
        {dialog}
      </Scene>
    );
  }

  colourIsMatch(colour) {
    return true;
  }

  /**
   * returns an array of all scenes to be rendered, ignoring those which return null
   *  */
  renderScenes() {
    var renderers = [
      () => this.renderScene1(),
      () => this.renderScene2(),
      () => this.renderScene3()
    ];
    var scenes = [];

    renderers.forEach(renderFunc => {
      var scene = renderFunc();
      if (scene) {
        scenes.push(scene);
      }
    });

    return scenes;
  }

  render() {
    var scenes = this.renderScenes();

    return (
      <div className="room room1">
        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
        >
          {scenes}
        </Nav>
      </div>
    );
  }
}

export default Room1;
