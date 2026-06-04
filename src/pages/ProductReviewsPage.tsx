import { useState } from "react";
import { Link } from "react-router-dom";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABoCj7xaqBkBQ9xs2chjdJ2tWOhMWjYth2JTrTqm1jfRwQhCVs4Ng54nBIpLQ-qB-9PJiKhsoHNG40s6j__z8dMJsmNEPxECn935qAWd1zoY0WgkK9hR8doaiUv26kKJiBcGEuuGxgnhJUMmCi_bHySyDPAt-Xn8TUlVf9odJML6nZ5rJWnJwA6Fv5_p8KSLHd5oDfZDmI2G6x7R5fUYNdFTBjFVNDyYxeXd9owsDB5-0fI6CrDCVn8ZBd_-HtFHmWIdQ7CIoTg8_jiNk";

const REVIEW_IMAGE_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVMMWhd8aQJzGgvxJ7mtEbPGXAsYIuQKJtalNnXSEkkzGmd-HL8N3HPBmqV_Ov4OqfQacOXwz3dDiJfItgOXoxCUzYwcLE3qwnadvPvxiB6U0bsO8t0akWhes0lbMuEQeM13Qhf0mmuJ2qXskbbmrtn76DgNaLEsYGE9jYqoPZixVlR5TgOV93YbTcKkmNabUoS0veJpmCCepi4YuergA1HwxNuLx9qcTXdNXOzfhQ3KUqxveBgVnRk5ajFtBHvNVAz_Zl0BCduTO4tQk";

const REVIEW_IMAGE_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC36tV6gL8X2mcxEpEA3qy3HVl5IwyG-bKu6xVX_NWi63TUdaEc9Irp7ZweT5M0pFR3Qjjev77AEVy-2nLq62I3STvw5CeGgTcjXx2RfPNlT6DdaVLyEQmWW2vpT9NP0ZwcSDiPPSTI5z0OfTMaIGl3Pj7XmvT7cuUaiFNQYFK0pjRAU-gbnkmAq2G_YQ37T5MshgE10CS7XSDybLs-glnd8_FwYwgbTPI0oxSbtqYqcWRd8R6A54haRS6_vmL7z3J0jyBZ2xBbKSY3R6k";

type FilterId = "all" | "5star" | "photo";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "5star", label: "5 Sao (980)" },
  { id: "photo", label: "Có ảnh (450)" },
];

const STAR_FILL = { fontVariationSettings: "'FILL' 1" } as const;

function FilledStars({ size = 24 }: { size?: number }) {
  const sizeClass = size === 16 ? "text-[16px]" : "";
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`material-symbols-outlined ${sizeClass}`} style={STAR_FILL}>
          star
        </span>
      ))}
    </>
  );
}

function filterButtonClass(active: boolean) {
  return active
    ? "px-4 py-2 border border-primary text-primary font-label-md text-label-md uppercase rounded-lg hover:bg-primary hover:text-white transition-colors"
    : "px-4 py-2 border border-outline-variant text-on-surface-variant font-label-md text-label-md uppercase rounded-lg";
}

