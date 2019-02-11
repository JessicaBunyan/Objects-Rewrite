import React, { Component } from "react";
import { Var } from "./Var";
import Room1 from "./Room1";
import { Inventory } from "./Inventory";
import flags from "./storyFlags";
import * as _ from "underscore";
import { newVarId, combineRenders } from "./utils";
import { Scene } from "./Scene";
import room1Preview from "./img/room1preview.png";
import { Room2 } from "./Room2";
import { Pillar } from "./Pillar";
import { Parameter } from "./Parameter";
import { Avatar } from "./Avatar";
import { Nav } from "./Nav";

var c = {
  id: 999,
  type: "colour",
  value: [9, 3, 9]
};

var sFlags = {};
sFlags[flags.room1Complete] = true;

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyFlags: sFlags,
      inv: [c],
      activeRoom: -1
      // inv: []
    };
  }

  render() {
    var inventory = this.renderInventory();

    var scenes = combineRenders(
      () => this.renderNav()
      // () => this.renderRoom1(),
      // () => this.renderRoom2()
    );

    return (
      <div className="Game">
        {inventory}
        {scenes}
      </div>
    );
  }

  renderNav() {
    return (
      <Nav
        setActiveScene={i => this.setState({ activeRoom: i })}
        activeScene={this.state.activeRoom}
      >
        {/* <Scene bgImage={room1Preview} hidden={this.state.activeRoom == 0} /> */}
        <Room1
          previewImg={room1Preview}
          key={0}
          storyFlags={this.state.storyFlags}
          addItemToInv={(v, type) => this.addItemToInv(v, type)}
          removeItemFromInv={vId => this.removeItemFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
          exitRoom={() => this.setState({ activeRoom: -1 })}
        />
        <Room2
          key={1}
          storyFlags={this.state.storyFlags}
          addItemToInv={(v, type) => this.addItemToInv(v, type)}
          removeItemFromInv={vId => this.removeItemFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
          exitRoom={() => this.setState({ activeRoom: -1 })}
        />

        <Scene
          key={3}
          active={this.state.activeRoom == 2}
          // onClick={() => this.setState({ activeRoom: 3 })}
          storyFlags={this.state.storyFlags}
          addItemToInv={(v, type) => this.addItemToInv(v, type)}
          removeItemFromInv={vId => this.removeItemFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
          deactivate={() => this.setState({ activeRoom: -1 })}
        >
          <Pillar text="Open">
            <Parameter />
            <Parameter />
            <Parameter />
          </Pillar>
          <Avatar imgClassName={"door"} />
          {/* <TextBox className={" d1 "}> */}
          {/* </TextBox> */}
        </Scene>
        {/* </div> */}
      </Nav>
    );
  }

  renderRoom1() {
    return (
      <Room1
        key={0}
        visible={this.state.activeRoom == 0}
        storyFlags={this.state.storyFlags}
        addItemToInv={(v, type) => this.addItemToInv(v, type)}
        removeItemFromInv={vId => this.removeItemFromInv(vId)}
        setStoryFlag={f => this.setStoryFlag(f)}
        exitRoom={() => this.setState({ activeRoom: -1 })}
      />
    );
  }
  renderRoom2() {
    return (
      <Room2
        key={1}
        visible={this.state.activeRoom == 1}
        storyFlags={this.state.storyFlags}
        addItemToInv={(v, type) => this.addItemToInv(v, type)}
        removeItemFromInv={vId => this.removeItemFromInv(vId)}
        setStoryFlag={f => this.setStoryFlag(f)}
        exitRoom={() => this.setState({ activeRoom: -1 })}
      />
    );
  }

  renderInventory() {
    return (
      <Inventory visible={this.state.storyFlags[flags.inventoryVisible]}>
        {this.state.inv.map((item, index) => {
          return <Var key={index} var={item} draggable={true} />;
        })}
      </Inventory>
    );
  }

  addItemToInv(item, type = "number") {
    console.log(this.state.inv);
    var id = newVarId();
    var variable = {
      id: id,
      type: type,
      value: item
    };

    var newInv = [...this.state.inv, variable];
    // newInv.push(variable);

    this.setState({ inv: newInv });

    setTimeout(() => {
      this.setStoryFlag(flags.inventoryVisible);
      this.setStoryFlag(flags.scene2Visible);
    }, 1); // timeout needed for css anmiations
  }
  removeItemFromInv(vId) {
    console.log("in remoev item rfom inv: " + vId);
    console.log(this.state.inv);
    let newInv = this.state.inv;
    newInv = _.reject(newInv, i => i.id == vId);
    this.setState({ inv: newInv });
  }
  setStoryFlag(flag) {
    var newFlags = { ...this.state.storyFlags };
    newFlags[flag] = true;

    this.setState({ storyFlags: newFlags });
  }
}
