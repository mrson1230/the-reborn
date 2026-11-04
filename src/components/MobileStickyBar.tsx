import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface MobileStickyBarProps {
  selectedProducts: Product[];
  onApplyClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedProducts,
  onApplyClick,
}) => {
  const p1 = selectedProducts[0];
  const p2 = selectedProducts[1];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg safe-area-pb">
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 shrink-0">
              가전 2종 0원 지원
            </span>
            <span className="text-[11px] text-slate-500 font-medium truncate">
              {p1?.brandName} + {p2?.brandName}
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 truncate">
            {p1 ? `① ${p1.name}` : ''} {p2 ? `+ ② ${p2.name}` : ''}
          </div>
        </div>

        <button
          onClick={onApplyClick}
          className="shrink-0 px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <span>2종 신청하기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
