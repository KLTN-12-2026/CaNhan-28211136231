// [UI ONLY] Camdo Luxury — ProductsPage
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/product.type";
import { Alert, Button, Checkbox, Flex, Input, Pagination, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const ProductsPage = () => {
    const { categories } = useCategories();

    const [checkedCategories, setCheckedCategories] = useState<number[]>([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const { productsPage, isLoading, isError, error } = useProducts({
        page: currentPage,
        size: pageSize,
        name: searchText,
        categoryIds: checkedCategories,
        status: "LIQUIDATION"
    });

    const handleCategoryChange = (checkedValues: number[]) => {
        setCheckedCategories(checkedValues);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) setPageSize(pageSize);
    };

    const handleClearFilters = () => {
        setCheckedCategories([]);
        setSearchText("");
        setCurrentPage(1);
    };

    if (isError) return <Alert message="Error" description={(error as Error).message} type="error" />;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(value);
    };

    return (
        <div className="product-page-container lux-page">
            {/* ---------------- Filter rail ---------------- */}
            <aside className="lux-filter">
                <div className="lux-filter__block">
                    <Text className="lux-eyebrow">Tìm kiếm</Text>
                    <Input.Search
                        placeholder="Tên sản phẩm..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{ marginTop: 14 }}
                    />
                </div>

                <div className="lux-filter__block">
                    <Text className="lux-eyebrow">Loại sản phẩm</Text>
                    <Checkbox.Group style={{ width: "100%" }} value={checkedCategories} onChange={handleCategoryChange}>
                        <Flex vertical gap={12} style={{ marginTop: 14 }}>
                            {categories
                                ?.filter((opt: any) => opt.isActive !== false)
                                .map((opt: any) => (
                                    <Checkbox key={opt.id} value={opt.id} style={{ fontSize: 14 }}>
                                        {opt.name}
                                    </Checkbox>
                                ))}
                        </Flex>
                    </Checkbox.Group>
                </div>

                <Button block onClick={handleClearFilters} className="lux-btn-ghost">
                    Xóa bộ lọc
                </Button>
            </aside>

            {/* ---------------- Grid ---------------- */}
            <div className="content">
                <Flex justify="space-between" align="flex-end" style={{ marginBottom: 28 }} wrap gap={12}>
                    <Flex vertical gap={6}>
                        <Text className="lux-eyebrow">Danh mục</Text>
                        <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                            Sản phẩm đang thanh lý
                        </Title>
                    </Flex>
                    <Text type="secondary">{productsPage?.totalElements || 0} sản phẩm</Text>
                </Flex>

                <div className="lux-product-grid">
                    {productsPage?.data?.map((product: Product) => {
                        const isOutOfStock =
                            (product.availableQty ?? product.stockQty) <= 0 || product.status === "SOLD_OUT";

                        return (
                            <Link
                                to={`/products/${product.id}`}
                                key={product.id}
                                style={{ textDecoration: "none", display: "block" }}
                            >
                                <div
                                    className={isOutOfStock ? undefined : "product-card-hover"}
                                    style={{
                                        background: "#fffdfa",
                                        borderRadius: 18,
                                        overflow: "hidden",
                                        boxShadow: "0 14px 40px -28px rgba(20,17,15,0.5)",
                                        border: "1px solid rgba(20,17,15,0.09)",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        transition: "box-shadow 0.4s var(--lux-ease), transform 0.4s var(--lux-ease)",
                                        filter: isOutOfStock ? "grayscale(0.65)" : "none",
                                        opacity: isOutOfStock ? 0.72 : 1
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: 216,
                                            background: "#f2ece1",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <img
                                            src={
                                                product.image && product.image !== "string"
                                                    ? product.image
                                                    : "https://placehold.co/400x300/f2ece1/b0a89a?text=No+Image"
                                            }
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: "transform 0.6s var(--lux-ease)",
                                                display: "block"
                                            }}
                                            className="product-card-img"
                                        />

                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "linear-gradient(to top, rgba(20,17,15,0.24) 0%, transparent 58%)",
                                                pointerEvents: "none"
                                            }}
                                        />

                                        <div style={{ position: "absolute", top: 12, left: 12 }}>
                                            {isOutOfStock ? (
                                                <span className="lux-chip lux-chip--dark">Hết hàng</span>
                                            ) : (
                                                <span className="lux-chip lux-chip--gold">Thanh lý</span>
                                            )}
                                        </div>

                                        <div style={{ position: "absolute", top: 12, right: 12 }}>
                                            <span className="lux-chip lux-chip--paper">
                                                {product.category?.name || "Không có danh mục"}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            padding: "20px 22px 22px",
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 12
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: "#1b1714",
                                                lineHeight: 1.45,
                                                flex: 1,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {product.name}
                                        </div>

                                        <div style={{ height: 1, background: "rgba(20,17,15,0.08)" }} />

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            {isOutOfStock ? (
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 600,
                                                        color: "#b5aca1",
                                                        letterSpacing: "0.02em"
                                                    }}
                                                >
                                                    Không còn hàng
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 800,
                                                        color: "#8d6b36",
                                                        letterSpacing: "-0.02em",
                                                        fontFamily: "var(--lux-font-display)"
                                                    }}
                                                >
                                                    {formatCurrency(product.price)}
                                                </span>
                                            )}

                                            {!isOutOfStock && (
                                                <div
                                                    style={{
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: "50%",
                                                        background: "#14110f",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "#d8b978",
                                                        fontSize: 15,
                                                        flexShrink: 0,
                                                        transition: "transform 0.25s var(--lux-ease)"
                                                    }}
                                                    className="card-arrow"
                                                >
                                                    →
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {productsPage?.data?.length === 0 && !isLoading && (
                    <div className="lux-empty">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
                            alt="Empty"
                            style={{ width: 190, marginBottom: 18, opacity: 0.7 }}
                        />
                        <Title level={4} style={{ fontWeight: 600 }}>
                            Không tìm thấy sản phẩm nào
                        </Title>
                        <Text type="secondary">Vui lòng thử điều chỉnh bộ lọc của bạn</Text>
                    </div>
                )}

                <div className="pagination-container" style={{ marginTop: 52, display: "flex", justifyContent: "center" }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={productsPage?.totalElements}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
