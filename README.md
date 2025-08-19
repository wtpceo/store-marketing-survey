# SNS마케팅 건강 진단표_N플레이스

청운대학교 정현우 책임교수 주관 | 마케팅 지원: (주)위즈더플래닝

## 프로젝트 소개
음식점/카페의 SNS 마케팅 현황을 진단하고 맞춤형 컨설팅을 제공하기 위한 설문조사 시스템입니다.

## 주요 기능
- 매장 기본 정보 수집
- 네이버 플레이스 마케팅 현황 진단
- 인스타그램 마케팅 현황 파악
- 구글 비즈니스 등록 상태 확인
- 유료 광고 현황 조사
- 마케팅 대행사 이용 경험 파악
- 설문 결과 이메일 자동 발송
- 관리자 페이지에서 CSV 다운로드

## 기술 스택
- Django 5.2.5
- Python 3.11+
- Bootstrap 5
- SQLite (개발) / PostgreSQL (운영)

## 로컬 실행 방법

```bash
# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
python manage.py migrate

# 관리자 계정 생성
python manage.py createsuperuser

# 서버 실행
python manage.py runserver
```

## 배포 방법 (Render)

1. GitHub에 코드 푸시
2. Render.com 가입 및 로그인
3. New > Web Service 선택
4. GitHub 리포지토리 연결
5. 자동으로 설정 적용됨

## 환경 변수 설정

`.env` 파일에 다음 설정 필요:
- `SECRET_KEY`: Django 시크릿 키
- `DEBUG`: True/False
- `ALLOWED_HOSTS`: 허용된 호스트
- `EMAIL_HOST_USER`: 이메일 발송용 계정
- `EMAIL_HOST_PASSWORD`: 이메일 앱 비밀번호

## 라이선스
Copyright 2024 청운대학교 정현우 책임교수