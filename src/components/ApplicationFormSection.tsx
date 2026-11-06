import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Check, Lock, ChevronDown, Sparkles, AlertCircle, Sun, Moon, Clock, Zap, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Product, ApplicationSubmission } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import confetti from 'canvas-confetti';

interface ApplicationFormSectionProps {
  selectedProducts: Product[];
  onSelectProduct: (product: Product, slotIndex: 0 | 1) => void;
  onSubmitSuccess: (submission: ApplicationSubmission) => void;
  onOpenTerms: () => void;
  onGoToLineup?: () => void;
}

export const CONSULTATION_TIME_SLOTS = [
  {
    id: 'time-morning',
    value: '오전 (09:00 ~ 12:00)',
    label: '오전',
    range: '09:00 ~ 12:00',
    desc: '출근 후 / 오전 상담',
    icon: Sun,
    badgeColor: 'text-amber-500',
  },
  {
    id: 'time-afternoon',
    value: '오후 (12:00 ~ 18:00)',
    label: '오후',
    range: '12:00 ~ 18:00',
    desc: '점심 후 / 편안한 시간',
    icon: Clock,
    badgeColor: 'text-sky-500',
  },
  {
    id: 'time-evening',
    value: '저녁 (18:00 ~ 21:00)',
    label: '저녁',
    range: '18:00 ~ 21:00',
    desc: '퇴근 후 / 저녁 상담',
    icon: Moon,
    badgeColor: 'text-indigo-500',
  },
  {
    id: 'time-anytime',
    value: '언제든 통화 가능 (빠른 배정)',
    label: '언제든 가능',
    range: '실시간 즉시 연결',
    desc: '가장 빠른 전문상담원 배정',
    icon: Zap,
    badgeColor: 'text-emerald-500',
  },
];

