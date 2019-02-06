import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/index.css";
import { Scene } from "./Scene";
import { Nav } from "./Nav";
import { Avatar } from "./Avatar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav>
          <Scene>
            <Avatar imgref="./logo.svg" />
          </Scene>
          <Scene />
        </Nav>
      </div>
    );
  }
}

export default App;
