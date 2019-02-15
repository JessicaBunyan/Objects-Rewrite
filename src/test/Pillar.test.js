import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Inventory } from "../Inventory";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Scene } from "./../Scene";
import { Pillar } from "./../Pillar";

configure({ adapter: new Adapter() });

it("pillar with no params executes onClick", () => {
  var result;
  var pillar = mount(<Pillar onClick={() => (result = "clicked")} />);

  pillar.find(".button").simulate("click");

  expect(result).toEqual("clicked");
});

it("pillar with missing param won't execute on click", () => {
  var result = "unclicked";
  var pillar = mount(
    <Pillar
      onClick={() => (result = "success")}
      params={[{ label: "foo", type: "number" }]}
    />
  );

  pillar.find(".button").simulate("click");

  expect(result).toEqual("unclicked");
});

it("pillar with present params executes onClick", () => {
  var result;
  var pillar = mount(
    <Pillar
      onClick={() => (result = "clicked")}
      params={[{ label: "foo", type: "number" }]}
    />
  );

  pillar.setState({ paramValues: [2] });

  pillar.find(".button").simulate("click");

  expect(result).toEqual("clicked");
});
