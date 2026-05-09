import { describe, it, expect } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import InlineGenerator from "@/components/generator/InlineGenerator";
import { renderWithIntl } from "./test-utils";

describe("InlineGenerator", () => {
  it("renders gender selection buttons", () => {
    renderWithIntl(<InlineGenerator />);
    expect(screen.getByRole("button", { name: "Boy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Girl" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Any" })).toBeInTheDocument();
  });

  it("renders style select with all options", () => {
    renderWithIntl(<InlineGenerator />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.options.length).toBe(5);
  });

  it("renders generate button", () => {
    renderWithIntl(<InlineGenerator />);
    expect(screen.getByRole("button", { name: /Generate Names with AI/i })).toBeInTheDocument();
  });

  it("shows results after clicking generate", async () => {
    renderWithIntl(<InlineGenerator />);
    const button = screen.getByRole("button", { name: /Generate Names with AI/i });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(screen.getByText("Generated Names")).toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });
});
