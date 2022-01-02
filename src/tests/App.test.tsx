import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React from "react";

// Declaring the app container
let container: HTMLElement;
describe("App rendering tests", () => {
  beforeEach(() => {
    const app = render(<App />);
    container = app.container;
  });

  afterEach(() => {
    // clear session cache after each test
    localStorage.clear();
  });

  test("initial render", () => {
    // Checks that vital elements are there on first render
    const header = screen.getByText(/cantdecide.io/i);
    expect(header).toBeInTheDocument();
    const editButton = screen.getByText(/Edit Factors/i);
    expect(editButton).toBeInTheDocument();
    const choiceInput = screen.getByPlaceholderText(/Enter a new choice here/i);
    expect(choiceInput).toBeInTheDocument();
    expect(choiceInput).toHaveAttribute("value", "");
  });

  test("write in choice input", () => {
    // Checks that writing in choice input updates value
    const choiceInput = screen.getByPlaceholderText(/Enter a new choice here/i);
    fireEvent.change(choiceInput, { target: { value: "Choice 1" } });
    expect(choiceInput).toHaveAttribute("value", "Choice 1");
  });

  test("submit choice input", () => {
    // Checks that submitting choice input renders a new choice
    const choiceList = container.querySelector("section#choice-list ul");
    // Makes sure the choice list is empty upon initial render
    expect(choiceList).toBeEmptyDOMElement();
    const choiceInput = screen.getByPlaceholderText(/Enter a new choice here/i);
    fireEvent.change(choiceInput, { target: { value: "Choice 1" } });
    fireEvent.keyPress(choiceInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(choiceInput).toHaveAttribute("value", "");
    // Makes sure the ul element has an element inserted in it
    expect(choiceList).not.toBeEmptyDOMElement();
  });

  test("submit empty choice error", () => {
    // Makes sure that empty choice submissions return an error message
    // and doesn't add anything to the choice list
    const choiceList = container.querySelector("section#choice-list ul");
    const choiceInput = screen.getByPlaceholderText(/Enter a new choice here/i);
    fireEvent.keyPress(choiceInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(choiceList).toBeEmptyDOMElement();
  });
});
