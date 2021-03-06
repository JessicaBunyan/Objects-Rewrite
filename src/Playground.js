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
import door from "./img/door.png";
import { MethodGroup } from "./MethodGroup";
import { Room3 } from "./Room3";

var c = {
  id: 999,
  type: "colour",
  value: [9, 3, 9]
};

var sFlags = {};
sFlags[flags.room1Complete] = true;

export class Playground extends Component {
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

    var scenes = combineRenders(() => this.renderNav());

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
        key={0}
        setActiveScene={i => this.setState({ activeRoom: i })}
        activeScene={this.state.activeRoom}
        active={true}
      >
        <Room1
          previewImg={room1Preview}
          key={0}
          storyFlags={this.state.storyFlags}
          addItemsToInv={items => this.addItemsToInv(items)}
          removeFromInv={vId => this.removeFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
        />
        <Room2
          key={1}
          storyFlags={this.state.storyFlags}
          addItemsToInv={items => this.addItemsToInv(items)}
          removeFromInv={vId => this.removeFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
        />
        <Room3
          key={2}
          storyFlags={this.state.storyFlags}
          addItemsToInv={items => this.addItemsToInv(items)}
          removeFromInv={vId => this.removeFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
        />

        <Scene
          key={3}
          active={this.state.activeRoom == 2}
          storyFlags={this.state.storyFlags}
          addItemsToInv={items => this.addItemsToInv(items)}
          removeFromInv={vId => this.removeFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
        >
          <MethodGroup removeFromInv={v => this.removeFromInv(v)}>
            <Pillar
              text="Open"
              onClick={params => this.tryOpenDoor(params)}
              params={[{ type: "string", label: "Password" }]}
            />
          </MethodGroup>
          <Avatar className="av-door" imgClassName={"door"} img={door} />
        </Scene>
      </Nav>
    );
  }

  tryOpenDoor(params) {
    console.log("door open tried with params: ");
    console.log(params);

    if ((params[0].value = "foobar")) {
      this.setStoryFlag(flags.playgroundComplete);
    }
  }

  renderInventory() {
    return (
      <Inventory
        key={0}
        visible={this.state.storyFlags[flags.inventoryVisible]}
      >
        {this.state.inv.map((item, index) => {
          return <Var key={index} var={item} draggable={true} />;
        })}
      </Inventory>
    );
  }

  addItemsToInv(items) {
    if (!Array.isArray(items)) {
      items = [items];
    }
    var newVars = [];
    items.forEach(item => {
      var id = newVarId();
      var variable = {
        id: id,
        type: item.type,
        value: item.value
      };
      newVars.push(variable);
    });
    var newInv = [...this.state.inv, ...newVars];

    this.setState({ inv: newInv });

    setTimeout(() => {
      this.setStoryFlag(flags.inventoryVisible);
      this.setStoryFlag(flags.scene2Visible);
    }, 1); // timeout needed for css anmiations
  }
  removeFromInv(vId) {
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
