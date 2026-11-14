export function errorMessage(value: unknown, fallback = "Kh\u00f4ng th\u1ec3 x\u1eed l\u00fd y\u00eau c\u1ea7u. Vui l\u00f2ng th\u1eed l\u1ea1i."): string {
    if (typeof value === "string" && value.trim()) return value;
    if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        const response = record.response as { data?: unknown } | undefined;
        if (response?.data) return errorMessage(response.data, fallback);
        if (typeof record.message === "string" && record.message.trim()) return record.message;
        if (record.error && record.error !== value) return errorMessage(record.error, fallback);
    }
    return fallback;
}
