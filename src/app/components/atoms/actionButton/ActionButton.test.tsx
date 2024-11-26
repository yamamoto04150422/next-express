import { render, screen } from "@testing-library/react";
import ActionButton from "./ActionButton";
import userEvent from "@testing-library/user-event";

describe("ActionButton Component", () => {
  it("should render the button with the correct text", () => {
    // Render the component
    render(<ActionButton />);

    // Assert that the button is in the document and has the correct text
    const buttonElement = screen.getByRole("button", { name: /test/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call the onClick handler when clicked", async () => {
    // Mock the click handler
    const mockClickHandler = jest.fn();

    // Modify the component to accept an onClick prop
    render(<ActionButton onClick={mockClickHandler} />);

    // Simulate a click event
    const buttonElement = screen.getByRole("button", { name: /test/i });
    await userEvent.click(buttonElement);

    // Assert the handler was called
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
