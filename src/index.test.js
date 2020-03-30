import ReactDOM from "react-dom";
import React from "react";
import Index from "./index.js";
import App from "./App.js";
jest.mock("react-dom", () => ({ render: jest.fn() }));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  global.document.getElementById = id => id === "root" && div;
  expect(ReactDOM.render).toBeCalled();
});

it("renders without crashing", () => {
  expect(
    JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: "censored" })
    )
  ).toMatchSnapshot();
});