export default function ProductReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  return (
    <div className="product-reviews-page bg-background text-on-surface antialiased min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-surface-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-7xl mx-auto">
          <Link
            to="/tim-kiem"
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </Link>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary uppercase">
            <img
              src={LOGO_SRC}
              alt="AoVie Logo"
              className="h-8 w-auto object-contain mx-auto"
            />
          </h1>
          <Link
            to="/thanh-toan"
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-24 max-w-7xl mx-auto px-container-padding">
        {/* Summary Header Section */}
        <section className="mb-section-gap py-6 border-b border-outline-variant">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-primary">5</span>
              <span className="font-headline-md text-headline-md text-on-surface-variant">/ 5</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-1 text-secondary">
                <FilledStars />
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Dựa trên 1,248 lượt đánh giá thực tế
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={filterButtonClass(activeFilter === filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <div className="space-y-10">
          {/* Review Item 1 */}
          <article className="flex flex-col gap-4 group">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="font-body-md text-body-md font-bold text-primary">ng***1</h3>
                <div className="flex items-center gap-1 text-secondary mt-1">
                  <FilledStars size={16} />
                </div>
              </div>
              <span className="font-label-md text-label-md text-outline">12/10/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-surface-container font-label-md text-label-md text-on-surface-variant rounded">
                Phân loại: Áo Thun Unisex - 100% COTTON - “Bánh Mì” / Size L
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
              Chất vải rất dày dặn, đúng chuẩn cotton 100%. Form áo rộng rãi thoải mái cực kỳ, mặc lên
              rất đẹp đúng vibe mình thích. Giao hàng nhanh và đóng gói rất cẩn thận.
            </p>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <div className="w-32 h-40 flex-shrink-0 bg-surface-variant rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-110 transition-transform duration-500"
                  data-alt="A close-up photograph of a premium white cotton t-shirt with a vintage texture, hanging on a rustic wooden wall. The lighting is soft and natural, emphasizing the heavy grain of the fabric and the minimalist construction. The scene evokes a nostalgic, 1990s aesthetic with warm earth tones and a clean, high-quality retail feel."
                  src={REVIEW_IMAGE_1}
                  alt=""
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                Hữu ích (24)
              </button>
            </div>
          </article>

          {/* Separator */}
          <div className="h-px bg-outline-variant/30 w-full"></div>

          {/* Review Item 2 */}
          <article className="flex flex-col gap-4 group">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="font-body-md text-body-md font-bold text-primary">mi***_h</h3>
                <div className="flex items-center gap-1 text-secondary mt-1">
                  <FilledStars size={16} />
                </div>
              </div>
              <span className="font-label-md text-label-md text-outline">08/10/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-surface-container font-label-md text-label-md text-on-surface-variant rounded">
                Phân loại: Túi Tote Canvas In Hình Tháp Rùa / 1 Size
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
              Túi to hơn mình nghĩ, đựng được cả laptop 14 inch. Quai đeo chắc chắn, đường may đều và
              đẹp. Màu đen hơi bám bụi một chút nhưng phủi là sạch. Rất hài lòng với chất lượng so với
              giá tiền.
            </p>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <div className="w-32 h-40 flex-shrink-0 bg-surface-variant rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale-[20%] hover:scale-110 transition-transform duration-500"
                  data-alt="A detailed shot of a black canvas tote bag with clean, minimalist lines. The bag is placed against a textured concrete wall, reflecting a rugged urban utility aesthetic. The lighting is dramatic yet soft, highlighting the high-quality stitching and the deep black tone of the durable fabric in a high-end lookbook style."
                  src={REVIEW_IMAGE_2}
                  alt=""
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                Hữu ích (12)
              </button>
            </div>
          </article>

          {/* Separator */}
          <div className="h-px bg-outline-variant/30 w-full"></div>

          {/* Review Item 3 (No images) */}
          <article className="flex flex-col gap-4 group">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="font-body-md text-body-md font-bold text-primary">tr***an</h3>
                <div className="flex items-center gap-1 text-secondary mt-1">
                  <FilledStars size={16} />
                </div>
              </div>
              <span className="font-label-md text-label-md text-outline">05/10/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-surface-container font-label-md text-label-md text-on-surface-variant rounded">
                Phân loại: Áo Thun Unisex{"\u00a0"} - 100% COTTON - &quot;Nón Lá&quot; / Size M
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
              Áo xinh lắm luôn, chất liệu mặc rất thoáng mát. Sẽ ủng hộ shop lâu dài nha!!
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                Hữu ích (5)
              </button>
            </div>
          </article>
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button
            type="button"
            className="w-full md:w-auto px-12 py-3 border border-primary text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Xem thêm đánh giá
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface dark:bg-inverse-surface border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors py-1 flex-1"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors py-1 flex-1"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed py-1 flex-1 transition-colors hover:bg-surface-container-low dark:hover:bg-surface-container-highest relative"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
          <div className="absolute bottom-0 w-1 h-1 bg-secondary dark:bg-secondary-fixed rounded-full"></div>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors py-1 flex-1"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors py-1 flex-1"
          to="/toi"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Tôi</span>
        </Link>
      </nav>
    </div>
  );
}
