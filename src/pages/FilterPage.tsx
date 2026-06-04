import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SORT_OPTIONS = ["Mới nhất", "Giá: Thấp đến Cao", "Giá: Cao đến Thấp"] as const;
const SIZES = ["S", "M", "L", "XL"] as const;
const PRICE_PRESETS = ["0 - 200k", "200k - 500k", "500k - 1tr"] as const;
const CATEGORIES = ["Áo thun", "Túi"] as const;

const SORT_ACTIVE =
  "px-5 py-2.5 border-2 border-secondary bg-secondary/5 text-secondary font-label-md text-label-md rounded-lg active:scale-95 transition-all";
const SORT_INACTIVE =
  "px-5 py-2.5 border border-outline text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all active:scale-95";

const SIZE_ACTIVE =
  "h-12 flex items-center justify-center border-2 border-secondary bg-secondary/5 text-secondary font-label-md text-label-md rounded uppercase transition-all active:scale-95";
const SIZE_INACTIVE =
  "h-12 flex items-center justify-center border border-outline text-on-surface-variant font-label-md text-label-md rounded uppercase hover:bg-secondary/10 hover:border-secondary transition-all active:scale-95";

const CHECK_FILL = { fontVariationSettings: "'FILL' 1" } as const;

const HIDDEN_BG_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYkIYGEqlZt9wpoKCMu1YUUxU25Gx1IRzTwB5oN4fjmkr43vPLNfTlAvwxHZGz3LNMNVE18zF9D73O8mSXUDaOCBNUdfRX8NLsAW_a__qkP2eObn7KbukkWWEp76EvDh9r91hTHWdQtR3OYxmNt9Y5AWgC23dC53mAzTKKNTJaFgPhaVjjGHejmuXfiDBLBcbvVyhYVwYT7kQZj6YKZfc4DL5jQTApv6QRj_W4K4ZSwScjoppNyk-UYYbZ1pkBPLprynqX8_4hw7P6";

export default function FilterPage() {
  const navigate = useNavigate();
  const [sortIndex, setSortIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(1);
  const [colorDen, setColorDen] = useState(true);
  const [colorTrang, setColorTrang] = useState(false);
  const [colorHong, setColorHong] = useState(false);

  const handleClearAll = () => {
    setSortIndex(0);
    setSizeIndex(1);
    setColorDen(true);
    setColorTrang(false);
    setColorHong(false);
  };

  return (
    <div className="filter-page bg-background text-on-background min-h-screen flex flex-col">
      {/* Top App Bar (Header) */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="active:scale-95 transition-transform duration-200"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            Bộ lọc
          </h1>
        </div>
        <button
          type="button"
          className="font-label-md text-label-md text-secondary hover:opacity-80 transition-opacity active:scale-95"
          onClick={handleClearAll}
        >
          Xóa tất cả
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col max-w-screen-xl mx-auto w-full px-container-padding py-6 gap-section-gap overflow-y-auto custom-scrollbar pb-32">
        {/* Sắp xếp theo */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Sắp xếp theo</h2>
          <div className="flex flex-wrap gap-3">
            {SORT_OPTIONS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setSortIndex(index)}
                className={sortIndex === index ? SORT_ACTIVE : SORT_INACTIVE}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Khoảng giá */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Khoảng giá</h2>
          <div className="px-2">
            <div className="relative w-full h-1 bg-outline-variant rounded-full mb-8">
              <div className="absolute left-0 right-1/4 h-full bg-secondary rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-2 border-secondary rounded-full shadow-sm cursor-pointer"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-2 border-secondary rounded-full shadow-sm cursor-pointer"></div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-label-md text-label-md text-outline uppercase">Tối thiểu</span>
                <div className="bg-surface-container border border-outline-variant px-4 py-3 rounded text-on-surface font-body-md text-body-md">
                  0đ
                </div>
              </div>
              <div className="h-px w-4 bg-outline-variant mt-5"></div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-label-md text-label-md text-outline uppercase">Tối đa</span>
                <div className="bg-surface-container border border-outline-variant px-4 py-3 rounded text-on-surface font-body-md text-body-md">
                  1.500.000đ
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRICE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className="px-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface-variant rounded font-label-md text-label-md hover:border-secondary transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </section>

        {/* Kích thước */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Kích thước</h2>
          <div className="grid grid-cols-4 gap-3">
            {SIZES.map((size, index) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizeIndex(index)}
                className={sizeIndex === index ? SIZE_ACTIVE : SIZE_INACTIVE}
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Màu sắc */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Màu sắc</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                checked={colorDen}
                onChange={() => setColorDen((v) => !v)}
                className="hidden peer"
                type="checkbox"
              />
              <div className="w-8 h-8 rounded-full border border-outline bg-black"></div>
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Đen
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={CHECK_FILL}
              >
                check_circle
              </span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                checked={colorTrang}
                onChange={() => setColorTrang((v) => !v)}
                className="hidden peer"
                type="checkbox"
              />
              <div className="w-8 h-8 rounded-full border border-outline-variant bg-white"></div>
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Trắng
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={CHECK_FILL}
              >
                check_circle
              </span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                checked={colorHong}
                onChange={() => setColorHong((v) => !v)}
                className="hidden peer"
                type="checkbox"
              />
              <div className="w-8 h-8 rounded-full border border-outline-variant bg-[#FFC0CB]"></div>
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Hồng
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={CHECK_FILL}
              >
                check_circle
              </span>
            </label>
          </div>
        </section>

        {/* Dynamic Category Tags (Contextual Filter) */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-1 gap-2">
            {CATEGORIES.map((name) => (
              <div
                key={name}
                className="flex items-center justify-between py-3 border-b border-outline-variant"
              >
                <span className="font-body-lg text-body-lg text-on-surface-variant">{name}</span>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-container-padding bg-surface/95 backdrop-blur-sm border-t border-outline-variant flex items-center justify-center z-50">
        <div className="w-full max-w-screen-xl flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-grow bg-primary text-on-primary font-label-md text-label-md py-4 rounded shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all"
          >
            ÁP DỤNG
          </button>
        </div>
      </div>

      {/* Hidden visual for background reference */}
      <div className="hidden">
        <img
          data-alt="A moody, atmospheric shot of a vintage Vietnamese tailoring shop in a Saigon alleyway. Warm low-key sunlight filters through old wooden shutters, casting long shadows on textured earthy walls. Minimalist street fashion garments hang neatly on simple brass rails. The color palette consists of deep browns, sun-baked tans, and muted brick reds, evoking a nostalgic yet modern luxury vibe."
          src={HIDDEN_BG_SRC}
          alt=""
        />
      </div>
    </div>
  );
}
