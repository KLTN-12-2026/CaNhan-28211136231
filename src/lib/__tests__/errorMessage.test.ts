import { describe, expect, it } from "vitest";
import { errorMessage } from "../errorMessage";
describe("errorMessage", () => {
    it.each([429, 503])("reads AI HTTP %i error objects as text", status => {
        expect(errorMessage({ response: { status, data: { error: { code: "AI_UNAVAILABLE", message: "Try again later" } } } })).toBe("Try again later");
    });
    it("handles standard errors and malformed responses", () => {
        expect(errorMessage(new Error("Network unavailable"))).toBe("Network unavailable");
        expect(typeof errorMessage({ error: { code: "UNKNOWN" } })).toBe("string");
        expect(typeof errorMessage(null)).toBe("string");
    });
});
