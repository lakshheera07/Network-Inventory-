import { render, screen, fireEvent } from "@testing-library/react";
import AddDevice from "./AddDevice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'; // Enables matchers like toBeInTheDocument, toBeEnabled
import { vi } from 'vitest'; // Vitest's mocking utility

// Helper to wrap component with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("AddDevice Component", () => {

  // 1️⃣ Test: Heading is rendered
  test("renders Add Devices heading", () => {
    renderWithRouter(<AddDevice />);
    const heading = screen.getByText(/Add Devices/i);
    expect(heading).toBeInTheDocument();
  });

  // 2️⃣ Test: Scan button is enabled
  test("scan button is clickable", () => {
    renderWithRouter(<AddDevice />);
    const button = screen.getByText(/Scan Devices/i);
    expect(button).toBeEnabled();
  });

  // 3️⃣ Test: Shows 'No devices found' when scan returns empty list
  test("shows 'No devices found' after empty scan", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]), // Simulate empty scan result
      })
    );

    renderWithRouter(<AddDevice />);
    const button = screen.getByText(/Scan Devices/i);
    fireEvent.click(button);

    const message = await screen.findByText(/No devices found/i);
    expect(message).toBeInTheDocument();
  });

  // 4️⃣ Test: Toast appears on scan failure
  test("shows toast on scan failure", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    renderWithRouter(<AddDevice />);
    const button = screen.getByText(/Scan Devices/i);
    fireEvent.click(button);

    const toast = await screen.findByText(/Scan failed/i);
    expect(toast).toBeInTheDocument();
  });

  // 5️⃣ Test: Add All Devices button appears after successful scan
  test("shows Add All Devices button after scan", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ ip: "192.168.1.1", hostname: "Device1" }]),
      })
    );

    renderWithRouter(<AddDevice />);
    const button = screen.getByText(/Scan Devices/i);
    fireEvent.click(button);

    const addAllButton = await screen.findByText(/Add All Devices/i);
    expect(addAllButton).toBeInTheDocument();
  });

});
