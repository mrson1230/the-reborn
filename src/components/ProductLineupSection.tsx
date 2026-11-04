import React, { useState, useMemo } from 'react';
import { Search, Check, ArrowRight, Award, ShieldCheck, Flame, ChevronDown } from 'lucide-react';
import { Product, Brand, Category, ProductTier } from '../types';
import { PRODUCTS_DATA, CATEGORIES_FILTER, TIERS_FILTER } from '../data/products';

interface ProductLineupSectionProps {
  onSelectProduct: (product: Product) => void;
  selectedProductId?: string;
}

export const ProductLineupSection: React.FC<ProductLineupSectionProps> = ({
  onSelectProduct,
  selectedProductId,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'cuckoo' | 'wellness' | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<ProductTier>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      let matchBrand = true;
      if (selectedBrand === 'samsung') matchBrand = p.brand === 'samsung';
      else if (selectedBrand === 'lg') matchBrand = p.brand === 'lg';
      else if (selectedBrand === 'cuckoo') matchBrand = p.brandName === '쿠쿠';
      else if (selectedBrand === 'wellness') matchBrand = ['브람스', '세라젬', '코지마', '리진바이오', '올리즈', '비에스소닉'].includes(p.brandName);
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
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>더리본 리빙플러스 공식 홈페이지 가전 200개 모델 전수 탑재</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            더리본 100% 전액 지원 공식 가전 라인업
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            더리본 공식 사이트(the-reborn.co.kr/product/plus.asp)에 등록된 모든 플래그십 가전(총 200종)을 빠짐없이 한눈에 비교하고 신청하실 수 있습니다.
          </p>
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

        {/* Product Cards Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedProducts.map((p) => {
              const isSelected = selectedProductId === p.id;

              return (
                <div
                  key={p.id}
                  className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  {/* Card Media Preview */}
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center p-3">
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
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                            p.brand === 'samsung'
                              ? 'bg-blue-600 text-white'
                              : p.brand === 'lg'
                              ? 'bg-rose-700 text-white'
                              : 'bg-slate-800 text-white'
                          }`}
                        >
                          {p.brandName}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white shadow-xs">
                          {p.tierName}
                        </span>
                      </div>

                      {/* Support 100% Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-rose-600 text-white shadow-xs">
                          100% 지원
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                        <span className="truncate max-w-[150px]">{p.modelCode}</span>
                        {p.badge && (
                          <span className="text-rose-600 font-sans font-bold text-[10px] bg-rose-50 px-1.5 py-0.2 rounded shrink-0">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug mb-2 min-h-[38px]">
                        {p.name}
                      </h3>

                      {/* Specs List */}
                      <ul className="space-y-1 mb-3 text-[11px] text-slate-600">
                        {p.specs.slice(0, 3).map((spec, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <Check className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pricing Comparison */}
                      <div className="pt-2.5 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>시중 출고가</span>
                          <span className="line-through">{p.originalPrice}</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-[11px] font-semibold text-rose-600">더리본 지원가</span>
                          <div className="text-right">
                            <span className="text-lg font-extrabold text-rose-600 tabular-nums">0</span>
                            <span className="text-xs font-bold text-rose-600 ml-0.5">원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-900 hover:bg-rose-600 text-white'
                      }`}
                    >
                      <span>{isSelected ? '선택됨 · 신청서 작성' : '이 가전으로 신청'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
                더리본 공식 홈페이지(the-reborn.co.kr) 전 가전 200종 100% 전액 지원
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                트리플 다이아몬드, 트리플 골드, 트리플 실버, 더블, 싱글 전 라인업 공식 제휴 본사 직배송 & 무상 설치
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const form = document.getElementById('apply-form');
              form?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shrink-0"
          >
            기타 가전 1:1 맞춤 문의
          </button>
        </div>
      </div>
    </section>
  );
};
