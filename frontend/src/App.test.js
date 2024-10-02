import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mocking child components
jest.mock("./components/Dashboard/TopToolbar", () => ({ addFxPair }) => (
  <div>
    <button onClick={() => addFxPair("USD", "EUR")}>Add FX Pair</button>
    TopToolbar
  </div>
));

describe("App Component", () => {
  test("renders App component and its main parts", () => {
    render(<App />);

    // Check if the child components render
    expect(screen.getByText("TopToolbar")).toBeInTheDocument();
  });
});
