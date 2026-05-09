import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import HomePage from "@/app/[locale]/page";
import { renderWithIntl } from "./test-utils";

describe("HomePage", () => {
  it("renders hero section with title", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText(/Find the Perfect/i)).toBeInTheDocument();
  });

  it("renders gender selection buttons", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText("Boy")).toBeInTheDocument();
    expect(screen.getByText("Girl")).toBeInTheDocument();
    expect(screen.getByText("Any")).toBeInTheDocument();
  });

  it("renders generate button", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByRole("button", { name: /Generate Names with AI/i })).toBeInTheDocument();
  });

  it("renders features section", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText("Why Choose Names Hub?")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered")).toBeInTheDocument();
    expect(screen.getByText("Chinese & English")).toBeInTheDocument();
    expect(screen.getByText("Free & Instant")).toBeInTheDocument();
  });

  it("renders popular names sections", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByText("Boy Names")).toBeInTheDocument();
    expect(screen.getByText("Girl Names")).toBeInTheDocument();
  });
});
