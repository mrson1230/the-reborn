import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-sm sm:text-base">개인정보 수집 및 이용 동의 (전문)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">1. 개인정보 수집 및 이용 목적</h4>
            <p>
              (주)더리본은 삼성전자·LG전자 가전제품 지원 프로모션의 1:1 맞춤 무료 상담 제공,
              지원 자격 확인, 가전 배송 및 설치 일정 조율, 해피콜 진행을 위해 고객님의 개인정보를 수집 및 이용합니다.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">2. 수집하는 개인정보 항목</h4>
            <p>
              성명, 휴대전화번호, 거주 및 설치 희망 지역, 희망 통화 시간대, 기타 상담 요청사항
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">3. 보유 및 이용 기간</h4>
            <p>
              상담 접수일로부터 6개월간 보관 후 복구 불가능한 방법으로 안전하게 파기됩니다.
              단, 관련 법령의 규정에 의하여 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">4. 동의 거부 권리 및 불이익 안내</h4>
            <p>
              귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
              단, 필수 항목에 대한 동의를 거부하실 경우 1:1 무료 가전지원 상담 예약 및 자격 확인 서비스가 제한될 수 있습니다.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
