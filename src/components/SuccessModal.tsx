import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  PhoneCall,
  X,
  MessageSquare,
  Smartphone,
  Bell,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { ApplicationSubmission } from '../types';

interface SuccessModalProps {
  submission: ApplicationSubmission | null;
  onClose: () => void;
  onViewStatus: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  submission,
  onClose,
  onViewStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'kakao' | 'sms'>('kakao');
  const [isCopied, setIsCopied] = useState(false);
  const [progress, setProgress] = useState(15);
  const [stageText, setStageText] = useState('신청 데이터 보안 암호화 처리 중...');
  const [isDone, setIsDone] = useState(false);

  // Progressive simulation of Kakao Alimtalk dispatch
  useEffect(() => {
    if (!submission) return;

    setProgress(20);
    setStageText('신청 데이터 256비트 보안 암호화 중...');
    setIsDone(false);

    const timer1 = setTimeout(() => {
      setProgress(58);
      setStageText('카카오톡 공식 알림톡 비즈메시지 발송 중...');
    }, 450);

    const timer2 = setTimeout(() => {
      setProgress(92);
      setStageText('이동통신사 및 카카오 서버 수신 확인 중...');
    }, 950);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStageText('카카오톡 알림톡 발송 완료!');
      setIsDone(true);
    }, 1450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [submission]);

  const handleRestartSimulation = () => {
    setIsDone(false);
    setProgress(20);
    setStageText('신청 데이터 256비트 보안 암호화 중...');

    setTimeout(() => {
      setProgress(60);
      setStageText('카카오톡 공식 알림톡 비즈메시지 발송 중...');
    }, 400);

    setTimeout(() => {
      setProgress(100);
      setStageText('카카오톡 알림톡 발송 완료!');
      setIsDone(true);
    }, 1100);
  };

  if (!submission) return null;

