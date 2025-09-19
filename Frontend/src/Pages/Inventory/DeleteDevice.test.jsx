import { render, screen, fireEvent } from "@testing-library/react";
import DeleteDevice from "./DeleteDevice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Helper to wrap component with routing context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("DeleteDevice Component", () => {

  // 1️⃣ Test: Heading and dropdown render correctly
  test("renders Delete Device heading and dropdown", () => {
    renderWithRouter(<DeleteDevice />);
    
    // Target the heading specifically
    const heading = screen.getByRole("heading", { name: /Delete Device/i });
    expect(heading).toBeInTheDocument();

    // Target the dropdown
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    });


  // 2️⃣ Test: Default option is shown in dropdown
  test("shows default option in dropdown", () => {
    renderWithRouter(<DeleteDevice />);
    expect(screen.getByText(/-- Select a device --/i)).toBeInTheDocument();
  });

  // 3️⃣ Test: Delete button is disabled initially
  test("delete button is disabled when no device is selected", () => {
    renderWithRouter(<DeleteDevice />);
    const button = screen.getByRole("button", { name: /Delete Device/i });
    expect(button).toBeDisabled();
  });

  // 4️⃣ Test: Delete button becomes enabled after selecting a device
  test("delete button is enabled after selecting a device", async () => {
    // Mock fetch to return one device
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { _id: "1", componentName: "Device1", isDeleted: false }
        ]),
      })
    );

    renderWithRouter(<DeleteDevice />);
    const dropdown = await screen.findByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "1" } });

    const button = screen.getByRole("button", { name: /Delete Device/i });
    expect(button).not.toBeDisabled();
  });

  // 5️⃣ Test: Shows toast on successful delete
  test("shows success toast after deleting a device", async () => {
    // First fetch returns device list
    global.fetch = vi.fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { _id: "1", componentName: "Device1", isDeleted: false }
          ]),
        })
      )
      // Second fetch simulates successful soft-delete
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );

    renderWithRouter(<DeleteDevice />);
    const dropdown = await screen.findByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "1" } });

    const button = screen.getByRole("button", { name: /Delete Device/i });
    fireEvent.click(button);

    const toast = await screen.findByText(/Device soft-deleted successfully/i);
    expect(toast).toBeInTheDocument();
  });

});
