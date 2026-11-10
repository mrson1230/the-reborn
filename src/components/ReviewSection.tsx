import React, { useState, useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';

export const ReviewSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicated list for seamless infinite loop
  const duplicatedReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>REAL CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            더리본 가전지원 실제 고객 후기
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            이미 수천 명의 고객님께서 본인부담금 0원으로 최신 가전을 무료 배송 및 설치받으셨습니다.
          </p>

          {/* Social Proof Metric Badge */}
          <div className="mt-4 inline-flex items-center gap-3 sm:gap-4 bg-slate-50 border border-slate-200 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-900 font-extrabold">4.9 / 5.0</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">누적 지원 신청 <strong className="text-rose-600">42,800+</strong> 건</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">고객 만족도 <strong className="text-slate-900">98.7%</strong></span>
          </div>

          {/* Controls & Tip Bar */}
          <div className="mt-6 flex items-center justify-between max-w-xl mx-auto px-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>실시간 고객 리뷰 <strong>총 {REVIEWS_DATA.length}건</strong></span>
              <span className="hidden sm:inline text-slate-400">· 마우스를 올리면 멈춥니다</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                title={isPaused ? '슬라이드 재생' : '슬라이드 일시정지'}
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3 h-3 text-slate-600" />}
                <span>{isPaused ? '재생' : '일시정지'}</span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="이전 후기"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="다음 후기"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Sliding Marquee Track */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Gradient Shadows */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div
            className={`flex gap-5 px-4 w-max animate-marquee-left ${
              isPaused ? 'paused' : ''
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {duplicatedReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="w-[300px] sm:w-[360px] shrink-0 bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between select-none"
              >
                <div>
                  {/* Header with Stars and Verified Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {rev.verified && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>설치 완료 인증</span>
                      </div>
                    )}
                  </div>

                  {/* Title and Content */}
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2 leading-snug line-clamp-2">
                    "{rev.title}"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {rev.content}
                  </p>
                </div>

                {/* Reviewer details & product */}
                <div className="mt-5 pt-3.5 border-t border-slate-200/70">
                  <div className="text-xs font-bold text-rose-600 mb-0.5 line-clamp-1">
                    지원 가전: {rev.product}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                    <span className="font-medium text-slate-600">{rev.name} · {rev.region}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
