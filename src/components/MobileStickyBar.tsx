import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface MobileStickyBarProps {
  selectedProduct: Product;
  onApplyClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedProduct,
  onApplyClick,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg safe-area-pb">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 shrink-0">
              0원 지원
            </span>
            <span className="text-xs font-bold text-slate-900 truncate">
              {selectedProduct.name}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 font-bold">실시간 상담 가능</span>
            <span>· 무료 설치</span>
          </div>
        </div>

        <button
          onClick={onApplyClick}
          className="shrink-0 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>신청하기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
