# 우리 식당 'SNS마케팅 건강' 진단표_N스마트플레이스

청운대학교 정현우 책임교수 주관 | 마케팅 지원: (주)위즈더플래닝

## 프로젝트 소개

음식점/카페의 SNS 마케팅 현황을 진단하고 맞춤형 컨설팅을 제공하기 위한 설문조사 시스템입니다.
기존 Django 버전에서 Next.js로 리뉴얼하여 더욱 현대적이고 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능

### 설문조사 기능
- 📋 매장 기본 정보 수집 (7단계 진행)
- 📍 네이버 플레이스 마케팅 현황 진단
- 📱 인스타그램 마케팅 현황 파악
- 📝 블로그 마케팅 현황 확인
- 🌍 구글 비즈니스 등록 상태 확인
- 💰 유료 광고 현황 조사

### UI/UX 기능
- 🎨 현대적이고 반응형 디자인
- 📱 모바일 최적화
- ⚡ 실시간 진행 상황 표시
- 💬 카카오톡 채널 실시간 문의 기능
- 🔄 처음으로 돌아가기 기능

## 기술 스택

### Frontend
- **Next.js 15.4.7** - React 기반 풀스택 프레임워크
- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **Tailwind CSS 3.x** - 유틸리티 기반 CSS 프레임워크
- **TypeScript 5.x** - 정적 타입 시스템

### Backend
- **Next.js API Routes** - 서버리스 API 엔드포인트
- **Nodemailer** - 이메일 발송 기능

## 로컬 실행 방법

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/wtpceo/store-marketing-survey.git
cd store-marketing-survey

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린팅
npm run lint
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# 이메일 발송 설정 (선택사항)
EMAIL_PROVIDER=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# 수신자 이메일 (쉼표로 구분하여 여러 명 가능)
RECIPIENT_EMAILS=ceo@wiztheplanning.com,admin@example.com

# 추가 설정
SAVE_TO_FILE=false
NODE_ENV=production
```

### 이메일 설정 방법

1. **Gmail 사용 시:**
   - Gmail 계정에서 2단계 인증 활성화
   - 앱 비밀번호 생성 ([방법 보기](https://support.google.com/accounts/answer/185833))
   - `EMAIL_PROVIDER=gmail` 설정

2. **다른 SMTP 서버 사용 시:**
   - SMTP 호스트, 포트, 보안 설정 확인
   - `EMAIL_PROVIDER` 설정하지 않음

## 프로젝트 구조

```
survey-site/
├── src/
│   ├── app/
│   │   ├── admin/          # 관리자 페이지
│   │   ├── api/            # API 라우트
│   │   │   ├── admin/      # 관리자 API
│   │   │   └── survey/     # 설문조사 API
│   │   ├── globals.css     # 전역 스타일
│   │   ├── layout.tsx      # 레이아웃 컴포넌트
│   │   └── page.tsx        # 메인 설문조사 페이지
├── public/                 # 정적 파일
├── tailwind.config.js      # Tailwind CSS 설정
├── next.config.ts          # Next.js 설정
└── package.json           # 프로젝트 의존성
```

## 주요 화면

### 1. 메인 설문조사 화면
- 그라데이션 배경과 카드 기반 디자인
- 7단계 진행 표시기
- 실시간 문의 플로팅 버튼

### 2. 설문 단계별 화면
- **1단계**: 매장 기본정보 (매장명, 업종, 상권, 규모 등)
- **2단계**: 네이버 플레이스 마케팅 현황
- **3단계**: 인스타그램 마케팅 현황
- **4단계**: 블로그 마케팅 현황
- **5단계**: 구글 마케팅 현황
- **6단계**: 유료 광고 현황
- **7단계**: 설문 완료 및 감사 메시지

### 3. 관리자 페이지
- 설문 결과 조회 및 CSV 다운로드
- 응답 통계 확인

## 실시간 문의

설문 진행 중 궁금한 사항이 있으시면 우측 하단의 카카오톡 문의 버튼을 클릭하세요.
- 🔗 [카카오톡 채널 문의](http://pf.kakao.com/_QUTxcb/chat)

## 배포

### Vercel (권장)
1. GitHub 리포지토리를 Vercel에 연결
2. 자동 배포 설정 완료

### 기타 플랫폼
- Netlify, Railway, Render 등 Next.js를 지원하는 모든 플랫폼

## 라이선스

Copyright 2024 청운대학교 정현우 책임교수

---

## 이전 버전 (Django)

이 프로젝트는 기존 Django 기반 버전을 Next.js로 마이그레이션한 것입니다.
Django 버전의 기능들(이메일 발송, CSV 다운로드 등)은 Next.js API Routes로 재구현되었습니다.