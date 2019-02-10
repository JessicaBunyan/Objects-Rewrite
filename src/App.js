import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";
import Room1 from "./Room1";
import { Inventory } from "./Inventory";
import flags from "./storyFlags";
import * as _ from "underscore";
import { newVarId } from "./utils";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyFlags: {},
      inv: []
    };
  }

  render() {
    var inventory = this.renderInventory();
    return (
      <div className="App">
        {inventory}
        <Room1
          storyFlags={this.state.storyFlags}
          inv={this.state.inv}
          addItemToInv={(v, type) => this.addItemToInv(v, type)}
          removeItemFromInv={vId => this.removeItemFromInv(vId)}
          setStoryFlag={f => this.setStoryFlag(f)}
        />
      </div>
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
