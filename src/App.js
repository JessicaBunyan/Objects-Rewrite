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
  render() {
    return (
      <div className="App">
        <Inventory>
          <Var value="3" />
        </Inventory>

        <Nav>
          <Scene>
            <Avatar img={square} />
            <Pillar>
              <Button>
                <span>new</span>
              </Button>
            </Pillar>
          </Scene>
          <Scene />
        </Nav>
      </div>
    );
  }
}

export default App;
