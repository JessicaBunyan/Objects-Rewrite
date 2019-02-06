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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inv: [],
      squareSize: 1
    };
  }
  render() {
    return (
      <div className="App">
        <Inventory>
          {this.state.inv.map((item, index) => {
            return <Var key={index} var={item} />;
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
    var variable = {
      id: newVarId(),
      type: type,
      value: item
    };
    newInv.push(variable);
    this.setState({ inv: newInv });
  }
  removeItemFromInv(v) {
    console.log("in remoev item rfom inv: " + v);
    console.log(this.state.inv);
    let newInv = this.state.inv;
    newInv = _.reject(newInv, i => i.id == v.id);
    this.setState({ inv: newInv });
  }
}

export default App;
