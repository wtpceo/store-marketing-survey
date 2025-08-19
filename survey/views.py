from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from .forms import SurveyForm
from .models import SurveyResponse, EmailRecipient

def survey_view(request):
    if request.method == 'POST':
        form = SurveyForm(request.POST)
        if form.is_valid():
            survey = form.save()
            
            # 이메일 발송
            try:
                send_survey_email(survey)
                messages.success(request, '설문조사가 성공적으로 제출되었습니다. 감사합니다!')
            except Exception as e:
                messages.warning(request, '설문조사는 저장되었지만 이메일 발송 중 오류가 발생했습니다.')
                print(f"Email error: {e}")
            
            return redirect('survey:thank_you')
    else:
        form = SurveyForm()
    
    return render(request, 'survey/survey_form.html', {'form': form})

def thank_you_view(request):
    return render(request, 'survey/thank_you.html')

def send_survey_email(survey):
    """설문조사 결과를 이메일로 발송"""
    subject = f'[설문조사] {survey.store_name} - {survey.owner_name}'
    
    # HTML 이메일 내용 생성
    html_message = render_to_string('survey/email_template.html', {
        'survey': survey
    })
    
    # 활성화된 수신자들에게 이메일 발송
    recipients = EmailRecipient.objects.filter(is_active=True)
    recipient_emails = [r.email for r in recipients]
    
    if recipient_emails:
        send_mail(
            subject,
            '',  # plain text message (optional)
            settings.DEFAULT_FROM_EMAIL,
            recipient_emails,
            html_message=html_message,
            fail_silently=False,
        )