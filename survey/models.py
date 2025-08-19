from django.db import models
from django.core.validators import EmailValidator

class SurveyResponse(models.Model):
    # 기본 정보
    store_name = models.CharField(max_length=100, verbose_name='매장명')
    owner_name = models.CharField(max_length=50, verbose_name='대표자명')
    phone_number = models.CharField(max_length=20, verbose_name='연락처')
    email = models.EmailField(verbose_name='이메일', validators=[EmailValidator()])
    
    # 매장 정보
    BUSINESS_TYPE_CHOICES = [
        ('restaurant', '음식점'),
        ('cafe', '카페'),
        ('bar', '주점'),
        ('bakery', '베이커리'),
        ('other', '기타'),
    ]
    business_type = models.CharField(max_length=20, choices=BUSINESS_TYPE_CHOICES, verbose_name='업종')
    business_type_other = models.CharField(max_length=50, blank=True, verbose_name='기타 업종')
    
    STORE_SIZE_CHOICES = [
        ('small', '소형 (10평 미만)'),
        ('medium', '중형 (10-30평)'),
        ('large', '대형 (30평 이상)'),
    ]
    store_size = models.CharField(max_length=20, choices=STORE_SIZE_CHOICES, verbose_name='매장 규모')
    
    LOCATION_TYPE_CHOICES = [
        ('downtown', '번화가/역주변'),
        ('landmark', '랜드마크 주변'),
        ('apartment', '아파트 주거상권'),
        ('villa', '연립/빌라 주거상권'),
        ('university', '대학상권'),
        ('office', '오피스/업무지구'),
        ('traditional', '전통시장 주변'),
        ('other', '기타'),
    ]
    location_type = models.CharField(max_length=20, choices=LOCATION_TYPE_CHOICES, verbose_name='상권 위치')
    location_detail = models.CharField(max_length=200, blank=True, verbose_name='상세 위치')
    
    # 네이버 플레이스 마케팅 현황
    naver_registered = models.BooleanField(default=False, verbose_name='네이버 플레이스 등록 여부')
    naver_photos_quality = models.IntegerField(choices=[(i, i) for i in range(1, 6)], verbose_name='사진 매력도 (1-5점)')
    naver_reservation = models.BooleanField(default=False, verbose_name='예약 기능 활용')
    naver_news_update = models.CharField(max_length=20, choices=[
        ('daily', '매일'),
        ('weekly', '주 1-2회'),
        ('monthly', '월 1-2회'),
        ('rarely', '거의 안함'),
        ('never', '전혀 안함'),
    ], verbose_name='소식 업데이트 주기')
    naver_directions = models.BooleanField(default=False, verbose_name='찾아오는 길 상세 설명')
    naver_marketing_msg = models.BooleanField(default=False, verbose_name='무료 마케팅 메시지 활용')
    naver_keywords = models.BooleanField(default=False, verbose_name='대표 키워드 SEO 최적화')
    naver_video_clip = models.BooleanField(default=False, verbose_name='클립 영상 활용')
    naver_statistics = models.BooleanField(default=False, verbose_name='통계 확인 및 분석')
    
    # 인스타그램 마케팅 현황
    instagram_searchable = models.BooleanField(default=False, verbose_name='인스타 검색 시 노출')
    instagram_video_count = models.IntegerField(default=0, verbose_name='등재된 영상 개수')
    instagram_has_reviews = models.BooleanField(default=False, verbose_name='인스타 후기 존재')
    
    # 체험단 마케팅 현황
    blog_content_recent = models.BooleanField(default=False, verbose_name='최신 블로그 콘텐츠')
    blog_detailed_info = models.BooleanField(default=False, verbose_name='상세 정보 포함')
    
    # 구글 마케팅 현황
    google_registered = models.BooleanField(default=False, verbose_name='구글 비즈니스 등록')
    google_info_accurate = models.BooleanField(default=False, verbose_name='구글 정보 정확도')
    
    # 유료 광고 현황
    ad_naver_place = models.BooleanField(default=False, verbose_name='네이버 플레이스 상위노출 광고')
    ad_naver_place_budget = models.CharField(max_length=50, blank=True, verbose_name='네이버 플레이스 광고 예산')
    ad_naver_powerlink = models.BooleanField(default=False, verbose_name='네이버 파워링크 광고')
    ad_naver_powerlink_budget = models.CharField(max_length=50, blank=True, verbose_name='파워링크 광고 예산')
    ad_instagram_reels = models.BooleanField(default=False, verbose_name='인스타 릴스 스폰서 광고')
    ad_instagram_budget = models.CharField(max_length=50, blank=True, verbose_name='인스타 광고 예산')
    
    # 마케팅 대행사 이용 경험
    used_marketing_agency = models.BooleanField(default=False, verbose_name='온라인 마케팅 대행사 이용 경험')
    agency_satisfaction = models.CharField(max_length=20, blank=True, choices=[
        ('very_satisfied', '매우 만족'),
        ('satisfied', '만족'),
        ('neutral', '보통'),
        ('dissatisfied', '불만족'),
        ('very_dissatisfied', '매우 불만족'),
    ], verbose_name='대행사 만족도')
    agency_service_detail = models.TextField(blank=True, verbose_name='이용한 서비스 내용')
    
    # 추가 정보
    main_concerns = models.TextField(blank=True, verbose_name='주요 고민사항')
    desired_improvements = models.TextField(blank=True, verbose_name='개선 희망사항')
    
    # 메타 정보
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='작성일시')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일시')
    
    class Meta:
        verbose_name = '설문조사 응답'
        verbose_name_plural = '설문조사 응답들'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.store_name} - {self.owner_name} ({self.created_at.strftime('%Y-%m-%d')})"


class EmailRecipient(models.Model):
    """설문 결과를 받을 이메일 주소 관리"""
    email = models.EmailField(unique=True, verbose_name='수신 이메일')
    name = models.CharField(max_length=50, verbose_name='담당자명')
    is_active = models.BooleanField(default=True, verbose_name='활성화')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = '이메일 수신자'
        verbose_name_plural = '이메일 수신자들'
    
    def __str__(self):
        return f"{self.name} ({self.email})"