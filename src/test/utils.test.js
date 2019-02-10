import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { hexToRgb } from "../utils";
import { calcColour } from "./../utils";
import { isColourPurple } from "./../utils";

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

it("colourIsPurple gives correct answers", () => {
  //not purples
  expect(isColourPurple("#aaaaaa")).toEqual(false);
  expect(isColourPurple("#ffffff")).toEqual(false);
  expect(isColourPurple("#000000")).toEqual(false);
  expect(isColourPurple("#00FF00")).toEqual(false);
  expect(isColourPurple("#11BB22")).toEqual(false);
  expect(isColourPurple("#bbccbb")).toEqual(false);
  expect(isColourPurple("#bbaabb")).toEqual(false);

  //purples
  expect(isColourPurple("#aa00aa")).toEqual(true);
  expect(isColourPurple("#4b0082")).toEqual(true);
  expect(isColourPurple("#e6e6fa")).toEqual(true);
  expect(isColourPurple("#DDA0DD")).toEqual(true);
  expect(isColourPurple("#9370Db")).toEqual(true);
  expect(isColourPurple("#800080")).toEqual(true);
  expect(isColourPurple("#da70d6")).toEqual(true);
});

it("calcColour isCorrect ", () => {
  var res = calcColour([1, 1, 1]);
  expect(res).toEqual("#191919");
});
