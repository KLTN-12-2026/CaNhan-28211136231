// [UI ONLY] Camdo Luxury — StatisticCard
import { Card, Flex, Statistic } from "antd";

export default function StatisticCard({
    title,
    value,
    prefix
}: {
    title: string;
    value: number;
    prefix: React.ReactNode;
}) {
    return (
        <Card
            bordered={false}
            style={{
                border: "1px solid rgba(20,17,15,0.08)",
                boxShadow: "0 16px 44px -32px rgba(20,17,15,0.5)",
                borderRadius: 16,
                height: "100%",
                overflow: "hidden"
            }}
            bodyStyle={{ padding: 22 }}
        >
            <Flex align="center" gap={16}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: "rgba(185,146,86,0.12)",
                        color: "#8d6b36",
                        border: "1px solid rgba(185,146,86,0.28)",
                        fontSize: 19
                    }}
                >
                    {prefix}
                </div>
                <Statistic
                    title={<span style={{ color: "#6d6459", fontWeight: 600, fontSize: 12.5 }}>{title}</span>}
                    value={value}
                    valueStyle={{
                        fontWeight: 600,
                        fontSize: 24,
                        letterSpacing: "-0.02em",
                        fontFamily: "var(--lux-font-display)",
                        color: "#1b1714"
                    }}
                />
            </Flex>
        </Card>
    );
}
