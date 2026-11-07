// [UI ONLY] Camdo Luxury — AdminLayout (dark sidebar, champagne gold accents)
import AIAgent from "@/components/AIAgent";
import useAuth from "@/hooks/useAuth";
import { getImageUrl } from "@/lib/imageUtils";
import { privateRoutes } from "@/router/router.config";
import {
    AppstoreOutlined,
    LogoutOutlined,
    MenuOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    TagsOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Dropdown, Flex, Input, Layout, Menu, Typography } from "antd";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const menuItems = privateRoutes
    .filter((route) => route.showInMenu && route.roles?.includes("ADMIN") && route.path.startsWith("/admin"))
    .map((route) => ({
        key: route.path,
        icon: {
            "/admin/dashboard": <AppstoreOutlined />,
            "/admin/products": <ShoppingOutlined />,
            "/admin/customers": <UserOutlined />,
            "/admin/categories": <TagsOutlined />,
            "/admin/orders": <ShoppingCartOutlined />
        }[route.path] || <QuestionCircleOutlined />,
        label: route.label
    }));

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { isAuthenticated, logout, currentUser } = useAuth();

    const activeMenuKey = useMemo(() => {
        const matchingPath = menuItems
            .map((item) => item.key as string)
            .sort((a, b) => b.length - a.length)
            .find((key) => location.pathname.startsWith(key));

        return matchingPath ? [matchingPath] : [];
    }, [location.pathname]);

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
    };

    const handleLogout = () => {
        logout();
    };

    const userMenuItems = [
        {
            key: "profile",
            label: "Hồ sơ của tôi",
            icon: <UserOutlined />,
            onClick: () => navigate("/my-profile")
        },
        {
            key: "logout",
            label: "Đăng xuất",
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout
        }
    ];

    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <>
            <Layout hasSider style={{ minHeight: "100vh" }}>
                {/* [UI ONLY] Dark espresso sidebar */}
                <Sider
                    theme="dark"
                    width={264}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    collapsedWidth={82}
                    className="lux-sider"
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: "#14110f",
                        borderRight: "1px solid rgba(185,146,86,0.26)",
                        zIndex: 1000
                    }}
                >
                    <Flex vertical gap={22} style={{ height: "100%", paddingBottom: 22 }}>
                        <div style={{ padding: "24px 22px 6px" }}>
                            <Flex align="center" gap={12} style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                                <img
                                    src={logoImage}
                                    alt="Logo"
                                    style={{ height: 36, width: "auto", objectFit: "contain" }}
                                />
                                {!collapsed && (
                                    <Text
                                        style={{
                                            fontSize: 19,
                                            fontWeight: 800,
                                            margin: 0,
                                            letterSpacing: "-0.01em",
                                            color: "#f3ede3",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        Camdo <span style={{ color: "#d8b978" }}>Luxury</span>
                                    </Text>
                                )}
                            </Flex>
                        </div>

                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={activeMenuKey}
                            items={menuItems}
                            onClick={handleMenuClick}
                            style={{ borderInlineEnd: "none", flexGrow: 1, background: "transparent" }}
                        />

                        <div style={{ padding: "0 16px" }}>
                            <Dropdown menu={{ items: userMenuItems }} placement="topRight">
                                <Flex
                                    align="center"
                                    gap={12}
                                    style={{
                                        padding: "11px 12px",
                                        borderRadius: 12,
                                        cursor: "pointer",
                                        transition: "background 0.3s",
                                        background: "rgba(216,185,120,0.08)",
                                        border: "1px solid rgba(216,185,120,0.18)"
                                    }}
                                >
                                    <Avatar
                                        size={38}
                                        src={
                                            getImageUrl(currentUser?.avatar) ||
                                            `https://ui-avatars.com/api/?name=${currentUser?.name || "Admin"}&background=2b2622&color=d8b978`
                                        }
                                    />
                                    {!collapsed && (
                                        <Flex vertical style={{ overflow: "hidden" }}>
                                            <Text strong style={{ fontSize: 13.5, color: "#f3ede3" }}>
                                                {currentUser?.name || "Admin"}
                                            </Text>
                                            <Text style={{ fontSize: 11.5, color: "rgba(243,237,227,0.45)" }} ellipsis>
                                                {currentUser?.role || "Manager"}
                                            </Text>
                                        </Flex>
                                    )}
                                </Flex>
                            </Dropdown>
                        </div>
                    </Flex>
                </Sider>

                <Layout
                    style={{
                        marginLeft: collapsed ? 82 : 264,
                        transition: "margin-left 0.25s var(--lux-ease)",
                        background: "#f7f3ec"
                    }}
                >
                    <Header
                        style={{
                            background: "rgba(255,253,250,0.82)",
                            backdropFilter: "saturate(180%) blur(18px)",
                            padding: "0 28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            position: "sticky",
                            top: 0,
                            zIndex: 999,
                            borderBottom: "1px solid rgba(20,17,15,0.08)",
                            height: 68
                        }}
                    >
                        <Flex align="center" gap={16} style={{ flexGrow: 1 }}>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={showDrawer}
                                className="lg-hidden"
                                style={{ display: "none" }}
                            />
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    fontSize: 19,
                                    fontWeight: 600,
                                    letterSpacing: "-0.01em",
                                    fontFamily: "var(--lux-font-display)"
                                }}
                            >
                                Xin chào {currentUser?.name || "Admin"}
                            </Title>
                        </Flex>

                        <Flex align="center" gap={16}>
                            <Input
                                placeholder="Tìm kiếm..."
                                prefix={<SearchOutlined style={{ color: "rgba(20,17,15,0.35)", marginRight: 4 }} />}
                                style={{
                                    width: 280,
                                    borderRadius: 999,
                                    background: "rgba(20,17,15,0.04)",
                                    border: "1px solid rgba(20,17,15,0.07)",
                                    height: 42,
                                    fontSize: 14
                                }}
                            />
                        </Flex>
                    </Header>

                    <Content
                        style={{
                            margin: "26px",
                            minHeight: 280
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <AIAgent />

            <Drawer
                title={
                    <Flex align="center" gap={8}>
                        <img src={logoImage} alt="Logo" style={{ height: 24 }} />
                        <Text strong>
                            Camdo <span style={{ color: "#b99256" }}>Luxury</span>
                        </Text>
                    </Flex>
                }
                placement="left"
                onClose={closeDrawer}
                open={drawerVisible}
                styles={{ body: { padding: 0 } }}
            >
                <Menu
                    mode="inline"
                    selectedKeys={activeMenuKey}
                    items={menuItems}
                    onClick={(e) => {
                        handleMenuClick(e);
                        closeDrawer();
                    }}
                    style={{ borderInlineEnd: "none" }}
                />
                <div style={{ padding: 16 }}>
                    <Button danger block icon={<LogoutOutlined />} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default AdminLayout;
