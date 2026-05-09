import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import GeneratorPage from "@/app/[locale]/generator/page";
import { renderWithIntl } from "./test-utils";

describe("GeneratorPage", () => {
  it("renders generator form", () => {
    renderWithIntl(<GeneratorPage />);
    expect(screen.getByText("AI Name Generator")).toBeInTheDocument();
  });

  it("renders gender selection options", () => {
    renderWithIntl(<GeneratorPage />);
    expect(screen.getByText("Boy")).toBeInTheDocument();
    expect(screen.getByText("Girl")).toBeInTheDocument();
    expect(screen.getByText("Any")).toBeInTheDocument();
  });

  it("renders style options", () => {
    renderWithIntl(<GeneratorPage />);
    expect(screen.getByText("Classic")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
  });

  it("renders starting letter input", () => {
    renderWithIntl(<GeneratorPage />);
    const input = screen.getByPlaceholderText("e.g., A, B, C...");
    expect(input).toBeInTheDocument();
  });

  it("allows entering starting letter", () => {
    renderWithIntl(<GeneratorPage />);
    const input = screen.getByPlaceholderText("e.g., A, B, C...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Z" } });
    expect(input.value).toBe("Z");
  });

  it("renders generate button", () => {
    renderWithIntl(<GeneratorPage />);
    expect(screen.getByRole("button", { name: /Generate Names with AI/i })).toBeInTheDocument();
  });

  it("shows generated names after generate action", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        names: [
          { name: "浩然", pinyin: "Hào Rán", meaning: "Grand and righteous" },
        ],
      }),
    });
    global.fetch = mockFetch;

    renderWithIntl(<GeneratorPage />);
    const button = screen.getByRole("button", { name: /Generate Names with AI/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("浩然")).toBeInTheDocument();
    });
  });

  it("shows generation count after generation", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, names: [] }),
    });
    global.fetch = mockFetch;

    renderWithIntl(<GeneratorPage />);
    const button = screen.getByRole("button", { name: /Generate Names with AI/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/this session/i)).toBeInTheDocument();
    });
  });
});
