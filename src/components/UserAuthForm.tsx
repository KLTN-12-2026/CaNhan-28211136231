// [UI ONLY] Camdo Luxury — UserAuthForm
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone, FacebookFilled } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/icons/google.svg";
import logoImage from "../assets/images/logo.png";

const { Title, Text, Link } = Typography;

interface Props {
    mode: "login" | "register";
    onSubmit: (data) => void;
    handleLoginGoogle?: () => void;
    handleLoginFacebook?: () => void;
    handleRegisterGoogle?: () => void;
    handleRegisterFacebook?: () => void;
    isLoading: boolean;
}

const UserAuthForm: React.FC<Props> = ({
    mode,
    onSubmit,
    handleLoginGoogle,
    handleLoginFacebook,
    handleRegisterGoogle,
    handleRegisterFacebook,
    isLoading
}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        onSubmit(values);
    };

    const socialLoginHandler = (handler: (() => void) | undefined) => {
        if (handler) handler();
    };

    return (
        <div className="lux-auth">
            {/* Decorative editorial panel */}
            <aside className="lux-auth__aside">
                <div className="lux-auth__aside-grain" />
                <Flex vertical gap={26} style={{ position: "relative", zIndex: 1 }}>
                    <Flex align="center" gap={12}>
                        <img src={logoImage} alt="Camdo Luxury" style={{ height: 40, width: "auto" }} />
                        <Text
                            style={{
                                fontSize: 19,
                                fontWeight: 800,
                                color: "#f3ede3",
                                letterSpacing: "-0.01em"
                            }}
                        >
                            Camdo <span style={{ color: "#d8b978" }}>Luxury</span>
                        </Text>
                    </Flex>

                    <Title
                        level={2}
                        style={{
                            color: "#f7f3ec",
                            margin: 0,
                            fontWeight: 600,
                            fontSize: "clamp(28px, 3.2vw, 42px)",
                            lineHeight: 1.12
                        }}
                    >
                        Tài sản giá trị,
                        <br />
                        <span style={{ color: "#d8b978", fontStyle: "italic" }}>định giá chuẩn quốc tế.</span>
                    </Title>

                    <Text style={{ color: "rgba(243,237,227,0.6)", fontSize: 15, lineHeight: 1.75, maxWidth: 380 }}>
                        Thẩm định tài sản trong 30 phút, thanh toán trong 24 giờ và bảo quản tuyệt đối đến khi bạn
                        hoàn trả.
                    </Text>

                    <div className="lux-rule" style={{ width: 140, margin: "6px 0" }} />

                    <Flex vertical gap={14}>
                        {[
                            "Định giá minh bạch theo thị trường",
                            "Lãi suất vay trong hạn chỉ 2.5%/tháng",
                            "Bảo hiểm tài sản lên đến 100% giá trị"
                        ].map((item) => (
                            <Flex key={item} align="center" gap={12}>
                                <span className="lux-auth__dot" />
                                <Text style={{ color: "rgba(243,237,227,0.82)", fontSize: 14 }}>{item}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </aside>

            {/* Form panel */}
            <div className="lux-auth__panel">
                <Card
                    bordered={false}
                    style={{
                        width: "100%",
                        maxWidth: 430,
                        borderRadius: 22,
                        boxShadow: "0 30px 70px -40px rgba(20,17,15,0.55)",
                        background: "#fffdfa"
                    }}
                    styles={{ body: { padding: "42px 38px" } }}
                >
                    <Flex vertical align="center" gap={20} style={{ marginBottom: 30 }}>
                        <img src={logoImage} alt="Logo" style={{ height: 46 }} />
                        <Flex vertical align="center" gap={6}>
                            <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                                {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
                            </Title>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                                {mode === "login"
                                    ? "Vui lòng đăng nhập để tiếp tục"
                                    : "Bắt đầu hành trình cùng Camdo Luxury"}
                            </Text>
                        </Flex>
                    </Flex>

                    <Form layout="vertical" form={form} onFinish={handleSubmit} requiredMark={false} size="large">
                        {mode === "register" && (
                            <Form.Item
                                label="Họ và tên"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                            >
                                <Input placeholder="Nguyễn Văn A" style={{ borderRadius: 12 }} />
                            </Form.Item>
                        )}
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                        >
                            <Input placeholder="username" style={{ borderRadius: 12 }} />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password
                                placeholder="••••••••"
                                style={{ borderRadius: 12 }}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        {mode === "register" && (
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="re-password"
                                rules={[
                                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Mật khẩu không khớp!"));
                                        }
                                    })
                                ]}
                            >
                                <Input.Password placeholder="••••••••" style={{ borderRadius: 12 }} />
                            </Form.Item>
                        )}

                        <Form.Item style={{ marginBottom: 12 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isLoading}
                                style={{
                                    height: 50,
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    fontSize: 15,
                                    letterSpacing: "0.05em",
                                    background: "linear-gradient(135deg, #e3c68e, #b99256)",
                                    color: "#14110f",
                                    border: "none"
                                }}
                            >
                                {mode === "login" ? "Đăng nhập" : "Đăng ký ngay"}
                            </Button>
                        </Form.Item>

                        <Divider plain style={{ margin: "24px 0" }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Hoặc tiếp tục bằng
                            </Text>
                        </Divider>

                        <Flex gap={12}>
                            <Button
                                block
                                style={{
                                    height: 48,
                                    borderRadius: 999,
                                    display: "flex",
                                    alignItems: "center",
                                    justifySelf: "center"
                                }}
                                onClick={() =>
                                    socialLoginHandler(mode === "login" ? handleLoginGoogle : handleRegisterGoogle)
                                }
                            >
                                <img src={googleIcon} alt="Google" style={{ width: 20, marginRight: 8 }} />
                                Google
                            </Button>
                            <Button
                                block
                                style={{
                                    height: 48,
                                    borderRadius: 999,
                                    color: "#1877F2",
                                    borderColor: "rgba(24,119,242,0.45)",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                                icon={<FacebookFilled />}
                                onClick={() =>
                                    socialLoginHandler(mode === "login" ? handleLoginFacebook : handleRegisterFacebook)
                                }
                            >
                                Facebook
                            </Button>
                        </Flex>

                        <div style={{ textAlign: "center", marginTop: 30 }}>
                            {mode === "register" ? (
                                <Flex align="center" justify="center" gap={8}>
                                    <Text type="secondary">Đã có tài khoản?</Text>
                                    <Link onClick={() => navigate("/login")} style={{ fontWeight: 600 }}>
                                        Đăng nhập
                                    </Link>
                                </Flex>
                            ) : (
                                <Flex vertical gap={8}>
                                    <Flex align="center" justify="center" gap={8}>
                                        <Text type="secondary">Bạn chưa có tài khoản?</Text>
                                        <Link onClick={() => navigate("/register")} style={{ fontWeight: 600 }}>
                                            Đăng ký ngay
                                        </Link>
                                    </Flex>
                                    <Link
                                        onClick={() => navigate("/")}
                                        style={{
                                            fontSize: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 4
                                        }}
                                    >
                                        <ArrowLeftOutlined style={{ fontSize: 11 }} /> Quay về trang chủ
                                    </Link>
                                </Flex>
                            )}
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default UserAuthForm;
