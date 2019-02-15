import React, { Component } from "react";
import SceneFooter from "./SceneFooter";
import { Nav } from "./Nav";
import { combineRenders } from "./utils";
import flags from "./storyFlags";
import { Pillar } from "./Pillar";
import { Avatar } from "./Avatar";
import { Scene } from "./Scene";
import { TextBox } from "./TextBox";
import { Parameter } from "./Parameter";
import { MethodGroup } from "./MethodGroup";

export class Room2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScene: -1
    };
  }

  renderScene1() {
    return (
      <Scene key={1}>
        <MethodGroup removeFromInv={this.props.removeFromInv}>
          <Pillar
            text="Get String"
            onClick={() =>
              this.props.addItemsToInv({ value: "foo", type: "string" })
            }
          />
        </MethodGroup>
        <Avatar imgClassName={"question-mark"} />
        <TextBox className={" d1 "}>
          <h2>
            <em>TEST</em>
          </h2>
          <h3>
            Get your <em>Strings</em> here!
          </h3>
        </TextBox>
      </Scene>
    );
  }

  renderScene2() {
    return (
      <Scene key={2}>
        <MethodGroup removeFromInv={this.props.removeFromInv}>
          <Pillar
            text="Combine"
            onClick={params =>
              this.props.addItemsToInv({
                value: params[0].value + params[1].value,
                type: "string"
              })
            }
            params={[
              { label: "String 1", type: "string" },
              { label: "String 2", type: "string" }
            ]}
          />
          <Pillar
            text="To String"
            onClick={params =>
              this.props.addItemsToInv({
                value: params[0].value,
                type: "string"
              })
            }
            params={[{ label: "Number", type: "number" }]}
          />
          <Pillar
            text="Split"
            onClick={params => this.splitString(params)}
            params={[
              { label: "String", type: "string" },
              { label: "Position", type: "number" }
            ]}
          />
        </MethodGroup>
      </Scene>
    );
  }

  splitString(params) {
    var s = params[0].value;
    var pos = params[1].value;

    var p1 = s.substring(0, pos);
    var p2 = s.substring(pos);

    this.props.addItemsToInv([
      { value: p1, type: "string" },
      { value: p2, type: "string" }
    ]);
  }

  render() {
    var scenes = combineRenders(
      () => this.renderScene1(),
      () => this.renderScene2()
    );
    //   () => this.renderScene3()

    var footer = <SceneFooter action={this.props.deactivate} />;

    var cName = "room room2 scene ";
    if (this.props.active) {
      cName += " active";
    }

    return (
      <div className={cName} onClick={() => this.props.onClick()}>
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
