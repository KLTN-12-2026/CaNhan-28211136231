import { beforeEach, describe, expect, it, vi } from "vitest";
import axiosClient from "../axiosClient";
import chatApi from "../chatApi";

// Mock axiosClient
vi.mock("../axiosClient", () => {
    const mockClient = {
        get: vi.fn(),
        post: vi.fn()
    };
    return {
        default: mockClient
    };
});

describe("chatApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("sendMessage calls /chat and returns data.data", async () => {
        const payload = { content: "Hello" };
        const mockResponse = {
            data: {
                data: { reply: "Hi there" }
            }
        };
        (axiosClient.post as any).mockResolvedValue(mockResponse);

        const result = await chatApi.sendMessage(payload);

        expect(axiosClient.post).toHaveBeenCalledWith("/chat", payload, { headers: { "X-Chat-Session": expect.any(String) } });
        expect(result.reply).toBe("Hi there");
    });

    it("uses the same guest session for upload, chat and history", async () => {
        sessionStorage.clear();
        (axiosClient.post as any).mockResolvedValue({ data: { url: "card.png", data: { reply: "ok" } } });
        (axiosClient.get as any).mockResolvedValue({ data: [] });
        const file = new File(["test"], "card.png", { type: "image/png" });
        await chatApi.uploadIdentityImage(file);
        await chatApi.sendMessage({ content: "register", fileUrl: "card.png" });
        await chatApi.getHistory();
        const upload = (axiosClient.post as any).mock.calls[0];
        const chat = (axiosClient.post as any).mock.calls[1];
        const history = (axiosClient.get as any).mock.calls[0];
        expect(upload[0]).toBe("/chat/identity-image");
        expect(upload[1].get("file")).toBe(file);
        expect(upload[2].headers["X-Chat-Session"]).toBe(chat[2].headers["X-Chat-Session"]);
        expect(history[1].headers["X-Chat-Session"]).toBe(chat[2].headers["X-Chat-Session"]);
    });

    it("getHistory calls /chat/history", async () => {
        const mockHistory = [{ userMessage: "test", aiResponse: { data: { reply: "ok" } } }];
        (axiosClient.get as any).mockResolvedValue({ data: mockHistory });

        const result = await chatApi.getHistory();

        expect(axiosClient.get).toHaveBeenCalledWith("/chat/history", { headers: { "X-Chat-Session": expect.any(String) } });
        expect(result).toEqual(mockHistory);
    });
    it("turns a 200 error envelope into a readable error", async () => {
        (axiosClient.post as any).mockResolvedValue({ data: {
            status: "error", data: null, error: { code: "AI_QUOTA_EXCEEDED", message: "Quota exhausted" }
        } });
        await expect(chatApi.sendMessage({ content: "register" })).rejects.toThrow("Quota exhausted");
    });
    it("skips malformed history entries", async () => {
        (axiosClient.get as any).mockResolvedValue({ data: [
            { aiResponse: { status: "error", data: null } }, null,
            { userMessage: "hello", aiResponse: { data: { reply: "ok" } } }
        ] });
        expect(await chatApi.getHistory()).toHaveLength(1);
    });

});
