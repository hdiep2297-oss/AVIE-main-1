import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type OrderTab = "all" | "pending" | "shipping" | "delivered" | "cancelled";

interface PendingOrder {
  code: string;
  headerPrice: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  variant: string;
  quantity: string;
  productCount: string;
  totalPrice: string;
}

const TABS: { id: OrderTab; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "shipping", label: "Đang giao" },
  { id: "delivered", label: "Đã giao" },
  { id: "cancelled", label: "Đã hủy" },
];

const PENDING_ORDERS: PendingOrder[] = [
  {
    code: "AV2409101",
    headerPrice: "225.000đ",
    imageSrc: "https://i.ibb.co/PG3p6wTs/6.png",
    imageAlt: "Áo Thun Classic Cotton 'Saigon Soul'",
    title: "Áo Thun Unisex - 100% COTTON - “Bánh Mì”",
    variant: "Phân loại: Đen / Size L",
    quantity: "Số lượng: x1",
    productCount: "1 sản phẩm",
    totalPrice: "225.000đ",
  },
  {
    code: "AV2409102",
    headerPrice: "225.000đ",
    imageSrc: "https://i.ibb.co/zhP9w9gz/10.png",
    imageAlt: "Túi Tote Vải Canvas Thêu Tay",
    title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
    variant: "Phân loại: Đen / Size M",
    quantity: "Số lượng: x1",
    productCount: "1 sản phẩm",
    totalPrice: "225.000đ",
  },
  {
    code: "AV2409105",
    headerPrice: "450.000đ",
    imageSrc: "https://i.ibb.co/hxBR2WM3/3.png",
    imageAlt: "Áo Oversized 'Hoài Niệm' Graphic",
    title: "Áo Thun Unisex - 100% Cotton - “Độc Lập”",
    variant: "Phân loại: Đen / Size XL",
    quantity: "Số lượng: x2",
    productCount: "2 sản phẩm",
    totalPrice: "450.000đ",
  },
];

function tabLinkClass(active: boolean) {
  return active
    ? "text-secondary border-b-2 border-secondary h-full flex items-center font-label-md text-label-md uppercase tracking-wider whitespace-nowrap font-sans"
    : "text-on-surface-variant font-label-md text-label-md uppercase tracking-wider whitespace-nowrap font-sans";
}

function PendingOrderCard({
  order,
  onDetail,
  onCancel,
}: {
  order: PendingOrder;
  onDetail: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-surface p-4 border border-outline-variant rounded-none transition-all hover:bg-surface-container-low">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-outline-variant/30">
        <span className="font-label-md text-label-md text-on-surface-variant font-sans">
          Mã: #{order.code}
        </span>
        <span className="font-label-md text-label-md text-secondary uppercase tracking-tighter font-sans">
          {order.headerPrice}
        </span>
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-32 bg-surface-variant flex-shrink-0">
          <img alt={order.imageAlt} className="w-full h-full object-cover" src={order.imageSrc} />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary leading-tight font-sans">
              {order.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 font-sans">{order.variant}</p>
            <p className="font-body-md text-body-md text-on-surface-variant font-sans">{order.quantity}</p>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-label-md text-label-md text-on-surface-variant font-sans">
              {order.productCount}
            </span>
            <span className="font-headline-md text-headline-md text-secondary font-sans">{order.totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
        <button
          type="button"
          onClick={onDetail}
          className="px-6 py-2 border border-primary text-primary font-label-md text-label-md uppercase hover:bg-primary hover:text-white transition-colors font-sans"
        >
          Chi tiết
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-primary text-white font-label-md text-label-md uppercase hover:opacity-90 transition-opacity font-sans"
        >
          Hủy đơn
        </button>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderTab>("pending");

  const showPendingList = activeTab === "pending" || activeTab === "all";

  useEffect(() => {
    const cards = document.querySelectorAll(".bg-surface.p-4");
    const handlers: Array<{ card: Element; start: () => void; end: () => void }> = [];

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const start = () => {
        el.style.transform = "scale(0.98)";
      };
      const end = () => {
        el.style.transform = "scale(1)";
      };
      el.addEventListener("touchstart", start);
      el.addEventListener("touchend", end);
      handlers.push({ card, start, end });
    });

    return () => {
      handlers.forEach(({ card, start, end }) => {
        card.removeEventListener("touchstart", start);
        card.removeEventListener("touchend", end);
      });
    };
  }, [activeTab, showPendingList]);

  const handleCancelOrder = (code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${code}?`)) {
      alert(`Đơn hàng #${code} đã được hủy.`);
    }
  };

  return (
    <div
      className="bg-background text-on-background min-h-screen flex flex-col font-sans"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate("/tim-kiem")}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-widest text-primary uppercase font-sans">
            AoVie
          </h1>
          <button
            type="button"
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate("/thanh-toan")}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-20">
        {/* Sticky Order Tabs */}
        <div className="sticky top-16 z-40 bg-surface border-b border-outline-variant overflow-x-auto hide-scrollbar">
          <nav className="flex px-4 space-x-8 min-w-max h-12 items-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={tabLinkClass(activeTab === tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Order List */}
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
          {showPendingList &&
            PENDING_ORDERS.map((order) => (
              <PendingOrderCard
                key={order.code}
                order={order}
                onDetail={() => navigate("/chi-tiet-don-hang")}
                onCancel={() => handleCancelOrder(order.code)}
              />
            ))}

          {/* Empty State Illustration (Subtle) */}
          <div className="pt-10 flex flex-col items-center opacity-30 select-none">
            <span className="material-symbols-outlined text-6xl mb-2">shopping_bag</span>
            <p className="font-label-md text-label-md uppercase font-sans">Hết danh sách đơn hàng</p>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full">
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/trang-chu"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-label-md font-sans">Trang chủ</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/danh-muc"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-label-md font-sans">Danh mục</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:scale-90 transition-transform"
            to="/don-hang"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              receipt_long
            </span>
            <span className="font-label-md text-label-md font-sans">Đơn hàng</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/thong-bao"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-label-md font-sans">Thông báo</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/toi"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-label-md font-sans">Tôi</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
