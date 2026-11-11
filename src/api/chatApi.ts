import { errorMessage } from "@/lib/errorMessage";
import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export interface ChatRequest {
    content: string;
    fileUrl?: string;
}

export interface ApiResponse<T> {
    status: string;
    data: T;
    error: string | null;
    meta?: {
        sessionId: string;
        responseTime: number;
        [key: string]: unknown;
    };
}

export interface OrderBrief {
    orderId: number;
    status: string;
    totalAmount: string;
    createdAt: string;
}

export interface ProfileResult {
    username?: string;
    name?: string;
    age?: number;
    email?: string;
    cardId?: string;
    phone?: string;
    address?: string;
    gender?: string;
    avatar?: string;
}

export interface OrderResult {
    message?: string;
    orders: OrderBrief[];
}

export interface CreateAccountResult {
    missingFields?: string[];
    username?: string;
    password?: string;
}

export interface ChatResponse {
    reply: string;
    intent: string;
    step: number;
    stepTotal: number;
    collectingField: string | null;
    result: ProfileResult | OrderResult | CreateAccountResult | Record<string, unknown> | null;
    messages: unknown[];
    complete: boolean;
}

export interface HistoryItem {
    userMessage: string;
    aiResponse: ApiResponse<ChatResponse>;
    timestamp: string;
}

const guestHeaders = () => {
    const key = "ai_guest_session";
    let session = sessionStorage.getItem(key);
    if (!session) {
        session = crypto.randomUUID();
        sessionStorage.setItem(key, session);
    }
    return { "X-Chat-Session": session };
};

const chatApi = {
    async uploadIdentityImage(file: File): Promise<{ url: string }> {
        const body = new FormData();
        body.append("file", file);
        const res = await axiosClient.post<{ url: string }>("/chat/identity-image", body, {
            headers: { ...guestHeaders(), "Content-Type": "multipart/form-data" }
        });
        return res.data;
    },
    async sendMessage(payload: ChatRequest): Promise<ChatResponse> {
        const res = await axiosClient.post<ApiResponse<ChatResponse>>("/chat", payload, { headers: guestHeaders() });
        const body = res.data;
        if (!body?.data || typeof body.data.reply !== "string") {
            throw new Error(errorMessage(body));
        }
        return body.data;
    },
    async getHistory(): Promise<HistoryItem[]> {
        const res = await axiosClient.get<HistoryItem[]>("/chat/history", { headers: guestHeaders() });
        // Axios get<T> returns AxiosResponse<T>
        // Depending on whether axiosClient was cast or not, res might be AxiosResponse or the data
        // My previous fix to axiosClient.ts makes it a standard AxiosInstance
        const history = (res as unknown as AxiosResponse<HistoryItem[]>).data;
        return Array.isArray(history)
            ? history.filter(item => item?.aiResponse?.data && typeof item.aiResponse.data.reply === "string")
            : [];
    }
};

export default chatApi;