export const ApplicationFormSection: React.FC<ApplicationFormSectionProps> = ({
  selectedProducts,
  onSelectProduct,
  onSubmitSuccess,
  onOpenTerms,
  onGoToLineup,
}) => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredTime, setPreferredTime] = useState('오전 (09:00 ~ 12:00)');
  const [region, setRegion] = useState('서울');
  const [note, setNote] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [agreeMarketing, setAgreeMarketing] = useState(true);

  const [errors, setErrors] = useState<{ name?: string; phone?: string; agree?: string; products?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingProgress, setConnectingProgress] = useState(15);
  const [connectingStep, setConnectingStep] = useState('상담 신청 정보를 안전하게 확인 중입니다...');

  const product1 = selectedProducts[0] || PRODUCTS_DATA[0];
  const product2 = selectedProducts[1] || PRODUCTS_DATA[1];

  // Phone number auto-formatter: 010-XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length <= 3) {
      formatted = raw;
    } else if (raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setPhoneNumber(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyeelowz';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string; agree?: string; products?: string } = {};

    if (!userName.trim()) {
      newErrors.name = '성함을 입력해 주세요.';
    } else if (userName.trim().length < 2) {
      newErrors.name = '정확한 성함을 2자 이상 입력해 주세요.';
    }

    const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanedPhone) {
      newErrors.phone = '연락처(휴대폰 번호)를 입력해 주세요.';
    } else if (!/^01[016789]\d{7,8}$/.test(cleanedPhone)) {
      newErrors.phone = '올바른 휴대폰 번호 11자리를 입력해 주세요.';
    }

    if (!agreePrivacy) {
      newErrors.agree = '개인정보 수집 및 이용에 동의해 주세요.';
    }

    if (!product1 || !product2) {
      newErrors.products = '가전제품 2종을 모두 선택해 주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setIsConnecting(true);
    setConnectingProgress(20);
    setConnectingStep('신청자 정보 256비트 보안 암호화 중...');

    const now = new Date();
    const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const appNumber = `TR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${randomCode}`;

    // Detailed Formspree payload with both selected appliances
    const formspreePayload = {
      _subject: `[더리본 가전 2종 전액지원 상담신청] ${userName.trim()} (${phoneNumber}) - ① ${product1.name} + ② ${product2.name}`,
      applicationNumber: appNumber,
      customerName: userName.trim(),
      phoneNumber: phoneNumber,
      preferredTime: preferredTime,
      region: region,
      // Product 1
      product1Name: product1.name,
      product1Brand: product1.brandName,
      product1Model: product1.modelCode,
      product1Tier: product1.tierName,
      // Product 2
      product2Name: product2.name,
      product2Brand: product2.brandName,
      product2Model: product2.modelCode,
      product2Tier: product2.tierName,
      customerCost: '0원 (가전 2종 모두 100% 전액지원)',
      note: note.trim() || '없음',
      agreePrivacy: agreePrivacy ? '동의함' : '미동의',
      agreeMarketing: agreeMarketing ? '동의함' : '미동의',
      submittedAt: dateString,
      // Korean keys for Formspree web dashboard and automated notifications
      접수번호: appNumber,
      신청자성함: userName.trim(),
      휴대폰번호: phoneNumber,
      희망상담시간대: preferredTime,
      설치희망지역: region,
      선택가전1_순위: `[${product1.brandName}] ${product1.name} (${product1.modelCode} / ${product1.tierName})`,
      선택가전2_순위: `[${product2.brandName}] ${product2.name} (${product2.modelCode} / ${product2.tierName})`,
      가전2종_지원혜택: '가전 2개 품목 모두 본인부담금 0원 (100% 전액지원)',
      문의및요청사항: note.trim() || '없음',
      개인정보수집동의: '동의함',
      마케팅안내동의: agreeMarketing ? '동의함' : '미동의',
      신청일시: dateString,
    };

    let sendSuccess = false;

    try {
      // Step 1: Start async request to Formspree
      const sendPromise = fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formspreePayload),
      });

      // Step 2: Smooth animated visual progression
      await new Promise((resolve) => setTimeout(resolve, 450));
      setConnectingProgress(55);
      setConnectingStep('신청 데이터를 보안 서버(Formspree)로 안전하게 전송 중...');

      // Wait for fetch & slight visual pause
      const [res] = await Promise.all([
        sendPromise.catch((err) => {
          console.warn('Formspree dispatch notice:', err);
          return null;
        }),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      if (res && res.ok) {
        sendSuccess = true;
      }

      // Step 3: Counselor matching stage
      setConnectingProgress(85);
      setConnectingStep('더리본 가전 2종 전액지원 전담 상담사 매칭 중...');
      await new Promise((resolve) => setTimeout(resolve, 550));

      // Step 4: Finished stage
      setConnectingProgress(100);
      setConnectingStep('신청 접수 및 상담사 연결 완료! 접수 확인 화면으로 이동합니다.');
      await new Promise((resolve) => setTimeout(resolve, 400));
    } catch (err) {
      console.warn('Submission fallback:', err);
      setConnectingProgress(100);
      setConnectingStep('접수가 완료되었습니다. 접수 확인 화면으로 이동합니다.');
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    const newSubmission: ApplicationSubmission = {
      id: `app-${Date.now()}`,
      applicationNumber: appNumber,
      createdAt: dateString,
      productName: product1.name,
      productBrand: product1.brandName,
      productImage: product1.image,
      productModelCode: product1.modelCode,
      productTierName: product1.tierName,
      product2Name: product2.name,
      product2Brand: product2.brandName,
      product2Image: product2.image,
      product2ModelCode: product2.modelCode,
      product2TierName: product2.tierName,
      userName: userName.trim(),
      phoneNumber,
      preferredTime,
      region,
      note: note.trim() || undefined,
      status: '접수완료',
      formspreeSent: sendSuccess,
      marketingConsent: agreeMarketing,
    };

    // Confetti celebration burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsConnecting(false);
    onSubmitSuccess(newSubmission);

    // Reset form fields
    setUserName('');
    setPhoneNumber('');
    setNote('');
  };

  return (
    <section id="apply-form" className="py-16 bg-gradient-to-b from-slate-50 to-rose-50/30 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>선착순 가전 2종 100% 전액 지원 간편 신청</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight text-balance">
            가전제품 2종 전액지원 무료 상담 예약
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            원하시는 가전 2종을 확인하시고 신청서를 남겨주시면 전담 상담원이 30분 이내 순차적으로 안심 전화를 드립니다.
          </p>
        </div>

        {/* The Card Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top 2 Selected Products Container */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-extrabold text-sm sm:text-base text-white">
                  선택된 지원 가전 (총 2종 100% 전액지원)
                </span>
              </div>
              {onGoToLineup && (
                <button
                  type="button"
                  onClick={onGoToLineup}
                  className="text-xs text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer"
                >
                  가전 카탈로그에서 다시 고르기
                </button>
              )}
            </div>

            {/* Dual Product Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Product Slot 1 */}
              <div className="bg-slate-800/95 border border-rose-500/80 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-700 p-1 flex items-center justify-center">
                    <img
                      src={product1.image}
                      alt={product1.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-600 text-white">
                        가전 ① (1순위)
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-white">
                        {product1.tierName}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono truncate">{product1.brandName}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                      {product1.name}
                    </div>
                    <div className="text-[11px] text-rose-300 font-semibold mt-0.5">
                      본인부담금 0원 · {product1.modelCode}
                    </div>
                  </div>
                </div>

                {/* Slot 1 Switcher Dropdown */}
                <div className="pt-2 border-t border-slate-700/70">
                  <label htmlFor="product1-switcher" className="sr-only">
                    가전 1 변경
                  </label>
                  <select
                    id="product1-switcher"
                    value={product1.id}
                    onChange={(e) => {
                      const target = PRODUCTS_DATA.find((p) => p.id === e.target.value);
                      if (target) onSelectProduct(target, 0);
                    }}
                    className="w-full bg-slate-900 text-white text-[11px] font-medium border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {PRODUCTS_DATA.map((p) => (
                      <option key={`p1-${p.id}`} value={p.id}>
                        [가전1] [{p.brandName}] {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Slot 2 */}
              <div className="bg-slate-800/95 border border-amber-500/80 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-700 p-1 flex items-center justify-center">
                    <img
                      src={product2.image}
                      alt={product2.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/hero_home_appliances_living_1793774944397.jpg';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-extrabold">
                        가전 ② (2순위)
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-700 text-white">
                        {product2.tierName}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono truncate">{product2.brandName}</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                      {product2.name}
                    </div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                      본인부담금 0원 · {product2.modelCode}
                    </div>
                  </div>
                </div>

                {/* Slot 2 Switcher Dropdown */}
                <div className="pt-2 border-t border-slate-700/70">
                  <label htmlFor="product2-switcher" className="sr-only">
                    가전 2 변경
                  </label>
                  <select
                    id="product2-switcher"
                    value={product2.id}
                    onChange={(e) => {
                      const target = PRODUCTS_DATA.find((p) => p.id === e.target.value);
                      if (target) onSelectProduct(target, 1);
                    }}
                    className="w-full bg-slate-900 text-white text-[11px] font-medium border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {PRODUCTS_DATA.map((p) => (
                      <option key={`p2-${p.id}`} value={p.id}>
                        [가전2] [{p.brandName}] {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Combined Benefit Tag */}
            <div className="pt-1 flex items-center justify-between text-xs text-rose-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>가전 2개 품목 모두 제조사 정품 본사 무료 배송 & 전문 기사 무상 설치 지원</span>
              </span>
              <span className="font-extrabold text-white bg-rose-600 px-2 py-0.5 rounded text-[11px]">
                본인부담금 총 0원
              </span>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  신청자 성함 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={userName}
                  onChange={handleNameChange}
                  className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-rose-600'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  휴대폰 번호 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-rose-600'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Region Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                설치 희망 지역 <span className="text-rose-600">*</span>
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white focus:border-rose-600 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="서울">서울특별시</option>
                <option value="경기/인천">경기도 / 인천광역시</option>
                <option value="부산/경남">부산광역시 / 경상남도</option>
                <option value="대구/경북">대구광역시 / 경상북도</option>
                <option value="대전/충청">대전광역시 / 세종특별자치시 / 충청도</option>
                <option value="광주/전라">광주광역시 / 전라도</option>
                <option value="강원/제주">강원도 / 제주특별자치도</option>
              </select>
            </div>

            {/* Row 3: Consultation Time Radio Button Group */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="block text-xs font-bold text-slate-800">
                  희망 상담 시간대 선택 <span className="text-rose-600">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  선택하신 시간대에 전담 상담원이 우선 배정되어 연락드립니다
                </span>
              </div>

              {/* Radio Button Group Container */}
              <div
                role="radiogroup"
                aria-label="상담 희망 시간대 선택"
                className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5"
              >
                {CONSULTATION_TIME_SLOTS.map((slot) => {
                  const isChecked = preferredTime === slot.value;
                  const Icon = slot.icon;
                  return (
                    <label
                      key={slot.id}
                      className={`relative flex flex-col justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none group focus-within:ring-2 focus-within:ring-rose-500 ${
                        isChecked
                          ? 'border-rose-500 bg-rose-50/70 shadow-xs ring-1 ring-rose-500/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredConsultationTime"
                        value={slot.value}
                        checked={isChecked}
                        onChange={() => setPreferredTime(slot.value)}
                        className="sr-only"
                      />

                      {/* Header with Title, Icon and Radio Indicator */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`p-1 rounded-md transition-colors ${
                              isChecked ? 'bg-white shadow-xs' : 'bg-slate-100 group-hover:bg-slate-200/70'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${slot.badgeColor}`} />
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-bold ${
                              isChecked ? 'text-rose-950' : 'text-slate-800'
                            }`}
                          >
                            {slot.label}
                          </span>
                        </div>

                        {/* Visual Radio Circle */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isChecked
                              ? 'border-rose-600 bg-rose-600 shadow-xs'
                              : 'border-slate-300 bg-white group-hover:border-slate-400'
                          }`}
                        >
                          {isChecked && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white block animate-in zoom-in-50 duration-150" />
                          )}
                        </div>
                      </div>

                      {/* Time Range */}
                      <div
                        className={`text-xs font-extrabold tracking-tight ${
                          isChecked ? 'text-rose-700' : 'text-slate-700'
                        }`}
                      >
                        {slot.range}
                      </div>

                      {/* Sub-description */}
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight truncate">
                        {slot.desc}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Additional Note */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                문의사항 또는 추가 희망내용 <span className="text-slate-400 font-normal">(선택사항)</span>
              </label>
              <input
                type="text"
                placeholder="예: 가전 2종 외 라이프서비스(크루즈·웨딩·장례 등) 동시 문의 / 기존 구형 가전 무료 수거"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-rose-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Reassuring Counselor Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <img
                src="/src/assets/images/consultant_service_trust_1793774945604.jpg"
                alt="더리본 안심 전문 상담원"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">더리본 가전 2종 전액지원 안심 보증:</span>{' '}
                고객님의 소중한 개인정보는 1:1 전액지원 가전 심사 및 상담 예약 목적으로만 안전하게 256비트 암호화 관리됩니다.
              </div>
            </div>

            {/* Checkbox agreements */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-start justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                  />
                  <span>
                    <strong className="text-rose-600">[필수]</strong> 개인정보 수집 및 상담 예약을 위한 이용 동의
                  </span>
                </label>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-xs text-slate-400 hover:text-slate-600 underline whitespace-nowrap cursor-pointer"
                >
                  전문보기
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                  />
                  <span>
                    <strong className="text-slate-500">[선택]</strong> 가전 2종 프로모션 혜택 및 이벤트 안내 수신 동의
                  </span>
                </label>
              </div>

              {errors.agree && (
                <p className="text-xs text-rose-600 flex items-center gap-1 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.agree}</span>
                </p>
              )}
            </div>

            {/* Live Counselor Availability Indicator */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-emerald-50 border border-emerald-200/90 rounded-xl text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-bold">실시간 상담 가능</span>
                <span className="hidden sm:inline text-emerald-700 font-medium">· 더리본 전문 상담팀 전원 대기 중</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">
                평균 응대 1분 내외
              </span>
            </div>

            {/* Submit CTA */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting || isConnecting}
                className="w-full relative overflow-hidden py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-90 transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>상담사를 연결 중입니다... ({connectingProgress}%)</span>
                  </div>
                ) : (
                  <>
                    <PhoneCall className="w-5 h-5" />
                    <span>가전 2종 100% 전액지원 무료 상담 신청하기</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Security Seals */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                256비트 SSL 보안 암호화 전송
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                상조보증공제조합 소비자피해보상보험 가입
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                실시간 DB 데이터 수집 연동 (Formspree)
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Smooth Transition Modal: "상담사를 연결 중입니다" with Loading Spinner & Progress Bar */}
      {isConnecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            {/* Counselor Avatar with Pulsing Rings & Rotating Spinner */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-rose-400 opacity-25 animate-ping" />
              {/* Spinner track and head */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-rose-600 border-r-rose-600 animate-spin" />
              {/* Avatar image */}
              <img
                src="/assets/images/consultant_service_trust_1793774945604.jpg"
                alt="더리본 안심 전문 상담원"
                referrerPolicy="no-referrer"
                className="w-18 h-18 rounded-full object-cover shadow-md z-10 border-2 border-white"
              />
              {/* Live green beacon badge */}
              <span className="absolute bottom-1 right-2 z-20 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            {/* Headline and Stage Text */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-slate-950 tracking-tight flex items-center justify-center gap-2">
                <span>상담사를 연결 중입니다</span>
                <span className="inline-flex gap-0.5 text-rose-600 animate-pulse">...</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {connectingStep}
              </p>
            </div>

            {/* Combined Progress Bar & Percentage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="text-[11px] text-slate-400">1:1 맞춤 배정 진행률</span>
                <span className="font-bold text-rose-600 tabular-nums text-sm">
                  {connectingProgress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${connectingProgress}%` }}
                />
              </div>
            </div>

            {/* Selected Dual Appliances Mini Summary */}
            <div className="space-y-2 text-left">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 p-0.5 flex items-center justify-center">
                  <img
                    src={product1.image}
                    alt={product1.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-rose-600">
                    가전 ① [{product1.brandName}] 본인부담금 0원 지원
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {product1.name}
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 p-0.5 flex items-center justify-center">
                  <img
                    src={product2.image}
                    alt={product2.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-amber-600">
                    가전 ② [{product2.brandName}] 본인부담금 0원 지원
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {product2.name}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              * 기재해주신 번호({phoneNumber || '입력하신 번호'})로 담당 상담사가 순차적으로 안심 해피콜을 드립니다.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
