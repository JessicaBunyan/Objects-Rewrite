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
import { Button } from "./Button";
import { Inventory } from "./Inventory";
import { Var } from "./Var";
import { Parameter } from "./Parameter";
import _ from "underscore";
import { randInt, newVarId } from "./utils";

var colour = {
  id: 99999,
  type: "colour",
  value: [9, 2, 9]
  // removeFromPrevLocation: () => this.removeItemFromInv(id)
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inv: [colour],
      squareSize: 1
    };
  }
  render() {
    return (
      <div className="App">
        <Inventory>
          {this.state.inv.map((item, index) => {
            return <Var key={index} var={item} draggable={true} />;
          })}
        </Inventory>

        <Nav>
          <Scene>
            <Avatar img={questionMark} />
            <Pillar onClick={() => this.addItemToInv(randInt(1, 10))} />
          </Scene>
          <Scene>
            <Avatar img={square} width={20 * this.state.squareSize} />
            <Pillar
              onClick={params => this.setState({ squareSize: params[0].value })}
            >
              <Parameter
                type="number"
                removeFromInv={v => this.removeItemFromInv(v)}
              />
            </Pillar>
          </Scene>

          <Scene>
            <Avatar img={paintbrush} />
            <Pillar onClick={params => this.addItemToInv(params, "colour")}>
              <Parameter
                type="number"
                removeFromInv={v => this.removeItemFromInv(v)}
              />
              <Parameter
                type="number"
                removeFromInv={v => this.removeItemFromInv(v)}
              />
              <Parameter
                type="number"
                removeFromInv={v => this.removeItemFromInv(v)}
              />
            </Pillar>
          </Scene>
        </Nav>
      </div>
    );
  }

  addItemToInv(item, type = "number") {
    console.log(this.state.inv);
    var newInv = this.state.inv;
    var id = newVarId();
    var variable = {
      id: id,
      type: type,
      value: item
      // removeFromPrevLocation: () => this.removeItemFromInv(id)
    };
    newInv.push(variable);
    this.setState({ inv: newInv });
  }
  removeItemFromInv(vId) {
    console.log("in remoev item rfom inv: " + vId);
    console.log(this.state.inv);
    let newInv = this.state.inv;
    newInv = _.reject(newInv, i => i.id == vId);
    this.setState({ inv: newInv });
  }
}

export default App;
