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
      // inv: [colour],
      invVisible: false,
      inv: [],
      squareSize: 1,
      bgColour: "#ffffff"
    };
  }
  render() {
    return (
      <div className="App">
        <Inventory visible={this.state.invVisible}>
          {this.state.inv.map((item, index) => {
            return <Var key={index} var={item} draggable={true} />;
          })}
        </Inventory>

        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
        >
          <Scene>
            <Pillar
              text="Get Number"
              onClick={() => this.addItemToInv(randInt(1, 10))}
            />
            <Avatar img={questionMark} imgClassName={"question-mark"} />
            <TextBox text={"lipsum"} />
          </Scene>
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
      // removeFromPrevLocation: () => this.removeItemFromInv(id)
    };
    var newInv = [...this.state.inv, variable];
    // newInv.push(variable);

    this.setState({ inv: newInv });
    setTimeout(() => {
      this.setState({ invVisible: true });
    }, 1);
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
