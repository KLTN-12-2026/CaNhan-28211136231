import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import ErrorToast from "./components/ErrorToast";
import { router } from "./router/AppRouter";

// [UI ONLY] Global theme configuration for Ant Design v5 — Camdo Luxury
const themeConfig = {
    token: {
        colorPrimary: "#b99256",
        colorSuccess: "#4f7a52",
        colorWarning: "#c08a3e",
        colorError: "#9a3b2f",
        colorInfo: "#8d6b36",
        colorBgLayout: "#f7f3ec",
        colorBgContainer: "#fffdfa",
        colorBgElevated: "#fffdfa",
        colorText: "#1b1714",
        colorTextSecondary: "#6d6459",
        colorTextTertiary: "#9a9086",
        colorBorder: "rgba(20, 17, 15, 0.12)",
        colorBorderSecondary: "rgba(20, 17, 15, 0.07)",
        borderRadius: 12,
        borderRadiusLG: 18,
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        wireframe: false
    },
    components: {
        Card: {
            boxShadowTertiary: "0 18px 50px -28px rgba(20,17,15,0.45)",
            headerBg: "transparent"
        },
        Button: {
            controlHeight: 42,
            paddingContentHorizontal: 22,
            primaryShadow: "none",
            fontWeight: 600,
            defaultShadow: "none"
        },
        Table: {
            headerBg: "#f2ece1",
            headerColor: "#4b443c",
            borderRadius: 12,
            rowHoverBg: "#faf6ef"
        },
        Input: {
            activeShadow: "0 0 0 3px rgba(185,146,86,0.14)",
            paddingBlock: 10
        },
        Select: {
            activeOutlineColor: "rgba(185,146,86,0.14)"
        },
        Tag: {
            borderRadiusSM: 999
        },
        Menu: {
            itemBorderRadius: 10,
            darkItemBg: "#14110f",
            darkSubMenuItemBg: "#14110f"
        },
        Tabs: {
            inkBarColor: "#b99256",
            itemSelectedColor: "#8d6b36"
        },
        Modal: {
            titleFontSize: 20
        },
        Descriptions: {
            labelBg: "#f2ece1"
        }
    }
};

function App() {
    return (
        <ConfigProvider theme={themeConfig}>
            <RouterProvider router={router} />
            <ErrorToast />
        </ConfigProvider>
    );
}

export default App;
