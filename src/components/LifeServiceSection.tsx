import React, { useState } from 'react';
import { Ship, HeartHandshake, ShieldCheck, GraduationCap, ArrowRight, ExternalLink, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface LifeServiceItem {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  link: string;
  image: string;
  summary: string;
  details: string[];
  icon: React.ReactNode;
}

const LIFE_SERVICES: LifeServiceItem[] = [
  {
    id: 'cruise',
    title: '크루즈 (여행)',
    subTitle: '럭셔리 오션 크루즈 & 여행',
    category: 'CRUISE',
    link: 'https://the-reborn.co.kr/product/cruise.asp',
    image: '/assets/life/cruise.jpg',
    summary: '동남아, 일본, 지중해, 알래스카 등 전 세계 바다를 누비는 프리미엄 선상 여행',
    details: ['전 일정 최고급 객실 및 올인클루시브 뷔페·다이닝', '선상 공연, 카지노, 수영장 등 다채로운 엔터테인먼트', '기항지 전문 한국인 가이드 동행 투어'],
    icon: <Ship className="w-5 h-5 text-blue-600" />,
  },
  {
    id: 'wedding',
    title: '웨딩',
    subTitle: '품격 있는 토탈 웨딩',
    category: 'WEDDING',
    link: 'https://the-reborn.co.kr/product/wedding.asp',
    image: '/assets/life/wedding.jpg',
    summary: '인기 웨딩홀부터 스드메(스튜디오·드레스·메이크업), 본식 스냅까지 원스톱',
    details: ['유명 브랜드 드레스 및 수석 아티스트 메이크업', '트렌디한 프리미엄 스튜디오 촬영 패키지', '전문 웨딩 플래너의 1:1 맞춤 일정 디렉팅'],
    icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
  },
  {
    id: 'funeral',
    title: '장례 (상조)',
    subTitle: '24시간 품격 의전 서비스',
    category: 'CARE',
    link: 'https://the-reborn.co.kr/product/funeral.asp',
    image: '/assets/life/funeral.jpg',
    summary: '국가공인 1급 장례지도사와 의전 도우미가 24시간 언제나 정성을 다해 함께합니다',
    details: ['전국 어디서나 24시간 긴급 출동 및 이송 지원', '최고급 수의 및 오동나무 관 등 고품질 용품 일체', '공정위 표준약관 준수 & 철저한 의전 진행'],
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 'education',
    title: '자녀 어학연수',
    subTitle: '글로벌 캠퍼스 & 영어 캠프',
    category: 'EDUCATION',
    link: 'https://the-reborn.co.kr/product/edu.asp',
    image: '/assets/life/education.jpg',
    summary: '방학 집중 몰입형 영어 캠프 및 해외 명문 사립학교 스쿨링 프로그램',
    details: ['필리핀·캐나다·미국 원어민 1:1 맞춤형 몰입 수업', '안전한 기숙 환경 및 24시간 전담 멘토 인솔', '다양한 액티비티와 문화 체험을 통한 글로벌 역량 강화'],
    icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
  },
];

interface LifeServiceSectionProps {
  onSelectServiceInquiry?: (serviceName: string) => void;
}

export const LifeServiceSection: React.FC<LifeServiceSectionProps> = ({ onSelectServiceInquiry }) => {
  const [activeModalService, setActiveModalService] = useState<LifeServiceItem | null>(null);

  const handleInquire = (serviceName: string) => {
    setActiveModalService(null);
    if (onSelectServiceInquiry) {
      onSelectServiceInquiry(serviceName);
    } else {
      const applyElement = document.getElementById('application-form');
      if (applyElement) {
        applyElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="life-service" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Exactly matches reference visual */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="text-xs sm:text-sm font-extrabold text-blue-600 tracking-wider uppercase mb-2">
            LIFE SERVICE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            가전만이 아닙니다
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            원하시면 다양한 라이프서비스로도 활용할 수 있습니다.
          </p>
        </div>

        {/* 4 Key Life Service Cards - Direct links to official The Reborn pages */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LIFE_SERVICES.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              title={`더리본 ${item.title} 공식 페이지로 이동 (새 창)`}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1 block"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Badges */}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white shadow-sm">
                  100% 전환
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1 group-hover:bg-blue-700 transition-colors">
                  <span>공식안내</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Card Label Area */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">더리본 공식</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">
                    {item.subTitle}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Card Action Row */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1">
                      공식 홈페이지 바로가기
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Optional Quick Action Buttons */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveModalService(item);
                      }}
                      className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
                    >
                      혜택 요약
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleInquire(`${item.title} 라이프서비스 전환 문의`);
                      }}
                      className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-0.5"
                    >
                      <span>전환 상담</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Sub-text */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-500 font-medium">
          각 서비스를 클릭하시면 더리본 공식 홈페이지의 상세 안내 페이지로 바로 이동합니다. (크루즈·여행, 웨딩, 장례, 어학연수)
        </div>

        {/* Reassurance Banner: Free 1:1 Service Conversion Guarantee */}
        <div className="mt-6 max-w-4xl mx-auto bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  더리본 1:1 자유 전환 보장 제도
                </h4>
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  전환 수수료 0원
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                가전 지원 혜택을 이용 중이더라도, 인생의 중요한 순간(웨딩, 부모님 칠순 크루즈, 장례, 자녀 어학연수)이 생기면 언제든지 추가 부담금 없이 해당 라이프서비스로 전환하여 사용하실 수 있습니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleInquire('라이프서비스 전환 문의')}
            className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>라이프서비스 전환 상담</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                  THE REBORN {activeModalService.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  {activeModalService.title}
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  {activeModalService.subTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">
                {activeModalService.summary}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>주요 서비스 제공 혜택</span>
                </div>
                {activeModalService.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 bg-amber-50 rounded-xl p-3 border border-amber-200/80 mb-5 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  가전 지원 멤버십 가입 후 언제든지 고객센터를 통해 본 {activeModalService.title} 서비스로 전환 이용 신청이 가능합니다.
                </span>
              </div>

              {/* Direct Link to Official Page */}
              <a
                href={activeModalService.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-3 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>더리본 {activeModalService.title} 공식 웹페이지 바로가기</span>
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalService(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={() => handleInquire(`${activeModalService.title} 라이프서비스 전환 문의`)}
                  className="flex-[2] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs sm:text-sm text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <span>이 서비스로 상담 예약</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
