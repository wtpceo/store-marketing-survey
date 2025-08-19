from django.contrib import admin
from django.utils.html import format_html
from .models import SurveyResponse, EmailRecipient

@admin.register(SurveyResponse)
class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ['store_name', 'owner_name', 'business_type', 'phone_number', 
                    'naver_status', 'instagram_status', 'created_at']
    list_filter = ['business_type', 'store_size', 'location_type', 
                   'naver_registered', 'google_registered', 'created_at']
    search_fields = ['store_name', 'owner_name', 'phone_number', 'email']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('store_name', 'owner_name', 'phone_number', 'email')
        }),
        ('매장 정보', {
            'fields': ('business_type', 'business_type_other', 'store_size', 
                      'location_type', 'location_detail')
        }),
        ('네이버 플레이스 마케팅', {
            'fields': ('naver_registered', 'naver_photos_quality', 'naver_reservation',
                      'naver_news_update', 'naver_directions', 'naver_marketing_msg',
                      'naver_keywords', 'naver_video_clip', 'naver_statistics'),
            'classes': ('collapse',)
        }),
        ('인스타그램 마케팅', {
            'fields': ('instagram_searchable', 'instagram_video_count', 'instagram_has_reviews'),
            'classes': ('collapse',)
        }),
        ('체험단 마케팅', {
            'fields': ('blog_content_recent', 'blog_detailed_info'),
            'classes': ('collapse',)
        }),
        ('구글 마케팅', {
            'fields': ('google_registered', 'google_info_accurate'),
            'classes': ('collapse',)
        }),
        ('유료 광고', {
            'fields': ('ad_naver_place', 'ad_naver_place_budget',
                      'ad_naver_powerlink', 'ad_naver_powerlink_budget',
                      'ad_instagram_reels', 'ad_instagram_budget'),
            'classes': ('collapse',)
        }),
        ('추가 정보', {
            'fields': ('main_concerns', 'desired_improvements'),
            'classes': ('collapse',)
        }),
        ('메타 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def naver_status(self, obj):
        if obj.naver_registered:
            return format_html('<span style="color: green;">✅ 등록</span>')
        return format_html('<span style="color: red;">❌ 미등록</span>')
    naver_status.short_description = '네이버'
    
    def instagram_status(self, obj):
        if obj.instagram_searchable:
            return format_html('<span style="color: green;">✅ 활용</span>')
        return format_html('<span style="color: red;">❌ 미활용</span>')
    instagram_status.short_description = '인스타'
    
    actions = ['export_to_csv']
    
    def export_to_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv; charset=utf-8-sig')
        response['Content-Disposition'] = 'attachment; filename="survey_responses.csv"'
        response.write('\ufeff')  # UTF-8 BOM for Excel
        
        writer = csv.writer(response)
        # 헤더 작성
        writer.writerow([
            '매장명', '대표자명', '연락처', '이메일', '업종', '매장규모', '위치',
            '네이버등록', '네이버사진', '네이버예약', '네이버소식', '인스타검색',
            '인스타영상수', '구글등록', '작성일시'
        ])
        
        # 데이터 작성
        for obj in queryset:
            writer.writerow([
                obj.store_name,
                obj.owner_name,
                obj.phone_number,
                obj.email,
                obj.get_business_type_display(),
                obj.get_store_size_display(),
                obj.get_location_type_display(),
                '등록' if obj.naver_registered else '미등록',
                f'{obj.naver_photos_quality}/5',
                '활용' if obj.naver_reservation else '미활용',
                obj.get_naver_news_update_display(),
                '노출' if obj.instagram_searchable else '미노출',
                obj.instagram_video_count,
                '등록' if obj.google_registered else '미등록',
                obj.created_at.strftime('%Y-%m-%d %H:%M')
            ])
        
        return response
    
    export_to_csv.short_description = '선택한 항목을 CSV로 내보내기'


@admin.register(EmailRecipient)
class EmailRecipientAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'email']
    actions = ['activate', 'deactivate']
    
    def activate(self, request, queryset):
        queryset.update(is_active=True)
    activate.short_description = '선택한 수신자 활성화'
    
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
    deactivate.short_description = '선택한 수신자 비활성화'