import React from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';

export const ReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-rose-600 tracking-wider mb-2">
            REAL CUSTOMER REVIEWS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            더리본 가전지원 실제 고객 후기
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            이미 수천 명의 고객님께서 본인부담금 0원으로 최신 가전을 무료 배송 및 설치받으셨습니다.
          </p>

          {/* Social Proof Metric Badge */}
          <div className="mt-4 inline-flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-full px-5 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-900 font-extrabold">4.9 / 5.0</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">누적 지원 신청 <strong className="text-rose-600">42,800+</strong> 건</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">고객 만족도 <strong className="text-slate-900">98.7%</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Stars and Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
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
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  "{rev.title}"
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Reviewer details & product */}
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="text-xs font-bold text-rose-600 mb-0.5">
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
    </section>
  );
};
