import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { TickerItem } from '../types';

interface HeroSectionProps {
  onSelectProductShortcut: () => void;
  onApplyShortcut: () => void;
  tickerItems: TickerItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectProductShortcut,
  onApplyShortcut,
  tickerItems,
}) => {
  // Live ticker active index
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3500);

    return () => clearInterval(tickerInterval);
  }, [tickerItems.length]);

  const currentTicker = tickerItems[tickerIndex] || tickerItems[0];

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-14 lg:pt-14 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Urgency & Live Ticker Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-slate-800">
            <span className="inline-flex items-center gap-1 font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 shrink-0 text-[11px] sm:text-xs">
              <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              선착순 마감임박
            </span>
            <span className="font-medium text-slate-600 text-[11px] sm:text-xs">이달 물량 100대 한정</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums text-[11px] sm:text-xs">
              잔여 14대 남음
            </span>
          </div>

          {/* Rolling Social Proof Ticket */}
          <div className="flex items-center gap-2 overflow-hidden bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-900 shrink-0">실시간 접수:</span>
            <div className="truncate text-slate-600">
              <span className="font-medium text-slate-800">{currentTicker.name}</span> ({currentTicker.region}) ·{' '}
              <span className="text-rose-600 font-medium">{currentTicker.product}</span>{' '}
              <span className="text-slate-400">({currentTicker.timeAgo})</span>
            </div>
          </div>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/70 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" />
              <span>삼성전자 · LG전자 공식 제휴 가전지원</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.25] text-balance">
              최신 프리미엄 가전제품<br />
              <span className="text-rose-600 underline decoration-rose-300 decoration-wavy underline-offset-8">
                본인부담금 0원
              </span>
              으로 장만하세요
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
              더리본 멤버십 결합 특별 프로모션! 세탁기, 건조기, 대화면 TV, 비스포크 냉장고까지
              초기 구입 비용 전혀 없이 삼성·LG 본사 공식 물류에서 새제품 무료 배송 및 전문 기사 무상 설치를 지원합니다.
            </p>

            {/* Core Value Props List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="text-xs text-slate-500">초기 구매비용</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">0원 (지원)</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="text-xs text-slate-500">배송 및 설치비</div>
                <div className="text-lg font-bold text-slate-900">100% 무료</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-500">제조사 공식 보증</div>
                <div className="text-lg font-bold text-slate-900">본사 무상 A/S</div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onApplyShortcut}
                className="px-6 py-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-base rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>지금 0원 지원 신청하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onSelectProductShortcut}
                className="px-5 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>지원 가전 라인업 둘러보기</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                신용등급 영향 없는 간편조회
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                본사 정품 새제품 100%
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                기존 구형 가전 무료 수거
              </span>
            </div>
          </div>

          {/* Right Column: High-Res Appliance Showcase Image (Expanded) */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-end">
              <img
                src="/assets/images/hero_home_appliances_living_1793774944397.jpg"
                alt="삼성·LG 프리미엄 가전 풀세트 인테리어"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="relative p-6 sm:p-7 text-white z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-rose-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>더리본 특별 공식 혜택</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  삼성 & LG 최신 가전 라인업 완비
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                  신청 즉시 전담 상담원 1:1 맞춤 배정 · 본사 직배송 무료 설치 및 무상 A/S 보증
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
