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
import {
  randInt,
  newVarId,
  calcColour,
  combineRenders,
  hexToRgb,
  isColourPurple
} from "./utils";
import { TextBox } from "./TextBox";
import flags from "./storyFlags";
import SceneFooter from "./SceneFooter";
import { Dial } from "./Dial";
import { MethodGroup } from "./MethodGroup";

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
    var pillars;
    if (this.props.storyFlags[flags.numberDialUnlocked]) {
      pillars = (
        <Pillar
          text="Get Number"
          onClick={p => this.props.addItemsToInv({ value: p, type: "number" })}
          dialValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
      );
    } else {
      pillars = (
        <Pillar
          text="Get Number"
          onClick={() =>
            this.props.addItemsToInv({ value: randInt(1, 9), type: "number" })
          }
        />
      );
    }

    return (
      <Scene key={1}>
        <MethodGroup>{pillars}</MethodGroup>
        <Avatar img={questionMark} imgClassName={"question-mark"} />
        <TextBox className={" d1 "}>
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
        <MethodGroup removeFromInv={this.props.removeFromInv}>
          <Pillar
            text="Set Size"
            onClick={params => {
              this.setState({ squareSize: params[0].value });
              this.props.setStoryFlag(flags.scene3Visible);
            }}
            params={[{ label: "Size", type: "number" }]}
          />
        </MethodGroup>
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
      if (isColourPurple(this.state.bgColour)) {
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
        <TextBox className={d2Class}>
          <h2>Woo Yeah!</h2>
          <h3>Now we're cooking!</h3>
        </TextBox>
        <TextBox className={d3Class}>
          <h2>????</h2>
          <h3>That doesn't look very purple to me...</h3>
        </TextBox>
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
        <MethodGroup removeFromInv={v => this.props.removeFromInv(v)}>
          <Pillar
            text="Make Colour"
            onClick={params =>
              this.props.addItemsToInv({
                value: _.map(params, p => p.value),
                type: "colour"
              })
            }
            params={[
              { type: "number", label: "Red" },
              { type: "number", label: "Green" },
              { type: "number", label: "Blue" }
            ]}
          />
          <Pillar
            text="Paint"
            onClick={c => this.paintScene3(c[0].value)}
            params={[{ type: "colour", label: "Colour" }]}
          />
        </MethodGroup>
        <Avatar img={paintbrush} imgClassName={"paintbrush"} />
        {dialog}
      </Scene>
    );
  }

  paintScene3(c) {
    var colour = calcColour(c);
    this.setState({ bgColour: colour });
    if (isColourPurple(colour)) {
      this.props.setStoryFlag(flags.room1Complete);
    }
  }

  render() {
    var scenes = combineRenders(
      () => this.renderScene1(),
      () => this.renderScene2(),
      () => this.renderScene3()
    );

    var footer = this.props.storyFlags[flags.room1Complete] ? (
      <SceneFooter action={this.props.deactivate} />
    ) : null;

    var cName = "room room1 scene";
    if (this.props.active) {
      cName += " active";
    }
    return (
      <div className={cName} onClick={() => this.props.onClick()}>
        <img className="preview" src={this.props.previewImg} />
        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
          active={this.props.active}
        >
          {scenes}
        </Nav>
        {footer}
      </div>
    );
  }
}

export default Room1;
