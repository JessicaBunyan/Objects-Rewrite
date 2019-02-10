import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Inventory } from "../Inventory";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Scene } from "./../Scene";

configure({ adapter: new Adapter() });

it("Inventory is empty", () => {
  const div = document.createElement("div");

  var app = mount(<App />);
  var inv = app.find(".inventory").first();

  var invChildren = inv.children();
  expect(invChildren).toHaveLength(0);

  ReactDOM.unmountComponentAtNode(div);
});

it("Story flags are unset, 1 scene visible", () => {
  const div = document.createElement("div");

  var app = mount(<App />);
  var nav = app.find(".nav-scene").first();

  var childScenes = nav.children(Scene);

  expect(childScenes).toHaveLength(1);
});
