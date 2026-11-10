import React, { useState } from 'react';
import { Home, Tv, Ship, Lock, ArrowRight, Sparkles, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface MobileStickyBarProps {
  selectedProducts: Product[];
  onApplyClick: () => void;
  onGoToLineup?: () => void;
  onGoToLifeService?: () => void;
  onOpenCheckStatus?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedProducts,
  onApplyClick,
  onGoToLineup,
  onGoToLifeService,
  onOpenCheckStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const p1 = selectedProducts[0];
  const p2 = selectedProducts[1];
  const selectedCount = (p1 ? 1 : 0) + (p2 ? 1 : 0);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLineupClick = () => {
    if (onGoToLineup) {
      onGoToLineup();
    } else {
      const el = document.getElementById('lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLifeServiceClick = () => {
    if (onGoToLifeService) {
      onGoToLifeService();
    } else {
      const el = document.getElementById('life-service');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 select-none">
      {/* Floating Selected Appliances Drawer (Expandable) */}
      {isExpanded && (
        <div className="bg-slate-900/98 backdrop-blur-md text-white p-3.5 border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-extrabold text-white">
                선택한 지원 가전 (총 <span className="text-rose-400">{selectedCount}</span>/2개)
              </span>
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">
                본인부담금 0원
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="닫기"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 pt-2.5">
            {p1 && (
              <div className="flex items-center gap-2.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                <div className="w-9 h-9 rounded bg-white p-0.5 shrink-0 flex items-center justify-center">
                  <img src={p1.image} alt={p1.name} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-rose-400 font-bold">가전 ① ({p1.brandName})</div>
                  <div className="text-xs font-bold text-white truncate">{p1.name}</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0">0원 지원</span>
              </div>
            )}
            {p2 && (
              <div className="flex items-center gap-2.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                <div className="w-9 h-9 rounded bg-white p-0.5 shrink-0 flex items-center justify-center">
                  <img src={p2.image} alt={p2.name} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-amber-400 font-bold">가전 ② ({p2.brandName})</div>
                  <div className="text-xs font-bold text-white truncate">{p2.name}</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0">0원 지원</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mini Appliance Bar Trigger */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-1.5 border-t border-slate-800 flex items-center justify-between cursor-pointer active:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-[10px] font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded shrink-0">
            {selectedCount === 2 ? '가전 2종 선택됨' : selectedCount === 1 ? '가전 1/2 선택됨' : '가전 0/2 선택'}
          </span>
          <span className="text-[11px] text-slate-300 truncate font-medium">
            {selectedCount === 0
              ? '원하는 가전 2종을 선택해 주세요 (0원 지원)'
              : `${p1 ? `① ${p1.name}` : ''} ${p2 ? `+ ② ${p2.name}` : ''}`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0 ml-1">
          <span>{isExpanded ? '접기' : '상세보기'}</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Main Bottom Thumb Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-2xl flex items-center justify-around safe-area-pb">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1.5 px-2 text-slate-600 hover:text-rose-600 active:scale-95 transition-all cursor-pointer min-w-[52px]"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">홈</span>
        </button>

        {/* Tab 2: Lineup */}
        <button
          type="button"
          onClick={handleLineupClick}
          className="relative flex flex-col items-center justify-center py-1.5 px-2 text-slate-600 hover:text-rose-600 active:scale-95 transition-all cursor-pointer min-w-[52px]"
        >
          <Tv className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">가전 라인업</span>
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-600" />
        </button>

        {/* Tab 3: Life Service */}
        <button
          type="button"
          onClick={handleLifeServiceClick}
          className="flex flex-col items-center justify-center py-1.5 px-2 text-blue-700 hover:text-blue-800 active:scale-95 transition-all cursor-pointer min-w-[52px]"
        >
          <Ship className="w-5 h-5 mb-0.5 text-blue-600" />
          <span className="text-[10px] font-bold tracking-tight text-blue-700">라이프</span>
        </button>

        {/* Tab 4: Check Status */}
        {onOpenCheckStatus && (
          <button
            type="button"
            onClick={onOpenCheckStatus}
            className="flex flex-col items-center justify-center py-1.5 px-2 text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer min-w-[52px]"
          >
            <Lock className="w-5 h-5 mb-0.5 text-slate-500" />
            <span className="text-[10px] font-semibold tracking-tight">접수현황</span>
          </button>
        )}

        {/* Primary CTA: 0원 신청하기 */}
        <button
          type="button"
          onClick={onApplyClick}
          className="ml-1 px-3.5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md shadow-rose-600/30 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>0원 지원 신청</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
