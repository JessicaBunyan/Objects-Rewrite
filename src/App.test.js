import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { assert } from "mocha";

describe("test test", () => {
  it("returns value", () => {
    assert.equal(true, true);
  });
});

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
