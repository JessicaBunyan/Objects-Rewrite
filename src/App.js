import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";
import { Pillar } from "./Pillar";
import square from "./img/square.png";
import questionMark from "./img/questionman.png";
import { Button } from "./Button";
import { Inventory } from "./Inventory";
import { Var } from "./Var";
import { Parameter } from "./Parameter";
import _ from "underscore";
import { randInt } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inv: [],
      squareSize: 
    };
  }
  render() {
    return (
      <div className="App">
        <Inventory>
          {this.state.inv.map((item, index) => {
            return <Var key={index} value={item} />;
          })}
        </Inventory>

        <Nav>
          <Scene>
            <Avatar img={questionMark} />
            <Pillar onClick={() => this.addItemToInv(randInt(1, 10))} />
          </Scene>
          <Scene>
            <Avatar img={square} width={100 * this.state.squareSize} />
            <Pillar onClick={v => this.setState({ squareSize: v })}>
              <Parameter removeFromInv={v => this.removeItemFromInv(v)} />
            </Pillar>
          </Scene>
        </Nav>
      </div>
    );
  }

  addItemToInv(item) {
    console.log(this.state.inv);
    var newInv = this.state.inv;
    newInv.push(item);
    this.setState({ inv: newInv });
  }
  removeItemFromInv(val) {
    console.log("in remoev item rfom inv: " + val);
    console.log(this.state.inv);
    let newInv = this.state.inv;
    newInv = _.reject(newInv, i => i == val);
    this.setState({ inv: newInv });
  }
}

export default App;
