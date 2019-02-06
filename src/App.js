import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";
import { Pillar } from "./Pillar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav>
          <Scene>
            <Avatar imgref="./logo.svg" />
            <Pillar />
          </Scene>
          <Scene />
        </Nav>
      </div>
    );
  }
}

export default App;
