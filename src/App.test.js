import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { assert } from "mocha";
import { hexToRgb } from "./utils";

it("hexToRGB isCorrect - white", () => {
  var res = hexToRgb("#ffffff");
  expect(res.r).toEqual(255);
  expect(res.g).toEqual(255);
  expect(res.b).toEqual(255);
});

it("hexToRGB isCorrect - purple", () => {
  var res = hexToRgb("#9400D3");
  expect(res.r).toEqual(148);
  expect(res.g).toEqual(0);
  expect(res.b).toEqual(211);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
