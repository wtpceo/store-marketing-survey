from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Submit, Div, Field, HTML
from .models import SurveyResponse

class SurveyForm(forms.ModelForm):
    class Meta:
        model = SurveyResponse
        exclude = ['created_at', 'updated_at']
        widgets = {
            'main_concerns': forms.Textarea(attrs={'rows': 3}),
            'desired_improvements': forms.Textarea(attrs={'rows': 3}),
            'agency_service_detail': forms.Textarea(attrs={'rows': 2, 'placeholder': '어떤 서비스를 이용하셨는지 간단히 적어주세요'}),
            'phone_number': forms.TextInput(attrs={'placeholder': '010-0000-0000'}),
            'email': forms.EmailInput(attrs={'placeholder': 'example@email.com'}),
            'instagram_video_count': forms.NumberInput(attrs={'min': 0}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_class = 'needs-validation'
        self.helper.form_id = 'survey-form'
        
        self.helper.layout = Layout(
            HTML('<h4 class="mb-4 text-primary">📋 기본 정보</h4>'),
            Div(
                Div(Field('store_name'), css_class='col-md-6'),
                Div(Field('owner_name'), css_class='col-md-6'),
                css_class='row'
            ),
            Div(
                Div(Field('phone_number'), css_class='col-md-6'),
                Div(Field('email'), css_class='col-md-6'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">🏪 매장 정보</h4>'),
            Div(
                Div(Field('business_type'), css_class='col-md-4'),
                Div(Field('business_type_other', css_id='business_type_other_field'), css_class='col-md-4'),
                Div(Field('store_size'), css_class='col-md-4'),
                css_class='row'
            ),
            Div(
                Div(Field('location_type'), css_class='col-md-6'),
                Div(Field('location_detail'), css_class='col-md-6'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">📱 네이버 플레이스 마케팅 현황</h4>'),
            Div(
                Div(Field('naver_registered'), css_class='col-md-6'),
                Div(Field('naver_photos_quality'), css_class='col-md-6'),
                css_class='row mb-3'
            ),
            Div(
                Div(Field('naver_reservation'), css_class='col-md-4'),
                Div(Field('naver_directions'), css_class='col-md-4'),
                Div(Field('naver_marketing_msg'), css_class='col-md-4'),
                css_class='row mb-3'
            ),
            Div(
                Div(Field('naver_keywords'), css_class='col-md-4'),
                Div(Field('naver_video_clip'), css_class='col-md-4'),
                Div(Field('naver_statistics'), css_class='col-md-4'),
                css_class='row mb-3'
            ),
            Field('naver_news_update'),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">📸 인스타그램 마케팅 현황</h4>'),
            Div(
                Div(Field('instagram_searchable'), css_class='col-md-4'),
                Div(Field('instagram_video_count'), css_class='col-md-4'),
                Div(Field('instagram_has_reviews'), css_class='col-md-4'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">✍️ 체험단 마케팅 현황</h4>'),
            Div(
                Div(Field('blog_content_recent'), css_class='col-md-6'),
                Div(Field('blog_detailed_info'), css_class='col-md-6'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">🌍 구글 마케팅 현황</h4>'),
            Div(
                Div(Field('google_registered'), css_class='col-md-6'),
                Div(Field('google_info_accurate'), css_class='col-md-6'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">💰 유료 광고 현황</h4>'),
            Div(
                Div(Field('ad_naver_place'), css_class='col-md-6'),
                Div(Field('ad_naver_place_budget'), css_class='col-md-6'),
                css_class='row mb-3'
            ),
            Div(
                Div(Field('ad_naver_powerlink'), css_class='col-md-6'),
                Div(Field('ad_naver_powerlink_budget'), css_class='col-md-6'),
                css_class='row mb-3'
            ),
            Div(
                Div(Field('ad_instagram_reels'), css_class='col-md-6'),
                Div(Field('ad_instagram_budget'), css_class='col-md-6'),
                css_class='row'
            ),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">🏢 마케팅 대행사 이용 경험</h4>'),
            Div(
                Div(Field('used_marketing_agency'), css_class='col-md-6'),
                Div(Field('agency_satisfaction', css_id='agency_satisfaction_field'), css_class='col-md-6'),
                css_class='row mb-3'
            ),
            Field('agency_service_detail', css_id='agency_service_detail_field'),
            
            HTML('<hr class="my-4">'),
            HTML('<h4 class="mb-4 text-primary">💭 추가 정보</h4>'),
            Field('main_concerns'),
            Field('desired_improvements'),
            
            Div(
                Submit('submit', '제출하기', css_class='btn btn-primary btn-lg w-100'),
                css_class='mt-4'
            )
        )