import React from 'react';
import { BadgePercent, Truck, Wrench, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <BadgePercent className="w-6 h-6 text-rose-600" />,
      title: '01. 본인부담금 0원 전액지원',
      headline: '초기비용, 선납금, 이자부담 ZERO',
      desc: '시중가 200~300만원대 최신 가전제품을 별도 구매비용 없이 전액 지원받으실 수 있습니다. 목돈 부담 없이 원하는 프리미엄 가전을 집으로 들이세요.',
    },
    {
      icon: <Truck className="w-6 h-6 text-rose-600" />,
      title: '02. 제조사 본사 물류 직배송',
      headline: '삼성·LG 본사 전문 기사 무료 설치',
      desc: '리퍼나 중고가 아닌 제조사 정식 물류센터에서 직배송되는 100% 미개봉 새제품입니다. 기본 설치비와 기존 폐가전 무상 수거까지 모두 포함됩니다.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-rose-600" />,
      title: '03. 공식 제조사 동일 A/S 보증',
      headline: '전국 삼성·LG 서비스센터 무상 보증',
      desc: '본사 정품이므로 전국 삼성전자 서비스센터 및 LG전자 서비스센터를 통해 신속한 무상 A/S와 사후 보증 혜택을 온전히 받으실 수 있습니다.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-rose-600" />,
      title: '04. 만기 시 납입금 100% 전액환급',
      headline: '가전은 평생 소유 + 원금 100% 환급',
      desc: '더리본의 스마트 라이프케어 플랜은 약정 만기 시 납입하신 원금 전액을 100% 환급해 드립니다. 가전제품은 반납 없이 평생 고객님 소유입니다.',
    },
  ];

  return (
    <section id="benefits" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-rose-600 tracking-wider mb-2">
            THE RIBBON EXCLUSIVE ADVANTAGE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            왜 수많은 고객님들이 더리본 가전지원을 선택할까요?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            공정거래위원회 표준약관 준수, 상조보증공제조합 가입 기업 더리본이 투명하고 확실한 혜택을 약속합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center mb-4 border border-rose-100">
                  {b.icon}
                </div>
                <div className="text-xs font-bold text-rose-600 mb-1">{b.title}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{b.headline}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>공식 보증 완료</span>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow Strip */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-slate-200">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-slate-400">간편 4단계 진행 절차</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">신청부터 설치까지 단 3~7일이면 완료됩니다</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-rose-600 font-bold text-xs mb-1">STEP 01</div>
              <div className="font-bold text-slate-900 text-sm mb-1">온라인 상담 신청</div>
              <div className="text-xs text-slate-500">원하는 가전 선택 및 성함/연락처 입력 후 간편 예약</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-rose-600 font-bold text-xs mb-1">STEP 02</div>
              <div className="font-bold text-slate-900 text-sm mb-1">1:1 맞춤 무료 상담</div>
              <div className="text-xs text-slate-500">더리본 전담 상담원이 희망 시간대에 전화드려 친절 안내</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-rose-600 font-bold text-xs mb-1">STEP 03</div>
              <div className="font-bold text-slate-900 text-sm mb-1">비대면 간편 심사</div>
              <div className="text-xs text-slate-500">복잡한 서류 없이 휴대폰 본인 인증으로 즉시 심사 통과</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-rose-600 font-bold text-xs mb-1">STEP 04</div>
              <div className="font-bold text-slate-900 text-sm mb-1">본사 기사 무료 설치</div>
              <div className="text-xs text-slate-500">삼성·LG 공식 설치 기사님이 방문하여 무상 배송 및 설치</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
