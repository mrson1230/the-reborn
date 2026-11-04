import React from 'react';
import { X, Trash2, Download, RefreshCw, CheckCircle2, User, Phone, MapPin, Lock, Package } from 'lucide-react';
import { ApplicationSubmission } from '../types';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: ApplicationSubmission[];
  onUpdateStatus: (id: string, status: ApplicationSubmission['status']) => void;
  onDeleteSubmission: (id: string) => void;
  onResetToDefault: () => void;
  onLock?: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  submissions,
  onUpdateStatus,
  onDeleteSubmission,
  onResetToDefault,
  onLock,
}) => {
  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `the_ribbon_submissions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">더리본 가전 2종 접수 관리 대장</h3>
              <span className="text-xs bg-rose-600 font-bold px-2 py-0.5 rounded">
                총 {submissions.length}건
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                보안인증됨
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              실시간 접수된 가전 2종 전액지원 상담 신청 내역입니다. (보안인증 완료)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>데이터 내보내기 (JSON)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onLock && (
              <button
                onClick={onLock}
                className="px-2.5 py-1.5 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-lg flex items-center gap-1 cursor-pointer transition-colors font-medium text-[11px]"
                title="관리자 세션 잠금"
              >
                <Lock className="w-3 h-3" />
                <span>보안 잠금</span>
              </button>
            )}
            <button
              onClick={onResetToDefault}
              className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>기본값 복원</span>
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">접수된 상담 신청이 없습니다.</p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">
                      {sub.applicationNumber}
                    </span>
                    {sub.formspreeSent && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Formspree 전송됨
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{sub.createdAt}</span>
                    <button
                      onClick={() => onDeleteSubmission(sub.id)}
                      title="삭제"
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Dual Products Row */}
                <div className="space-y-1.5">
                  {/* Product 1 */}
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-300 p-0.5 flex items-center justify-center">
                      <img
                        src={sub.productImage}
                        alt={sub.productName}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                        <span>가전 ① (1차)</span>
                        <span>[{sub.productBrand}] 100% 지원</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {sub.productName}
                      </div>
                    </div>
                  </div>

                  {/* Product 2 */}
                  {sub.product2Name && (
                    <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-300 p-0.5 flex items-center justify-center">
                        <img
                          src={sub.product2Image || sub.productImage}
                          alt={sub.product2Name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                          }}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                          <span>가전 ② (2차)</span>
                          <span>[{sub.product2Brand}] 100% 지원</span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {sub.product2Name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>성함: <strong>{sub.userName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>연락처: <strong>{sub.phoneNumber}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>지역: <strong>{sub.region}</strong></span>
                  </div>
                  <div className="text-slate-700">
                    희망시간: <span className="text-slate-900 font-medium">{sub.preferredTime}</span>
                  </div>
                </div>

                {sub.note && (
                  <div className="text-xs text-slate-600 bg-amber-50/70 border border-amber-200/60 p-2 rounded-lg">
                    <strong className="text-amber-800">요청사항:</strong> {sub.note}
                  </div>
                )}

                {/* Status Switcher */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500 font-medium">진행 상태 변경:</span>
                  <div className="flex items-center gap-1">
                    {(['접수완료', '상담원 배정', '안심콜 대기', '상담완료'] as const).map(
                      (st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => onUpdateStatus(sub.id, st)}
                          className={`px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                            sub.status === st
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            대장 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
