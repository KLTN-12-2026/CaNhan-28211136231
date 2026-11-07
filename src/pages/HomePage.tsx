// [UI ONLY] Camdo Luxury — HomePage (editorial dark hero + gold accents)
import { Button, Col, Flex, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import Product1Image from "@/assets/images/bike.png";
import Product2Image from "@/assets/images/camera.png";
import Product3Image from "@/assets/images/diamond.png";
import Product6Image from "@/assets/images/gold.png";
import Product5Image from "@/assets/images/house.png";
import Product7Image from "@/assets/images/laptop.png";
import Product8Image from "@/assets/images/phone.png";
import Step1Image from "@/assets/images/step1.png";
import Step2Image from "@/assets/images/step2.png";
import Step3Image from "@/assets/images/step3.png";
import Step4Image from "@/assets/images/step4.png";
import Product4Image from "@/assets/images/watch.png";

const { Title, Text } = Typography;

const steps = [
    { image: Step1Image, title: "Bước 1", desc: "Gửi thông tin tài sản" },
    { image: Step2Image, title: "Bước 2", desc: "Nhận định giá" },
    { image: Step3Image, title: "Bước 3", desc: "Thẩm định giá & nhận tiền" },
    { image: Step4Image, title: "Bước 4", desc: "Hoàn trả & nhận lại tài sản" }
];

const assets = [
    { image: Product1Image, label: "Các loại xe máy" },
    { image: Product2Image, label: "Đồ công nghệ" },
    { image: Product3Image, label: "Kim cương, đá quý" },
    { image: Product4Image, label: "Đồng hồ" },
    { image: Product5Image, label: "Bất động sản" },
    { image: Product6Image, label: "Vàng bạc" },
    { image: Product7Image, label: "Máy tính, laptop" },
    { image: Product8Image, label: "Điện thoại" }
];

const stats = [
    { value: "100%", label: "Tài sản được bảo đảm" },
    { value: "30%", label: "Lãi suất tối đa / năm" },
    { value: "12", label: "Tháng hạn vay linh hoạt" },
    { value: "24/7", label: "Hỗ trợ khách hàng" }
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="lux-home">
            {/* ================= HERO ================= */}
            <section className="lux-hero">
                <div className="lux-hero__grain" />
                <div className="lux-hero__inner">
                    <Flex vertical gap={28} style={{ maxWidth: 760 }}>
                        <Text
                            className="lux-eyebrow lux-eyebrow--inv lux-reveal lux-reveal-1"
                            style={{ margin: 0 }}
                        >
                            Cầm đồ cao cấp · Thanh lý có giá
                        </Text>

                        <Title
                            className="lux-reveal lux-reveal-2"
                            style={{
                                margin: 0,
                                color: "#f7f3ec",
                                fontSize: "clamp(38px, 6.2vw, 78px)",
                                lineHeight: 1.02,
                                fontWeight: 600,
                                letterSpacing: "-0.035em"
                            }}
                        >
                            Tài sản của bạn,
                            <br />
                            <span style={{ color: "#d8b978", fontStyle: "italic" }}>vẻ đẹp</span> tài sản của chúng tôi.
                        </Title>

                        <Text
                            className="lux-reveal lux-reveal-3"
                            style={{
                                color: "rgba(243,237,227,0.66)",
                                fontSize: 17,
                                lineHeight: 1.75,
                                maxWidth: 560
                            }}
                        >
                            Camdo Luxury tiếp nhận thẩm định và thanh lý những tài sản giá trị cao — xe máy, đồng hồ,
                            kim cương, vàng bạc — với định giá minh bạch, tiền về trong 24 giờ và bảo quản tuyệt đối.
                        </Text>

                        <Flex gap={16} wrap="wrap" className="lux-reveal lux-reveal-4">
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => navigate("/products")}
                                style={{
                                    height: 54,
                                    padding: "0 38px",
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    letterSpacing: "0.05em",
                                    background: "linear-gradient(135deg, #e3c68e, #b99256)",
                                    color: "#14110f",
                                    border: "none",
                                    boxShadow: "0 18px 40px -20px rgba(185,146,86,0.85)"
                                }}
                            >
                                Xem sản phẩm thanh lý
                            </Button>
                            <Button
                                size="large"
                                onClick={() => navigate("/register")}
                                style={{
                                    height: 54,
                                    padding: "0 38px",
                                    borderRadius: 999,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    background: "transparent",
                                    color: "#f3ede3",
                                    border: "1px solid rgba(216,185,120,0.5)"
                                }}
                            >
                                Bắt đầu hồ sơ
                            </Button>
                        </Flex>
                    </Flex>
                </div>

                {/* Stats strip */}
                <div className="lux-hero__stats">
                    <Row gutter={[0, 0]}>
                        {stats.map((s, i) => (
                            <Col key={i} xs={12} md={6}>
                                <div className="lux-stat">
                                    <div className="lux-stat__value">{s.value}</div>
                                    <div className="lux-stat__label">{s.label}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* ================= PROCESS ================= */}
            <section className="lux-section">
                <Flex vertical align="center" gap={16} style={{ width: "100%" }}>
                    <Text className="lux-eyebrow lux-reveal">Quy trình</Text>
                    <Title
                        level={2}
                        className="lux-reveal lux-reveal-1"
                        style={{ margin: 0, fontWeight: 600, fontSize: "clamp(28px, 3.4vw, 44px)" }}
                    >
                        Bốn bước đến khoản tiền
                    </Title>
                    <Text
                        type="secondary"
                        className="lux-reveal lux-reveal-2"
                        style={{ fontSize: 16, textAlign: "center", maxWidth: 560 }}
                    >
                        Đơn giản, minh bạch và nhanh chóng — không rẽ ngõ, không ẩn phí.
                    </Text>
                    <div className="lux-rule lux-reveal lux-reveal-2" style={{ width: 160, margin: "6px 0 14px" }} />
                </Flex>

                <Row gutter={[24, 24]} style={{ width: "100%", marginTop: 12 }}>
                    {steps.map((step, index) => (
                        <Col key={index} xs={24} sm={12} md={6}>
                            <div className="lux-step">
                                <div className="lux-step__index">0{index + 1}</div>
                                <div className="lux-step__media">
                                    <img src={step.image} alt={step.title} />
                                </div>
                                <div className="lux-step__body">
                                    <Text className="lux-eyebrow">{step.title}</Text>
                                    <Title level={4} style={{ margin: "6px 0 0", fontWeight: 600 }}>
                                        {step.desc}
                                    </Title>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* ================= ASSETS ================= */}
            <section className="lux-section lux-section--dark">
                <Flex vertical align="center" gap={16} style={{ width: "100%" }}>
                    <Text className="lux-eyebrow lux-eyebrow--inv lux-reveal">Tài sản chấp nhận</Text>
                    <Title
                        level={2}
                        className="lux-reveal lux-reveal-1"
                        style={{ margin: 0, fontWeight: 600, color: "#f3ede3", fontSize: "clamp(28px, 3.4vw, 44px)" }}
                    >
                        Mọi tài sản giá trị cao
                    </Title>
                    <Text
                        className="lux-reveal lux-reveal-2"
                        style={{ fontSize: 16, textAlign: "center", maxWidth: 560, color: "rgba(243,237,227,0.6)" }}
                    >
                        Định giá cạnh tranh nhất thị trường cho mọi loại tài sản quý.
                    </Text>
                    <div className="lux-rule lux-reveal lux-reveal-2" style={{ width: 160, margin: "6px 0 14px" }} />
                </Flex>

                <Row gutter={[20, 20]} style={{ width: "100%", marginTop: 12 }}>
                    {assets.map((item, index) => (
                        <Col key={index} xs={12} sm={8} md={6}>
                            <div className="lux-asset">
                                <div className="lux-asset__glow" />
                                <img src={item.image} alt={item.label} />
                                <Text strong>{item.label}</Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* ================= CTA ================= */}
            <section className="lux-section">
                <div className="lux-cta lux-reveal">
                    <Flex vertical align="center" gap={18}>
                        <Text className="lux-eyebrow lux-eyebrow--inv">Sẵn sàng bắt đầu</Text>
                        <Title
                            level={2}
                            style={{ margin: 0, color: "#f7f3ec", fontWeight: 600, fontSize: "clamp(26px, 3.2vw, 40px)" }}
                        >
                            Định giá tài sản của bạn trong 30 phút
                        </Title>
                        <Text style={{ color: "rgba(243,237,227,0.62)", fontSize: 16, maxWidth: 520, textAlign: "center" }}>
                            Đăng ký tài khoản Camdo Luxury để được thẩm định nhanh chóng và nhận ưu đãi lãi suất
                            thấp nhất.
                        </Text>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate("/register")}
                            style={{
                                height: 52,
                                padding: "0 36px",
                                borderRadius: 999,
                                fontWeight: 700,
                                letterSpacing: "0.05em",
                                background: "linear-gradient(135deg, #e3c68e, #b99256)",
                                color: "#14110f",
                                border: "none"
                            }}
                        >
                            Tạo tài khoản ngay
                        </Button>
                    </Flex>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
