import React from 'react';
import { ShieldCheck, Lock, PhoneCall } from 'lucide-react';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenCheckStatus: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenCheckStatus,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src="/theribbon_logo.jpg"
              alt="더리본 로고"
              className="h-8 w-auto object-contain rounded bg-white p-0.5"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/aistudio/_____d4c62b9b.jpg';
              }}
            />
            <span className="text-white font-extrabold text-base tracking-tight">더리본</span>
            <span className="text-slate-500 text-xs">| 가전 지원 공식 프로모션</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenTerms}
              className="text-slate-300 hover:text-white underline cursor-pointer"
            >
              개인정보처리방침
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="text-slate-300 hover:text-white underline cursor-pointer"
            >
              이용약관
            </button>
            <span>·</span>
            <button
              onClick={onOpenCheckStatus}
              className="text-slate-300 hover:text-white underline cursor-pointer inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>접수현황 조회</span>
            </button>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-rose-400 cursor-pointer inline-flex items-center gap-1"
              title="관리자 보안인증 필요"
            >
              <Lock className="w-3 h-3 text-rose-500" />
              <span>접수 관리자</span>
            </button>
          </div>
        </div>

        {/* Corporate Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-200">상조보증공제조합 가입</div>
              <div className="text-[11px] text-slate-400">소비자 피해보상보험 계약 체결 안심 인증</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-200">공정거래위원회 표준약관 준수</div>
              <div className="text-[11px] text-slate-400">투명하고 안전한 라이프케어 표준 약관 적용</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-200">더리본 고객만족센터</div>
              <div className="text-[11px] text-slate-400">1644-3651 (평일 09:00 ~ 18:00)</div>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
          <p>
            상호명: 더리본(주) &nbsp; 대표자: 박명하 &nbsp; 사업자등록번호: 605-81-92018
          </p>
          <p>
            tel : 1644-3651 &nbsp; fax: 02-3447-3666
          </p>
          <p>
            서울 본사 : 서울 성동구 성수일로 111, 9F 914호 (성수동, 선명스퀘어) / 부산 본사 : 부산 부산진구 자유평화로 11, 12F (범천동, W웨딩시티)
          </p>
          <p className="pt-2 text-slate-600">
            * 본 사이트에서 제공하는 삼성전자 및 LG전자 가전제품 지원 프로모션은 더리본 라이프케어 멤버십 제휴 결합 상품 기준이며, 가전제품의 소유권 및 무상 A/S 보증은 각 제조사 공식 정책에 따라 지원됩니다.
          </p>
          <p className="text-slate-600">
            Copyright © 더리본(주) The Ribbon All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
