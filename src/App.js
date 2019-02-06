import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";
import { Pillar } from "./Pillar";
import square from "./img/square.png";
import { Button } from "./Button";
import { Inventory } from "./Inventory";
import { Var } from "./Var";

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
            <Avatar img={square} />
            <Pillar>
              <Button onClick={() => this.addItemToInv(2)}>
                <span>new</span>
              </Button>
            </Pillar>
          </Scene>
          <Scene />
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
