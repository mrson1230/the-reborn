import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface PasswordAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (target: 'admin' | 'status') => void;
  target: 'admin' | 'status';
}

const CORRECT_PIN = '3927';

export const PasswordAuthModal: React.FC<PasswordAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  target,
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg('');
      setIsShaking(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('비밀번호 4자리를 입력해주세요.');
      return;
    }

    if (password === CORRECT_PIN) {
      setErrorMsg('');
      onSuccess(target);
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  const handleQuickKey = (num: string) => {
    if (password.length < 4) {
      const nextPin = password + num;
      setPassword(nextPin);
      setErrorMsg('');
      if (nextPin.length === 4) {
        if (nextPin === CORRECT_PIN) {
          setTimeout(() => {
            onSuccess(target);
          }, 150);
        } else {
          setTimeout(() => {
            setErrorMsg('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            setPassword('');
          }, 150);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const targetLabel = target === 'admin' ? '접수관리자' : '접수현황';

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600/90 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">보안 인증</h3>
              <p className="text-[11px] text-slate-300">
                {targetLabel} 접근 권한 확인
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-600 mb-2 border border-rose-100">
              <KeyRound className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">
              {targetLabel} 비밀번호 입력
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              해당 메뉴는 인가된 관리자만 열람할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                maxLength={4}
                value={password}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                  setPassword(val);
                  setErrorMsg('');
                  if (val.length === 4) {
                    if (val === CORRECT_PIN) {
                      setTimeout(() => onSuccess(target), 100);
                    } else {
                      setErrorMsg('비밀번호가 일치하지 않습니다.');
                      setIsShaking(true);
                      setTimeout(() => setIsShaking(false), 500);
                    }
                  }
                }}
                placeholder="비밀번호 4자리"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 text-slate-900 placeholder:text-slate-300 placeholder:tracking-normal placeholder:text-sm font-bold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error Message */}
            {errorMsg ? (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 justify-center font-medium bg-rose-50 p-2 rounded-lg border border-rose-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>암호화 보안 세션 적용</span>
              </div>
            )}

            {/* Numeric Keypad for convenience on mobile & desktop */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleQuickKey(num)}
                  className="py-3 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPassword('')}
                className="py-3 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => handleQuickKey('0')}
                className="py-3 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                ← 지움
              </button>
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                확인 및 접속
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
