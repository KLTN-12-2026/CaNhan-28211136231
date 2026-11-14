// [UI ONLY] Camdo Luxury — AppFooter (dark editorial, champagne accents)
import { CheckCircleFilled } from "@ant-design/icons";
import { Divider, Flex, Layout, List, Typography } from "antd";
import footerImage from "../assets/images/footer.png";

const { Footer } = Layout;
const { Paragraph, Text, Title, Link } = Typography;

const AppFooter = () => {
    return (
        <Footer
            style={{
                background: "#14110f",
                borderTop: "1px solid rgba(185,146,86,0.3)",
                padding: "72px 24px 40px",
                color: "rgba(243,237,227,0.85)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(760px 320px at 78% 0%, rgba(185,146,86,0.16), transparent 65%)",
                    pointerEvents: "none"
                }}
            />
            <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
                <Flex gap={72} wrap="wrap" justify="space-between">
                    {/* [UI ONLY] Policy & trust */}
                    <Flex vertical gap={32} style={{ flex: "1 1 520px" }}>
                        <Flex vertical gap={14}>
                            <Text className="lux-eyebrow lux-eyebrow--inv">Cam kết của chúng tôi</Text>
                            <Title level={3} style={{ color: "#f3ede3", margin: 0, fontWeight: 600 }}>
                                Bảo mật &amp; An toàn
                            </Title>
                            <Text style={{ color: "rgba(243,237,227,0.62)", fontSize: 15, maxWidth: 460 }}>
                                Tài sản của bạn được niêm phong bằng tem vỡ và bảo quản theo quy trình chuyên nghiệp
                                của hệ thống Camdo Luxury.
                            </Text>
                        </Flex>

                        <List
                            dataSource={[
                                "Thời gian tối thiểu 3 tháng và tối đa 12 tháng",
                                "Lãi suất vay trong hạn tối đa 30%/năm (chỉ 2.5%/tháng)",
                                "Tài sản được đảm bảo an toàn tuyệt đối 100%",
                                "Thời hạn vay linh hoạt, trả trước hạn không phí phạt"
                            ]}
                            renderItem={(item) => (
                                <List.Item style={{ border: "none", padding: "9px 0" }}>
                                    <Flex align="center" gap={12}>
                                        <CheckCircleFilled style={{ color: "#d8b978", fontSize: 17 }} />
                                        <Text style={{ color: "rgba(243,237,227,0.88)", fontSize: 15 }}>{item}</Text>
                                    </Flex>
                                </List.Item>
                            )}
                        />

                        <div
                            style={{
                                background: "rgba(216,185,120,0.07)",
                                border: "1px solid rgba(216,185,120,0.22)",
                                borderRadius: 16,
                                padding: 24
                            }}
                        >
                            <Title level={5} style={{ color: "#f3ede3", marginTop: 0, marginBottom: 12 }}>
                                Ví dụ minh họa
                            </Title>
                            <Paragraph
                                style={{
                                    color: "rgba(243,237,227,0.62)",
                                    margin: 0,
                                    fontSize: 14,
                                    lineHeight: 1.7
                                }}
                            >
                                Khách cầm tài sản{" "}
                                <Text strong style={{ color: "#d8b978" }}>
                                    10.000.000đ
                                </Text>{" "}
                                trong 12 tháng, lãi suất vay 2.5%/tháng tương đương 250.000đ/tháng. Tổng nợ gốc và lãi
                                trong 12 tháng là 13.000.000đ. Khách hàng có thể chọn trả lãi hàng tháng mà không cần
                                trả nợ gốc ngay.
                            </Paragraph>
                        </div>
                    </Flex>

                    {/* [UI ONLY] Brand visual */}
                    <Flex vertical align="center" gap={30} style={{ flex: "1 1 300px" }}>
                        <div
                            style={{
                                position: "relative",
                                width: 280,
                                height: 280,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle, rgba(185,146,86,0.2) 0%, rgba(20,17,15,0) 70%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <img
                                src={footerImage}
                                alt="Camdo Luxury"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: 230,
                                    filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.6))"
                                }}
                            />
                        </div>
                        <Flex vertical align="center" gap={10} style={{ textAlign: "center" }}>
                            <Title level={4} style={{ color: "#f3ede3", margin: 0 }}>
                                Niêm phong &amp; Bảo quản
                            </Title>
                            <Text style={{ color: "rgba(243,237,227,0.45)", maxWidth: 250 }}>
                                Hệ thống lưu trữ hiện đại, bảo hiểm tài sản lên đến 100% giá trị.
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Divider style={{ borderColor: "rgba(216,185,120,0.22)", margin: "56px 0 28px" }} />

                <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
                    <Text style={{ color: "rgba(243,237,227,0.42)", fontSize: 13 }}>
                        © {new Date().getFullYear()} Camdo{" "}
                        <Text strong style={{ color: "#d8b978" }}>
                            Luxury
                        </Text>
                        . All rights reserved.
                    </Text>
                    <Flex gap={28}>
                        <Link style={{ color: "rgba(243,237,227,0.42)", fontSize: 13 }}>Điều khoản sử dụng</Link>
                        <Link style={{ color: "rgba(243,237,227,0.42)", fontSize: 13 }}>Chính sách bảo mật</Link>
                        <Link style={{ color: "rgba(243,237,227,0.42)", fontSize: 13 }}>Liên hệ</Link>
                    </Flex>
                </Flex>
            </div>
        </Footer>
    );
};

export default AppFooter;
