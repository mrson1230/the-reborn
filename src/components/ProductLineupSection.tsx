import React, { useState, useMemo } from 'react';
import { Search, Check, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/products';

interface ProductLineupSectionProps {
  selectedProducts: Product[];
  onToggleProduct: (product: Product, slotIndex?: 0 | 1) => void;
  onRemoveProduct?: (index: 0 | 1) => void;
  onGoToForm: () => void;
}

type BrandFilter = 'lg' | 'samsung' | 'bodyfriend' | 'cuckoo' | 'all';

// Helper to format the gray spec strip: "[용량/크기] | [모델코드]" exactly like reference image
function getProductSpecStrip(product: Product): string {
  const combined = [product.name, ...(product.specs || [])].join(' ');

  // 1. CM match: e.g. 68 cm, 163cm, 108 cm, 214 cm
  const cmMatch = combined.match(/(\d+\s*cm)/i);
  if (cmMatch) return `${cmMatch[1].trim()} | ${product.modelCode}`;

  // 2. Liter match: e.g. 870L, 200 L, 128L, 832L
  const literMatch = combined.match(/(\d+\s*L)/i);
  if (literMatch) return `${literMatch[1].trim()} | ${product.modelCode}`;

  // 3. KG match: e.g. 24kg, 21kg, 16kg
  const kgMatch = combined.match(/(\d+\s*kg)/i);
  if (kgMatch) return `${kgMatch[1].trim()} | ${product.modelCode}`;

  // 4. 형 / 인치 match: e.g. 85형, 65형, 43형, 75인치
  const inchMatch = combined.match(/(\d+\s*(?:형|인치))/i);
  if (inchMatch) return `${inchMatch[1].trim()} | ${product.modelCode}`;

  // 5. Pyeong (평) match for air conditioners: e.g. 18평, 17평
  const pyMatch = combined.match(/(\d+\s*평)/i);
  if (pyMatch) return `${pyMatch[1].trim()} | ${product.modelCode}`;

  // 6. Fallback: category name or first spec keyword
  return `${product.categoryName.split('/')[0].trim()} | ${product.modelCode}`;
}

export const ProductLineupSection: React.FC<ProductLineupSectionProps> = ({
  selectedProducts,
  onToggleProduct,
  onRemoveProduct,
  onGoToForm,
}) => {
  // Default to 'lg' exactly matching the reference screenshot
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>('lg');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const product1 = selectedProducts[0];
  const product2 = selectedProducts[1];
  const selectedCount = (product1 ? 1 : 0) + (product2 ? 1 : 0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      let matchBrand = true;
      if (selectedBrand === 'lg') {
        matchBrand = p.brand === 'lg' || p.brandName.includes('LG');
      } else if (selectedBrand === 'samsung') {
        matchBrand = p.brand === 'samsung' || p.brandName.includes('삼성');
      } else if (selectedBrand === 'bodyfriend') {
        matchBrand =
          ['바디프랜드', '세라젬', '브람스', '코지마', '리진바이오', '올리즈', '비에스소닉'].includes(p.brandName) ||
          p.category === 'wellness';
      } else if (selectedBrand === 'cuckoo') {
        matchBrand = p.brandName.includes('쿠쿠');
      }

      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modelCode.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBrand && matchSearch;
    });
  }, [selectedBrand, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleCardClick = (product: Product) => {
    onToggleProduct(product);
  };

  return (
    <section id="lineup" className="py-12 sm:py-16 bg-[#F8FAFD] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>최대 2개 가전제품 동시 지원</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            더리본 가전지원 공식 라인업
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            원하시는 가전을 <strong className="text-blue-600 font-extrabold">2개까지 선택</strong>하시면 본인부담금 0원으로 동시에 지원됩니다.
          </p>
        </div>

        {/* 1. Brand Selection Tabs - Exactly matching reference screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mb-6">
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('lg');
              setVisibleCount(24);
            }}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              selectedBrand === 'lg'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            LG
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('samsung');
              setVisibleCount(24);
            }}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              selectedBrand === 'samsung'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            삼성
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('bodyfriend');
              setVisibleCount(24);
            }}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              selectedBrand === 'bodyfriend'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            바디프랜드
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('cuckoo');
              setVisibleCount(24);
            }}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              selectedBrand === 'cuckoo'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            쿠쿠
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('all');
              setVisibleCount(24);
            }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
              selectedBrand === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            전체
          </button>
        </div>

        {/* 2. Selection Summary Bar - Exactly matching reference screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs px-4 sm:px-6 py-3.5 mb-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 w-full md:w-auto">
            {/* Selection Count */}
            <div className="flex items-center gap-1 font-extrabold text-slate-900 text-xs sm:text-sm shrink-0">
              <span>선택</span>
              <span className="text-blue-600 font-mono text-sm sm:text-base">{selectedCount}</span>
              <span className="text-slate-400">/</span>
              <span className="font-mono">2</span>
            </div>

            {/* 1st Choice */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                product1
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                {product1 ? `1순위: ${product1.name}` : '1순위 미선택'}
              </span>
              {product1 && onRemoveProduct && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveProduct(0);
                  }}
                  title="선택 해제"
                  className="hover:text-rose-600 text-slate-400 font-bold ml-0.5 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 2nd Choice */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                product2
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                {product2 ? `2순위: ${product2.name}` : '2순위 미선택'}
              </span>
              {product2 && onRemoveProduct && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveProduct(1);
                  }}
                  title="선택 해제"
                  className="hover:text-rose-600 text-slate-400 font-bold ml-0.5 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium text-center">
              2개를 고르면 신청 화면으로 이동합니다
            </span>
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={onGoToForm}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
              >
                <span>신청서 작성</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Optional Search Bar for convenience */}
        <div className="flex justify-end mb-5">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="가전 모델명·제품명 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* 3. Product Cards Grid - Clean 4-column desktop, 2-column mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-700 font-bold text-sm">해당 조건에 일치하는 가전이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedBrand('all');
                setSearchQuery('');
                setVisibleCount(24);
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              전체 가전 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {displayedProducts.map((p) => {
              const isSlot1 = product1?.id === p.id;
              const isSlot2 = product2?.id === p.id;
              const isSelected = isSlot1 || isSlot2;
              const specStrip = getProductSpecStrip(p);

              return (
                <div
                  key={p.id}
                  onClick={() => handleCardClick(p)}
                  className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group select-none shadow-2xs hover:shadow-md ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-slate-200/90 hover:border-blue-400'
                  }`}
                >
                  {/* Top Image Box */}
                  <div>
                    <div className="relative h-44 sm:h-52 w-full p-4 flex items-center justify-center bg-white">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                        }}
                      />
                      {/* Active Slot Badge */}
                      {isSlot1 && (
                        <span className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>1순위</span>
                        </span>
                      )}
                      {isSlot2 && (
                        <span className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>2순위</span>
                        </span>
                      )}
                    </div>

                    {/* Middle Gray Spec Strip: "[용량/크기] | [모델코드]" */}
                    <div className="bg-[#E5E7EB] py-1.5 px-2.5 text-center border-y border-slate-200/60">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 truncate block tracking-tight">
                        {specStrip}
                      </span>
                    </div>

                    {/* Product Name */}
                    <div className="p-3 text-center">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Text Button: 선택 */}
                  <div className="pb-3.5 text-center">
                    <button
                      type="button"
                      className={`text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-blue-600 font-black'
                          : 'text-blue-600 group-hover:text-blue-700 group-hover:underline'
                      }`}
                    >
                      {isSlot1 ? '1순위 선택됨' : isSlot2 ? '2순위 선택됨' : '선택'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>더 많은 가전 보기 ({displayedProducts.length} / {filteredProducts.length}개)</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
