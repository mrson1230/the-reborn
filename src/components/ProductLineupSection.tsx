import React, { useState, useMemo } from 'react';
import { Search, Check, ArrowRight, Award, ShieldCheck, Flame, ChevronDown, Plus, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product, Brand, Category, ProductTier } from '../types';
import { PRODUCTS_DATA, CATEGORIES_FILTER, TIERS_FILTER } from '../data/products';

interface ProductLineupSectionProps {
  selectedProducts: Product[];
  onToggleProduct: (product: Product, slotIndex?: 0 | 1) => void;
  onRemoveProduct?: (index: 0 | 1) => void;
  onGoToForm: () => void;
}

export const ProductLineupSection: React.FC<ProductLineupSectionProps> = ({
  selectedProducts,
  onToggleProduct,
  onRemoveProduct,
  onGoToForm,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'cuckoo' | 'wellness' | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<ProductTier>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const product1 = selectedProducts[0];
  const product2 = selectedProducts[1];
  const selectedCount = (product1 ? 1 : 0) + (product2 ? 1 : 0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      let matchBrand = true;
      if (selectedBrand === 'samsung') matchBrand = p.brand === 'samsung';
      else if (selectedBrand === 'lg') matchBrand = p.brand === 'lg';
      else if (selectedBrand === 'cuckoo') matchBrand = p.brandName === '쿠쿠';
      else if (selectedBrand === 'wellness')
        matchBrand = ['브람스', '세라젬', '코지마', '리진바이오', '올리즈', '비에스소닉'].includes(p.brandName);
      else if (selectedBrand === 'other') matchBrand = p.brand === 'other';

      const matchTier = selectedTier === 'all' || p.tier === selectedTier;
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modelCode.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBrand && matchTier && matchCategory && matchSearch;
    });
  }, [selectedBrand, selectedTier, selectedCategory, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  const handleShowAll = () => {
    setVisibleCount(filteredProducts.length);
  };

  return (
    <section id="lineup" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>최대 2개 가전제품 동시 100% 전액 지원</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            더리본 100% 전액 지원 공식 가전 라인업
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            원하시는 가전을 <strong className="text-rose-600 font-extrabold">2개까지 선택</strong>하여 본인부담금 0원으로 동시에 지원받으실 수 있습니다.
          </p>
        </div>

        {/* Dual Selection Status Bar (Active Selection Basket) */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-lg border border-slate-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-extrabold text-sm sm:text-base">
                내가 선택한 가전 (총 <span className="text-rose-400 font-mono text-lg">{selectedCount}</span>/2개)
              </span>
              <span className="text-xs bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full">
                본인부담금 총 0원
              </span>
            </div>
            <div className="text-xs text-slate-300">
              * 아래 카탈로그에서 가전을 클릭하시면 1차·2차 가전으로 자동 선택/변경됩니다.
            </div>
          </div>

          {/* 2 Selected Slots Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Slot 1 */}
            <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
              product1
                ? 'bg-slate-800/90 border-rose-500/70 shadow-sm'
                : 'bg-slate-800/40 border-dashed border-slate-700'
            }`}>
              {product1 ? (
                <>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 p-1 flex items-center justify-center border border-slate-200">
                      <img
                        src={product1.image}
                        alt={product1.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold bg-rose-600 text-white px-1.5 py-0.2 rounded">
                          가전 ① (1순위)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{product1.brandName}</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-white truncate">
                        {product1.name}
                      </div>
                      <div className="text-[11px] text-rose-300 font-medium">
                        본인부담금 0원 · {product1.modelCode}
                      </div>
                    </div>
                  </div>
                  {onRemoveProduct && (
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(0)}
                      title="선택 해제"
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 py-1.5 text-slate-400 text-xs">
                  <div className="w-12 h-12 rounded-lg border border-dashed border-slate-600 flex items-center justify-center text-slate-500">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300 text-xs">가전 ①을 선택해 주세요</div>
                    <div className="text-[11px] text-slate-500">아래 목록에서 원하시는 가전 카드를 클릭하세요</div>
                  </div>
                </div>
              )}
            </div>

            {/* Slot 2 */}
            <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
              product2
                ? 'bg-slate-800/90 border-amber-500/70 shadow-sm'
                : 'bg-slate-800/40 border-dashed border-slate-700'
            }`}>
              {product2 ? (
                <>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 p-1 flex items-center justify-center border border-slate-200">
                      <img
                        src={product2.image}
                        alt={product2.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                          가전 ② (2순위)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{product2.brandName}</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-white truncate">
                        {product2.name}
                      </div>
                      <div className="text-[11px] text-amber-300 font-medium">
                        본인부담금 0원 · {product2.modelCode}
                      </div>
                    </div>
                  </div>
                  {onRemoveProduct && (
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(1)}
                      title="선택 해제"
                      className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 py-1.5 text-slate-400 text-xs">
                  <div className="w-12 h-12 rounded-lg border border-dashed border-slate-600 flex items-center justify-center text-slate-500">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300 text-xs">가전 ②를 추가 선택해 주세요</div>
                    <div className="text-[11px] text-slate-500">2번째 가전까지 모두 100% 전액 지원됩니다</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Go to Form CTA Bar */}
          <div className="mt-4 pt-3 border-t border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>가전 2종 패키지 구성 완료: 시중 출고가 대비 약 500만원 상당 전액지원</span>
            </div>
            <button
              type="button"
              onClick={onGoToForm}
              className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>선택한 가전 2종으로 무료 상담 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar: Tier, Brand, Category, Search */}
        <div className="space-y-4 mb-8">
          {/* 1. Membership Tier Filter Bar */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                <span>더리본 상품 등급별 라인업:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                조회된 가전: <strong className="text-rose-600">{filteredProducts.length}</strong> / 200대
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TIERS_FILTER.map((t) => {
                const isActive = selectedTier === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(t.id as ProductTier);
                      setVisibleCount(24);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/20'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    {t.id === 'triple_dia' && <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Brand Tabs & Search Input */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('all');
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedBrand === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체 제조사
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('samsung');
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBrand === 'samsung'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>삼성전자</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('lg');
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBrand === 'lg'
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>LG전자</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('cuckoo');
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBrand === 'cuckoo'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>쿠쿠 (정수기·주방)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('wellness');
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBrand === 'wellness'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>안마의자/헬스케어</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="가전명, 모델명(QNED, 비스포크 등)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* 3. Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES_FILTER.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id as Category);
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid - 2 columns on mobile for fast shopping app experience */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-700 font-bold text-base">선택하신 조건에 일치하는 가전이 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">
              검색어를 변경하거나 필터를 초기화해 보세요. (총 200대 가전 등록)
            </p>
            <button
              onClick={() => {
                setSelectedBrand('all');
                setSelectedTier('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setVisibleCount(24);
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
            >
              전체 200개 가전 다시보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {displayedProducts.map((p) => {
              const isSlot1 = product1?.id === p.id;
              const isSlot2 = product2?.id === p.id;
              const isSelected = isSlot1 || isSlot2;

              return (
                <div
                  key={p.id}
                  className={`group bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSlot1
                      ? 'border-rose-500 ring-2 ring-rose-500/25 shadow-md bg-rose-50/10'
                      : isSlot2
                      ? 'border-amber-500 ring-2 ring-amber-500/25 shadow-md bg-amber-50/10'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  {/* Card Media Preview */}
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center p-2 sm:p-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                        }}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Brand Label & Tier Label */}
                      <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 flex flex-wrap items-center gap-1">
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                            p.brand === 'samsung'
                              ? 'bg-blue-600 text-white'
                              : p.brand === 'lg'
                              ? 'bg-rose-700 text-white'
                              : 'bg-slate-800 text-white'
                          }`}
                        >
                          {p.brandName}
                        </span>
                        <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-xs">
                          {p.tierName}
                        </span>
                      </div>

                      {/* Selection Status Badge */}
                      <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex items-center gap-1">
                        {isSlot1 && (
                          <span className="text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded bg-rose-600 text-white shadow-xs flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                            <span>① 선택됨</span>
                          </span>
                        )}
                        {isSlot2 && (
                          <span className="text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded bg-amber-500 text-slate-950 shadow-xs flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                            <span>② 선택됨</span>
                          </span>
                        )}
                        {!isSelected && (
                          <span className="text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded bg-slate-900/80 text-white shadow-xs">
                            0원 지원
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-2.5 sm:p-4">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono mb-0.5 sm:mb-1">
                        <span className="truncate max-w-[100px] sm:max-w-[150px]">{p.modelCode}</span>
                        {p.badge && (
                          <span className="text-rose-600 font-sans font-bold text-[9px] sm:text-[10px] bg-rose-50 px-1 py-0.2 rounded shrink-0">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug mb-1 sm:mb-2 min-h-[32px] sm:min-h-[38px]">
                        {p.name}
                      </h3>

                      {/* Specs List (Desktop & Tablet) */}
                      <ul className="hidden sm:block space-y-1 mb-3 text-[11px] text-slate-600">
                        {p.specs.slice(0, 3).map((spec, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <Check className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Mobile 1-line Spec */}
                      <div className="sm:hidden text-[10px] text-slate-500 truncate mb-1.5">
                        {p.specs[0] || '공식 제조사 정품 미개봉'}
                      </div>

                      {/* Pricing Comparison */}
                      <div className="pt-1.5 sm:pt-2.5 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                          <span className="hidden sm:inline">시중 출고가</span>
                          <span className="line-through">{p.originalPrice}</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-rose-600">지원 적용가</span>
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-extrabold text-rose-600 tabular-nums">0</span>
                            <span className="text-[10px] sm:text-xs font-bold text-rose-600 ml-0.5">원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action: Slot 1 or Slot 2 Selection */}
                  <div className="p-2.5 sm:p-4 pt-0 space-y-1.5">
                    {isSelected ? (
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          onClick={() => onToggleProduct(p)}
                          className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                            isSlot1
                              ? 'bg-rose-600 text-white shadow-sm hover:bg-rose-700'
                              : 'bg-amber-500 text-slate-950 shadow-sm hover:bg-amber-600'
                          }`}
                        >
                          <span>{isSlot1 ? '① 해제' : '② 해제'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={onGoToForm}
                          title="신청서로 바로 이동"
                          className="py-2 sm:py-2.5 px-2.5 sm:px-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <span>신청</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          onClick={() => onToggleProduct(p, 0)}
                          className="py-2 sm:py-2 px-1 sm:px-2 bg-slate-900 hover:bg-rose-600 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-colors"
                        >
                          <span>① 담기</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleProduct(p, 1)}
                          className="py-2 sm:py-2 px-1 sm:px-2 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-colors"
                        >
                          <span>② 담기</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination & Load More Controls */}
        {filteredProducts.length > displayedProducts.length && (
          <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShowMore}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>더 많은 가전 보기 ({filteredProducts.length - displayedProducts.length}대 남음)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShowAll}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              <span>현재 조건 전체보기 (총 {filteredProducts.length}대)</span>
            </button>
          </div>
        )}

        {/* Assurance Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">
                더리본 공식 가전 200종 중 원하는 2종 100% 전액 지원
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                트리플 다이아몬드, 트리플 골드, 더블, 싱글 전 라인업 본사 직배송 & 전문 기사 무상 설치
              </div>
            </div>
          </div>
          <button
            onClick={onGoToForm}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shrink-0"
          >
            가전 2종 상담 신청하기
          </button>
        </div>
      </div>
    </section>
  );
};
