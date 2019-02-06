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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inv: []
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
            <Pillar onClick={() => this.addItemToInv(2)} />
          </Scene>
          <Scene>
            <Avatar img={square} />
            <Pillar onClick={v => this.setState({ squareSize: v })}>
              <Parameter />
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
}

export default App;
