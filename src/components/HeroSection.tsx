import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Clock, ShieldCheck, Flame } from 'lucide-react';
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

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  // Qualification Mini-Check
  const [ageCheck, setAgeCheck] = useState<string>('yes');
  const [applianceNeed, setApplianceNeed] = useState<string>('fridge');
  const [qualifyStatus, setQualifyStatus] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-800">
            <span className="inline-flex items-center gap-1 font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 shrink-0">
              <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              선착순 마감임박
            </span>
            <span className="font-medium text-slate-600">이달 배정 지원물량 100대 한정</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              잔여 14대 남음
            </span>
          </div>

          {/* Rolling Social Proof Ticket */}
          <div className="flex items-center gap-2 overflow-hidden bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/70 px-3 py-1 rounded-md">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>삼성전자 · LG전자 공식 제휴 100% 전액지원</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.2] text-balance">
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
                <div className="text-lg font-bold text-slate-900 tabular-nums">0원 (전액지원)</div>
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

          {/* Right Column: High-Res Appliance Showcase Image + Interactive Quick Check Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group aspect-[4/3] sm:aspect-[16/10]">
              <img
                src="/assets/images/hero_home_appliances_living_1793774944397.jpg"
                alt="삼성·LG 프리미엄 가전 풀세트 인테리어"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-block bg-rose-600 text-[11px] font-bold px-2 py-0.5 rounded mb-1">
                  더리본 특별 혜택
                </div>
                <div className="text-base font-bold">삼성 & LG 최신 가전 라인업 완비</div>
                <div className="text-xs text-slate-300">신청 즉시 전담 상담원 1:1 맞춤 배정</div>
              </div>
            </div>

            {/* Quick Eligibility Mini Checker */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-600" />
                  <span className="text-xs font-bold text-slate-900">30초 가전 전액지원 자격 자가진단</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono tabular-nums">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>
                    남은시간 {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">1. 신청자 연령이 만 25세 이상인가요?</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAgeCheck('yes')}
                      className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                        ageCheck === 'yes' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      예
                    </button>
                    <button
                      type="button"
                      onClick={() => setAgeCheck('no')}
                      className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                        ageCheck === 'no' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      아니오
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">2. 가장 희망하는 가전 종류는?</span>
                  <select
                    value={applianceNeed}
                    onChange={(e) => setApplianceNeed(e.target.value)}
                    className="text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="fridge">냉장고/김치냉장고</option>
                    <option value="wash">워시타워/세탁기</option>
                    <option value="tv">85인치 대화면 TV</option>
                    <option value="air">무풍 에어컨 2in1</option>
                    <option value="care">스타일러/로봇청소기</option>
                    <option value="digital">노트북/디지털</option>
                  </select>
                </div>

                {/* Instant Verification Result Banner */}
                {ageCheck === 'yes' ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-emerald-800">
                        축하합니다! 100% 전액 지원 대상자입니다.
                      </span>
                    </div>
                    <button
                      onClick={onApplyShortcut}
                      className="text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      지원 확정하기
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    만 25세 미만이신 경우 직계 가족 명의로 지원 신청이 가능합니다. 전문 상담원에게 문의해 주세요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
