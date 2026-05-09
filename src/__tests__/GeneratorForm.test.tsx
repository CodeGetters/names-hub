import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import GeneratorForm from "@/components/generator/GeneratorForm";
import { renderWithIntl } from "./test-utils";

describe("GeneratorForm", () => {
  it("renders gender selection options", () => {
    renderWithIntl(<GeneratorForm />);
    expect(screen.getByText("Boy")).toBeInTheDocument();
    expect(screen.getByText("Girl")).toBeInTheDocument();
    expect(screen.getByText("Any")).toBeInTheDocument();
  });

  it("renders style options", () => {
    renderWithIntl(<GeneratorForm />);
    expect(screen.getByText("Classic")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
  });

  it("renders starting letter input", () => {
    renderWithIntl(<GeneratorForm />);
    const input = screen.getByPlaceholderText("e.g., A, B, C...");
    expect(input).toBeInTheDocument();
  });

  it("allows entering starting letter", () => {
    renderWithIntl(<GeneratorForm />);
    const input = screen.getByPlaceholderText("e.g., A, B, C...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Z" } });
    expect(input.value).toBe("Z");
  });

  it("renders generate button", () => {
    renderWithIntl(<GeneratorForm />);
    expect(screen.getByRole("button", { name: /Generate Names with AI/i })).toBeInTheDocument();
  });

  it("shows generated names on successful API response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        names: [{ name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous" }],
      }),
    });
    global.fetch = mockFetch;

    renderWithIntl(<GeneratorForm />);
    fireEvent.click(screen.getByRole("button", { name: /Generate Names with AI/i }));

    await waitFor(() => {
      expect(screen.getByText("浩然")).toBeInTheDocument();
    });
  });

  it("shows error message when API fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    renderWithIntl(<GeneratorForm />);
    fireEvent.click(screen.getByRole("button", { name: /Generate Names with AI/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/Generation failed/i)).toBeInTheDocument();
    });
  });

  it("shows generation count after generation", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, names: [] }),
    });

    renderWithIntl(<GeneratorForm />);
    fireEvent.click(screen.getByRole("button", { name: /Generate Names with AI/i }));

    await waitFor(() => {
      expect(screen.getByText(/this session/i)).toBeInTheDocument();
    });
  });
});