  const handleCopyReceipt = () => {
    const textToCopy = `[더리본 가전 전액지원 접수증]\n접수번호: ${submission.applicationNumber}\n신청자: ${submission.userName}\n신청가전: [${submission.productBrand}] ${submission.productName}\n지원혜택: 본인부담금 0원 전액지원\n상담희망: ${submission.preferredTime}\n지역: ${submission.region}`;
    navigator.clipboard?.writeText?.(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">상담 예약 접수 완료</h3>
              <p className="text-[11px] text-slate-300">
                {submission.phoneNumber} 번호로 안내 메시지가 전송되었습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Progress Bar Section */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              {isDone ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0" />
              )}
              <span>{stageText}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-amber-900 tabular-nums text-xs">
                {progress}%
              </span>
              {isDone && (
                <button
                  type="button"
                  onClick={handleRestartSimulation}
                  title="발송 상태 다시 확인"
                  className="text-[10px] text-amber-700 hover:text-amber-900 underline cursor-pointer"
                >
                  재확인
                </button>
              )}
            </div>
          </div>

          {/* Track and Animated Bar */}
          <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-300 ease-out ${
                isDone
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-amber-800/80 mt-1.5">
            <span>수신 번호: {submission.phoneNumber}</span>
            <span className="font-medium">
              {isDone ? '✓ 수신 성공 (발신: 1588-0000)' : '전송 대기열 순차 처리 중...'}
            </span>
          </div>
        </div>

        {/* Visual Message Format Switcher Tabs */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-slate-100/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <span>모바일 수신 알림 미리보기</span>
            </span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('kakao')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'kakao'
                    ? 'bg-[#FEE500] text-[#191919] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#3C1E1E]" />
                <span>카카오 알림톡</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sms')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'sms'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>문자 메시지(LMS)</span>
              </button>
            </div>
          </div>

          {/* KakaoTalk Alimtalk Visual Card */}
          {activeTab === 'kakao' && (
            <div className="bg-[#B2C7D9] p-3 sm:p-4 rounded-2xl shadow-inner space-y-2">
              <div className="text-center text-[11px] text-slate-700/80 font-medium pb-1">
                카카오톡 알림톡 도착 · {submission.phoneNumber}
              </div>

              {/* Kakao Bubble */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden text-[#191919]">
                {/* Kakao Brand Header */}
                <div className="bg-[#FEE500] px-4 py-3 flex items-center justify-between border-b border-amber-300/40">
                  <div className="flex items-center gap-2">
                    <img
                      src="/theribbon_logo.jpg"
                      alt="더리본"
                      className="w-7 h-7 rounded-full object-contain bg-white p-0.5 border border-amber-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/_____d4c62b9b.jpg';
                      }}
                    />
                    <div>
                      <span className="text-xs font-black tracking-tight text-[#191919]">
                        더리본 공식 알림톡
                      </span>
                      <span className="text-[10px] text-slate-700 block -mt-0.5">
                        가전지원 고객안심센터
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-medium text-slate-800">
                    공식인증
                  </span>
                </div>

                {/* Kakao Message Body */}
                <div className="p-4 space-y-3 text-xs leading-relaxed">
                  <div className="pb-2 border-b border-slate-100">
                    <p className="font-extrabold text-sm text-slate-900 mb-1">
                      [더리본] 가전 100% 전액지원 상담 예약 완료
                    </p>
                    <p className="text-slate-600">
                      안녕하세요, <strong>{submission.userName}</strong> 고객님!
                      <br />
                      신청하신 가전제품 무료 지원 상담 예약이 정상 접수되었습니다.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">접수번호</span>
                      <span className="font-mono font-bold text-slate-900">
                        {submission.applicationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">신청가전</span>
                      <span className="font-bold text-rose-600 truncate max-w-[200px] text-right">
                        [{submission.productBrand}] {submission.productName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">지원혜택</span>
                      <span className="font-bold text-slate-900">
                        본인부담금 0원 (전액지원)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">상담희망</span>
                      <span className="font-medium text-slate-900">
                        {submission.preferredTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">설치지역</span>
                      <span className="font-medium text-slate-900">{submission.region}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 leading-snug pt-1">
                    * 전문 상담원이 순차적으로 안심 해피콜(발신번호: <strong>1588-0000</strong>)을 드릴 예정입니다.
                    <br />
                    * 원활한 가전 배송 및 설치를 위해 전화를 꼭 받아주세요.
                  </div>

                  {/* Kakao Button Affordances */}
                  <div className="pt-2 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onViewStatus();
                      }}
                      className="w-full py-2.5 px-3 bg-[#FEE500] hover:bg-[#FADA0A] active:bg-[#E5C700] text-[#191919] font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>내 신청내역 실시간 확인하기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyReceipt}
                      className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors cursor-pointer text-center"
                    >
                      {isCopied ? '✓ 접수증 내용이 복사되었습니다!' : '접수증 내용 텍스트 복사'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SMS Visual Card */}
          {activeTab === 'sms' && (
            <div className="bg-slate-200/90 p-3 sm:p-4 rounded-2xl shadow-inner space-y-2">
              <div className="text-center text-[11px] text-slate-600 font-medium pb-1">
                문자 메시지(LMS) · 발신: 1588-0000
              </div>

              {/* SMS Bubble */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-300 p-4 space-y-2.5 text-xs text-slate-800 leading-relaxed font-sans">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-600">[Web발신]</span>
                  <span className="font-mono">오늘 {submission.createdAt.split(' ')[1] || '15:30'}</span>
                </div>

                <div className="font-bold text-sm text-slate-900">
                  [더리본] 가전 100% 전액지원 상담 접수 완료 안내
                </div>

                <p className="text-slate-700">
                  안녕하세요, {submission.userName} 고객님.
                  <br />
                  더리본 가전 전액지원 이벤트 신청이 정상 처리되었습니다.
                </p>

                <div className="p-2.5 bg-slate-50 rounded-lg font-mono text-[11px] text-slate-700 space-y-1 border border-slate-200">
                  <div>■ 접수번호: {submission.applicationNumber}</div>
                  <div>■ 신청가전: [{submission.productBrand}] {submission.productName}</div>
                  <div>■ 지원조건: 본인부담금 0원 / 본사 무료설치</div>
                  <div>■ 희망시간: {submission.preferredTime}</div>
                  <div>■ 설치지역: {submission.region}</div>
                </div>

                <p className="text-[11px] text-slate-600">
                  기재해주신 희망 시간대에 더리본 전문 상담원이 1588-0000 번호로 연락드립니다.
                  <br />
                  기존 폐가전 무상수거 및 설치 일정 조율이 함께 진행됩니다.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>문의: 더리본 고객센터 1588-0000</span>
                  <button
                    type="button"
                    onClick={handleCopyReceipt}
                    className="text-blue-600 hover:underline cursor-pointer font-bold"
                  >
                    {isCopied ? '복사됨!' : '문자 복사'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Selected Product Miniature Card */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 p-0.5 flex items-center justify-center">
              <img
                src={submission.productImage}
                alt={submission.productName}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                100% 전액 지원 확정
              </span>
              <p className="text-xs font-bold text-slate-900 truncate mt-0.5">
                {submission.productName}
              </p>
              <p className="text-[11px] text-slate-500">
                본사 전문 기사 배송 및 무료 설치 예정
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              onViewStatus();
            }}
            className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer text-center shadow-sm"
          >
            내 신청내역 실시간 확인하기
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer text-center"
          >
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
