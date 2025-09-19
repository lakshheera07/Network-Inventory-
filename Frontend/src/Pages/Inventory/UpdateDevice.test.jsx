import { render, screen, fireEvent } from "@testing-library/react";
import UpdateDevice from "./UpdateDevice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Helper to wrap the component with routing context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("UpdateDevice Component", () => {

  // 1️⃣ Check if heading is rendered
  test("renders Update Device heading", () => {
    renderWithRouter(<UpdateDevice />);
    const heading = screen.getByText(/Update Device/i);
    expect(heading).toBeInTheDocument();
  });

  // 2️⃣ Check if dropdown is present
  test("device dropdown is present", () => {
    renderWithRouter(<UpdateDevice />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
  });

  // 3️⃣ Check if default option is shown
  test("dropdown has default option", () => {
    renderWithRouter(<UpdateDevice />);
    const defaultOption = screen.getByText(/-- Select a device --/i);
    expect(defaultOption).toBeInTheDocument();
  });

  // 4️⃣ Form should not render initially
  test("form does not render initially", () => {
    renderWithRouter(<UpdateDevice />);
    const formInput = screen.queryByLabelText(/Component Name/i);
    expect(formInput).not.toBeInTheDocument();
    });


  // 5️⃣ Show toast when no changes are detected
  test("shows error when IP address is invalid", async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { _id: "1", componentName: "Device1", ip: "invalid-ip" }
        ]),
        })
    );

    renderWithRouter(<UpdateDevice />);
    const dropdown = await screen.findByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "1" } });

    const button = screen.getByRole("button", { name: /Update Device/i });
    fireEvent.click(button);

    const error = await screen.findByText(/Invalid IP Address/i);
    expect(error).toBeInTheDocument();
    });

});
