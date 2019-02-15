import React from "react";
import renderer from "react-test-renderer";
import { TextBox } from "../TextBox";
import { Scene } from "../Scene";
import SceneFooter from "./../SceneFooter";
import { Button } from "./../Button";

it("TextBox renders correctly", () => {
  const tree = renderer
    .create(
      <TextBox className="d1">
        <h2>Test</h2>
        <h3>textbox</h3>
      </TextBox>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("SceneFooter renders correctly", () => {
  const tree = renderer
    .create(
      <SceneFooter
        onClick={() => {
          return;
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button no activity renders correctly", () => {
  const tree = renderer
    .create(
      <Button
        onClick={() => {
          return;
        }}
      >
        <h2>text</h2>
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button pressed renders correctly", () => {
  const tree = renderer
    .create(
      <Button
        onClick={() => {
          return;
        }}
        pressed={true}
      >
        <h2>text</h2>
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button failpressed renders correctly", () => {
  const tree = renderer
    .create(
      <Button
        onClick={() => {
          return;
        }}
        failPressed={true}
      >
        <h2>text</h2>
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
