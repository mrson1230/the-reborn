import { ApplicationSubmission, TickerItem } from '../types';

export const INITIAL_TICKER: TickerItem[] = [
  { id: '1', name: '김*민', region: '서울 강동구', product: '삼성 비스포크 4도어 냉장고', timeAgo: '1분 전', status: '접수완료' },
  { id: '2', name: '이*현', region: '경기 하남시', product: 'LG 트롬 워시타워 오브제', timeAgo: '3분 전', status: '상담원 배정' },
  { id: '3', name: '박*준', region: '인천 연수구', product: '삼성 85인치 Crystal UHD TV', timeAgo: '5분 전', status: '접수완료' },
  { id: '4', name: '정*아', region: '부산 해운대구', product: 'LG 트롬 스타일러 오브제', timeAgo: '8분 전', status: '심사 통과' },
  { id: '5', name: '최*영', region: '대전 유성구', product: '삼성 비스포크 무풍 에어컨', timeAgo: '12분 전', status: '접수완료' },
  { id: '6', name: '강*우', region: '대구 수성구', product: 'LG 올레드 evo 65인치 TV', timeAgo: '15분 전', status: '설치일정 조율' },
  { id: '7', name: '윤*서', region: '경기 수원시', product: '삼성 갤럭시북4 Pro', timeAgo: '19분 전', status: '접수완료' },
];

export const REVIEWS_DATA = [
  {
    id: 'rev-1',
    name: '김*현 님 (30대 / 신혼부부)',
    region: '경기 성남시 분당구',
    product: 'LG 트롬 워시타워 + 삼성 비스포크 냉장고',
    date: '2026.03.14',
    rating: 5,
    title: '신혼 가전 준비하면서 500만원 이상 절약했습니다!',
    content: '결혼 준비하면서 가전 견적 뽑았을 때 예산 초과로 막막했는데, 더리본 전액지원 프로모션을 알게 되어 신청했습니다. 상담원분이 라이프플랜과 함께 꼼꼼히 설명해주셨고, 진짜 본인부담금 0원에 LG 본사 공식 설치 기사님이 직접 오셔서 깔끔하게 설치해주셨어요. 대만족입니다!',
    verified: true,
  },
  {
    id: 'rev-2',
    name: '이*우 님 (40대 / 자영업)',
    region: '서울 송파구 잠실동',
    product: '삼성 85인치 Crystal 4K UHD TV',
    date: '2026.03.20',
    rating: 5,
    title: '거실이 영화관이 됐어요. 부담금 0원 실화네요.',
    content: '처음엔 광고 보고 설마 진짜 0원일까 반신반의했는데, 더리본은 상조/라이프케어 1등 기업이라 믿고 상담받았습니다. 서류도 복잡하지 않고 유선으로 빠르게 확인 후 일주일 만에 본사 물류센터에서 직배송 왔습니다. 삼성 공식 AS도 그대로 적용되니 안심입니다.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: '박*정 님 (50대 / 주부)',
    region: '부산 동래구',
    product: '삼성 비스포크 에어컨 + 제트봇 로봇청소기',
    date: '2026.03.28',
    rating: 5,
    title: '여름 대비해서 에어컨 바꿨는데 최고의 선택입니다.',
    content: '기존 오래된 에어컨 전기세가 너무 많이 나와서 교체 고민 중이었는데, 무풍 에어컨 2in1으로 전액 지원받아 설치했습니다. 기존 폐가전도 무료로 수거해가 주셔서 번거로움이 하나도 없었습니다. 주위 지인들에게도 적극 추천 중이에요.',
    verified: true,
  },
];

export const FAQ_DATA = [
  {
    q: '삼성·LG 가전제품을 정말 0원(전액지원)으로 받을 수 있나요?',
    a: '네, 맞습니다. 더리본의 라이프케어 멤버십 결합 지원 프로모션으로, 고객님께서 별도의 가전 구매 비용이나 할부 이자를 부담하실 필요 없이 전액 100% 무상 지원 혜택이 적용됩니다. 본사 정품 새제품으로 제공됩니다.',
  },
  {
    q: '배송비나 사다리차, 설치 비용이 따로 청구되나요?',
    a: '전혀 발생하지 않습니다. 삼성전자 / LG전자 공식 본사 전문 설치 기사님이 직접 방문하여 기본 배송, 현장 설치 및 기존 사용하시던 동일 품목 폐가전 무상 수거까지 100% 무료로 진행해 드립니다.',
  },
  {
    q: '공식 본사 정품이 맞나요? A/S는 어떻게 되나요?',
    a: '100% 삼성전자, LG전자 공식 제조사 정품 새제품입니다. 제조사 공식 서비스센터를 통해 1~3년 무상 A/S 보증 혜택(삼성케어플러스 / LG케어솔루션 및 제조사 품질보증)을 동일하게 받으실 수 있습니다.',
  },
  {
    q: '신청 자격 조건이 있나요? 신용도에 영향이 가나요?',
    a: '대한민국 거주 만 25세 이상 성인이면 누구나 신청 가능합니다. 1금융권 대출이나 일반 신용등급 조회와 무관하므로 개인 신용점수에 전혀 부정적인 영향을 미치지 않으며, 간단한 비대면 본인확인 절차로 심사가 완료됩니다.',
  },
  {
    q: '상담 신청을 하면 바로 결제나 가입이 되나요?',
    a: '아닙니다. 지금 신청폼을 작성하시는 것은 전문 상담원과의 1:1 맞춤 무료 상담 및 원하시는 가전의 지원 자격 유무를 확인하는 예약 단계입니다. 상세 혜택을 충분히 안내받으신 후 고객님께서 최종 진행 여부를 편안하게 결정하시면 됩니다.',
  },
  {
    q: '만기 시 납입금은 어떻게 환급받나요?',
    a: '더리본의 라이프케어 만기 환급형 플랜을 이용하시면 약정 만기 시 납입하신 금액 100%를 전액 환급받으실 수 있습니다. 가전제품은 반납하실 필요 없이 평생 고객님 소유가 됩니다.',
  },
];

export const INITIAL_SUBMISSIONS: ApplicationSubmission[] = [
  {
    id: 'demo-1',
    applicationNumber: 'TR-202611-0982',
    createdAt: '2026-11-03 21:15',
    productName: '삼성 BESPOKE AI 하이브리드 냉장고 4도어 (901L)',
    productBrand: '삼성전자',
    productImage: '/assets/products/prod_199536.jpg',
    userName: '홍길동',
    phoneNumber: '010-1234-5678',
    preferredTime: '오후 14:00 ~ 16:00',
    region: '서울',
    note: '기존 구형 냉장고 무상 수거 희망합니다.',
    status: '상담원 배정',
  },
  {
    id: 'demo-2',
    applicationNumber: 'TR-202611-0975',
    createdAt: '2026-11-03 19:40',
    productName: 'LG 트롬 오브제컬렉션 드럼세탁기21kg + 건조기19kg 세트',
    productBrand: 'LG전자',
    productImage: '/assets/products/prod_199381.jpg',
    userName: '김영희',
    phoneNumber: '010-9876-5432',
    preferredTime: '언제든 가능',
    region: '경기/인천',
    note: '신혼집 이사 일정(다음달 중순)에 맞춰 상담 희망합니다.',
    status: '접수완료',
  }
];
