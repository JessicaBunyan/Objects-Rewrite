import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { hexToRgb } from "../utils";
import { calcColour } from "./../utils";

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

it("calcColour isCorrect ", () => {
  var res = calcColour([1, 1, 1]);
  expect(res).toEqual("#191919");
});
