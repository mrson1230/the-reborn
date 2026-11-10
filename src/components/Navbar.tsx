import React, { useState } from 'react';
import { Menu, X, ShieldCheck, ClipboardList, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenCheckStatus: () => void;
  onOpenAdmin: () => void;
  applicationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckStatus,
  onOpenAdmin,
  applicationCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/theribbon_logo.jpg"
              alt="더리본 공식 로고"
              className="h-10 w-auto object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/aistudio/_____d4c62b9b.jpg';
              }}
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1.5">
              <span>더리본</span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                가전지원
              </span>
            </span>
          </a>
        </div>

        {/* Zone 2: Nav links, single line text */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollToSection('lineup')}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            지원 가전 라인업
          </button>
          <button
            onClick={() => scrollToSection('life-service')}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium text-blue-700"
          >
            라이프서비스
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            지원 혜택
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            고객 후기
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            자주 묻는 질문
          </button>
          <button
            onClick={onOpenCheckStatus}
            className="text-slate-700 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>접수현황 조회</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action with live counselor availability indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Counselor Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 shadow-2xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-[11px] whitespace-nowrap">실시간 상담 가능</span>
          </div>

          <button
            onClick={() => scrollToSection('apply-form')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            간편 지원 신청 (0원)
          </button>

          <button
            onClick={onOpenAdmin}
            title="접수 관리 대장"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3 text-rose-500" />
            <span>접수관리자</span>
            {applicationCount > 0 && (
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {applicationCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
          {/* Mobile Live Counselor Notice */}
          <div className="flex items-center justify-between px-2.5 py-2 text-xs text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold">현재 실시간 상담 가능</span>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
              상담원 대기중
            </span>
          </div>
          <button
            onClick={() => scrollToSection('lineup')}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600"
          >
            지원 가전 라인업
          </button>
          <button
            onClick={() => scrollToSection('life-service')}
            className="w-full text-left py-2 text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center justify-between"
          >
            <span>라이프서비스 (크루즈·웨딩·장례 등)</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">1:1 전환</span>
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600"
          >
            지원 혜택 안내
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600"
          >
            고객 후기
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600"
          >
            자주 묻는 질문
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCheckStatus();
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>접수현황 조회 (비밀번호)</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">보안</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-rose-600 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-rose-500" />
              <span>접수관리자 대장</span>
            </div>
            <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-200 font-bold px-1.5 py-0.5 rounded">
              관리자 전용
            </span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('apply-form')}
              className="w-full py-3 text-center text-sm font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 shadow-sm"
            >
              간편 상담 신청하기 (부담금 0원)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
