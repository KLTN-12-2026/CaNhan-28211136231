// [UI ONLY] Camdo Luxury — AppHeader (dark espresso + champagne gold)
import useAuth from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { getImageUrl } from "@/lib/imageUtils";
import {
    InboxOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Dropdown, Flex, Layout, Menu, Typography, type MenuProps } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = ({ menuItems }: { menuItems: MenuProps["items"] }) => {
    const { isAuthenticated, logout, currentUser } = useAuth();
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);
    const handleMenuClick = () => {
        closeDrawer();
    };

    const isActive = (key?: React.Key) => key === location.pathname;

    return (
        <Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                height: 76,
                background: "linear-gradient(180deg, #1d1916 0%, #14110f 100%)",
                borderBottom: "1px solid rgba(185,146,86,0.28)",
                boxShadow: "0 12px 40px -24px rgba(20,17,15,0.9)"
            }}
        >
            <Flex align="center" justify="space-between" style={{ width: "100%", maxWidth: 1440, margin: "0 auto" }}>
                {/* [UI ONLY] Brand lockup */}
                <Flex align="center" gap={12} style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <img src={logoImage} alt="Camdo Luxury" style={{ height: 46, width: "auto", objectFit: "contain" }} />
                    <Flex vertical gap={0}>
                        <Text
                            style={{
                                fontSize: 21,
                                fontWeight: 800,
                                margin: 0,
                                letterSpacing: "-0.02em",
                                color: "#f3ede3",
                                lineHeight: 1.1
                            }}
                        >
                            Camdo <span style={{ color: "#d8b978", fontWeight: 800 }}>Luxury</span>
                        </Text>
                        <Text
                            style={{
                                fontSize: 9,
                                letterSpacing: "0.34em",
                                textTransform: "uppercase",
                                color: "rgba(243,237,227,0.42)",
                                fontWeight: 600
                            }}
                        >
                            Cầm đồ &amp; thanh lý cao cấp
                        </Text>
                    </Flex>
                </Flex>

                {/* [UI ONLY] Desktop navigation */}
                <Flex gap={4} align="center" className="desktop-menu" style={{ flex: 1, justifyContent: "center" }}>
                    {menuItems?.map((item: any) => {
                        const active = isActive(item.key);
                        const isDashboard = item.key === "/admin/dashboard";

                        return (
                            <div
                                key={item.key}
                                onClick={() => navigate(item.key)}
                                style={{
                                    padding: "9px 18px",
                                    borderRadius: 999,
                                    cursor: "pointer",
                                    transition: "all 0.35s var(--lux-ease)",
                                    background: active
                                        ? isDashboard
                                            ? "linear-gradient(135deg, #d8b978, #b99256)"
                                            : "rgba(216,185,120,0.14)"
                                        : "transparent",
                                    border: active && !isDashboard ? "1px solid rgba(216,185,120,0.32)" : "1px solid transparent",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                                className="nav-item-hover"
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: active ? 700 : 500,
                                        letterSpacing: "0.03em",
                                        color: active
                                            ? isDashboard
                                                ? "#1b1714"
                                                : "#e8d5ad"
                                            : "rgba(243,237,227,0.72)",
                                        transition: "color 0.3s"
                                    }}
                                >
                                    {item.label?.props?.children || item.label}
                                </Text>
                            </div>
                        );
                    })}
                </Flex>

                {/* [UI ONLY] Account cluster */}
                <Flex align="center" gap={14}>
                    {isAuthenticated && (
                        <Badge count={cart?.length || 0} offset={[-4, 4]} color="#d8b978">
                            <Button
                                type="text"
                                icon={<ShoppingCartOutlined style={{ fontSize: 19, color: "rgba(243,237,227,0.8)" }} />}
                                onClick={() => navigate("/mycart")}
                                style={{
                                    borderRadius: "50%",
                                    width: 42,
                                    height: 42,
                                    background: "rgba(216,185,120,0.1)",
                                    border: "1px solid rgba(216,185,120,0.24)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease"
                                }}
                                className="cart-button-hover"
                            />
                        </Badge>
                    )}

                    <div className="desktop-menu">
                        {isAuthenticated ? (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "profile",
                                            label: "Hồ sơ của tôi",
                                            icon: <UserOutlined />,
                                            onClick: () => navigate("/my-profile")
                                        },
                                        {
                                            key: "my-products",
                                            label: "Sản phẩm đã cầm của tôi",
                                            icon: <InboxOutlined />,
                                            onClick: () => navigate("/my-products")
                                        },
                                        {
                                            key: "logout",
                                            label: "Đăng xuất",
                                            icon: <LogoutOutlined />,
                                            danger: true,
                                            onClick: handleLogout
                                        }
                                    ]
                                }}
                                placement="bottomRight"
                                arrow
                            >
                                <Flex
                                    align="center"
                                    gap={10}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px 14px 5px 6px",
                                        borderRadius: 999,
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(216,185,120,0.2)",
                                        transition: "all 0.3s ease"
                                    }}
                                    className="user-profile-hover"
                                >
                                    <Avatar
                                        size={30}
                                        src={
                                            getImageUrl(currentUser?.avatar) ||
                                            `https://ui-avatars.com/api/?name=${currentUser?.name || "User"}&background=2b2622&color=d8b978`
                                        }
                                        icon={<UserOutlined />}
                                    />
                                    <Text strong style={{ fontSize: 13, color: "#f3ede3" }}>
                                        {currentUser?.name?.split(" ").pop() || "Tài khoản"}
                                    </Text>
                                </Flex>
                            </Dropdown>
                        ) : (
                            <Button
                                type="primary"
                                icon={<LoginOutlined />}
                                onClick={() => navigate("/login")}
                                style={{
                                    borderRadius: 999,
                                    height: 42,
                                    padding: "0 26px",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    background: "linear-gradient(135deg, #d8b978, #b99256)",
                                    border: "none",
                                    color: "#1b1714"
                                }}
                            >
                                Đăng nhập
                            </Button>
                        )}
                    </div>

                    <Button
                        className="mobile-menu-icon"
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: 20, color: "#f3ede3" }} />}
                        onClick={showDrawer}
                        style={{ display: "none" }}
                    />
                </Flex>
            </Flex>

            <Drawer
                title={
                    <Flex align="center" gap={12}>
                        <img src={logoImage} alt="Logo" style={{ height: 32, width: "auto", objectFit: "contain" }} />
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 800,
                                letterSpacing: "0.04em"
                            }}
                        >
                            Camdo <span style={{ color: "#b99256" }}>Luxury</span>
                        </Text>
                    </Flex>
                }
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
                width={290}
                styles={{ body: { padding: "12px 0" } }}
            >
                <Menu
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[location.pathname]}
                    onClick={handleMenuClick}
                    style={{ border: "none" }}
                />
                <div style={{ padding: "24px 16px" }}>
                    {isAuthenticated ? (
                        <Button
                            danger
                            onClick={handleLogout}
                            icon={<LogoutOutlined />}
                            style={{ width: "100%", height: 46, borderRadius: 999 }}
                        >
                            Đăng xuất
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate("/login");
                                closeDrawer();
                            }}
                            icon={<LoginOutlined />}
                            style={{
                                width: "100%",
                                height: 46,
                                borderRadius: 999,
                                fontWeight: 700,
                                background: "linear-gradient(135deg, #d8b978, #b99256)",
                                color: "#1b1714",
                                border: "none"
                            }}
                        >
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </Drawer>
        </Header>
    );
};

export default AppHeader;
