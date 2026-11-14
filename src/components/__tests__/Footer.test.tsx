import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
    it("renders policy information and copyright", () => {
        render(<Footer />);

        expect(screen.getByText("Bảo mật & An toàn")).toBeInTheDocument();
        expect(screen.getByText(/Lãi suất vay trong hạn tối đa 30%\/năm/)).toBeInTheDocument();
        expect(screen.getAllByText(/Luxury/).length).toBeGreaterThan(0);
        expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument();
    });
});
