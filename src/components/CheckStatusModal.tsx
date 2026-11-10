import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, PhoneCall, AlertCircle, Package, Lock } from 'lucide-react';
import { ApplicationSubmission } from '../types';

interface CheckStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: ApplicationSubmission[];
  onLock?: () => void;
}

export const CheckStatusModal: React.FC<CheckStatusModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onLock,
}) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedResults, setMatchedResults] = useState<ApplicationSubmission[]>([]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedSearch = searchPhone.replace(/[^0-9]/g, '');
    if (!cleanedSearch) return;

    const results = submissions.filter((sub) => {
      const cleanedSubPhone = sub.phoneNumber.replace(/[^0-9]/g, '');
      return cleanedSubPhone.includes(cleanedSearch);
    });

    setMatchedResults(results);
    setHasSearched(true);
  };

  const getStatusBadgeClass = (status: ApplicationSubmission['status']) => {
    switch (status) {
      case '접수완료':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '상담원 배정':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case '안심콜 대기':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case '상담완료':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">더리본 신청내역 및 진행현황 조회</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                보안인증됨
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              관리자 보안인증 완료 · 등록하신 휴대폰 번호로 가전 2종 접수 상태를 확인하세요.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onLock && (
              <button
                onClick={onLock}
                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white rounded-md border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                title="보안 세션 잠금"
              >
                <Lock className="w-3 h-3" />
                <span>잠금</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Search Form */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="신청자 휴대폰 번호 (예: 01012345678)"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-rose-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              조회하기
            </button>
          </form>
          <p className="text-[11px] text-slate-400 mt-2">
            * 테스트 확인용 전화번호: 010-1234-5678 또는 최근 작성하신 번호
          </p>
        </div>

        {/* Modal Results Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {!hasSearched ? (
            <div className="text-center py-10 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">휴대폰 번호를 입력하고 조회를 눌러주세요.</p>
            </div>
          ) : matchedResults.length === 0 ? (
            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">조회된 신청 내역이 없습니다.</p>
              <p className="text-xs text-slate-500 mt-1">
                입력하신 번호({searchPhone})를 다시 확인하시거나 상담 신청을 진행해 주세요.
              </p>
            </div>
          ) : (
            matchedResults.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="text-xs font-mono font-bold text-slate-500">
                    접수번호: <span className="text-slate-900">{item.applicationNumber}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border ${getStatusBadgeClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Dual Appliances Details */}
                <div className="space-y-2">
                  {/* Product 1 */}
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200 p-0.5 flex items-center justify-center">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                        <span>가전 ①</span>
                        <span>[{item.productBrand}] 100% 지원</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {item.productName}
                      </div>
                    </div>
                  </div>

                  {/* Product 2 */}
                  {item.product2Name && (
                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200 p-0.5 flex items-center justify-center">
                        <img
                          src={item.product2Image || item.productImage}
                          alt={item.product2Name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                          }}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                          <span>가전 ②</span>
                          <span>[{item.product2Brand}] 100% 지원</span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {item.product2Name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 bg-slate-50 p-2.5 rounded-lg">
                  <div>신청인: <strong className="text-slate-900">{item.userName}</strong></div>
                  <div>설치지역: <strong className="text-slate-900">{item.region}</strong></div>
                  <div>희망시간: <span className="text-slate-900">{item.preferredTime}</span></div>
                  <div>접수일시: <span className="text-slate-500">{item.createdAt}</span></div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>더리본 전담 상담원이 순차적으로 안심 전화를 드릴 예정입니다.</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
