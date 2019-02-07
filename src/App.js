import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";
import { Pillar } from "./Pillar";
import square from "./img/square.png";
import questionMark from "./img/questionman.png";
import paintbrush from "./img/Paintbrush.png";
import paintSquiggle from "./img/paintsquiggle.png";
import { Button } from "./Button";
import { Inventory } from "./Inventory";
import { Var } from "./Var";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScene: -1,
      storyFlags: {},
      inv: [],
      squareSize: 1,
      bgColour: "#ffffff"
    };
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

  renderScene1() {
    return (
      <Scene>
        <Pillar
          text="Get Number"
          onClick={() => this.addItemToInv(randInt(1, 10))}
        />
        <Avatar img={questionMark} imgClassName={"question-mark"} />
        <TextBox text={"lipsum"} />
      </Scene>
    );
  }

  renderScene2() {
    return (
      <Scene>
        <Pillar
          text="Set Size"
          onClick={params => this.setState({ squareSize: params[0].value })}
        >
          <Parameter
            type="number"
            label="Size"
            removeFromInv={v => this.removeItemFromInv(v)}
          />
        </Pillar>
        <Avatar
          img={square}
          width={20 * this.state.squareSize}
          imgClassName={"square"}
        />
      </Scene>
    );
  }

  renderScene3() {
    return (
      <Scene bgColour={this.state.bgColour} bgImage={paintSquiggle}>
        <Pillar
          text="Make Colour"
          onClick={params =>
            this.addItemToInv(_.map(params, p => p.value), "colour")
          }
        >
          <Parameter
            type="number"
            label="Red"
            removeFromInv={v => this.removeItemFromInv(v)}
          />
          <Parameter
            type="number"
            label="Green"
            removeFromInv={v => this.removeItemFromInv(v)}
          />
          <Parameter
            type="number"
            label="Blue"
            removeFromInv={v => this.removeItemFromInv(v)}
          />
        </Pillar>
        <Pillar
          text="Paint"
          onClick={c => this.setState({ bgColour: calcColour(c[0].value) })}
        >
          <Parameter
            type="colour"
            label="Colour"
            removeFromInv={v => this.removeItemFromInv(v)}
          />
        </Pillar>
        <Avatar img={paintbrush} imgClassName={"paintbrush"} />
      </Scene>
    );
  }

  render() {
    var inventory = this.renderInventory();
    var scene1 = this.renderScene1();
    var scene2 = this.renderScene2();
    var scene3 = this.renderScene3();

    return (
      <div className="App">
        {inventory}

        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
        >
          {scene1}
          {scene2}
          {scene3}
        </Nav>
      </div>
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

export default App;
